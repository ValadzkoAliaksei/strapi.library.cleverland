"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_raiting_1 = require("../../utils/get-raiting");
exports.default = (plugin) => {
    plugin.controllers.user.me = async (ctx) => {
        var _a, _b, _c, _d, _e;
        ctx.query = { ...ctx.query, populate: "deep,4" };
        const response = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.state.user.id, {
            populate: "deep,4",
        });
        const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, booking, delivery, history, } = response;
        const user = {
            id,
            username,
            email,
            confirmed,
            blocked,
            createdAt,
            updatedAt,
            firstName,
            lastName,
            phone,
            role: {
                id: role.id,
                name: role.name,
                description: role.description,
                type: role.type,
            },
            comments: (comments === null || comments === void 0 ? void 0 : comments.map(({ id, rating, text, book }) => ({
                id,
                rating,
                text,
                bookId: book.id,
            }))) || null,
            avatar: (avatar === null || avatar === void 0 ? void 0 : avatar.url) || null,
            booking: {
                id: (booking === null || booking === void 0 ? void 0 : booking.id) || null,
                order: (booking === null || booking === void 0 ? void 0 : booking.order) || null,
                dateOrder: (booking === null || booking === void 0 ? void 0 : booking.dateOrder) || null,
                book: (booking === null || booking === void 0 ? void 0 : booking.book)
                    ? {
                        id: booking.book.id,
                        title: booking.book.title,
                        rating: (0, get_raiting_1.getRatingUser)(booking.book.comments),
                        issueYear: booking.book.issueYear,
                        authors: booking.book.authors,
                        image: ((_b = (_a = booking.book.images) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || null,
                    }
                    : null,
            },
            delivery: {
                id: (delivery === null || delivery === void 0 ? void 0 : delivery.id) || null,
                handed: (delivery === null || delivery === void 0 ? void 0 : delivery.handed) || null,
                dateHandedFrom: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedFrom) || null,
                dateHandedTo: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedTo) || null,
                book: (delivery === null || delivery === void 0 ? void 0 : delivery.book)
                    ? {
                        id: delivery.book.id,
                        title: delivery.book.title,
                        rating: (0, get_raiting_1.getRatingUser)(delivery.book.comments),
                        issueYear: delivery.book.issueYear,
                        authors: delivery.book.authors,
                        image: ((_d = (_c = delivery.book.images) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.url) || null,
                    }
                    : null,
            },
            history: {
                id: (history === null || history === void 0 ? void 0 : history.id) || null,
                books: ((_e = history === null || history === void 0 ? void 0 : history.books) === null || _e === void 0 ? void 0 : _e.length)
                    ? history.books.map(({ id, title, comments, issueYear, authors, images }) => {
                        var _a;
                        return ({
                            id,
                            title,
                            rating: (0, get_raiting_1.getRatingUser)(comments),
                            issueYear,
                            authors,
                            image: ((_a = images === null || images === void 0 ? void 0 : images[0]) === null || _a === void 0 ? void 0 : _a.url) || null,
                        });
                    })
                    : null,
            },
        };
        return user;
    };
    plugin.controllers.user.findOne = async (ctx) => {
        var _a, _b, _c, _d, _e, _f, _g;
        ctx.query = { ...ctx.query, populate: "deep,4" };
        if (ctx.params.id == ((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.id)) {
            const response = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.params.id, {
                populate: "deep,4",
            });
            const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, booking, delivery, history, } = response;
            const user = {
                id,
                username,
                email,
                confirmed,
                blocked,
                createdAt,
                updatedAt,
                firstName,
                lastName,
                phone,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                    type: role.type,
                },
                comments: (comments === null || comments === void 0 ? void 0 : comments.map(({ id, rating, text, book }) => ({
                    id,
                    rating,
                    text,
                    bookId: book.id,
                }))) || null,
                avatar: (avatar === null || avatar === void 0 ? void 0 : avatar.url) || null,
                booking: {
                    id: (booking === null || booking === void 0 ? void 0 : booking.id) || null,
                    order: (booking === null || booking === void 0 ? void 0 : booking.order) || null,
                    dateOrder: (booking === null || booking === void 0 ? void 0 : booking.dateOrder) || null,
                    book: (booking === null || booking === void 0 ? void 0 : booking.book)
                        ? {
                            id: booking.book.id,
                            title: booking.book.title,
                            rating: (0, get_raiting_1.getRatingUser)(booking.book.comments),
                            issueYear: booking.book.issueYear,
                            authors: booking.book.authors,
                            image: ((_c = (_b = booking.book.images) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.url) || null,
                        }
                        : null,
                },
                delivery: {
                    id: (delivery === null || delivery === void 0 ? void 0 : delivery.id) || null,
                    handed: (delivery === null || delivery === void 0 ? void 0 : delivery.handed) || null,
                    dateHandedFrom: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedFrom) || null,
                    dateHandedTo: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedTo) || null,
                    book: (delivery === null || delivery === void 0 ? void 0 : delivery.book)
                        ? {
                            id: delivery.book.id,
                            title: delivery.book.title,
                            rating: (0, get_raiting_1.getRatingUser)(delivery.book.comments),
                            issueYear: delivery.book.issueYear,
                            authors: delivery.book.authors,
                            image: ((_e = (_d = delivery.book.images) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.url) || null,
                        }
                        : null,
                },
                history: {
                    id: (history === null || history === void 0 ? void 0 : history.id) || null,
                    books: ((_f = history === null || history === void 0 ? void 0 : history.books) === null || _f === void 0 ? void 0 : _f.length)
                        ? history.books.map(({ id, title, comments, issueYear, authors, images }) => {
                            var _a;
                            return ({
                                id,
                                title,
                                rating: (0, get_raiting_1.getRatingUser)(comments),
                                issueYear,
                                authors,
                                image: ((_a = images === null || images === void 0 ? void 0 : images[0]) === null || _a === void 0 ? void 0 : _a.url) || null,
                            });
                        })
                        : null,
                },
            };
            return user;
        }
        else {
            return ctx.badRequest("Нет прав для получения данных этого пользователя", { id: ctx.params.id, userId: (_g = ctx.state.user) === null || _g === void 0 ? void 0 : _g.id });
        }
    };
    plugin.controllers.user.update = async (ctx) => {
        var _a, _b, _c, _d, _e, _f, _g;
        ctx.query = { ...ctx.query, populate: "deep,3" };
        if (ctx.params.id == ((_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.id)) {
            const response = await strapi.entityService.update("plugin::users-permissions.user", ctx.params.id, {
                data: ctx.request.body,
                populate: "deep,3",
            });
            const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, booking, delivery, history, } = response;
            const user = {
                id,
                username,
                email,
                confirmed,
                blocked,
                createdAt,
                updatedAt,
                firstName,
                lastName,
                phone,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                    type: role.type,
                },
                comments: (comments === null || comments === void 0 ? void 0 : comments.map(({ id, rating, text, book }) => ({
                    id,
                    rating,
                    text,
                    bookId: book.id,
                }))) || null,
                avatar: (avatar === null || avatar === void 0 ? void 0 : avatar.url) || null,
                booking: {
                    id: (booking === null || booking === void 0 ? void 0 : booking.id) || null,
                    order: (booking === null || booking === void 0 ? void 0 : booking.order) || null,
                    dateOrder: (booking === null || booking === void 0 ? void 0 : booking.dateOrder) || null,
                    book: (booking === null || booking === void 0 ? void 0 : booking.book)
                        ? {
                            id: booking.book.id,
                            title: booking.book.title,
                            rating: (0, get_raiting_1.getRatingUser)(booking.book.comments),
                            issueYear: booking.book.issueYear,
                            authors: booking.book.authors,
                            image: ((_c = (_b = booking.book.images) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        }
                        : null,
                },
                delivery: {
                    id: (delivery === null || delivery === void 0 ? void 0 : delivery.id) || null,
                    handed: (delivery === null || delivery === void 0 ? void 0 : delivery.handed) || null,
                    dateHandedFrom: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedFrom) || null,
                    dateHandedTo: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedTo) || null,
                    book: (delivery === null || delivery === void 0 ? void 0 : delivery.book)
                        ? {
                            id: delivery.book.id,
                            title: delivery.book.title,
                            rating: (0, get_raiting_1.getRatingUser)(delivery.book.comments),
                            issueYear: delivery.book.issueYear,
                            authors: delivery.book.authors,
                            image: ((_e = (_d = delivery.book.images) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        }
                        : null,
                },
                history: {
                    id: (history === null || history === void 0 ? void 0 : history.id) || null,
                    books: ((_f = history === null || history === void 0 ? void 0 : history.books) === null || _f === void 0 ? void 0 : _f.length)
                        ? history.books.map(({ id, title, comments, issueYear, authors, images }) => {
                            var _a;
                            return ({
                                id,
                                title,
                                rating: (0, get_raiting_1.getRatingUser)(comments),
                                issueYear,
                                authors,
                                image: ((_a = images === null || images === void 0 ? void 0 : images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                                    url: attributes.url,
                                }))[0]) || null,
                            });
                        })
                        : null,
                },
            };
            return user;
        }
        else {
            return ctx.badRequest("Нет прав для обновления данного пользователя", {
                id: ctx.params.id,
                userId: (_g = ctx.state.user) === null || _g === void 0 ? void 0 : _g.id,
            });
        }
    };
    // plugin.controllers.auth.local = async (ctx) => {
    //   console.log("plugin.controllers.auth.local");
    //   ctx.query = { ...ctx.query, populate: "deep,3" };
    //   const response = await strapi.entityService.findOne(
    //     "plugin::users-permissions.auth",
    //     ctx.state.user.id,
    //     {
    //       populate: "deep,3",
    //     }
    //   );
    //   const {
    //     id,
    //     username,
    //     email,
    //     confirmed,
    //     blocked,
    //     createdAt,
    //     updatedAt,
    //     firstName,
    //     lastName,
    //     phone,
    //     role,
    //     comments,
    //     avatar,
    //     booking,
    //     delivery,
    //     history,
    //   } = response;
    //   const user = {
    //     id,
    //     username,
    //     email,
    //     confirmed,
    //     blocked,
    //     createdAt,
    //     updatedAt,
    //     firstName,
    //     lastName,
    //     phone,
    //     role: {
    //       id: role.id,
    //       name: role.name,
    //       description: role.description,
    //       type: role.type,
    //     },
    //     comments:
    //       comments?.map(({ id, rating, text, book }) => ({
    //         id,
    //         rating,
    //         text,
    //         bookId: book.id,
    //       })) || null,
    //     avatar: avatar.url,
    //     booking: {
    //       id: booking?.id || null,
    //       order: booking?.order || null,
    //       dateOrder: booking?.dateOrder || null,
    //       book: booking?.book
    //         ? {
    //             id: booking.book.id,
    //             title: booking.book.title,
    //             rating: booking.book.rating,
    //             issueYear: booking.book.issueYear,
    //             authors: booking.book.authors,
    //             image:
    //               booking.book.images?.data?.map(({ attributes }) => ({
    //                 url: attributes.url,
    //               }))[0] || null,
    //           }
    //         : null,
    //     },
    //     delivery: {
    //       id: delivery?.id || null,
    //       handed: delivery?.handed || null,
    //       dateHandedFrom: delivery?.dateHandedFrom || null,
    //       dateHandedTo: delivery?.dateHandedTo || null,
    //       book: delivery?.book
    //         ? {
    //             id: delivery.book.id,
    //             title: delivery.book.title,
    //             rating: delivery.book.rating,
    //             issueYear: delivery.book.issueYear,
    //             authors: delivery.book.authors,
    //             image:
    //               delivery.book.images?.data?.map(({ attributes }) => ({
    //                 url: attributes.url,
    //               }))[0] || null,
    //           }
    //         : null,
    //     },
    //     history: {
    //       id: history?.id || null,
    //       books: history?.books?.length
    //         ? history.books.map(
    //             ({ id, title, rating, issueYear, authors, images }) => ({
    //               id,
    //               title,
    //               rating,
    //               issueYear,
    //               authors,
    //               image:
    //                 images?.data?.map(({ attributes }) => ({
    //                   url: attributes.url,
    //                 }))[0] || null,
    //             })
    //           )
    //         : null,
    //     },
    //   };
    //   return user;
    // };
    // plugin.policies[newPolicy] = (ctx) => {};
    // plugin.routes["content-api"].routes.push({
    //   method: "GET",
    //   path: "/route-path",
    //   handler: "controller.action",
    // });
    // plugin.routes["content-api"].routes.push({
    //   method: "POST",
    //   path: "/api/auth/local",
    //   handler: "auth.local",
    //   config: {
    //     policies: [],
    //     prefix: "",
    //   },
    // });
    return plugin;
};
