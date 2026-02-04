'use strict';

export default {
    'admin-pannel': {
        type: 'admin',
        routes: [
            {
                method: "GET",
                path: "/stream",
                handler: "dashboard.stream",
                config: { policies: [], auth: false },
            },
            {
                method: "GET",
                path: "/category-stats",
                handler: "dashboard.categoryStats",
                config: { policies: [] },
            },
            {
                method: "GET",
                path: "/recent-calls",
                handler: "dashboard.recentCalls",
                config: { policies: [], auth: false },
            },
            {
                method: "GET",
                path: "/stats",
                handler: "dashboard.getStats",
                config: { policies: [], auth: false },
            },
            {
                method: 'POST',
                path: '/callend',
                handler: 'dashboard.Callend',
                config: { policies: [] },
            },
        ],
    },
};