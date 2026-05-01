'use strict';

const statsController = ({ strapi }) => ({
  async getSummary(ctx) {
    try {
      const { filters = {} } = ctx.query;
      const data = await strapi.plugin('admin-pannel').service('stats').getSummaryStats(filters);
      ctx.send(data);
    } catch (error) {
      strapi.log.error('Stats Controller (Summary) Error:', error);
      ctx.internalServerError('Failed to fetch summary stats');
    }
  },

  async getGraph(ctx) {
    try {
      const { filter = 'day wise' } = ctx.query;
      const data = await strapi.plugin('admin-pannel').service('stats').getGraphStats(filter);
      ctx.send(data);
    } catch (error) {
      strapi.log.error('Stats Controller (Graph) Error:', error);
      ctx.internalServerError('Failed to fetch graph stats');
    }
  }
});

export default statsController;
