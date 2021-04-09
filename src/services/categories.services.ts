import { Category } from "../interfaces/category.interface";
import { Pagination } from "../interfaces/pagination.interface";
import { PaginationQuery } from "../interfaces/pagination-query.interface";
import CategoriesSchema from "../data/models/categories.model";
import Products from "../data/models/products.model";

export class CategoriesServices {
  public async getByIdProductsQuery(
    paginationQuery: Partial<Omit<PaginationQuery, "order">>,
    categoryId: number
  ): Promise<Pagination<Category>> {
    try {
      if (!paginationQuery.page || !paginationQuery.perPage) {
        throw new Error("Need arguments");
      }

      if (!categoryId) {
        throw new Error("Category Id is required");
      }
      const products = await CategoriesSchema.findAll({
        limit: paginationQuery.perPage,
        offset: (paginationQuery.page - 1) * paginationQuery.perPage,
        subQuery: false,
        include: [
          {
            model: Products,
            as: "Products",
            all: true,
          },
        ],
        where: {
          CategoryID: categoryId,
        },
      });
      const totalCategories = await CategoriesSchema.count();
      return {
        currentPage: paginationQuery.page,
        items: products,
        perPage: paginationQuery.perPage,
        total: totalCategories,
      };
    } catch (error) {
      throw error;
    }
  }
}
