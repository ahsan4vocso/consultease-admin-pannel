const liveCallsService = ({ strapi }) => ({
  async callsData(res) {
    try {

      const stats = await strapi.plugin('admin-pannel').service('dashboard').getDashboardStats({
        filters: { createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } }
      });



      const calls = await strapi.entityService.findMany("api::call.call", {
        filters: { $or: [{ callStatus: "ongoing" }, { callStatus: "pending" }] },
        populate: { caller: true, receiver: true, categories: true },
        sort: { createdAt: 'desc' },
      });

      const liveCalls = calls.map((call) => {
        return {
          id: call.id,
          documentId: call.documentId,
          caller: call.caller?.name,
          expert: call.receiver?.name,
          type: call.type,
          startTime: call.startTime,
          status: call.callStatus,
          duration: call.duration,
          category: call.categories?.[0]?.name
        }
      });

      if (res) {
        res.write(`data: ${JSON.stringify({ stats, liveCalls })}\n\n`);
        strapi.plugin('admin-pannel').service('sse').addClient(res);
      }

      else {
        strapi.plugin('admin-pannel').service('sse').broadcast({ stats, liveCalls });
      }

    } catch (error) {
      strapi.log.error("dashboardData error", error);
      return { error: error || "dashboardData failed" };
    }
  },
});

export default liveCallsService;