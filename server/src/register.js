const register = ({ strapi }) => {
  strapi.documents.use(async (context, next) => {
    const result = await next();

    if ((context.uid === 'api::call.call' || context.uid === 'api::expert-profile.expert-profile') && (context.action === 'create' || context.action === 'update')) {
      try {
        // Broadcast dashboard updates
        await strapi.plugin('admin-pannel').service("dashboard").broadcast();
      } catch (error) {
        strapi.log.error("Error in liveCallsService middleware:", error);
      }
    }

    return result;
  });
};

export default register;