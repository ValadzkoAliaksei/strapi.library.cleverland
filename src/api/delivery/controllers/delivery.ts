/**
 * delivery controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import {
  isDateAfter,
  isDateBefore,
  isDateHoliday,
  isDateValidate,
  isDateEqual,
} from "../../../utils/date-utils";

export default factories.createCoreController(
  "api::delivery.delivery",
  ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
      if (!ctx.request.body) {
        return ctx.badRequest("Ошибка выдачи книги. Не передано тело запроса", {
          body: ctx.request.body,
        });
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (ctx.request.body.data.handed !== true) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Не правильный параметр handed",
          {
            handed: ctx.request.body?.data?.handed,
          }
        );
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
        return ctx.badRequest(
          "Ошибка выдачи книги. Книга не найдена по данному id",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      if (book.delivery) {
        return ctx.badRequest("Ошибка выдачи книги. Данная книга уже выдана", {
          book: ctx.request.body.data.book,
          delivery: book.delivery,
        });
      }

      if (!ctx.request.body.data.recipient) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Не передан параметр recipient",
          {
            recipient: ctx.request.body?.data?.recipient,
          }
        );
      }

      const recipient = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.recipient,
        {
          ...ctx.query,
          populate: "deep,2",
        }
      );
      if (!recipient) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Пользователь не найден по данному id",
          {
            recipient: ctx.request.body.data.recipient,
          }
        );
      }

      if (!book.booking) {
        return ctx.badRequest("Ошибка выдачи книги. Книга не забронирована", {
          book,
        });
      }

      if (book.booking.customer?.id != ctx.request.body.data.recipient) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Книга забронирована другим пользователем",
          {
            recipient: ctx.request.body.data.recipient,
            customer: book.booking.customer,
          }
        );
      }

      if (!ctx.request.body.data.dateHandedTo) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Не передан параметр dateHandedTo",
          {
            dateHandedTo: ctx.request.body?.data?.dateHandedTo,
          }
        );
      }

      if (isDateValidate(new Date(ctx.request.body.data.dateHandedTo))) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Параметр dateHandedTo не является датой",
          {
            dateHandedTo: ctx.request.body?.data?.dateHandedTo,
          }
        );
      }

      if (isDateHoliday(new Date(ctx.request.body.data.dateHandedTo))) {
        return ctx.badRequest(
          "Ошибка бронирования. Параметр dateHandedTo не может быть выходным днём",
          {
            dateHandedTo: ctx.request.body?.data?.dateHandedTo,
          }
        );
      }

      if (
        !isDateEqual(
          new Date(ctx.request.body.data.dateHandedTo),
          new Date(new Date().setDate(new Date().getDate() + 14))
        )
      ) {
        return ctx.badRequest(
          "Ошибка бронирования. Параметр dateHandedTo должен быть больше сегодняшней даты ровно на 14дней, кроме выходных",
          {
            dateHandedTo: ctx.request.body?.data?.dateHandedTo,
          }
        );
      }

      if (!ctx.request.body.data.dateHandedFrom) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Не передан параметр dateHandedFrom",
          {
            dateHandedFrom: ctx.request.body?.data?.dateHandedFrom,
          }
        );
      }

      if (isDateValidate(new Date(ctx.request.body.data.dateHandedFrom))) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Параметр dateHandedFrom не является датой",
          {
            dateHandedFrom: ctx.request.body?.data?.dateHandedFrom,
          }
        );
      }

      if (isDateHoliday(new Date(ctx.request.body.data.dateHandedFrom))) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Параметр dateHandedFrom не может быть выходным днём",
          {
            dateHandedFrom: ctx.request.body?.data?.dateHandedFrom,
          }
        );
      }

      if (
        !isDateEqual(new Date(ctx.request.body.data.dateHandedFrom), new Date())
      ) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Параметр dateHandedFrom должен быть равен сегодняшнему дню",
          {
            dateOrder: ctx.request.body?.data?.dateHandedFrom,
          }
        );
      }

      if (
        isDateAfter(
          new Date(ctx.request.body.data.dateHandedFrom),
          new Date(
            new Date().setDate(new Date(book.booking.dateOrder).getDate() + 1)
          )
        )
      ) {
        return ctx.badRequest(
          "Ошибка выдачи книги. Параметр dateHandedFrom не может быть больше даты бронирования чем на 1 день",
          {
            dateHandedFrom: ctx.request.body?.data?.dateHandedFrom,
            dateOrder: book.booking.dateOrder,
          }
        );
      }

      if (recipient.delivery) {
        await strapi
          .service("api::delivery.delivery")
          .delete(recipient.delivery.id as never, ctx.query);
        console.log(
          `У пользователя есть другая выдача id=${recipient.delivery.id} и она была удалена`
        );
      }

      await strapi
        .service("api::booking.booking")
        .delete(book.booking.id as never, ctx.query);
      console.log(
        `У книги есть бронироование id=${book.booking.id} и оно было удалено`
      );

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
        return ctx.badRequest(
          "Ошибка продления выдачи книги. Выдача не найдена по данному id",
          {
            id: ctx.params.id,
          }
        );
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
        return ctx.badRequest(
          "Ошибка удаления выдачи. Выдача не найдено по данному id",
          {
            id: ctx.params.id,
          }
        );
      }

      const { data } = await super.delete(ctx);
      return data;
    },
  })
);
