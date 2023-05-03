export type ListService = GenericService & {
  deleteOld(ctx: any): Promise<any>;
};

import { factories } from "@strapi/strapi";
import { GenericService } from "@strapi/strapi/lib/core-api/service";

export default factories.createCoreService<ListService>(
  "api::booking.booking",
  ({ strapi }) =>
    ({
      async deleteOld(ctx) {
        const bookings: any = await strapi
          .service("api::booking.booking")
          .find(ctx);
        for (let i = 0; i < bookings.results.length; i++) {
          if (
            Date.parse(bookings.results[i].dateOrder) <
            Date.now() - 86400000
          ) {
            const deleteBooking: any = await strapi
              .service("api::booking.booking")
              .delete(bookings.results[i].id as never, {});
            console.log(deleteBooking);
          }
        }

        return bookings;
      },
    } as ListService)
);
