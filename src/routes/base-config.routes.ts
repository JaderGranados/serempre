import { Application, Router } from "express";

export abstract class BaseRoutesConfig {
  protected readonly successStatus: number = 200;
  protected readonly failureStatus: number = 500;
  constructor(private name: string, private pathBase: string) {}

  getName(): string {
    return this.name;
  }

  getPathBase(): string {
    return this.pathBase;
  }

  abstract configureRoutes(): Router;
}
