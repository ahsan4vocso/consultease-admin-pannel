/**
 * Maintenance controller for database and system operations
 */

const maintenanceController = ({ strapi }) => ({
  /**
   * Triggers the cancellation of stale pending transactions
   */
  async cancelStaleTransactions(ctx) {
    try {
      strapi.log.info('Admin triggered: cancelStaleTransactions');
      
      const summary = await strapi
        .service('api::transaction.transaction')
        .cancelStalePendingTransactions();

      ctx.body = {
        message: 'Successfully processed stale transactions.',
        summary,
      };
    } catch (error) {
      strapi.log.error('Maintenance Controller Error (Cancel Stale Transactions):', error);
      ctx.throw(500, error.message);
    }
  },

  // Future maintenance tasks can be added here
});

export default maintenanceController;
