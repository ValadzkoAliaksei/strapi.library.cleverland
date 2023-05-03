"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const date_utils_1 = require("../../../utils/date-utils");
exports.default = strapi_1.factories.createCoreController("api::delivery.delivery", ({ strapi }) => ({
    async create(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        if (!ctx.request.body) {
            return ctx.badRequest("Ошибка выдачи книги. Не передано тело запроса", {
                body: ctx.request.body,
            });
        }
        if (!ctx.request.body.data) {
            return ctx.badRequest("Ошибка выдачи книги. Не переданы данные запроса", {
                data: ctx.request.body.data,
            });
        }
        if (ctx.request.body.data.handed !== true) {
            return ctx.badRequest("Ошибка выдачи книги. Не правильный параметр handed", {
                handed: (_b = (_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.handed,
            });
        }
        if (!ctx.request.body.data.book) {
            return ctx.badRequest("Ошибка выдачи книги. Не передан параметр book", {
                book: ctx.request.body.data.book,
            });
        }
        const book = await strapi
            .service("api::book.book")
            .findOne(ctx.request.body.data.book, {
            ...ctx.query,
            populate: "deep,3",
        });
        if (!book) {
            return ctx.badRequest("Ошибка выдачи книги. Книга не найдена по данному id", {
                book: ctx.request.body.data.book,
            });
        }
        if (book.delivery) {
            return ctx.badRequest("Ошибка выдачи книги. Данная книга уже выдана", {
                book: ctx.request.body.data.book,
                delivery: book.delivery,
            });
        }
        if (!ctx.request.body.data.recipient) {
            return ctx.badRequest("Ошибка выдачи книги. Не передан параметр recipient", {
                recipient: (_d = (_c = ctx.request.body) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.recipient,
            });
        }
        const recipient = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.request.body.data.recipient, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!recipient) {
            return ctx.badRequest("Ошибка выдачи книги. Пользователь не найден по данному id", {
                recipient: ctx.request.body.data.recipient,
            });
        }
        if (!book.booking) {
            return ctx.badRequest("Ошибка выдачи книги. Книга не забронирована", {
                book,
            });
        }
        if (((_e = book.booking.customer) === null || _e === void 0 ? void 0 : _e.id) != ctx.request.body.data.recipient) {
            return ctx.badRequest("Ошибка выдачи книги. Книга забронирована другим пользователем", {
                recipient: ctx.request.body.data.recipient,
                customer: book.booking.customer,
            });
        }
        if (!ctx.request.body.data.dateHandedTo) {
            return ctx.badRequest("Ошибка выдачи книги. Не передан параметр dateHandedTo", {
                dateHandedTo: (_g = (_f = ctx.request.body) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.dateHandedTo,
            });
        }
        if ((0, date_utils_1.isDateValidate)(new Date(ctx.request.body.data.dateHandedTo))) {
            return ctx.badRequest("Ошибка выдачи книги. Параметр dateHandedTo не является датой", {
                dateHandedTo: (_j = (_h = ctx.request.body) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.dateHandedTo,
            });
        }
        if ((0, date_utils_1.isDateHoliday)(new Date(ctx.request.body.data.dateHandedTo))) {
            return ctx.badRequest("Ошибка бронирования. Параметр dateHandedTo не может быть выходным днём", {
                dateHandedTo: (_l = (_k = ctx.request.body) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.dateHandedTo,
            });
        }
        if (!(0, date_utils_1.isDateEqual)(new Date(ctx.request.body.data.dateHandedTo), new Date(new Date().setDate(new Date().getDate() + 14)))) {
            return ctx.badRequest("Ошибка бронирования. Параметр dateHandedTo должен быть больше сегодняшней даты ровно на 14дней, кроме выходных", {
                dateHandedTo: (_o = (_m = ctx.request.body) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.dateHandedTo,
            });
        }
        if (!ctx.request.body.data.dateHandedFrom) {
            return ctx.badRequest("Ошибка выдачи книги. Не передан параметр dateHandedFrom", {
                dateHandedFrom: (_q = (_p = ctx.request.body) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.dateHandedFrom,
            });
        }
        if ((0, date_utils_1.isDateValidate)(new Date(ctx.request.body.data.dateHandedFrom))) {
            return ctx.badRequest("Ошибка выдачи книги. Параметр dateHandedFrom не является датой", {
                dateHandedFrom: (_s = (_r = ctx.request.body) === null || _r === void 0 ? void 0 : _r.data) === null || _s === void 0 ? void 0 : _s.dateHandedFrom,
            });
        }
        if ((0, date_utils_1.isDateHoliday)(new Date(ctx.request.body.data.dateHandedFrom))) {
            return ctx.badRequest("Ошибка выдачи книги. Параметр dateHandedFrom не может быть выходным днём", {
                dateHandedFrom: (_u = (_t = ctx.request.body) === null || _t === void 0 ? void 0 : _t.data) === null || _u === void 0 ? void 0 : _u.dateHandedFrom,
            });
        }
        if (!(0, date_utils_1.isDateEqual)(new Date(ctx.request.body.data.dateHandedFrom), new Date())) {
            return ctx.badRequest("Ошибка выдачи книги. Параметр dateHandedFrom должен быть равен сегодняшнему дню", {
                dateOrder: (_w = (_v = ctx.request.body) === null || _v === void 0 ? void 0 : _v.data) === null || _w === void 0 ? void 0 : _w.dateHandedFrom,
            });
        }
        if ((0, date_utils_1.isDateAfter)(new Date(ctx.request.body.data.dateHandedFrom), new Date(new Date().setDate(new Date(book.booking.dateOrder).getDate() + 1)))) {
            return ctx.badRequest("Ошибка выдачи книги. Параметр dateHandedFrom не может быть больше даты бронирования чем на 1 день", {
                dateHandedFrom: (_y = (_x = ctx.request.body) === null || _x === void 0 ? void 0 : _x.data) === null || _y === void 0 ? void 0 : _y.dateHandedFrom,
                dateOrder: book.booking.dateOrder,
            });
        }
        if (recipient.delivery) {
            await strapi
                .service("api::delivery.delivery")
                .delete(recipient.delivery.id, ctx.query);
            console.log(`У пользователя есть другая выдача id=${recipient.delivery.id} и она была удалена`);
        }
        await strapi
            .service("api::booking.booking")
            .delete(book.booking.id, ctx.query);
        console.log(`У книги есть бронироование id=${book.booking.id} и оно было удалено`);
        const { data } = await super.create(ctx);
        return data;
    },
    async continue(ctx) {
        const delivery = await strapi
            .service("api::delivery.delivery")
            .findOne(ctx.params.id, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!delivery) {
            return ctx.badRequest("Ошибка продления выдачи книги. Выдача не найдена по данному id", {
                id: ctx.params.id,
            });
        }
        const tzOffset = new Date().getTimezoneOffset() * 60000;
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const defaultDateWithOffset = startOfToday.getTime() - tzOffset;
        ctx.request.body.data = {
            dateHandedTo: new Date(defaultDateWithOffset + 14 * 24 * 60 * 60000),
        }; // продлеваем выдачу от сегодня на 14 дней
        const { data } = await super.update(ctx);
        return data;
    },
    async delete(ctx) {
        const delivery = await strapi
            .service("api::delivery.delivery")
            .findOne(ctx.params.id, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!delivery) {
            return ctx.badRequest("Ошибка удаления выдачи. Выдача не найдено по данному id", {
                id: ctx.params.id,
            });
        }
        const { data } = await super.delete(ctx);
        return data;
    },
}));
