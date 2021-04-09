import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { Supplier as SupplierAttribute } from "../../interfaces/supplier.interface";
import Products from "./products.model";

@Table({
  tableName: "suppliers",
  timestamps: false,
})
export default class Suppliers extends Model<
  SupplierAttribute,
  Optional<SupplierAttribute, "SupplierID">
> {
  @AutoIncrement
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    field: "supplierid",
  })
  SupplierID: number;
  @Column({
    type: DataType.STRING(40),
    field: "companyname",
    allowNull: false,
  })
  CompanyName: string;
  @Column({
    type: DataType.STRING(30),
    field: "contactname",
    allowNull: false,
  })
  ContactName: string;
  @Column({
    type: DataType.STRING(30),
    field: "contacttitle",
    allowNull: false,
  })
  ContactTitle: string;
  @Column({
    type: DataType.STRING(60),
    field: "address",
    allowNull: false,
  })
  Address: string;
  @Column({
    type: DataType.STRING(15),
    field: "city",
    allowNull: false,
  })
  City: string;
  @Column({
    type: DataType.STRING(15),
    field: "region",
  })
  Region?: string;
  @Column({
    type: DataType.STRING(10),
    field: "postalcode",
    allowNull: false,
  })
  PostalCode: string;
  @Column({
    type: DataType.STRING(15),
    field: "country",
    allowNull: false,
  })
  Country: string;
  @Column({
    type: DataType.STRING(24),
    field: "phone",
    allowNull: false,
  })
  Phone: string;
  @Column({
    type: DataType.STRING(24),
    field: "fax",
  })
  Fax?: string;
  @Column({
    type: DataType.TEXT,
    field: "homepage",
  })
  HomePage?: string;

  @HasMany(() => Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "SupplierID",
    constraints: false,
  })
  Products: Products[];
}
