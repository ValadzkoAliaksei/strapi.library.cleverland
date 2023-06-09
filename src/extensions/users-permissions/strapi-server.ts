import { getRatingUser } from "../../utils/get-raiting";

export default (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep,4" };
    const response = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: "deep,4",
      }
    );
    const {
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
      role,
      comments,
      avatar,
      booking,
      delivery,
      history,
    } = response;
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
      comments:
        comments?.map(({ id, rating, text, book }) => ({
          id,
          rating,
          text,
          bookId: book.id,
        })) || null,
      avatar: avatar?.url || null,
      booking: {
        id: booking?.id || null,
        order: booking?.order || null,
        dateOrder: booking?.dateOrder || null,
        book: booking?.book
          ? {
              id: booking.book.id,
              title: booking.book.title,
              rating: getRatingUser(booking.book.comments),
              issueYear: booking.book.issueYear,
              authors: booking.book.authors,
              image: booking.book.images?.[0]?.url || null,
            }
          : null,
      },
      delivery: {
        id: delivery?.id || null,
        handed: delivery?.handed || null,
        dateHandedFrom: delivery?.dateHandedFrom || null,
        dateHandedTo: delivery?.dateHandedTo || null,
        book: delivery?.book
          ? {
              id: delivery.book.id,
              title: delivery.book.title,
              rating: getRatingUser(delivery.book.comments),
              issueYear: delivery.book.issueYear,
              authors: delivery.book.authors,
              image: delivery.book.images?.[0]?.url || null,
            }
          : null,
      },
      history: {
        id: history?.id || null,
        books: history?.books?.length
          ? history.books.map(
              ({ id, title, comments, issueYear, authors, images }) => ({
                id,
                title,
                rating: getRatingUser(comments),
                issueYear,
                authors,
                image: images?.[0]?.url || null,
              })
            )
          : null,
      },
    };
    return user;
  };

  plugin.controllers.user.findOne = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep,4" };
    const response = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.params.id,
      {
        populate: "deep,4",
      }
    );
    const {
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
      role,
      comments,
      avatar,
      booking,
      delivery,
      history,
    } = response;
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
      comments:
        comments?.map(({ id, rating, text, book }) => ({
          id,
          rating,
          text,
          bookId: book.id,
        })) || null,
      avatar: avatar?.url || null,
      booking: {
        id: booking?.id || null,
        order: booking?.order || null,
        dateOrder: booking?.dateOrder || null,
        book: booking?.book
          ? {
              id: booking.book.id,
              title: booking.book.title,
              rating: getRatingUser(booking.book.comments),
              issueYear: booking.book.issueYear,
              authors: booking.book.authors,
              image: booking.book.images?.[0]?.url || null,
            }
          : null,
      },
      delivery: {
        id: delivery?.id || null,
        handed: delivery?.handed || null,
        dateHandedFrom: delivery?.dateHandedFrom || null,
        dateHandedTo: delivery?.dateHandedTo || null,
        book: delivery?.book
          ? {
              id: delivery.book.id,
              title: delivery.book.title,
              rating: getRatingUser(delivery.book.comments),
              issueYear: delivery.book.issueYear,
              authors: delivery.book.authors,
              image: delivery.book.images?.[0]?.url || null,
            }
          : null,
      },
      history: {
        id: history?.id || null,
        books: history?.books?.length
          ? history.books.map(
              ({ id, title, comments, issueYear, authors, images }) => ({
                id,
                title,
                rating: getRatingUser(comments),
                issueYear,
                authors,
                image: images?.[0]?.url || null,
              })
            )
          : null,
      },
    };
    return user;
  };

  plugin.controllers.user.update = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep,3" };
    if (ctx.params.id == ctx.state.user?.id) {
      const response = await strapi.entityService.update(
        "plugin::users-permissions.user",
        ctx.params.id,
        {
          data: ctx.request.body,
          populate: "deep,3",
        }
      );
      const {
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
        role,
        comments,
        avatar,
        booking,
        delivery,
        history,
      } = response;
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
        comments:
          comments?.map(({ id, rating, text, book }) => ({
            id,
            rating,
            text,
            bookId: book.id,
          })) || null,
        avatar: avatar?.url || null,
        booking: {
          id: booking?.id || null,
          order: booking?.order || null,
          dateOrder: booking?.dateOrder || null,
          book: booking?.book
            ? {
                id: booking.book.id,
                title: booking.book.title,
                rating: getRatingUser(booking.book.comments),
                issueYear: booking.book.issueYear,
                authors: booking.book.authors,
                image:
                  booking.book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              }
            : null,
        },
        delivery: {
          id: delivery?.id || null,
          handed: delivery?.handed || null,
          dateHandedFrom: delivery?.dateHandedFrom || null,
          dateHandedTo: delivery?.dateHandedTo || null,
          book: delivery?.book
            ? {
                id: delivery.book.id,
                title: delivery.book.title,
                rating: getRatingUser(delivery.book.comments),
                issueYear: delivery.book.issueYear,
                authors: delivery.book.authors,
                image:
                  delivery.book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              }
            : null,
        },
        history: {
          id: history?.id || null,
          books: history?.books?.length
            ? history.books.map(
                ({ id, title, comments, issueYear, authors, images }) => ({
                  id,
                  title,
                  rating: getRatingUser(comments),
                  issueYear,
                  authors,
                  image:
                    images?.data?.map(({ attributes }) => ({
                      url: attributes.url,
                    }))[0] || null,
                })
              )
            : null,
        },
      };
      return user;
    } else {
      return ctx.badRequest("Нет прав для обновления данного пользователя", {
        id: ctx.params.id,
        userId: ctx.state.user?.id,
      });
    }
  };

  plugin.controllers.user.find = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep,3" };
    console.log(strapi.entityService);
    const response = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        populate: "deep,3",
      }
    );
    const users =
      response.map(
        ({
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
          role,
          avatar,
          delivery,
          history,
        }) => ({
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
          avatar: avatar?.url || null,
          delivery: {
            id: delivery?.id || null,
            handed: delivery?.handed || null,
            dateHandedFrom: delivery?.dateHandedFrom || null,
            dateHandedTo: delivery?.dateHandedTo || null,
          },
          historyCount: history?.books?.length || 0,
        })
      ) || [];
    return users;
  };

  plugin.controllers.user.block = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep,3" };

    const client = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.params.id,
      {
        ...ctx.query,
        populate: "deep,2",
      }
    );
    if (!client) {
      return ctx.badRequest(
        "Ошибка блокирования. Пользователь не найден по данному id",
        {
          user: ctx.params.id,
        }
      );
    }

    const response = await strapi.entityService.update(
      "plugin::users-permissions.user",
      ctx.params.id,
      {
        data: {
          blocked: true,
        },
        populate: "deep,3",
      }
    );
    const {
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
      role,
      comments,
      avatar,
      booking,
      delivery,
      history,
    } = response;
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
      comments:
        comments?.map(({ id, rating, text, book }) => ({
          id,
          rating,
          text,
          bookId: book.id,
        })) || null,
      avatar: avatar?.url || null,
      booking: {
        id: booking?.id || null,
        order: booking?.order || null,
        dateOrder: booking?.dateOrder || null,
        book: booking?.book
          ? {
              id: booking.book.id,
              title: booking.book.title,
              rating: getRatingUser(booking.book.comments),
              issueYear: booking.book.issueYear,
              authors: booking.book.authors,
              image:
                booking.book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            }
          : null,
      },
      delivery: {
        id: delivery?.id || null,
        handed: delivery?.handed || null,
        dateHandedFrom: delivery?.dateHandedFrom || null,
        dateHandedTo: delivery?.dateHandedTo || null,
        book: delivery?.book
          ? {
              id: delivery.book.id,
              title: delivery.book.title,
              rating: getRatingUser(delivery.book.comments),
              issueYear: delivery.book.issueYear,
              authors: delivery.book.authors,
              image:
                delivery.book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            }
          : null,
      },
      history: {
        id: history?.id || null,
        books: history?.books?.length
          ? history.books.map(
              ({ id, title, comments, issueYear, authors, images }) => ({
                id,
                title,
                rating: getRatingUser(comments),
                issueYear,
                authors,
                image:
                  images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              })
            )
          : null,
      },
    };
    return user;
  };

  plugin.controllers.user.unblock = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep,3" };

    const client = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.params.id,
      {
        ...ctx.query,
        populate: "deep,2",
      }
    );
    if (!client) {
      return ctx.badRequest(
        "Ошибка блокирования. Пользователь не найден по данному id",
        {
          user: ctx.params.id,
        }
      );
    }

    const response = await strapi.entityService.update(
      "plugin::users-permissions.user",
      ctx.params.id,
      {
        data: {
          blocked: false,
        },
        populate: "deep,3",
      }
    );
    const {
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
      role,
      comments,
      avatar,
      booking,
      delivery,
      history,
    } = response;
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
      comments:
        comments?.map(({ id, rating, text, book }) => ({
          id,
          rating,
          text,
          bookId: book.id,
        })) || null,
      avatar: avatar?.url || null,
      booking: {
        id: booking?.id || null,
        order: booking?.order || null,
        dateOrder: booking?.dateOrder || null,
        book: booking?.book
          ? {
              id: booking.book.id,
              title: booking.book.title,
              rating: getRatingUser(booking.book.comments),
              issueYear: booking.book.issueYear,
              authors: booking.book.authors,
              image:
                booking.book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            }
          : null,
      },
      delivery: {
        id: delivery?.id || null,
        handed: delivery?.handed || null,
        dateHandedFrom: delivery?.dateHandedFrom || null,
        dateHandedTo: delivery?.dateHandedTo || null,
        book: delivery?.book
          ? {
              id: delivery.book.id,
              title: delivery.book.title,
              rating: getRatingUser(delivery.book.comments),
              issueYear: delivery.book.issueYear,
              authors: delivery.book.authors,
              image:
                delivery.book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            }
          : null,
      },
      history: {
        id: history?.id || null,
        books: history?.books?.length
          ? history.books.map(
              ({ id, title, comments, issueYear, authors, images }) => ({
                id,
                title,
                rating: getRatingUser(comments),
                issueYear,
                authors,
                image:
                  images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              })
            )
          : null,
      },
    };
    return user;
  };

  // plugin.policies[newPolicy] = (ctx) => {};

  plugin.routes["content-api"].routes.push({
    method: "GET",
    path: "/api/users/{id}/block",
    handler: "user.block",
  });

  plugin.routes["content-api"].routes.push({
    method: "GET",
    path: "/api/users/{id}/unblock",
    handler: "user.unblock",
  });

  return plugin;
};
