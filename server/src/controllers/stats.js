'use strict';

const statsController = ({ strapi }) => ({
  /**
   * GET /admin-stats/summary
   * Returns top-level summary metrics.
   */
  async getSummary(ctx) {
    try {
      const data = await strapi.plugin('admin-pannel').service('stats').getSummaryStats();
      ctx.send(data);
    } catch (error) {
      strapi.log.error('Stats Controller (Summary) Error:', error);
      ctx.internalServerError('Failed to fetch summary stats');
    }
  },

  /**
   * GET /admin-stats/graph
   * Returns time-series data based on the interval filter.
   */
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
