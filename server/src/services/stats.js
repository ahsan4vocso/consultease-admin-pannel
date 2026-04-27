'use strict';

const statsService = ({ strapi }) => ({

  async getTestUserIds() {
    const appConfig = await strapi.db.query('api::app-config.app-config').findOne({
      populate: ['test_accounts']
    });
    return appConfig?.test_accounts?.map(u => u.documentId).filter(Boolean) || [];
  },

  async getPendingExpertStats() {
    const [tVer, tApp] = await Promise.all([
      strapi.documents('api::expert-verification.expert-verification').count({ filters: { is_form_submitted: true } }),
      strapi.documents('api::expert-profile-approval.expert-profile-approval').count({ filters: { is_approved: false } })
    ]);
    return { pendingVerifications: tVer, pendingApprovals: tApp };
  },

  async getPlatformEarnings(range = {}) {
    try {
      let dateFilter = '';
      const params = [];
      if (range.createdAt) {
        if (range.createdAt.$gte) {
          dateFilter += ` AND t.created_at >= ?`;
          params.push(range.createdAt.$gte);
        }
        if (range.createdAt.$lte) {
          dateFilter += ` AND t.created_at <= ?`;
          params.push(range.createdAt.$lte);
        }
      }

      const allParams = [...params, ...params];

      let sql = `
        SELECT COALESCE(SUM(net_earning), 0) as total
        FROM (
          SELECT 
            call_id, 
            SUM(in_amt) - SUM(out_amt) as net_earning
          FROM (
            -- 1. incoming_transactions
            SELECT tcl.call_id, t.amount as in_amt, 0 as out_amt
            FROM wallets w
            JOIN transactions_to_wallet_lnk twl ON w.id = twl.wallet_id
            JOIN transactions t ON twl.transaction_id = t.id
            JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
            WHERE w.wallet_type = 'EARNINGS_WALLET'
            AND t.payment_status = 'success'
            ${dateFilter}

            UNION ALL

            -- 2. outgoing_transactions
            SELECT tcl.call_id, 0 as in_amt, t.amount as out_amt
            FROM wallets w
            JOIN transactions_from_wallet_lnk fwl ON w.id = fwl.wallet_id
            JOIN transactions t ON fwl.transaction_id = t.id
            JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
            WHERE w.wallet_type = 'EARNINGS_WALLET'
            AND t.payment_status = 'success'
            ${dateFilter}
          ) AS combined
          GROUP BY call_id
        ) AS final
      `;

      const result = await strapi.db.connection.raw(sql, allParams);
      const total = result.rows?.[0]?.total || 0;

      return Number(total);
    } catch (error) {
      strapi.log.error('Platform Earnings Array SQL Error:', error);
      return 0;
    }
  },

  async getPlatformReportStats({ startDate, endDate } = {}) {
    try {
      const ids = await this.getTestUserIds();
      const range = (startDate || endDate) ? {
        createdAt: { ...(startDate && { $gte: startDate }), ...(endDate && { $lte: endDate }) }
      } : {};
      const upRange = range.createdAt ? { updatedAt: range.createdAt } : {};

      const [
        tVer, nVer, tApp, nApp,
        tClients, nClients, tExperts, nExperts, tBlocked, nBlocked, tDeleted, nDeleted,
        tTopups, nTopups, tRefs, nRefs,
        // tEarnings, nEarnings
      ] = await Promise.all([
        strapi.documents('api::expert-verification.expert-verification').count({ filters: { is_form_submitted: true } }),
        strapi.documents('api::expert-verification.expert-verification').count({ filters: { is_form_submitted: true, ...range } }),
        strapi.documents('api::expert-profile-approval.expert-profile-approval').count({ filters: { is_approved: false } }),
        strapi.documents('api::expert-profile-approval.expert-profile-approval').count({ filters: { is_approved: false, ...range } }),
        strapi.documents('api::public-user.public-user').count({ filters: { role: 'Client', documentId: { $notIn: ids } } }),
        strapi.documents('api::public-user.public-user').count({ filters: { role: 'Client', documentId: { $notIn: ids }, ...range } }),
        strapi.documents('api::public-user.public-user').count({ filters: { role: 'Expert', documentId: { $notIn: ids } } }),
        strapi.documents('api::public-user.public-user').count({ filters: { role: 'Expert', documentId: { $notIn: ids }, ...range } }),
        strapi.documents('api::public-user.public-user').count({ filters: { accountStatus: 'blocked', documentId: { $notIn: ids } } }),
        strapi.documents('api::public-user.public-user').count({ filters: { accountStatus: 'blocked', documentId: { $notIn: ids }, ...upRange } }),
        strapi.documents('api::public-user.public-user').count({ filters: { accountStatus: 'deleted', documentId: { $notIn: ids } } }),
        strapi.documents('api::public-user.public-user').count({ filters: { accountStatus: 'deleted', documentId: { $notIn: ids }, ...upRange } }),
        strapi.documents('api::transaction.transaction').findMany({ filters: { transactionType: 'topup', paymentStatus: 'success' }, fields: ['amount', 'metadata'], pagination: { limit: -1 } }),
        strapi.documents('api::transaction.transaction').findMany({ filters: { transactionType: 'topup', paymentStatus: 'success', ...range }, fields: ['amount', 'metadata'], pagination: { limit: -1 } }),
        strapi.documents('api::transaction.transaction').findMany({ filters: { method: 'Referral', paymentStatus: 'success' }, fields: ['amount'], pagination: { limit: -1 } }),
        strapi.documents('api::transaction.transaction').findMany({ filters: { method: 'Referral', paymentStatus: 'success', ...range }, fields: ['amount'], pagination: { limit: -1 } }),
        // this.getPlatformEarnings(),
        // this.getPlatformEarnings(range)
      ]);

      const sumProd = (list) => list.reduce((s, t) => t.metadata?.appliedPayUConfig?.mode === 'production' ? s + (Number(t.amount) || 0) : s, 0);
      const sumAll = (list) => list.reduce((s, r) => s + (Number(r.amount) || 0), 0);

      return {
        pendingVerifications: { total: tVer, range: nVer },
        pendingApprovals: { total: tApp, range: nApp },
        clients: { total: tClients, range: nClients },
        experts: { total: tExperts, range: nExperts },
        blockedUsers: { total: tBlocked, range: nBlocked },
        deletedUsers: { total: tDeleted, range: nDeleted },
        topups: { total: sumProd(tTopups), range: sumProd(nTopups) },
        referrals: { total: sumAll(tRefs), range: sumAll(nRefs) },
        // platformEarnings: { total: tEarnings, range: nEarnings }
      };
    } catch (e) {
      strapi.log.error('Platform Report Error:', e);
      throw e;
    }
  },

  async getSummaryStats() {
    try {
      const testIds = await this.getTestUserIds();

      // 1. total users (Active Experts + Clients only, excluding tests)
      const totalUsers = await strapi.documents('api::public-user.public-user').count({
        filters: {
          documentId: { $notIn: testIds },
          accountStatus: 'active'
        }
      });

      // 2. clients breakdown (excluding test accounts)
      const [activeClients, blockedClients, deletedClients] = await Promise.all([
        strapi.documents('api::public-user.public-user').count({
          filters: { role: 'Client', documentId: { $notIn: testIds }, accountStatus: 'active' }
        }),
        strapi.documents('api::public-user.public-user').count({
          filters: { role: 'Client', documentId: { $notIn: testIds }, accountStatus: 'blocked' }
        }),
        strapi.documents('api::public-user.public-user').count({
          filters: { role: 'Client', documentId: { $notIn: testIds }, accountStatus: 'deleted' }
        })
      ]);

      const clients = activeClients;
      const clientsByStatus = {
        Active: activeClients,
        Blocked: blockedClients,
        Deleted: deletedClients
      };

      // 3. Platform earnings (Incoming - Outgoing in Earnings Wallet for call-linked transactions)
      const platformEarnings = await this.getPlatformEarnings();

      // 3. experts data (fetching all non-test experts for status and availability)
      const allExperts = await strapi.documents('api::public-user.public-user').findMany({
        filters: {
          role: 'Expert',
          documentId: { $notIn: testIds }
        },
        populate: { expert: { fields: ['user_status', 'isApproved'] } },
        pagination: { limit: -1 }
      });

      const availability = { Online: 0, Offline: 0, Busy: 0 };
      const expertsByStatus = { Approved: 0, Pending: 0, Blocked: 0, Deleted: 0 };

      allExperts.forEach(user => {
        const accStatus = user.accountStatus;

        if (accStatus === 'active') {
          // Availability (active only)
          const status = user.expert?.user_status || 'offline';
          const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
          if (availability.hasOwnProperty(formattedStatus)) {
            availability[formattedStatus]++;
          }

          // Approval Status (active only)
          if (user.expert?.isApproved) {
            expertsByStatus.Approved++;
          } else {
            expertsByStatus.Pending++;
          }
        } else if (accStatus === 'blocked') {
          expertsByStatus.Blocked++;
        } else if (accStatus === 'deleted') {
          expertsByStatus.Deleted++;
        }
      });

      const experts = expertsByStatus.Approved + expertsByStatus.Pending;


      // 6. expert verifications breakdown (Active experts only)
      const verifiedVerifications = await strapi.documents('api::expert-verification.expert-verification').findMany({
        filters: {
          Verified_Badge: true,
          expert_profile: {
            user: {
              documentId: { $notIn: testIds },
              accountStatus: 'active'
            }
          }
        },
        pagination: { limit: -1 }
      });

      const badges = {
        'Identity Badge': 0,
        'Address Badge': 0,
        'Education Badge': 0,
        'LinkedIn Badge': 0,
        'GST Badge': 0,
        'Bank Badge': 0
      };

      verifiedVerifications.forEach(v => {
        // Count active badges
        if (v.Identity_Verified) badges['Identity Badge']++;
        if (v.Address_Verified) badges['Address Badge']++;
        if (v.Education_Verified) badges['Education Badge']++;
        if (v.LinkedIn_Verified) badges['LinkedIn Badge']++;
        if (v.GST_Verified) badges['GST Badge']++;
        if (v.Bank_Verified) badges['Bank Badge']++;
      });

      // 6.5. Pending Expert Approvals & Verifications
      const { pendingVerifications, pendingApprovals } = await this.getPendingExpertStats();

      // 7. wallet summary (lifetime success topups in production mode)
      const allTopups = await strapi.documents('api::transaction.transaction').findMany({
        filters: {
          transactionType: 'topup',
          paymentStatus: 'success'
        },
        fields: ['amount', 'metadata'],
        pagination: { limit: -1 }
      });

      const totalTopups = allTopups.reduce((sum, t) => {
        if (t.metadata?.appliedPayUConfig?.mode === 'production') {
          return sum + (Number(t.amount) || 0);
        }
        return sum;
      }, 0);

      // 8. referral expenses (lifetime)
      const referralTransactions = await strapi.documents('api::transaction.transaction').findMany({
        filters: {
          method: 'Referral',
          paymentStatus: 'success'
        },
        fields: ['amount'],
        pagination: { limit: -1 }
      });

      const referralExpenses = referralTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

      const wallet = {
        totalTopups,
        platformEarnings,
        referralDistributed: referralExpenses,
        economy: {
          audio: { clientSpent: 0, expertEarned: 0, commission: 0 },
          video: { clientSpent: 0, expertEarned: 0, commission: 0 },
        }
      };

      return {
        total: totalUsers,
        test: testIds?.length || 0,
        clients,
        clientsByStatus,
        experts,
        expertsByStatus,
        pendingApprovals,
        pendingVerifications,
        availability,
        badges,
        wallet
      };
    } catch (error) {
      strapi.log.error('Stats Service Error (Summary):', error);
      throw error;
    }
  },

  /**
   * Fetches time-series data for graphs based on interval.
   */
  async getGraphStats(interval = 'day wise') {
    try {
      // 1. Resolve Test Account IDs
      const testIds = await this.getTestUserIds();

      // 2. Fetch Relevant Data Sets (Limited by interval and filtered by active/non-test status)
      const startDate = new Date();
      if (interval === 'day wise') startDate.setDate(startDate.getDate() - 30);
      else if (interval === 'monthly') startDate.setMonth(startDate.getMonth() - 12);
      else startDate.setFullYear(startDate.getFullYear() - 12);

      const [totalUsers, clients, experts, testUsersRaw, transactions] = await Promise.all([
        // Total Users (Real, All)
        strapi.documents('api::public-user.public-user').findMany({
          filters: {
            documentId: { $notIn: testIds },
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ['createdAt', 'accountStatus'],
          pagination: { limit: -1 }
        }),

        // Clients (Real, All)
        strapi.documents('api::public-user.public-user').findMany({
          filters: {
            documentId: { $notIn: testIds },
            role: 'Client',
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ['createdAt', 'accountStatus'],
          pagination: { limit: -1 }
        }),

        // Experts (Real, All)
        strapi.documents('api::public-user.public-user').findMany({
          filters: {
            documentId: { $notIn: testIds },
            role: 'Expert',
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ['createdAt', 'accountStatus'],
          pagination: { limit: -1 }
        }),

        // Test Users
        strapi.documents('api::public-user.public-user').findMany({
          filters: {
            documentId: { $in: testIds },
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ['createdAt'],
          pagination: { limit: -1 }
        }),

        // Successful Transactions
        strapi.documents('api::transaction.transaction').findMany({
          filters: {
            paymentStatus: 'success',
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ['amount', 'method', 'metadata', 'createdAt', 'transactionType'],
          pagination: { limit: -1 }
        })
      ]);

      // Fetch Platform Earnings trend using Raw SQL
      let format = 'YYYY-MM-DD';
      if (interval === 'monthly') format = 'YYYY-MM';
      else if (interval === 'yearly') format = 'YYYY';

      const earningsSql = `
        SELECT bucket, SUM(in_amt) - SUM(out_amt) as earnings
        FROM (
          -- Incoming
          SELECT TRIM(TO_CHAR(t.created_at, ?)) as bucket, t.amount as in_amt, 0 as out_amt
          FROM wallets w
          JOIN transactions_to_wallet_lnk twl ON w.id = twl.wallet_id
          JOIN transactions t ON twl.transaction_id = t.id
          JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
          WHERE w.wallet_type = 'EARNINGS_WALLET'
          AND t.payment_status = 'success'
          AND t.created_at >= ?

          UNION ALL

          -- Outgoing
          SELECT TRIM(TO_CHAR(t.created_at, ?)) as bucket, 0 as in_amt, t.amount as out_amt
          FROM wallets w
          JOIN transactions_from_wallet_lnk fwl ON w.id = fwl.wallet_id
          JOIN transactions t ON fwl.transaction_id = t.id
          JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
          WHERE w.wallet_type = 'EARNINGS_WALLET'
          AND t.payment_status = 'success'
          AND t.created_at >= ?
        ) AS combined
        GROUP BY bucket
      `;

      const earningsResult = await strapi.db.connection.raw(earningsSql, [
        format, startDate.toISOString(),
        format, startDate.toISOString()
      ]);
      const earningsRows = earningsResult.rows;
      const earningsBuckets = {};
      earningsRows?.forEach(row => {
        earningsBuckets[row.bucket] = Number(row.earnings) || 0;
      });

      // 3. Aggregate into Buckets
      const getBucket = (dateStr) => {
        const d = new Date(dateStr);
        if (interval === 'day wise') return d.toISOString().split('T')[0];
        if (interval === 'monthly') return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return `${d.getFullYear()}`;
      };

      const aggregate = (list, filterFn = null, amountField = null) => {
        const buckets = {};
        list.forEach(item => {
          if (filterFn && !filterFn(item)) return;
          const key = getBucket(item.createdAt);
          const val = amountField ? (Number(item[amountField]) || 0) : 1;
          buckets[key] = (buckets[key] || 0) + val;
        });
        return buckets;
      };

      // Aggregate All for Growth Bar Chart
      const clientsBucketsAll = aggregate(clients);
      const expertsBucketsAll = aggregate(experts);

      // Aggregate Active Only for Sparklines (to match StatCard values)
      const totalBucketsActive = aggregate(totalUsers, u => u.accountStatus === 'active');
      const clientsBucketsActive = aggregate(clients, u => u.accountStatus === 'active');
      const expertsBucketsActive = aggregate(experts, u => u.accountStatus === 'active');

      const testBuckets = aggregate(testUsersRaw);
      const topupsBuckets = aggregate(transactions, t =>
        t.metadata?.transactionType === 'topup' && t.metadata?.appliedPayUConfig?.mode === 'production', 'amount'
      );
      const referralsBuckets = aggregate(transactions, t => t.method === 'Referral', 'amount');

      // 4. Generate All Required Labels (Last 12 intervals)
      const periods = [];
      const now = new Date();
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now);
        if (interval === 'day wise') d.setDate(d.getDate() - i);
        else if (interval === 'monthly') d.setMonth(d.getMonth() - i);
        else d.setFullYear(d.getFullYear() - i);

        const key = getBucket(d.toISOString());
        periods.push(key);
      }

      const mapToValues = (buckets) => periods.map(p => buckets[p] || 0);

      const labels = periods.map(p => {
        const d = new Date(p + (interval === 'monthly' ? '-01' : ''));
        if (interval === 'day wise') return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
        if (interval === 'monthly') return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
        return d.getFullYear().toString();
      });

      return {
        meta: { labels },
        growth: {
          experts: mapToValues(expertsBucketsAll),
          clients: mapToValues(clientsBucketsAll)
        },
        wallet: {
          trend: mapToValues(topupsBuckets)
        },
        sparklines: {
          total: mapToValues(totalBucketsActive),
          users: mapToValues(clientsBucketsActive),
          experts: mapToValues(expertsBucketsActive),
          test: mapToValues(testBuckets),
          topups: mapToValues(topupsBuckets),
          referrals: mapToValues(referralsBuckets),
          earnings: mapToValues(earningsBuckets)
        }
      };
    } catch (error) {
      strapi.log.error('Stats Service Error (Graph):', error);
      throw error;
    }
  }
});

export default statsService;