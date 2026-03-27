//  { total_referrals, platform_expends, Referral_coversion, direct_conversion }
//  1. total_referrals: table(public_profile).referrerCode if have some value then count it, and output as {client: x, expert: y};
//  2. platform_expends: table(transaction) filter method = Referral, transaction_Id.split('_')[-1] (values: referrer, reciever), and output should as {referrer: {client: x, expert: y}, reciever: {client: x, expert: y}} where for role (transaction -> wallet -> public_profile.role);
//  3. Referral_coversion: client: table(user_statistic) filter[total_wallet_topup] > 0, public_profile.role = 'Client', and referrerCode is not null; expert: table(expert_profile) filter[isApproved = true], join public_profile to check referrerCode is not null; this output should be as {client: x, expert: y};
//  4. direct_conversion: direct coversion means the user is not referred by anyone but still he is a user of the platform. this output should be as {client: x, expert: y};



const referral = ({ strapi }) => ({
  async stats(ctx) {
    try {
      const knex = strapi.db.connection;

      // Pure SQL JSON Response Builder (Zero-Assignment in JS)
      const result = await knex.raw(`
        WITH months_range AS (
          SELECT generate_series(
            date_trunc('month', CURRENT_DATE) - interval '4 months',
            date_trunc('month', CURRENT_DATE),
            interval '1 month'
          )::date as month_start
        ),
        user_metrics AS (
          SELECT 
            COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL)::int as total_referrals,
            COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL AND u.role = 'Client')::int as ref_client,
            COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL AND u.role = 'Expert')::int as ref_expert,
            
            COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL AND u.role = 'Client' AND us.total_wallet_topup > 0)::int as ref_conv_client,
            COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL AND u.role = 'Expert' AND ep.is_approved = true)::int as ref_conv_expert,
            COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL AND ((u.role = 'Client' AND us.total_wallet_topup > 0) OR (u.role = 'Expert' AND ep.is_approved = true)))::int as total_ref_conv,
            
            COUNT(*) FILTER (WHERE u.referrer_code IS NULL AND u.role = 'Client' AND us.total_wallet_topup > 0)::int as direct_conv_client,
            COUNT(*) FILTER (WHERE u.referrer_code IS NULL AND u.role = 'Expert' AND ep.is_approved = true)::int as direct_conv_expert,
            
            CASE 
              WHEN COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL) > 0 
              THEN ROUND((COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL AND ((u.role = 'Client' AND us.total_wallet_topup > 0) OR (u.role = 'Expert' AND ep.is_approved = true)))::float / NULLIF(COUNT(*) FILTER (WHERE u.referrer_code IS NOT NULL), 0)) * 100)
              ELSE 0 
            END::int as ref_conv_percent,
            
            CASE 
              WHEN COUNT(*) > 0 
              THEN ROUND((COUNT(*) FILTER (WHERE u.referrer_code IS NULL AND ((u.role = 'Client' AND us.total_wallet_topup > 0) OR (u.role = 'Expert' AND ep.is_approved = true)))::float / NULLIF(COUNT(*), 0)) * 100)
              ELSE 0 
            END::int as direct_conv_percent,
            
            COUNT(*) FILTER (WHERE (u.role = 'Client' AND us.total_wallet_topup > 0) OR (u.role = 'Expert' AND ep.is_approved = true))::int as total_any_conv,
            COUNT(*)::int as total_users
          FROM public_users u
          LEFT JOIN user_statistics us ON us.public_profile_id = u.id
          LEFT JOIN expert_profiles ep ON ep.user_id = u.id
        ),
        expend_metrics AS (
          SELECT
            COALESCE(SUM(t.amount), 0)::float as total_expends,
            COALESCE(SUM(t.amount) FILTER (WHERE u.role = 'Client' AND t.transaction_id LIKE '%_referrer'), 0)::float as exp_ref_client,
            COALESCE(SUM(t.amount) FILTER (WHERE u.role = 'Expert' AND t.transaction_id LIKE '%_referrer'), 0)::float as exp_ref_expert,
            COALESCE(SUM(t.amount) FILTER (WHERE u.role = 'Client' AND t.transaction_id LIKE '%_reciever'), 0)::float as exp_rec_client,
            COALESCE(SUM(t.amount) FILTER (WHERE u.role = 'Expert' AND t.transaction_id LIKE '%_reciever'), 0)::float as exp_rec_expert
          FROM transactions t
          JOIN wallets w ON t.to_wallet_id = w.id
          JOIN public_users u ON w.user_id = u.id
          WHERE t.method = 'Referral' AND t.payment_status = 'success'
        ),
        referral_graph AS (
          SELECT ARRAY_AGG(count ORDER BY month_start) as ref_graph
          FROM (
            SELECT m.month_start, COUNT(u.id)::int as count
            FROM months_range m
            LEFT JOIN public_users u ON date_trunc('month', u.created_at) = m.month_start AND u.referrer_code IS NOT NULL
            GROUP BY m.month_start
          ) s
        ),
        expense_graph AS (
          SELECT ARRAY_AGG(amount ORDER BY month_start) as exp_graph
          FROM (
            SELECT m.month_start, COALESCE(SUM(t.amount), 0)::float as amount
            FROM months_range m
            LEFT JOIN transactions t ON date_trunc('month', t.created_at) = m.month_start AND t.method = 'Referral' AND t.payment_status = 'success'
            GROUP BY m.month_start
          ) s
        ),
        meta_metrics AS (
          SELECT ARRAY_AGG(to_char(month_start, 'Mon') ORDER BY month_start) as months
          FROM months_range
        )
        SELECT json_build_object(
          'data', json_build_object(
            'referrals', json_build_object(
              'total', total_referrals,
              'client', ref_client,
              'expert', ref_expert,
              'graph', ref_graph
            ),
            'platform_expends', json_build_object(
              'total', total_expends,
              'referrer', json_build_object('client', exp_ref_client, 'expert', exp_ref_expert),
              'reciever', json_build_object('client', exp_rec_client, 'expert', exp_rec_expert),
              'graph', exp_graph
            ),
            'referral_conversion', json_build_object(
              'total', total_ref_conv,
              'client', ref_conv_client,
              'expert', ref_conv_expert,
              'percentage', ref_conv_percent
            ),
            'direct_conversion', json_build_object(
              'total', direct_conv_client + direct_conv_expert,
              'client', direct_conv_client,
              'expert', direct_conv_expert,
              'percentage', direct_conv_percent
            ),
            'meta', json_build_object('months', months)
          )
        ) as result FROM user_metrics, expend_metrics, referral_graph, expense_graph, meta_metrics;
      `);

      ctx.body = result.rows[0].result;
    } catch (err) {
      strapi.log.error("Referral Stats SQL JSON Engine Error:", err.message);
      ctx.throw(500, err.message);
    }
  },


  async table_data(ctx) {
    try {
      const { page = 1, pageSize = 10, role = 'all', search = '', sort = 'id:desc' } = ctx.query;

      strapi.log.info(`Referral Stats Request - Role: ${role}, Search: "${search}", Sort: ${sort}`);

      const filters = {};
      if (role !== 'all') filters.role = role;
      if (search) {
        filters.$or = [
          { name: { $containsi: search } },
          { email: { $containsi: search } },
          { mobile: { $containsi: search } }
        ];
      }

      // Robust sorting for relations
      let sortObj = sort;
      if (sort.startsWith('total_')) {
        const [field, order] = sort.split(':');
        sortObj = { user_statistic: { [field]: order || 'desc' } };
      }

      const data = await strapi.entityService.findMany('api::public-user.public-user', {
        filters,
        populate: { user_statistic: true },
        start: (Number(page) - 1) * Number(pageSize),
        limit: Number(pageSize),
        sort: sortObj
      });

      const total = await strapi.entityService.count('api::public-user.public-user', { filters });
      const overallTotal = await strapi.entityService.count('api::public-user.public-user');

      strapi.log.info(`Referral Stats Result - Found ${data.length} users. Filtered Total: ${total}. Overall Total: ${overallTotal}`);

      ctx.body = {
        data: data.map(u => ({
          id: u.id,
          name: u.name || 'Unknown',
          email: u.email || 'N/A',
          mobile: u.mobile || 'N/A',
          role: u.role || 'Client',
          total_referrals: u.user_statistic?.total_referrals || 0,
          total_earnings_from_referrals: u.user_statistic?.total_earnings_from_referrals || 0,
          total_wallet_topup: u.user_statistic?.total_wallet_topup || 0,
        })),
        meta: {
          pagination: { page: Number(page), pageSize: Number(pageSize), total, pageCount: Math.ceil(total / Number(pageSize)) },
          debug: { overallTotal }
        }
      };
    } catch (err) {
      strapi.log.error("userStats error:", err.message);
      ctx.throw(500, err.message);
    }
  },
});

export default referral;