"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::category.category", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, populate: "deep,2" };
        const { data } = await super.find(ctx);
        const categories = data.map(({ attributes: { name, path, books }, id }) => ({
            name,
            path,
            id,
            booksCount: books.data.length || 0,
        }));
        return categories;
    },
}));
