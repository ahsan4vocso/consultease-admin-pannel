const dashboardService = ({ strapi }) => ({
    // ---------------------------------------------------------------------
    //  1. recent calls
    // ---------------------------------------------------------------------
    async getRecentCalls({ filters = {}, pagination = {} }) {
        try {
            const knex = strapi.db.connection;

            let page = Math.max(1, Number(pagination.page) || 1);
            let pageSize = Math.min(50, Math.max(1, Number(pagination.pageSize) || 20));
            const offset = (page - 1) * pageSize;

            let startTimeGte = filters.createdAt?.$gte;
            let startTimeLte = filters.createdAt?.$lte;
            console.log("🔵 [getRecentCalls] Filters:", JSON.stringify(filters, null, 2));


            // Default to today if no filter
            if (!startTimeGte && !startTimeLte) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                startTimeGte = today.toISOString();
            }

            const statusFilter = filters.callStatus;

            const rows = await knex("calls as c")
                .leftJoin("calls_caller_lnk as c_lnk", "c.id", "c_lnk.call_id")
                .leftJoin("public_users as u_caller", "c_lnk.public_user_id", "u_caller.id")
                .leftJoin("calls_receiver_lnk as r_lnk", "c.id", "r_lnk.call_id")
                .leftJoin("public_users as u_receiver", "r_lnk.public_user_id", "u_receiver.id")
                .leftJoin("calls_categories_lnk as cat_lnk", "c.id", "cat_lnk.call_id")
                .leftJoin("categories as cat", "cat_lnk.category_id", "cat.id")
                .leftJoin("calls_review_lnk as rev_lnk", "c.id", "rev_lnk.call_id")
                .leftJoin("reviews as rev", "rev_lnk.review_id", "rev.id")
                .where((qb) => {
                    qb.whereNotIn("c.call_status", ["pending", "ongoing"]);
                    if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
                    if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
                    if (statusFilter) {
                        if (typeof statusFilter === 'string') qb.where("c.call_status", statusFilter);
                        else if (statusFilter.$eq) qb.where("c.call_status", statusFilter.$eq);
                        else if (statusFilter.$in) qb.whereIn("c.call_status", statusFilter.$in);
                    }
                })
                .select({
                    id: "c.id",
                    type: "c.type",
                    documentId: "c.document_id",
                    time: "c.start_time",
                    duration: "c.duration",
                    caller: "u_caller.name",
                    expert: "u_receiver.name",
                    category: "cat.name",
                    rating: knex.raw("COALESCE(rev.rating, 0)"),
                    revenue: knex.raw("COALESCE(c.total_cost, 0)"),
                    status: "c.call_status",
                    total_count: knex.raw("count(*) over()"),
                })
                .orderBy("c.created_at", "desc")
                .offset(offset).limit(pageSize);

            const total = rows.length > 0 ? parseInt(rows[0].total_count) : 0;

            return {
                data: rows || [],
                meta: {
                    pagination: {
                        page,
                        pageSize,
                        pageCount: Math.ceil(total / pageSize),
                        total,
                    },
                },
            };
        } catch (error) {
            strapi.log.error("🔵 [DashboardService] getRecentCalls error:", error);
            return { data: [], meta: { pagination: { total: 0, pageCount: 0 } } };
        }
    },

    // ---------------------------------------------------------------------
    //  2. category stats
    // ---------------------------------------------------------------------
    async getCategoryStats({ filters = {} }) {
        try {
            const knex = strapi.db.connection;

            let startTimeGte = filters.startTime?.$gte || filters.createdAt?.$gte;
            let startTimeLte = filters.startTime?.$lte || filters.createdAt?.$lte;
            console.log("🔵 [getCategoryStats] Filters:", JSON.stringify(filters, null, 2));


            // Default to today if no filter
            if (!startTimeGte && !startTimeLte) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                startTimeGte = today.toISOString();
            }

            const rows = await knex("calls as c")
                .leftJoin("calls_categories_lnk as ccl", "c.id", "ccl.call_id")
                .leftJoin("categories as cat", "ccl.category_id", "cat.id")
                .leftJoin("calls_review_lnk as crl", "c.id", "crl.call_id")
                .leftJoin("reviews as rev", "crl.review_id", "rev.id")
                .select(knex.raw(`COALESCE(TRIM(cat.name), 'Others') as "name"`))
                .select(knex.raw(`SUM(CASE WHEN c.type = 'videoCall' THEN 1 ELSE 0 END) as "videoCalls"`))
                .select(knex.raw(`SUM(CASE WHEN c.type <> 'videoCall' THEN 1 ELSE 0 END) as "calls"`))
                .select(knex.raw(`SUM(COALESCE(c.duration, 0)) as "minutes"`))
                .select(knex.raw(`ROUND(AVG(CASE WHEN rev.rating IS NOT NULL THEN rev.rating ELSE 0 END), 1) as "avgRating"`))
                .where((qb) => {
                    qb.whereNotIn("c.call_status", ["pending", "ongoing"]);
                    if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
                    if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
                })
                .groupByRaw(`COALESCE(TRIM(cat.name), 'Others')`)
                .orderByRaw(`COUNT(*) DESC`);

            return rows || [];
        } catch (error) {
            strapi.log.error("🔵 [DashboardService] getCategoryStats error:", error);
            return [];
        }
    },

    // ---------------------------------------------------------------------
    //  3. stats
    // ---------------------------------------------------------------------
    async getDashboardStats({ filters = {} }) {
        try {
            const knex = strapi.db.connection;
            let startTimeGte = filters.createdAt?.$gte;
            let startTimeLte = filters.createdAt?.$lte;


            // Default to today if no filter
            if (!startTimeGte && !startTimeLte) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                startTimeGte = today.toISOString();
            }

            if (!startTimeGte) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                startTimeGte = today.toISOString();
            }

            const rows = await knex("calls as c")
                .select("c.type")
                .select(knex.raw('COUNT(*)::int AS "callsToday"'))
                .select(knex.raw("COUNT(*) FILTER (WHERE c.call_status IN ('ongoing', 'pending'))::int AS \"liveCalls\""))
                .select(knex.raw("COUNT(*) FILTER (WHERE c.call_status = 'completed')::int AS \"completedCalls\""))
                .select(knex.raw("COUNT(*) FILTER (WHERE c.call_status = 'declined')::int AS \"declinedCalls\""))
                .select(knex.raw("COUNT(*) FILTER (WHERE c.call_status = 'missed')::int AS \"missedCalls\""))
                .select(knex.raw('COALESCE(SUM(c.duration) FILTER (WHERE c.call_status = \'completed\'), 0)::int AS "avgDuration"'))
                .select(knex.raw('(SELECT COUNT(*) FROM expert_profiles ep WHERE ep.is_active = true)::int AS "expertsOnline"'))
                .where((qb) => {
                    if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
                    if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
                })
                .groupBy("c.type")
                .orderBy("c.type");
            const voice = rows.find(r => r.type === 'voiceCall') || {};
            const video = rows.find(r => r.type === 'videoCall') || {};
            const expertsOnline = rows[0]?.expertsOnline || 0;

            const stats = { voice, video, expertsOnline };
            strapi.log.info(`🔵 [DashboardStats] Today: Voice(${voice.callsToday || 0}), Video(${video.callsToday || 0}), Total(${(voice.callsToday || 0) + (video.callsToday || 0)})`);

            return stats;
        } catch (error) {
            strapi.log.error("🔵 [DashboardService] getDashboardStats error:", error);
            return {
                voice: { liveCalls: 0, callsToday: 0, declinedCalls: 0, completedCalls: 0, avgDuration: 0 },
                video: { liveCalls: 0, callsToday: 0, declinedCalls: 0, completedCalls: 0, avgDuration: 0 },
                expertsOnline: 0
            };
        }
    },


    // ---------------------------------------------------------------------
    //  4. live calls
    // ---------------------------------------------------------------------
    async getLiveCalls() {
        try {
            const liveCallsRaw = await strapi.entityService.findMany("api::call.call", {
                filters: { callStatus: { $in: ["ongoing", "pending"] } },
                populate: { caller: true, receiver: true, categories: true },
                sort: { createdAt: 'desc' },
            });

            return (liveCallsRaw || []).map((call) => ({
                id: call.id,
                documentId: call.documentId,
                caller: call.caller?.name,
                expert: call.receiver?.name,
                type: call.type,
                startTime: call.startTime,
                status: call.callStatus,
                duration: call.duration,
                category: call.categories?.[0]?.name
            }));
        } catch (error) {
            strapi.log.error("🔵 [DashboardService] getLiveCalls error:", error);
            return [];
        }
    },


    // ---------------------------------------------------------------------
    //  BROADCAST
    // ---------------------------------------------------------------------
    async broadcast() {
        try {
            // 1. Get Live Stats (Today)
            const stats = await this.getDashboardStats({});

            // 2. Get Recent Calls (Today)
            const recentCallsResult = await this.getRecentCalls({ pagination: { pageSize: 20 } });
            const recentCalls = recentCallsResult.data || [];

            // 3. Get Category Stats (Today)
            const categoryStats = await this.getCategoryStats({});

            // 4. Get Live Calls Table Data
            const liveCalls = await this.getLiveCalls();

            // Broadcast in chunks for better performance and incremental UI updates
            const sse = strapi.plugin('admin-pannel').service('sse');
            sse.broadcast({ stats });
            sse.broadcast({ liveCalls });
            sse.broadcast({ recentCalls });
            sse.broadcast({ categoryStats });

            strapi.log.info("📡 [DashboardService] Broadcasted dashboard update.");

        } catch (error) {
            strapi.log.error("📡 [DashboardService] Broadcast error:", error);
        }
    }
});

export default dashboardService;
