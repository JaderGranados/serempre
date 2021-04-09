import { assert, expect } from "chai";
import { Pagination } from "../src/interfaces/pagination.interface";
import { Product } from "../src/interfaces/product.interface";
import { ProductsServices } from "../src/services/products.services";
import { DataBaseConnection } from "../src/data/database";
import dotenv from "dotenv";
import { Dialect } from "sequelize/types";

let appService: ProductsServices;
let connection: DataBaseConnection;
before((done) => {
  dotenv.config();
  appService = new ProductsServices();
  connection = new DataBaseConnection(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    process.env.DB_HOST,
    process.env.DB_DIALECT as Dialect
  );
  connection.authenticate().then(() => done());
});

describe("getAll function tests",() => {
  it("regresa un Array", (done) => {
    let result: Pagination<Product>; 
    appService.getAll({
      page: 1,
      perPage: 5,
      order: "desc",
    }).then(value => {
        result = value;
        assert.typeOf<Array<Product>>(result.items, '[Array]');
        done();
    });
  });
});
