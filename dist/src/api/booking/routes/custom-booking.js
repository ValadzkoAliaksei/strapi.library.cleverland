"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "DELETE",
            path: "/bookings/delete/old",
            handler: "booking.deleteOld",
            config: {
                auth: false,
            },
        },
    ],
};
