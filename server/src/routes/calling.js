export default {
    type: 'admin',
    routes: [
        {
            method: "GET",
            path: "/stream",
            handler: "calling.stream",
            config: { policies: [], auth: false },
        },
        {
            method: "GET",
            path: "/category-stats",
            handler: "calling.categoryStats",
            config: { policies: [] },
        },
        {
            method: "GET",
            path: "/recent-calls",
            handler: "calling.recentCalls",
            config: { policies: [], auth: false },
        },
        {
            method: "GET",
            path: "/stats",
            handler: "calling.getStats",
            config: { policies: [], auth: false },
        },
        {
            method: 'POST',
            path: '/callend',
            handler: 'calling.Callend',
            config: { policies: [] },
        },
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
