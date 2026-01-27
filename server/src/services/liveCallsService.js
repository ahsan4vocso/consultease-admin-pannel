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


      const expertsOnline = await strapi.entityService.findMany("api::expert-profile.expert-profile", { filters: { isActive: true }, fields: ["id"] });


      const init = () => ({
        liveCalls: 0,
        callsToday: 0,
        declinedCalls: 0,
        completedCalls: 0,
        avgDuration: 0,
      });

      const stats = {
        voice: init(),
        video: init(),
        expertsOnline: expertsOnline.length,
      };


      for (const call of calls) {
        const bucket = call.type === "voiceCall" ? stats.voice :
          call.type === "videoCall" ? stats.video :
            null;

        if (!bucket) continue;

        bucket.callsToday++; // 1. Total Calls Today
        if (call.callStatus === "ongoing") bucket.liveCalls++; // 2. Live Calls
        if (call.callStatus === "declined") bucket.declinedCalls++; // 3. Declined Calls
        if (call.callStatus === "completed") bucket.completedCalls++; // 4. Completed Calls
        bucket.avgDuration += Number(call.duration) || 0; // 5. SUM duration
      }





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