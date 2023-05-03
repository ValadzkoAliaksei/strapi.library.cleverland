"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    deleteOldBooking: {
        task: async ({ strapi }) => {
            await strapi.service("api::booking.booking").deleteOld();
        },
        options: {
            rule: "1 0 0 * * *",
        },
    },
};
