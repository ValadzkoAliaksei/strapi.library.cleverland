/**
 * category controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { CategoryDataType, CategoryType } from "../../../types/categories";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx) {
      const { data }: CategoryDataType = await super.find(ctx);

      const categories: CategoryType[] = data.map(
        ({ attributes: { name, path }, id }) => ({
          name,
          path,
          id,
        })
      );
      return categories;
    },
  })
);
