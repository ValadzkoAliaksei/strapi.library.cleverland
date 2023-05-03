import { Strapi } from "@strapi/strapi";

export default {
  deleteOldBooking: {
    task: async ({ strapi }: { strapi: Strapi }) => {
      await strapi.service("api::booking.booking").deleteOld();
    },
    options: {
      rule: "1 0 0 * * *",
    },
  },
};
