//  { total_referrals, platform_expends, Referral_coversion, direct_conversion }
//  1. total_referrals: table(public_profile).referrerCode if have some value then count it, and output as {client: x, expert: y};
//  2. platform_expends: table(transaction) filter method = Referral, transaction_Id.split('_')[-1] (values: referrer, reciever), and output should as {referrer: {client: x, expert: y}, reciever: {client: x, expert: y}} where for role (transaction -> wallet -> public_profile.role);
//  3. Referral_coversion: client: table(user_statistic) filter[total_wallet_topup] > 0, public_profile.role = 'Client', and referrerCode is not null; expert: table(expert_profile) filter[isApproved = true], join public_profile to check referrerCode is not null; this output should be as {client: x, expert: y};
//  4. direct_conversion: direct coversion means the user is not referred by anyone but still he is a user of the platform. this output should be as {client: x, expert: y};


const referral = ({ strapi }) => ({
  async stats(ctx) {
    try {
      const knex = strapi.db.connection;

      const result = await knex.raw(`
        WITH months_range AS (
  SELECT generate_series(
    date_trunc('month', CURRENT_DATE) - interval '4 months',
    date_trunc('month', CURRENT_DATE),
    interval '1 month'
  )::date AS month_start
),

user_stats_map AS (
  SELECT
    lnk.public_user_id,
    MAX(COALESCE(us.total_wallet_topup, 0)) AS total_wallet_topup
  FROM user_statistics_public_profile_lnk lnk
  JOIN user_statistics us
    ON us.id = lnk.user_statistic_id
  GROUP BY lnk.public_user_id
),

expert_map AS (
  SELECT
    lnk.public_user_id,
    BOOL_OR(COALESCE(ep.is_approved, false)) AS is_approved
  FROM expert_profiles_user_lnk lnk
  JOIN expert_profiles ep
    ON ep.id = lnk.expert_profile_id
  GROUP BY lnk.public_user_id
),

wallet_user_map AS (
  SELECT DISTINCT
    lnk.wallet_id,
    lnk.public_user_id
  FROM wallets_user_lnk lnk
),

base_users AS (
  SELECT
    u.id,
    u.role,
    u.created_at,
    NULLIF(BTRIM(u.referrer_code), '') AS normalized_referrer_code,
    COALESCE(usm.total_wallet_topup, 0) AS total_wallet_topup,
    COALESCE(emap.is_approved, false) AS is_approved,

    CASE
      WHEN NULLIF(BTRIM(u.referrer_code), '') IS NOT NULL THEN true
      ELSE false
    END AS is_referred,

    CASE
      WHEN u.role = 'Client' AND COALESCE(usm.total_wallet_topup, 0) > 0 THEN true
      WHEN u.role = 'Expert' AND COALESCE(emap.is_approved, false) = true THEN true
      ELSE false
    END AS is_converted

  FROM public_users u
  LEFT JOIN user_stats_map usm
    ON usm.public_user_id = u.id
  LEFT JOIN expert_map emap
    ON emap.public_user_id = u.id
),

user_metrics AS (
  SELECT
    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Client'
    )::int AS ref_client,

    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Expert'
    )::int AS ref_expert,

    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Client'
        AND is_converted = true
    )::int AS ref_conv_client,

    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Expert'
        AND is_converted = true
    )::int AS ref_conv_expert,

    COUNT(*) FILTER (
      WHERE is_referred = false
        AND role = 'Client'
        AND is_converted = true
    )::int AS direct_conv_client,

    COUNT(*) FILTER (
      WHERE is_referred = false
        AND role = 'Expert'
        AND is_converted = true
    )::int AS direct_conv_expert,

    CASE
      WHEN COUNT(*) FILTER (WHERE is_referred = true) > 0
      THEN ROUND(
        (
          COUNT(*) FILTER (
            WHERE is_referred = true
              AND is_converted = true
          )::numeric
          /
          NULLIF(COUNT(*) FILTER (WHERE is_referred = true), 0)
        ) * 100
      )
      ELSE 0
    END::int AS ref_conv_percent,

    CASE
      WHEN COUNT(*) FILTER (WHERE is_referred = false) > 0
      THEN ROUND(
        (
          COUNT(*) FILTER (
            WHERE is_referred = false
              AND is_converted = true
          )::numeric
          /
          NULLIF(COUNT(*) FILTER (WHERE is_referred = false), 0)
        ) * 100
      )
      ELSE 0
    END::int AS direct_conv_percent

  FROM base_users
),

referral_transactions AS (
  SELECT
    t.id,
    t.amount,
    t.created_at,
    t.method,
    t.payment_status,
    regexp_replace(t.transaction_id, '^.*_', '') AS txn_suffix,
    u.role
  FROM transactions t
  JOIN (
    SELECT DISTINCT
      transaction_id,
      wallet_id
    FROM transactions_to_wallet_lnk
  ) ttw
    ON ttw.transaction_id = t.id
  JOIN wallet_user_map wum
    ON wum.wallet_id = ttw.wallet_id
  JOIN public_users u
    ON u.id = wum.public_user_id
  WHERE t.method = 'Referral'
    AND t.payment_status = 'success'
),

expend_metrics AS (
  SELECT
    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Client'
        AND txn_suffix = 'referrer'
    ), 0)::float AS exp_ref_client,

    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Expert'
        AND txn_suffix = 'referrer'
    ), 0)::float AS exp_ref_expert,

    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Client'
        AND txn_suffix IN ('reciever', 'receiver')
    ), 0)::float AS exp_rec_client,

    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Expert'
        AND txn_suffix IN ('reciever', 'receiver')
    ), 0)::float AS exp_rec_expert

  FROM referral_transactions
),

referral_graph AS (
  SELECT ARRAY_AGG(cnt ORDER BY month_start) AS ref_graph
  FROM (
    SELECT
      m.month_start,
      COUNT(bu.id)::int AS cnt
    FROM months_range m
    LEFT JOIN base_users bu
      ON date_trunc('month', bu.created_at)::date = m.month_start
     AND bu.is_referred = true
    GROUP BY m.month_start
  ) s
),

expense_graph AS (
  SELECT ARRAY_AGG(amount ORDER BY month_start) AS exp_graph
  FROM (
    SELECT
      m.month_start,
      COALESCE(SUM(rt.amount), 0)::float AS amount
    FROM months_range m
    LEFT JOIN referral_transactions rt
      ON date_trunc('month', rt.created_at)::date = m.month_start
    GROUP BY m.month_start
  ) s
),

meta_metrics AS (
  SELECT ARRAY_AGG(to_char(month_start, 'Mon') ORDER BY month_start) AS months
  FROM months_range
)

SELECT json_build_object(
  'data', json_build_object(
    'referrals', json_build_object(
      'total', um.ref_client + um.ref_expert,
      'client', um.ref_client,
      'expert', um.ref_expert,
      'graph', rg.ref_graph
    ),
    'platform_expends', json_build_object(
      'total',
        em.exp_ref_client
        + em.exp_ref_expert
        + em.exp_rec_client
        + em.exp_rec_expert,
      'referrer', json_build_object(
        'client', em.exp_ref_client,
        'expert', em.exp_ref_expert
      ),
      'reciever', json_build_object(
        'client', em.exp_rec_client,
        'expert', em.exp_rec_expert
      ),
      'graph', eg.exp_graph
    ),
    'referral_conversion', json_build_object(
      'total', um.ref_conv_client + um.ref_conv_expert,
      'client', um.ref_conv_client,
      'expert', um.ref_conv_expert,
      'percentage', um.ref_conv_percent
    ),
    'direct_conversion', json_build_object(
      'total', um.direct_conv_client + um.direct_conv_expert,
      'client', um.direct_conv_client,
      'expert', um.direct_conv_expert,
      'percentage', um.direct_conv_percent
    ),
    'meta', json_build_object(
      'months', mm.months
    )
  )
) AS result
FROM user_metrics um
CROSS JOIN expend_metrics em
CROSS JOIN referral_graph rg
CROSS JOIN expense_graph eg
CROSS JOIN meta_metrics mm;`);

      ctx.body = result.rows[0].result;
    } catch (err) {
      strapi.log.error("Referral Stats SQL JSON Engine Error:", err.message);
      ctx.throw(500, err.message);
    }
  },


  async table_data(ctx) {
    try {
      const { page = 1, pageSize = 10, role = 'all', search = '', sort = 'id:desc' } = ctx.query;
      const start = (Number(page) - 1) * Number(pageSize);
      const limit = Number(pageSize);

      strapi.log.info(`Referral Table Request (EntityService) - Role: ${role}, Search: "${search}", Sort: ${sort}`);

      const filters = {};
      if (role !== 'all') {
        filters.role = { $eqi: role };
      }
      if (search) {
        filters.$or = [
          { name: { $containsi: search } },
          { email: { $containsi: search } },
          { mobile: { $containsi: search } }
        ];
      }

      // Explicit dot-notation for relational sort in entityService
      let sortProp = sort;
      if (typeof sort === 'string' && sort.includes(':')) {
        const [field, order] = sort.split(':');
        const normalizedOrder = (order || 'desc').toLowerCase();
        
        if (field.startsWith('total_')) {
          sortProp = `user_statistic.${field}:${normalizedOrder}`;
        } else {
          sortProp = `${field}:${normalizedOrder}`;
        }
      }

      const rows = await strapi.entityService.findMany('api::public-user.public-user', {
        filters,
        populate: { user_statistic: true, profilePic: true },
        start,
        limit,
        sort: sortProp
      });

      const total = await strapi.entityService.count('api::public-user.public-user', { filters });

      ctx.body = {
        data: rows.map(u => ({
          id: u.id,
          name: u.name || 'Unknown',
          email: u.email || 'N/A',
          mobile: u.mobile || 'N/A',
          avatar: u.profilePic?.url || null,
          role: u.role || 'Client',
          total_referrals: u.user_statistic?.total_referrals || 0,
          total_earnings_from_referrals: u.user_statistic?.total_earnings_from_referrals || 0,
          total_wallet_topup: u.user_statistic?.total_wallet_topup || 0,
        })),
        meta: {
          pagination: { 
            page: Number(page), 
            pageSize: limit, 
            total, 
            pageCount: Math.ceil(total / limit) 
          }
        }
      };
    } catch (err) {
      strapi.log.error("table_data entityService error:", err.message);
      ctx.throw(500, err.message);
    }
  },
});

export default referral;





const a = {
  "data": {
    "referrals": {
      "client": 2, "expert": 1,
      "total": 3, "graph": [0, 2, 0, 0, 0]
    },
    "platform_expends": {
      "referrer": { "client": 0, "expert": 0 },
      "reciever": { "client": 0, "expert": 0 },
      "total": 0, "graph": [0, 0, 0, 0, 0]
    },
    "referral_conversion": {
      "client": 1, "expert": 1,
      "total": 2, "percentage": 67
    },
    "direct_conversion": {
      "client": 0, "expert": 4,
      "total": 4, "percentage": 44
    },
    "meta": { "months": ["Nov", "Dec", "Jan", "Feb", "Mar"] }
  }
}