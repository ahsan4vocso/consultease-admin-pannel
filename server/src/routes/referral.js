export default {

    type: 'admin',
    routes: [
        {
            method: "GET",
            path: "/referral-stats",
            handler: "referral.stats",
            config: { policies: [] },
        },
        {
            method: "GET",
            path: "/referral-table-data",
            handler: "referral.table_data",
            config: { policies: [] },
        },
    ],
};
