"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::category.category", ({ strapi }) => ({
    async find(ctx) {
        const { data } = await super.find(ctx);
        const categories = data.map(({ attributes: { name, path }, id }) => ({
            name,
            path,
            id,
        }));
        return categories;
    },
}));
