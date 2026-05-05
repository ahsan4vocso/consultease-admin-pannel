export default {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/maintenance/cancel-stale-transactions',
      handler: 'maintenance.cancelStaleTransactions',
      config: { policies: [] },
    },
  ],
};
