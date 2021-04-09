import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { OrderDetail as OderDetailsAttribute } from "../../interfaces/order-detail.interface";
import Products from "./products.model";

@Table({
  tableName: "oderdetails",
  timestamps: false,
})
export default class OrderDetails extends Model<
  OderDetailsAttribute,
  Optional<OderDetailsAttribute, "ProductID" | "OderID">
> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    field: "orderid",
  })
  OderID: number;
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    field: "productid",
  })
  ProductID: number;
  @Column({
    type: DataType.DECIMAL(14, 5),
    field: "unitprice",
  })
  UnitPrice: number;
  @Column({
    type: DataType.SMALLINT,
    field: "quantity",
  })
  Quantity: number;
  @Column({
    type: DataType.FLOAT,
    field: "discount",
  })
  Discount: number;

  @BelongsTo(() => Products, {
    foreignKey: "ProductId",
    constraints: false,
  })
  Products: Products;
}
