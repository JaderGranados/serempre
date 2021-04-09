import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import Categories from "./models/categories.model";
import OrderDetails from "./models/oder-details.model";
import Products from "./models/products.model";
import Suppliers from "./models/suppliers.model";

export class DataBaseConnection {
  private connection: Sequelize;
  constructor(
    private database: string,
    private username: string,
    private password: string,
    private host: string,
    private dialect: Dialect
  ) {
    this.connection = new Sequelize(this.database, this.username, this.password, {
      dialect: this.dialect,
      host: this.host,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    });

    this.connection.addModels([Products, Categories, Suppliers, OrderDetails]);
  }

  public async authenticate() {
    this.connection
      .authenticate()
      .then(() => {
        console.log(`Database connected`);
      })
      .catch((error) => {
        console.log(error);
      });
      await this.connection.sync();
      // this.connection.sync({force: true}).then(() => console.log(`Actualizado`)).catch((error) => console.error(error));
  }
}
