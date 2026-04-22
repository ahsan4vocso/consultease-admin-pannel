export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/stats/summary',
      handler: 'stats.getSummary',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/stats/graph',
      handler: 'stats.getGraph',
      config: { policies: [] },
    },
  ],
};
