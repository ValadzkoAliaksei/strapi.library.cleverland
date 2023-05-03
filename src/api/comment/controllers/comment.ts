/**
 * comment controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
      if (!ctx.request.body) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передано тело запроса",
          {
            body: ctx.request.body,
          }
        );
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка комментирования. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (!ctx.request.body.data.rating) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передан параметр rating",
          {
            rating: ctx.request.body.data.rating,
          }
        );
      }

      if (
        ctx.request.body.data.rating < 1 ||
        ctx.request.body.data.rating > 5
      ) {
        return ctx.badRequest(
          "Ошибка комментирования. Не правильный параметр rating",
          {
            rating: ctx.request.body.data.rating,
          }
        );
      }

      if (!ctx.request.body.data.book) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передан параметр book",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      const book = await strapi
        .service("api::book.book")
        .findOne(ctx.request.body.data.book, {
          ...ctx.query,
          populate: "deep,3",
        });
      if (!book) {
        return ctx.badRequest(
          "Ошибка комментирования. Книга не найдена по данному id",
          {
            id: ctx.request.body.data.book,
          }
        );
      }

      if (!ctx.request.body.data.user) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передан параметр user",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.user,
        ctx.query
      );
      if (!user) {
        return ctx.badRequest(
          "Ошибка комментирования. Пользователь не найден по данному id",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      if (ctx.request.body.data.user != ctx.state.user?.id) {
        return ctx.badRequest(
          "Ошибка комментирования. Нет прав комментирования не под своим пользователем",
          {
            user: ctx.request.body.data.user,
            userId: ctx.state.user?.id,
          }
        );
      }
      if (
        !!book.comments?.find(
          (comment) =>
            comment?.user?.id && comment?.user?.id == ctx.request.body.data.user
        )
      ) {
        return ctx.badRequest(
          "Ошибка комментирования. У вас уже есть коментарий в данной книге",
          {
            user: ctx.request.body.data.user,
            id: ctx.request.body.data.book,
          }
        );
      }

      const { data } = await super.create(ctx);
      return data;
    },
    async update(ctx) {
      const comment = await strapi
        .service("api::comment.comment")
        .findOne(ctx.params.id, {
          ...ctx.query,
          populate: "deep,2",
        });
      if (!comment) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Комментарий не найдено по данному id",
          {
            id: ctx.params.id,
          }
        );
      }
      console.log(comment);

      if (!ctx.request.body) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Не передано тело запроса",
          {
            body: ctx.request.body,
          }
        );
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (!ctx.request.body.data.rating) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Не передан параметр rating",
          {
            rating: ctx.request.body.data.rating,
          }
        );
      }

      if (
        ctx.request.body.data.rating < 1 ||
        ctx.request.body.data.rating > 5
      ) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Не правильный параметр rating",
          {
            rating: ctx.request.body.data.rating,
          }
        );
      }

      if (!ctx.request.body.data.book) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Не передан параметр book",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      if (ctx.request.body.data.book != comment.book?.id) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Переданный параметр book не совпадает с книгой, комментарий которой изменяется",
          {
            book: ctx.request.body.data.book,
            bookId: comment.book?.id,
          }
        );
      }

      const book = await strapi
        .service("api::book.book")
        .findOne(ctx.request.body.data.book, {
          ...ctx.query,
          populate: "deep,3",
        });
      if (!book) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Книга не найдена по данному id",
          {
            id: ctx.request.body.data.book,
          }
        );
      }

      if (!ctx.request.body.data.user) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Не передан параметр user",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.user,
        ctx.query
      );
      if (!user) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Пользователь не найден по данному id",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      if (ctx.request.body.data.user != ctx.state.user?.id) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Нет прав комментирования не под своим пользователем",
          {
            user: ctx.request.body.data.user,
            userId: ctx.state.user?.id,
          }
        );
      }

      if (ctx.request.body.data.user != comment.user?.id) {
        return ctx.badRequest(
          "Ошибка изменения комментария. Переданный параметр user не совпадает с пользователем, комментарий которого изменяется",
          {
            user: ctx.request.body.data.user,
            userId: comment.user?.id,
          }
        );
      }

      const { data } = await super.update(ctx);
      return data;
    },
  })
);
