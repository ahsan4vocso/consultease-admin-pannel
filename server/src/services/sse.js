'use strict';

const sseService = ({ strapi }) => {
    const clients = new Set();

    return {
        addClient(res) {
            clients.add(res);
        },

        removeClient(res) {
            clients.delete(res);
        },

        broadcast(data) {
            for (const client of clients) {
                if (client.destroyed || client.writableEnded) {
                    clients.delete(client);
                    continue;
                }
                client.write(`data: ${JSON.stringify(data)}\n\n`);
            }
        },
    };
};

export default sseService;
