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
      strapi.documents('api::expert-profile-approval.expert-profile-approval').count({ filters: { is_approved: false, expert_profile: { $notNull: true } } })
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
        tEarnings, nEarnings
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
        this.getPlatformEarnings(),
        this.getPlatformEarnings(range)
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
        platformEarnings: { total: tEarnings, range: nEarnings }
      };
    } catch (e) {
      strapi.log.error('Platform Report Error:', e);
      throw e;
    }
  },

  async getEconomyStats(range = {}) {
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

      const sql = `
        SELECT jsonb_build_object(
          'videoCall', jsonb_build_object(
            'clientSpend', COALESCE(SUM(in_amt) FILTER (WHERE type = 'videoCall'), 0),
            'expertReceived', COALESCE(SUM(out_amt) FILTER (WHERE type = 'videoCall'), 0),
            'platformEarning', COALESCE(SUM(in_amt - out_amt) FILTER (WHERE type = 'videoCall'), 0)
          ),
          'voiceCall', jsonb_build_object(
            'clientSpend', COALESCE(SUM(in_amt) FILTER (WHERE type = 'voiceCall'), 0),
            'expertReceived', COALESCE(SUM(out_amt) FILTER (WHERE type = 'voiceCall'), 0),
            'platformEarning', COALESCE(SUM(in_amt - out_amt) FILTER (WHERE type = 'voiceCall'), 0)
          )
        ) as stats
        FROM (
          SELECT c.type, combined.in_amt, combined.out_amt
          FROM (
            -- Incoming (Client Spend)
            SELECT tcl.call_id, t.amount as in_amt, 0 as out_amt
            FROM wallets w
            JOIN transactions_to_wallet_lnk twl ON w.id = twl.wallet_id
            JOIN transactions t ON twl.transaction_id = t.id
            JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
            WHERE w.wallet_type = 'EARNINGS_WALLET'
            AND t.payment_status = 'success'
            ${dateFilter}

            UNION ALL

            -- Outgoing (Expert Received)
            SELECT tcl.call_id, 0 as in_amt, t.amount as out_amt
            FROM wallets w
            JOIN transactions_from_wallet_lnk fwl ON w.id = fwl.wallet_id
            JOIN transactions t ON fwl.transaction_id = fwl.transaction_id
            JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
            WHERE w.wallet_type = 'EARNINGS_WALLET'
            AND t.payment_status = 'success'
            ${dateFilter}
          ) AS combined
          JOIN calls c ON combined.call_id = c.id
        ) AS source
      `;

      const result = await strapi.db.connection.raw(sql, allParams);
      return JSON.parse(result.rows[0]?.stats);
    } catch (error) {
      strapi.log.error('Economy Stats SQL Error:', error);
      return {
        videoCall: { clientSpend: 0, expertReceived: 0, platformEarning: 0 },
        voiceCall: { clientSpend: 0, expertReceived: 0, platformEarning: 0 }
      };
    }
  },

  async getSummaryStats(range = {}) {
    try {
      const testIds = await this.getTestUserIds();
      // 1. total users (Active Experts + Clients only, excluding tests)
      const totalUsers = await strapi.documents('api::public-user.public-user').count({
        filters: {
          documentId: { $notIn: testIds },
          accountStatus: 'active',
          ...range
        }
      });

      // 2. clients breakdown (excluding test accounts)
      const [activeClients, blockedClients, deletedClients] = await Promise.all([
        strapi.documents('api::public-user.public-user').count({
          filters: { role: 'Client', documentId: { $notIn: testIds }, accountStatus: 'active', ...range }
        }),
        strapi.documents('api::public-user.public-user').count({
          filters: { role: 'Client', documentId: { $notIn: testIds }, accountStatus: 'blocked', ...range }
        }),
        strapi.documents('api::public-user.public-user').count({
          filters: { role: 'Client', documentId: { $notIn: testIds }, accountStatus: 'deleted', ...range }
        })
      ]);

      const clients = activeClients;
      const clientsByStatus = {
        Active: activeClients,
        Blocked: blockedClients,
        Deleted: deletedClients
      };

      // 3. Platform earnings (Incoming - Outgoing in Earnings Wallet for call-linked transactions)
      const platformEarnings = await this.getPlatformEarnings(range);

      // 3. experts data
      const [expertsInRange, availabilitySnapshot] = await Promise.all([
        // Filtered by range for status counts
        strapi.documents('api::public-user.public-user').findMany({
          filters: { role: 'Expert', documentId: { $notIn: testIds }, ...range },
          populate: { expert: { fields: ['isApproved'] } },
          pagination: { limit: -1 }
        }),
        // All active experts (all-time) for availability snapshot
        strapi.documents('api::public-user.public-user').findMany({
          filters: { role: 'Expert', documentId: { $notIn: testIds }, accountStatus: 'active' },
          populate: { expert: { fields: ['user_status'] } },
          pagination: { limit: -1 }
        })
      ]);

      const availability = { Online: 0, Offline: 0, Busy: 0 };
      const expertsByStatus = { Approved: 0, Pending: 0, Blocked: 0, Deleted: 0 };

      // Process availability from all-time snapshot
      availabilitySnapshot.forEach(user => {
        const status = user.expert?.user_status || 'offline';
        const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
        if (availability.hasOwnProperty(formattedStatus)) {
          availability[formattedStatus]++;
        }
      });

      // Process status counts from range-filtered experts
      expertsInRange.forEach(user => {
        const accStatus = user.accountStatus;

        if (accStatus === 'active') {

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

      const experts = expertsInRange.filter(u => u.accountStatus === 'active').length;
      const totalExpertsSnapshot = availabilitySnapshot.length;


      // 6. expert verifications breakdown (Active experts only)
      const verifiedVerifications = await strapi.documents('api::expert-verification.expert-verification').findMany({
        filters: {
          Verified_Badge: true,
          expert_profile: {
            user: {
              documentId: { $notIn: testIds },
              accountStatus: 'active'
            }
          },
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
        if (v.Identity_Verified) badges['Identity Badge']++;
        if (v.Address_Verified) badges['Address Badge']++;
        if (v.Education_Verified) badges['Education Badge']++;
        if (v.LinkedIn_Verified) badges['LinkedIn Badge']++;
        if (v.GST_Verified) badges['GST Badge']++;
        if (v.Bank_Verified) badges['Bank Badge']++;
      });
      //s
      // 6.5. Pending Expert Approvals & Verifications
      const { pendingVerifications, pendingApprovals } = await this.getPendingExpertStats();

      // 7. wallet summary (lifetime success topups in production mode)
      const allTopups = await strapi.documents('api::transaction.transaction').findMany({
        filters: {
          transactionType: 'topup',
          paymentStatus: 'success',
          ...range
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
          paymentStatus: 'success',
          ...range
        },
        fields: ['amount'],
        pagination: { limit: -1 }
      });

      const referralExpenses = referralTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

      // 9. Economy Stats (Video vs Voice)
      const economy = await this.getEconomyStats(range);

      const wallet = {
        totalTopups,
        platformEarnings,
        referralDistributed: referralExpenses,
        economy
      };

      return {
        total: totalUsers,
        test: testIds?.length || 0,
        clients,
        clientsByStatus,
        experts,
        expertsCount: totalExpertsSnapshot,
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

  async getGraphStats(interval = 'day wise') {
    try {
      const knex = strapi.db.connection;

      const intervalConfig = {
        'day wise': { series: '29 days', step: '1 day', format: 'DD Mon', bucket: 'YYYY-MM-DD' },
        'monthly': { series: '11 months', step: '1 month', format: 'Mon YYYY', bucket: 'YYYY-MM' },
        'yearly': { series: '11 years', step: '1 year', format: 'YYYY', bucket: 'YYYY' }
      }[interval];

      const sql = `
        WITH periods AS (
          SELECT 
            TO_CHAR(p, '${intervalConfig.bucket}') as bucket_id,
            TO_CHAR(p, '${intervalConfig.format}') as label,
            p as period_date
          FROM generate_series(
            CURRENT_DATE - INTERVAL '${intervalConfig.series}', 
            CURRENT_D,ATE 
            '${intervalConfig.step}'
          ) AS p
        ),
        test_user_ids AS (
          SELECT public_user_id FROM app_configs_test_accounts_lnk
        ),
        user_metrics AS (
          SELECT 
            TO_CHAR(u.created_at, '${intervalConfig.bucket}') as bucket_id,
            COUNT(*) FILTER (WHERE u.role = 'Expert' AND u.id NOT IN (SELECT public_user_id FROM test_user_ids)) as experts_count,
            COUNT(*) FILTER (WHERE u.role = 'Client' AND u.id NOT IN (SELECT public_user_id FROM test_user_ids)) as clients_count,
            COUNT(*) FILTER (WHERE u.id NOT IN (SELECT public_user_id FROM test_user_ids)) as total_count,
            COUNT(*) FILTER (WHERE u.id IN (SELECT public_user_id FROM test_user_ids)) as test_count
          FROM public_users u
          WHERE u.account_status = 'active'
          GROUP BY 1
        ),
        transaction_metrics AS (
          SELECT 
            TO_CHAR(t.created_at, '${intervalConfig.bucket}') as bucket_id,
            SUM(t.amount) FILTER (
              WHERE t.transaction_type = 'topup' 
              AND (t.metadata->'appliedPayUConfig'->>'mode') = 'production'
            ) as topup_amount,
            SUM(t.amount) FILTER (WHERE t.method = 'Referral') as referral_amount
          FROM transactions t
          WHERE t.payment_status = 'success'
          GROUP BY 1
        ),
        earnings_metrics AS (
          SELECT 
            TO_CHAR(t.created_at, '${intervalConfig.bucket}') as bucket_id,
            SUM(CASE WHEN twl.id IS NOT NULL THEN t.amount ELSE 0 END) - 
            SUM(CASE WHEN fwl.id IS NOT NULL THEN t.amount ELSE 0 END) as earnings
          FROM transactions t
          JOIN wallets w ON w.wallet_type = 'EARNINGS_WALLET'
          LEFT JOIN transactions_to_wallet_lnk twl ON t.id = twl.transaction_id AND w.id = twl.wallet_id
          LEFT JOIN transactions_from_wallet_lnk fwl ON t.id = fwl.transaction_id AND w.id = fwl.wallet_id
          JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
          WHERE t.payment_status = 'success'
          GROUP BY 1
        )
        SELECT 
          jsonb_build_object(
            'meta', jsonb_build_object('labels', jsonb_agg(p.label ORDER BY p.period_date)),
            'growth', jsonb_build_object(
              'experts', jsonb_agg(COALESCE(um.experts_count, 0) ORDER BY p.period_date),
              'clients', jsonb_agg(COALESCE(um.clients_count, 0) ORDER BY p.period_date)
            ),
            'wallet', jsonb_build_object(
              'trend', jsonb_agg(COALESCE(tm.topup_amount, 0) ORDER BY p.period_date)
            ),
            'sparklines', jsonb_build_object(
              'total', jsonb_agg(COALESCE(um.total_count, 0) ORDER BY p.period_date),
              'users', jsonb_agg(COALESCE(um.clients_count, 0) ORDER BY p.period_date),
              'experts', jsonb_agg(COALESCE(um.experts_count, 0) ORDER BY p.period_date),
              'test', jsonb_agg(COALESCE(um.test_count, 0) ORDER BY p.period_date),
              'topups', jsonb_agg(COALESCE(tm.topup_amount, 0) ORDER BY p.period_date),
              'referrals', jsonb_agg(COALESCE(tm.referral_amount, 0) ORDER BY p.period_date),
              'earnings', jsonb_agg(COALESCE(em.earnings, 0) ORDER BY p.period_date)
            )
          ) as stats
        FROM periods p
        LEFT JOIN user_metrics um ON p.bucket_id = um.bucket_id
        LEFT JOIN transaction_metrics tm ON p.bucket_id = tm.bucket_id
        LEFT JOIN earnings_metrics em ON p.bucket_id = em.bucket_id
      `;

      const result = await knex.raw(sql);
      return result.rows[0].stats;
    } catch (error) {
      strapi.log.error('Stats Service Error (Graph SQL):', error);
      throw error;
    }
  }
});
export default statsService;