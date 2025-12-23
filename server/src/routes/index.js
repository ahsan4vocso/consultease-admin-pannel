// src/plugins/admin-pannel/server/src/routes/index.js
'use strict';

export default {
    'admin-pannel': {
        type: 'admin',
        routes: [
            {
                method: "GET",
                path: "/category-stats",
                handler: "dashboard.categoryStats",
                config: {
                    policies: [],
                    // auth: false,
                },
            },
            {
                method: "GET",
                path: "/recent-calls",
                handler: "dashboard.recentCalls",
                config: {
                    policies: [],
                    // auth: false,
                },
            },
            {
                method: 'POST',
                path: '/callend',
                handler: 'dashboard.Callend',
                config: {
                    policies: [],
                    // auth: false,
                },
            },
        ],
    },
};