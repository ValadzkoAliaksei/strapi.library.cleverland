"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const get_raiting_1 = require("../../../utils/get-raiting");
exports.default = strapi_1.factories.createCoreController("api::book.book", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, populate: "deep,3" };
        const { data } = await super.find(ctx);
        const books = data.map(({ attributes: { issueYear, title, authors, images, categories, booking, delivery, histories, comments, }, id, }) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
            return ({
                issueYear,
                rating: (0, get_raiting_1.getRating)(comments),
                title,
                authors,
                image: ((_a = images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                    url: attributes.url,
                }))[0]) || null,
                categories: ((_b = categories.data) === null || _b === void 0 ? void 0 : _b.length)
                    ? categories.data.map(({ attributes }) => attributes.name)
                    : null,
                id,
                booking: (booking === null || booking === void 0 ? void 0 : booking.data)
                    ? {
                        id: ((_c = booking.data) === null || _c === void 0 ? void 0 : _c.id) || null,
                        order: ((_d = booking.data) === null || _d === void 0 ? void 0 : _d.attributes.order) || false,
                        dateOrder: ((_e = booking.data) === null || _e === void 0 ? void 0 : _e.attributes.dateOrder) || null,
                        customerId: ((_g = (_f = booking.data) === null || _f === void 0 ? void 0 : _f.attributes.customer.data) === null || _g === void 0 ? void 0 : _g.id) || null,
                        customerFirstName: ((_j = (_h = booking.data) === null || _h === void 0 ? void 0 : _h.attributes.customer.data) === null || _j === void 0 ? void 0 : _j.attributes.firstName) || null,
                        customerLastName: ((_l = (_k = booking.data) === null || _k === void 0 ? void 0 : _k.attributes.customer.data) === null || _l === void 0 ? void 0 : _l.attributes.lastName) || null,
                    }
                    : null,
                delivery: (delivery === null || delivery === void 0 ? void 0 : delivery.data)
                    ? {
                        id: ((_m = delivery.data) === null || _m === void 0 ? void 0 : _m.id) || null,
                        handed: ((_o = delivery.data) === null || _o === void 0 ? void 0 : _o.attributes.handed) || false,
                        dateHandedFrom: ((_p = delivery.data) === null || _p === void 0 ? void 0 : _p.attributes.dateHandedFrom) || null,
                        dateHandedTo: ((_q = delivery.data) === null || _q === void 0 ? void 0 : _q.attributes.dateHandedTo) || null,
                        recipientId: ((_t = (_s = (_r = delivery.data) === null || _r === void 0 ? void 0 : _r.attributes.recipient) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.id) || null,
                        recipientFirstName: ((_w = (_v = (_u = delivery.data) === null || _u === void 0 ? void 0 : _u.attributes.recipient) === null || _v === void 0 ? void 0 : _v.data) === null || _w === void 0 ? void 0 : _w.attributes.firstName) || null,
                        recipientLastName: ((_z = (_y = (_x = delivery.data) === null || _x === void 0 ? void 0 : _x.attributes.recipient) === null || _y === void 0 ? void 0 : _y.data) === null || _z === void 0 ? void 0 : _z.attributes.lastName) || null,
                    }
                    : null,
                histories: ((_0 = histories === null || histories === void 0 ? void 0 : histories.data) === null || _0 === void 0 ? void 0 : _0.length)
                    ? (_1 = histories.data) === null || _1 === void 0 ? void 0 : _1.map(({ id, attributes }) => {
                        var _a;
                        return ({
                            id: id || null,
                            userId: ((_a = attributes.user.data) === null || _a === void 0 ? void 0 : _a.id) || null,
                        });
                    })
                    : null,
            });
        }) || [];
        return books;
    },
    async findOne(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        ctx.query = { ...ctx.query, populate: "deep,4" };
        const response = await super.findOne(ctx);
        if (!response) {
            return ctx.badRequest("Книга не найдена по данному id", {
                id: ctx.params.id,
            });
        }
        const { data: { id, attributes: { title, issueYear, description, publish, pages, cover, weight, format, ISBN, producer, authors, images, categories, comments, booking, delivery, histories, }, }, } = response;
        const book = {
            id,
            title,
            rating: (0, get_raiting_1.getRating)(comments),
            issueYear,
            description,
            publish,
            pages,
            cover,
            weight,
            format,
            ISBN,
            producer,
            authors,
            images: ((_a = images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                url: attributes.url,
            }))) || null,
            categories: (categories === null || categories === void 0 ? void 0 : categories.data.length)
                ? categories.data.map(({ attributes }) => attributes.name)
                : null,
            comments: (comments === null || comments === void 0 ? void 0 : comments.data.length)
                ? (_b = comments.data) === null || _b === void 0 ? void 0 : _b.map(({ id, attributes: { rating, text, createdAt, user } }) => {
                    var _a;
                    return ({
                        id,
                        rating,
                        text,
                        createdAt,
                        user: {
                            commentUserId: user.data.id,
                            firstName: user.data.attributes.firstName,
                            lastName: user.data.attributes.lastName,
                            avatarUrl: ((_a = user.data.attributes.avatar.data) === null || _a === void 0 ? void 0 : _a.url) || null,
                        },
                    });
                })
                : null,
            booking: (booking === null || booking === void 0 ? void 0 : booking.data)
                ? {
                    id: ((_c = booking.data) === null || _c === void 0 ? void 0 : _c.id) || null,
                    order: ((_d = booking.data) === null || _d === void 0 ? void 0 : _d.attributes.order) || false,
                    dateOrder: ((_e = booking.data) === null || _e === void 0 ? void 0 : _e.attributes.dateOrder) || null,
                    customerId: ((_g = (_f = booking.data) === null || _f === void 0 ? void 0 : _f.attributes.customer.data) === null || _g === void 0 ? void 0 : _g.id) || null,
                    customerFirstName: ((_j = (_h = booking.data) === null || _h === void 0 ? void 0 : _h.attributes.customer.data) === null || _j === void 0 ? void 0 : _j.attributes.firstName) ||
                        null,
                    customerLastName: ((_l = (_k = booking.data) === null || _k === void 0 ? void 0 : _k.attributes.customer.data) === null || _l === void 0 ? void 0 : _l.attributes.lastName) ||
                        null,
                }
                : null,
            delivery: (delivery === null || delivery === void 0 ? void 0 : delivery.data)
                ? {
                    id: ((_m = delivery.data) === null || _m === void 0 ? void 0 : _m.id) || null,
                    handed: ((_o = delivery.data) === null || _o === void 0 ? void 0 : _o.attributes.handed) || false,
                    dateHandedFrom: ((_p = delivery.data) === null || _p === void 0 ? void 0 : _p.attributes.dateHandedFrom) || null,
                    dateHandedTo: ((_q = delivery.data) === null || _q === void 0 ? void 0 : _q.attributes.dateHandedTo) || null,
                    recipientId: ((_t = (_s = (_r = delivery.data) === null || _r === void 0 ? void 0 : _r.attributes.recipient) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.id) || null,
                    recipientFirstName: ((_w = (_v = (_u = delivery.data) === null || _u === void 0 ? void 0 : _u.attributes.recipient) === null || _v === void 0 ? void 0 : _v.data) === null || _w === void 0 ? void 0 : _w.attributes.firstName) || null,
                    recipientLastName: ((_z = (_y = (_x = delivery.data) === null || _x === void 0 ? void 0 : _x.attributes.recipient) === null || _y === void 0 ? void 0 : _y.data) === null || _z === void 0 ? void 0 : _z.attributes.lastName) || null,
                }
                : null,
            histories: ((_0 = histories === null || histories === void 0 ? void 0 : histories.data) === null || _0 === void 0 ? void 0 : _0.length)
                ? (_1 = histories.data) === null || _1 === void 0 ? void 0 : _1.map(({ id, attributes }) => {
                    var _a;
                    return ({
                        id: id || null,
                        userId: ((_a = attributes.user.data) === null || _a === void 0 ? void 0 : _a.id) || null,
                    });
                })
                : null,
        };
        return book;
    },
}));
