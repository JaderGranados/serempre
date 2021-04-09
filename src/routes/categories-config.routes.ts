import { Request, Response, Router } from "express";
import { Pagination } from "../interfaces/pagination.interface";
import { ServerResponse } from "../interfaces/server-response.interface";
import { PaginationQuery } from "../interfaces/pagination-query.interface";
import { CategoriesServices } from "../services/categories.services";
import { BaseRoutesConfig } from "./base-config.routes";
import { Category } from "../interfaces/category.interface";

export class CategoriesRoutesConfig extends BaseRoutesConfig {
  private readonly service: CategoriesServices;
  constructor(pathBase: string) {
    super("CategoriesRoutes", pathBase);
    this.service = new CategoriesServices();
  }

  configureRoutes(): Router {
    const router = Router();

    router.get(
      "/:id/products",
      async (request: Request<Partial<PaginationQuery & {id:number}>>, response: Response) => {
        let codeResult = this.successStatus;
        const query: Partial<PaginationQuery> = request.query;
        const categoryId = Number(request.params.id) || undefined;
        const result: ServerResponse<Pagination<Category>> = {
            success: true,
          };
        try {
            result.data = await this.service.getByIdProductsQuery(query, categoryId);
          } catch (error) {
            console.error(error);
            codeResult = this.failureStatus;
            result.success = false;
            result.errorMessage = error.message;
          }
          response.status(codeResult).send(result);
      }
    );

    return router;
  }
}
