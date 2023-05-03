/**
 * book controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import {
  BookDataResponseType,
  BooksDataResponseType,
} from "../../../types/book";
import { getRating } from "../../../utils/get-raiting";

export default factories.createCoreController(
  "api::book.book",
  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx) {
      ctx.query = { ...ctx.query, populate: "deep,3" };
      const { data }: BooksDataResponseType = await super.find(ctx);
      const books =
        data.map(
          ({
            attributes: {
              issueYear,
              title,
              authors,
              images,
              categories,
              booking,
              delivery,
              histories,
              comments,
            },
            id,
          }) => ({
            issueYear,
            rating: getRating(comments),
            title,
            authors,
            image:
              images.data?.map(({ attributes }) => ({
                url: attributes.url,
              }))[0] || null,
            categories: categories.data?.length
              ? categories.data.map(({ attributes }) => attributes.name)
              : null,
            id,
            booking: booking?.data
              ? {
                  id: booking.data?.id || null,
                  order: booking.data?.attributes.order || false,
                  dateOrder: booking.data?.attributes.dateOrder || null,
                  customerId:
                    booking.data?.attributes.customer.data?.id || null,
                  customerFirstName:
                    booking.data?.attributes.customer.data?.attributes
                      .firstName || null,
                  customerLastName:
                    booking.data?.attributes.customer.data?.attributes
                      .lastName || null,
                }
              : null,
            delivery: delivery?.data
              ? {
                  id: delivery.data?.id || null,
                  handed: delivery.data?.attributes.handed || false,
                  dateHandedFrom:
                    delivery.data?.attributes.dateHandedFrom || null,
                  dateHandedTo: delivery.data?.attributes.dateHandedTo || null,
                  recipientId:
                    delivery.data?.attributes.recipient?.data?.id || null,
                  recipientFirstName:
                    delivery.data?.attributes.recipient?.data?.attributes
                      .firstName || null,
                  recipientLastName:
                    delivery.data?.attributes.recipient?.data?.attributes
                      .lastName || null,
                }
              : null,
            histories: histories?.data?.length
              ? histories.data?.map(({ id, attributes }) => ({
                  id: id || null,
                  userId: attributes.user.data?.id || null,
                }))
              : null,
          })
        ) || [];
      return books;
    },

    async findOne(ctx) {
      ctx.query = { ...ctx.query, populate: "deep,4" };
      const response: BookDataResponseType = await super.findOne(ctx);
      if (!response) {
        return ctx.badRequest("Книга не найдена по данному id", {
          id: ctx.params.id,
        });
      }
      const {
        data: {
          id,
          attributes: {
            title,
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
            images,
            categories,
            comments,
            booking,
            delivery,
            histories,
          },
        },
      } = response;
      const book = {
        id,
        title,
        rating: getRating(comments),
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
        images:
          images.data?.map(({ attributes }) => ({
            url: attributes.url,
          })) || null,
        categories: categories?.data.length
          ? categories.data.map(({ attributes }) => attributes.name)
          : null,
        comments: comments?.data.length
          ? comments.data?.map(
              ({ id, attributes: { rating, text, createdAt, user } }) => ({
                id,
                rating,
                text,
                createdAt,
                user: {
                  commentUserId: user.data.id,
                  firstName: user.data.attributes.firstName,
                  lastName: user.data.attributes.lastName,
                  avatarUrl: user.data.attributes.avatar.data?.url || null,
                },
              })
            )
          : null,
        booking: booking?.data
          ? {
              id: booking.data?.id || null,
              order: booking.data?.attributes.order || false,
              dateOrder: booking.data?.attributes.dateOrder || null,
              customerId: booking.data?.attributes.customer.data?.id || null,
              customerFirstName:
                booking.data?.attributes.customer.data?.attributes.firstName ||
                null,
              customerLastName:
                booking.data?.attributes.customer.data?.attributes.lastName ||
                null,
            }
          : null,
        delivery: delivery?.data
          ? {
              id: delivery.data?.id || null,
              handed: delivery.data?.attributes.handed || false,
              dateHandedFrom: delivery.data?.attributes.dateHandedFrom || null,
              dateHandedTo: delivery.data?.attributes.dateHandedTo || null,
              recipientId:
                delivery.data?.attributes.recipient?.data?.id || null,
              recipientFirstName:
                delivery.data?.attributes.recipient?.data?.attributes
                  .firstName || null,
              recipientLastName:
                delivery.data?.attributes.recipient?.data?.attributes
                  .lastName || null,
            }
          : null,
        histories: histories?.data?.length
          ? histories.data?.map(({ id, attributes }) => ({
              id: id || null,
              userId: attributes.user.data?.id || null,
            }))
          : null,
      };

      return book;
    },
  })
);
