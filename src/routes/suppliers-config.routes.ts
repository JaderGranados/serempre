import { Request, Response, Router } from "express";
import { Supplier } from "../interfaces/supplier.interface";
import { ServerResponse } from "../interfaces/server-response.interface";
import { SuppliersServices } from "../services/suppliers.services";
import { BaseRoutesConfig } from "./base-config.routes";

export class SuppliersRoutesConfig extends BaseRoutesConfig {
  private readonly service: SuppliersServices;
  constructor(pathBase: string) {
    super("SuppliersRoutes", pathBase);
    this.service = new SuppliersServices();
  }

  configureRoutes(): Router {
    const router = Router();

    router
      .route("/:id")
      .get(async (request: Request, response: Response) => {
        let codeResult = this.successStatus;
        const supplierId = Number(request.params.id) || undefined;
        const result: ServerResponse<Supplier> = {
          success: true,
        };
        try {
          result.data = await this.service.getBasicData(supplierId);
        } catch (error) {
          console.error(error);
          codeResult = this.failureStatus;
          result.success = false;
          result.errorMessage = error.message;
        }
        response.status(codeResult).send(result);
      })
      .delete(async (request: Request, response: Response) => {
        let codeResult = this.successStatus;
        const supplierId = Number(request.params.id) || undefined;
        const result: ServerResponse<Supplier> = {
          success: true,
        };
        try {
          result.data = await this.service.removeById(supplierId);
        } catch (error) {
          console.error(error);
          codeResult = this.failureStatus;
          result.success = false;
          result.errorMessage = error.message;
        }
        response.status(codeResult).send(result);
      });

    router.get(
      "/:id/products",
      async (request: Request, response: Response) => {
        let codeResult = this.successStatus;
        const supplierId = Number(request.params.id) || undefined;
        const result: ServerResponse<Supplier> = {
          success: true,
        };
        try {
          result.data = await this.service.getById(supplierId);
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
