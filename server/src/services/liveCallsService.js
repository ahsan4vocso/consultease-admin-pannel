const liveCallsService = ({ strapi }) => ({
  async callsData(res) {
    try {
      const date = new Date();
      const today = date.setHours(0, 0, 0, 0);

      const calls = await strapi.entityService.findMany("api::call.call", {
        filters: { createdAt: { $gte: today } },
        populate: { caller: true, receiver: true, categories: true },
        sort: { createdAt: 'desc' },
      });

      const reviews = await strapi.entityService.findMany("api::review.review", { fields: ["rating"] });
      const experts = await strapi.entityService.findMany("api::expert-profile.expert-profile");

      const stats = {
        liveCalls: calls.filter((call) => call.callStatus === "ongoing").length,
        voiceCalls: calls.filter((call) => call.type === "voiceCall").length,
        videoCalls: calls.filter((call) => call.type === "videoCall").length,
        expertsOnline: experts.filter((expert) => expert.isActive).length,
        totalExperts: experts.length,
        callsToday: calls.length,
        declinedCalls: calls.filter((call) => call.callStatus === "declined").length,
        completedCalls: calls.filter((call) => call.callStatus === "completed").length,
        avgDuration: calls.reduce((total, call) => total + call.duration, 0),
        avgCallRevenue: Math.round(calls.reduce((total, call) => total + call.totalCost, 0)),
        avgRating: (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length)?.toFixed(1),
      };

      // ----------------------------------------------------------
      // Live calls Table [1,2]
      // ----------------------------------------------------------

      const liveCalls = calls.filter((call) => /ongoing|pending/i.test(call.callStatus)).slice(0, 8).map((call) => {
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