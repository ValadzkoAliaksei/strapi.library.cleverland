"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService("api::booking.booking", ({ strapi }) => ({
    async deleteOld(ctx) {
        const bookings = await strapi
            .service("api::booking.booking")
            .find(ctx);
        for (let i = 0; i < bookings.results.length; i++) {
            if (Date.parse(bookings.results[i].dateOrder) <
                Date.now() - 86400000) {
                const deleteBooking = await strapi
                    .service("api::booking.booking")
                    .delete(bookings.results[i].id, {});
                console.log(deleteBooking);
            }
        }
        return bookings;
    },
}));
