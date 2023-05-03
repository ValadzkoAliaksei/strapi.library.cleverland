"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const utils_1 = require("@strapi/utils");
const date_utils_1 = require("../../../utils/date-utils");
const { contentAPI } = utils_1.sanitize;
exports.default = strapi_1.factories.createCoreController("api::booking.booking", ({ strapi }) => ({
    async create(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (!ctx.request.body) {
            return ctx.badRequest("Ошибка бронирования. Не передано тело запроса", {
                body: ctx.request.body,
            });
        }
        if (!ctx.request.body.data) {
            return ctx.badRequest("Ошибка бронирования. Не переданы данные запроса", {
                data: ctx.request.body.data,
            });
        }
        if (ctx.request.body.data.order !== true) {
            return ctx.badRequest("Ошибка бронирования. Не правильный параметр order", {
                order: (_b = (_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.order,
            });
        }
        if (!ctx.request.body.data.book) {
            return ctx.badRequest("Ошибка бронирования. Не передан параметр book", {
                book: ctx.request.body.data.book,
            });
        }
        const book = await strapi
            .service("api::book.book")
            .findOne(ctx.request.body.data.book, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!book) {
            return ctx.badRequest("Ошибка бронирования. Книга не найдена по данному id", {
                book: ctx.request.body.data.book,
            });
        }
        if (book.booking) {
            return ctx.badRequest("Ошибка бронирования. У данной книги уже есть бронирование", {
                book: ctx.request.body.data.book,
                booking: book.booking,
            });
        }
        if (book.delivery) {
            return ctx.badRequest("Ошибка бронирования. Данная книга выдана и не может быть забронирована", {
                book: ctx.request.body.data.book,
                delivery: book.delivery,
            });
        }
        if (!ctx.request.body.data.customer) {
            return ctx.badRequest("Ошибка бронирования. Не передан параметр customer", {
                customer: (_d = (_c = ctx.request.body) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.customer,
            });
        }
        const customer = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.request.body.data.customer, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!customer) {
            return ctx.badRequest("Ошибка бронирования. Пользователь не найден по данному id", {
                customer: ctx.request.body.data.customer,
            });
        }
        if (ctx.request.body.data.customer != ((_e = ctx.state.user) === null || _e === void 0 ? void 0 : _e.id)) {
            return ctx.badRequest("Ошибка бронирования. Нет прав бронирования не своего пользователя", {
                customer: ctx.request.body.data.customer,
                userId: (_f = ctx.state.user) === null || _f === void 0 ? void 0 : _f.id,
            });
        }
        if (customer.booking) {
            await strapi
                .service("api::booking.booking")
                .delete(customer.booking.id, ctx.query);
            console.log(`У пользователя есть бронироование id=${customer.booking.id} и оно было удалено`);
        }
        if (!ctx.request.body.data.dateOrder) {
            return ctx.badRequest("Ошибка бронирования. Не передан параметр dateOrder", {
                dateOrder: (_h = (_g = ctx.request.body) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateValidate)(new Date(ctx.request.body.data.dateOrder))) {
            return ctx.badRequest("Ошибка бронирования. Параметр dateOrder не является датой", {
                dateOrder: (_k = (_j = ctx.request.body) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateBefore)(new Date(ctx.request.body.data.dateOrder), new Date())) {
            return ctx.badRequest("Ошибка бронирования. Параметр dateOrder не может быть меньше сегодняшней даты", {
                dateOrder: (_m = (_l = ctx.request.body) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateAfter)(new Date(ctx.request.body.data.dateOrder), new Date(new Date().setDate(new Date().getDate() + 1)))) {
            return ctx.badRequest("Ошибка бронирования. Параметр dateOrder не может быть больше чем на 1 день относительно сегодняшней даты, кроме выходных", {
                dateOrder: (_p = (_o = ctx.request.body) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateHoliday)(new Date(ctx.request.body.data.dateOrder))) {
            return ctx.badRequest("Ошибка бронирования. Параметр dateOrder не может быть выходным днём", {
                dateOrder: (_r = (_q = ctx.request.body) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r.dateOrder,
            });
        }
        const { data } = await super.create(ctx);
        return data;
    },
    async update(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        const booking = await strapi
            .service("api::booking.booking")
            .findOne(ctx.params.id, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!booking) {
            return ctx.badRequest("Ошибка изменения бронирования. Бронирование не найдено по данному id", {
                id: ctx.params.id,
            });
        }
        if (!ctx.request.body) {
            return ctx.badRequest("Ошибка изменения бронирования. Не передано тело запроса", {
                body: ctx.request.body,
            });
        }
        if (!ctx.request.body.data) {
            return ctx.badRequest("Ошибка изменения бронирования. Не переданы данные запроса", {
                data: ctx.request.body.data,
            });
        }
        if (ctx.request.body.data.order !== true) {
            return ctx.badRequest("Ошибка изменения бронирования. Не правильный параметр order", {
                order: (_b = (_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.order,
            });
        }
        if (!ctx.request.body.data.book) {
            return ctx.badRequest("Ошибка изменения бронирования. Не передан параметр book", {
                book: ctx.request.body.data.book,
            });
        }
        const book = await strapi
            .service("api::book.book")
            .findOne(ctx.request.body.data.book, ctx.query);
        if (!book) {
            return ctx.badRequest("Ошибка изменения бронирования. Книга не найдена по данному id", {
                book: ctx.request.body.data.book,
            });
        }
        if (ctx.request.body.data.book != ((_c = booking.book) === null || _c === void 0 ? void 0 : _c.id)) {
            return ctx.badRequest("Ошибка изменения бронирования. Переданный параметр book не совпадает с книгой, бронирование которой изменяется", {
                book: ctx.request.body.data.book,
                bookId: (_d = booking.book) === null || _d === void 0 ? void 0 : _d.id,
            });
        }
        if (!ctx.request.body.data.customer) {
            return ctx.badRequest("Ошибка  изменения бронирования. Не передан параметр customer", {
                customer: (_f = (_e = ctx.request.body) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.customer,
            });
        }
        const customer = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.request.body.data.customer, ctx.query);
        if (!customer) {
            return ctx.badRequest("Ошибка изменения бронирования. Пользователь не найден по данному id", {
                customer: ctx.request.body.data.customer,
            });
        }
        if (ctx.request.body.data.customer != ((_g = ctx.state.user) === null || _g === void 0 ? void 0 : _g.id)) {
            return ctx.badRequest("Ошибка изменения бронирования. Нет прав изменения бронирования не своего пользователя", {
                customer: ctx.request.body.data.customer,
                userId: (_h = ctx.state.user) === null || _h === void 0 ? void 0 : _h.id,
            });
        }
        if (ctx.request.body.data.customer != ((_j = booking.customer) === null || _j === void 0 ? void 0 : _j.id)) {
            return ctx.badRequest("Ошибка изменения бронирования. Переданный параметр customer не совпадает с пользователем, бронирование которого изменяется", {
                customer: ctx.request.body.data.customer,
                customerId: (_k = booking.customer) === null || _k === void 0 ? void 0 : _k.id,
            });
        }
        if (!ctx.request.body.data.dateOrder) {
            return ctx.badRequest("Ошибка изменения бронирования. Не передан параметр dateOrder", {
                dateOrder: (_m = (_l = ctx.request.body) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateValidate)(new Date(ctx.request.body.data.dateOrder))) {
            return ctx.badRequest("Ошибка изменения бронирования. Параметр dateOrder не является датой", {
                dateOrder: (_p = (_o = ctx.request.body) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateBefore)(new Date(ctx.request.body.data.dateOrder), new Date())) {
            return ctx.badRequest("Ошибка изменения бронирования. Параметр dateOrder не может быть меньше сегодняшней", {
                dateOrder: (_r = (_q = ctx.request.body) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateAfter)(new Date(ctx.request.body.data.dateOrder), new Date(new Date().setDate(new Date().getDate() + 1)))) {
            return ctx.badRequest("Ошибка изменения бронирования. Параметр dateOrder не может быть больше чем на 1 день больше сегодняшней даты, кроме выходных", {
                dateOrder: (_t = (_s = ctx.request.body) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateHoliday)(new Date(ctx.request.body.data.dateOrder))) {
            return ctx.badRequest("Ошибка изменения бронирования. Параметр dateOrder не может быть выходным днём", {
                dateOrder: (_v = (_u = ctx.request.body) === null || _u === void 0 ? void 0 : _u.data) === null || _v === void 0 ? void 0 : _v.dateOrder,
            });
        }
        if ((0, date_utils_1.isDateEqual)(new Date(ctx.request.body.data.dateOrder), new Date(booking.dateOrder))) {
            return ctx.badRequest("Ошибка изменения бронирования. Параметр dateOrder совпадает с днём бронирования", {
                dateOrder: (_x = (_w = ctx.request.body) === null || _w === void 0 ? void 0 : _w.data) === null || _x === void 0 ? void 0 : _x.dateOrder,
                bookingDateOrder: booking.dateOrder,
            });
        }
        const { data } = await super.update(ctx);
        return data;
    },
    async delete(ctx) {
        var _a, _b;
        const booking = await strapi
            .service("api::booking.booking")
            .findOne(ctx.params.id, {
            ...ctx.query,
            populate: "deep,2",
        });
        if (!booking) {
            return ctx.badRequest("Ошибка удаления бронирования. Бронирование не найдено по данному id", {
                id: ctx.params.id,
            });
        }
        if (booking.customer.id != ((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return ctx.badRequest("Ошибка удаления бронирования. Нет прав удаления бронирования не своего пользователя", {
                customer: booking.customer.id,
                userId: (_b = ctx.state.user) === null || _b === void 0 ? void 0 : _b.id,
            });
        }
        const { data } = await super.delete(ctx);
        return data;
    },
    async deleteOld(ctx) {
        const data = strapi.service("api::booking.booking").deleteOld();
        ctx.body = data;
    },
}));
