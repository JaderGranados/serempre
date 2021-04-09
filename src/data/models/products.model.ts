import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { Product as ProductAttributes } from "../../interfaces/product.interface";
import Categories from "./categories.model";
import OrderDetails from "./oder-details.model";
import Suppliers from "./suppliers.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class Products extends Model<
  ProductAttributes,
  Optional<ProductAttributes, "ProductID">
> {
  @AutoIncrement
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    field: "productid",
    autoIncrement: true
  })
  ProductID: number;
  @Column({
    type: DataType.STRING(40),
    field: "productname",
  })
  ProductName: string;
  @Column({
    type: DataType.INTEGER,
    field: "supplierid",
  })
  SupplierID: number;
  @Column({
    type: DataType.INTEGER,
    field: "categoryid",
  })
  @ForeignKey(() => Categories)
  CategoryID: number;
  @Column({
    type: DataType.STRING(20),
    field: "quantityperunit",
  })
  QuantityPerUnit: string;
  @Column({
    type: DataType.DECIMAL(14, 4),
    field: "unitprice",
  })
  UnitPrice: number;
  @Column({
    type: DataType.SMALLINT,
    field: "unitsinstock",
  })
  UnitsInStock: number;
  @Column({
    type: DataType.SMALLINT,
    field: "unitsonorder",
  })
  UnitsOnOrder: number;
  @Column({
    type: DataType.SMALLINT,
    field: "recorderlevel",
  })
  RecorderLevel: number;
  @Column({
    type: DataType.BOOLEAN,
    field: "discontinued",
  })
  Discontinued: number;

  @BelongsTo(() => Categories, 'CategoryID')
  Category: Categories;

  @BelongsTo(() => Suppliers, 'SupplierID')
  Supplier: Suppliers;

  @HasMany(() => OrderDetails, {
    foreignKey: 'ProductID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  OrderDetails: OrderDetails[]
}
