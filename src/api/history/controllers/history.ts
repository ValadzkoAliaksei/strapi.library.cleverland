/**
 * history controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::history.history",
  ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
      if (!ctx.request.body) {
        return ctx.badRequest(
          "Ошибка создания истории. Не передано тело запроса",
          {
            body: ctx.request.body,
          }
        );
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка создания истории. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (!ctx.request.body.data.book) {
        return ctx.badRequest(
          "Ошибка создания истории. Не передан параметр book",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      const book = await strapi
        .service("api::book.book")
        .findOne(ctx.request.body.data.book, {
          ...ctx.query,
          populate: "deep,2",
        });
      if (!book) {
        return ctx.badRequest(
          "Ошибка создания истории. Книга не найдена по данному id",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      if (!ctx.request.body.data.user) {
        return ctx.badRequest(
          "Ошибка создания истории. Не передан параметр user",
          {
            user: ctx.request.body?.data?.user,
          }
        );
      }

      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.user,
        {
          ...ctx.query,
          populate: "deep,2",
        }
      );

      if (!user) {
        return ctx.badRequest(
          "Ошибка создания истории. Пользователь не найден по данному id",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      if (user.history) {
        return ctx.badRequest(
          "Ошибка создания истории. У пользователя уже есть история выдачи",
          {
            user: ctx.request.body.data.user,
          }
        );
      }
      ctx.request.body.data = {
        books: [ctx.request.body.data.book.toString()],
        user: ctx.request.body.data.user.toString(),
      };

      const { data } = await super.create(ctx);
      return data;
    },
    async update(ctx) {
      const history = await strapi
        .service("api::history.history")
        .findOne(ctx.params.id, {
          ...ctx.query,
          populate: "deep,2",
        });
      if (!history) {
        return ctx.badRequest(
          "Ошибка добавления книги в историю. История не найдена по данному id",
          {
            id: ctx.params.id,
          }
        );
      }

      if (!ctx.request.body) {
        return ctx.badRequest(
          "Ошибка добавления книги в историю. Не передано тело запроса",
          {
            body: ctx.request.body,
          }
        );
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка добавления книги в историю. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (!ctx.request.body.data.book) {
        return ctx.badRequest(
          "Ошибка добавления книги в историю. Не передан параметр book",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      const book = await strapi
        .service("api::book.book")
        .findOne(ctx.request.body.data.book, {
          ...ctx.query,
          populate: "deep,2",
        });
      if (!book) {
        return ctx.badRequest(
          "Ошибка добавления книги в историю. Книга не найдена по данному id",
          {
            book: ctx.request.body.data.book,
          }
        );
      }
      const books = [
        ctx.request.body.data.book,
        ...history.books.map(({ id }) => id.toString()),
      ];

      const uniqueBooks = new Set(books);
      ctx.request.body.data = {
        books: Array.from(uniqueBooks),
        user: history.user?.id,
      };

      const { data } = await super.update(ctx);
      return data;
    },
  })
);
