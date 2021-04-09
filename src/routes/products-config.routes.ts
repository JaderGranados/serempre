import { Request, Response, Router } from "express";
import { ServerResponse } from "../interfaces/server-response.interface";
import { PaginationQuery } from "../interfaces/pagination-query.interface";
import { ProductsServices } from "../services/products.services";
import { BaseRoutesConfig } from "./base-config.routes";
import { Pagination } from "../interfaces/pagination.interface";
import { Product } from "../interfaces/product.interface";

export class ProductsRoutesConfig extends BaseRoutesConfig {
  private readonly service: ProductsServices;
  constructor(pathBase: string) {
    super("ProductsRoutes", pathBase);
    this.service = new ProductsServices();
  }
  configureRoutes(): Router {
    // Routes config
    const router: Router = Router();
    try {
      router
        .route("")
        .get(
          async (
            request: Request<Partial<PaginationQuery>>,
            response: Response
          ) => {
            let codeResult = this.successStatus;
            const query: Partial<PaginationQuery> = request.query;
            const result: ServerResponse<Pagination<Product>> = {
              success: true,
            };
            try {
              result.data = await this.service.getAll(query);
            } catch (error) {
              console.error(error);
              codeResult = this.failureStatus;
              result.success = false;
              result.errorMessage = error.message;
            }
            response.status(codeResult).send(result);
          }
        )
        .post(async (request: Request, response: Response) => {
          let codeResult = this.successStatus;
          const datosProducto: Omit<
            Product,
            "ProductID"
          > = request.body || undefined;
          const result: ServerResponse<Product> = {
            success: true,
          };
          try {
            result.data = await this.service.create(datosProducto);
          } catch (error) {
            console.error(error);
            codeResult = this.failureStatus;
            result.success = false;
            result.errorMessage = error.message;
          }
          response.status(codeResult).send(result);
        });

      router.get("/search", async (request: Request, response: Response) => {
        let codeResult = this.successStatus;
        const productName: string = request.query.product
            ? String(request.query.product)
            : undefined,
          categoryName: string = request.query.category
            ? String(request.query.category)
            : undefined,
          supplierName: string = request.query.supplier
            ? String(request.query.supplier)
            : undefined;
        const result: ServerResponse<Product> = {
          success: true,
        };
        try {
          result.data = await this.service.search(
            productName,
            categoryName,
            supplierName
          );
        } catch (error) {
          console.error(error);
          codeResult = this.failureStatus;
          result.success = false;
          result.errorMessage = error.message;
        }
        response.status(codeResult).send(result);
      });

      router
        .route("/:id")
        .get(async (request: Request, response: Response) => {
          let codeResult = this.successStatus;
          const productId: number = Number(request.params.id) || undefined;
          const result: ServerResponse<Product> = {
            success: true,
          };

          try {
            result.data = await this.service.getById(productId);
          } catch (error) {
            console.error(error);
            codeResult = this.failureStatus;
            result.success = false;
            result.errorMessage = error.message;
          }
          response.status(codeResult).send(result);
        })
        .put(async (request: Request, response: Response) => {
          let codeResult = this.successStatus;
          const productId: number = Number(request.params.id) || undefined;
          const datosProducto: Omit<
            Product,
            "ProductID" | "Category" | "Supplier"
          > = request.body || undefined;
          const result: ServerResponse<Product> = {
            success: true,
          };
          try {
            result.data = await this.service.update(datosProducto, productId);
          } catch (error) {
            console.error(error);
            codeResult = this.failureStatus;
            result.success = false;
            result.errorMessage = error.message;
          }
          response.status(codeResult).send(result);
        });
    } catch (error) {
      throw error;
    }
    return router;
  }
}
