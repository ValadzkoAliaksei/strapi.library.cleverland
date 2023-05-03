/**
 * booking controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { sanitize } from "@strapi/utils";

import {
  isDateBefore,
  isDateValidate,
  isDateAfter,
  isDateHoliday,
  isDateEqual,
} from "../../../utils/date-utils";

const { contentAPI } = sanitize;

export default factories.createCoreController(
  "api::booking.booking",
  ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
      if (!ctx.request.body) {
        return ctx.badRequest("Ошибка бронирования. Не передано тело запроса", {
          body: ctx.request.body,
        });
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка бронирования. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (ctx.request.body.data.order !== true) {
        return ctx.badRequest(
          "Ошибка бронирования. Не правильный параметр order",
          {
            order: ctx.request.body?.data?.order,
          }
        );
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
        return ctx.badRequest(
          "Ошибка бронирования. Книга не найдена по данному id",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      if (book.booking) {
        return ctx.badRequest(
          "Ошибка бронирования. У данной книги уже есть бронирование",
          {
            book: ctx.request.body.data.book,
            booking: book.booking,
          }
        );
      }

      if (book.delivery) {
        return ctx.badRequest(
          "Ошибка бронирования. Данная книга выдана и не может быть забронирована",
          {
            book: ctx.request.body.data.book,
            delivery: book.delivery,
          }
        );
      }

      if (!ctx.request.body.data.customer) {
        return ctx.badRequest(
          "Ошибка бронирования. Не передан параметр customer",
          {
            customer: ctx.request.body?.data?.customer,
          }
        );
      }

      const customer = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.customer,
        {
          ...ctx.query,
          populate: "deep,2",
        }
      );
      if (!customer) {
        return ctx.badRequest(
          "Ошибка бронирования. Пользователь не найден по данному id",
          {
            customer: ctx.request.body.data.customer,
          }
        );
      }

      if (ctx.request.body.data.customer != ctx.state.user?.id) {
        return ctx.badRequest(
          "Ошибка бронирования. Нет прав бронирования не своего пользователя",
          {
            customer: ctx.request.body.data.customer,
            userId: ctx.state.user?.id,
          }
        );
      }

      if (customer.booking) {
        await strapi
          .service("api::booking.booking")
          .delete(customer.booking.id as never, ctx.query);
        console.log(
          `У пользователя есть бронироование id=${customer.booking.id} и оно было удалено`
        );
      }

      if (!ctx.request.body.data.dateOrder) {
        return ctx.badRequest(
          "Ошибка бронирования. Не передан параметр dateOrder",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (isDateValidate(new Date(ctx.request.body.data.dateOrder))) {
        return ctx.badRequest(
          "Ошибка бронирования. Параметр dateOrder не является датой",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (isDateBefore(new Date(ctx.request.body.data.dateOrder), new Date())) {
        return ctx.badRequest(
          "Ошибка бронирования. Параметр dateOrder не может быть меньше сегодняшней даты",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (
        isDateAfter(
          new Date(ctx.request.body.data.dateOrder),
          new Date(new Date().setDate(new Date().getDate() + 1))
        )
      ) {
        return ctx.badRequest(
          "Ошибка бронирования. Параметр dateOrder не может быть больше чем на 1 день относительно сегодняшней даты, кроме выходных",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (isDateHoliday(new Date(ctx.request.body.data.dateOrder))) {
        return ctx.badRequest(
          "Ошибка бронирования. Параметр dateOrder не может быть выходным днём",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      const { data } = await super.create(ctx);
      return data;
    },

    async update(ctx) {
      const booking = await strapi
        .service("api::booking.booking")
        .findOne(ctx.params.id, {
          ...ctx.query,
          populate: "deep,2",
        });
      if (!booking) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Бронирование не найдено по данному id",
          {
            id: ctx.params.id,
          }
        );
      }

      if (!ctx.request.body) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Не передано тело запроса",
          {
            body: ctx.request.body,
          }
        );
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (ctx.request.body.data.order !== true) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Не правильный параметр order",
          {
            order: ctx.request.body?.data?.order,
          }
        );
      }

      if (!ctx.request.body.data.book) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Не передан параметр book",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      const book = await strapi
        .service("api::book.book")
        .findOne(ctx.request.body.data.book, ctx.query);
      if (!book) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Книга не найдена по данному id",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      if (ctx.request.body.data.book != booking.book?.id) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Переданный параметр book не совпадает с книгой, бронирование которой изменяется",
          {
            book: ctx.request.body.data.book,
            bookId: booking.book?.id,
          }
        );
      }

      if (!ctx.request.body.data.customer) {
        return ctx.badRequest(
          "Ошибка  изменения бронирования. Не передан параметр customer",
          {
            customer: ctx.request.body?.data?.customer,
          }
        );
      }

      const customer = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.customer,
        ctx.query
      );
      if (!customer) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Пользователь не найден по данному id",
          {
            customer: ctx.request.body.data.customer,
          }
        );
      }

      if (ctx.request.body.data.customer != ctx.state.user?.id) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Нет прав изменения бронирования не своего пользователя",
          {
            customer: ctx.request.body.data.customer,
            userId: ctx.state.user?.id,
          }
        );
      }

      if (ctx.request.body.data.customer != booking.customer?.id) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Переданный параметр customer не совпадает с пользователем, бронирование которого изменяется",
          {
            customer: ctx.request.body.data.customer,
            customerId: booking.customer?.id,
          }
        );
      }

      if (!ctx.request.body.data.dateOrder) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Не передан параметр dateOrder",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (isDateValidate(new Date(ctx.request.body.data.dateOrder))) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Параметр dateOrder не является датой",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (isDateBefore(new Date(ctx.request.body.data.dateOrder), new Date())) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Параметр dateOrder не может быть меньше сегодняшней",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (
        isDateAfter(
          new Date(ctx.request.body.data.dateOrder),
          new Date(new Date().setDate(new Date().getDate() + 1))
        )
      ) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Параметр dateOrder не может быть больше чем на 1 день больше сегодняшней даты, кроме выходных",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (isDateHoliday(new Date(ctx.request.body.data.dateOrder))) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Параметр dateOrder не может быть выходным днём",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
          }
        );
      }

      if (
        isDateEqual(
          new Date(ctx.request.body.data.dateOrder),
          new Date(booking.dateOrder)
        )
      ) {
        return ctx.badRequest(
          "Ошибка изменения бронирования. Параметр dateOrder совпадает с днём бронирования",
          {
            dateOrder: ctx.request.body?.data?.dateOrder,
            bookingDateOrder: booking.dateOrder,
          }
        );
      }

      const { data } = await super.update(ctx);
      return data;
    },
    async delete(ctx) {
      const booking = await strapi
        .service("api::booking.booking")
        .findOne(ctx.params.id, {
          ...ctx.query,
          populate: "deep,2",
        });
      if (!booking) {
        return ctx.badRequest(
          "Ошибка удаления бронирования. Бронирование не найдено по данному id",
          {
            id: ctx.params.id,
          }
        );
      }

      if (booking.customer.id != ctx.state.user?.id) {
        return ctx.badRequest(
          "Ошибка удаления бронирования. Нет прав удаления бронирования не своего пользователя",
          {
            customer: booking.customer.id,
            userId: ctx.state.user?.id,
          }
        );
      }

      const { data } = await super.delete(ctx);
      return data;
    },

    async deleteOld(ctx) {
      const data = strapi.service("api::booking.booking").deleteOld();
      ctx.body = data;
    },
  })
);
