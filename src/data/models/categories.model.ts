import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize/types";
import { Category as CategoryAttribute } from "../../interfaces/category.interface";
import Products from "./products.model";

@Table({
  tableName: "categories",
  timestamps: false,
})
export default class Categories extends Model<
  CategoryAttribute,
  Optional<CategoryAttribute, "CategoryID">
> {
  @AutoIncrement
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    field: "categoryid",
  })
  CategoryID: number;
  @Column({
    type: DataType.STRING(15),
    field: "categoryname",
  })
  CategoryName: string;
  @Column({
    type: DataType.TEXT,
    field: "description",
  })
  Description?: string;
  @Column({
    type: DataType.BLOB,
    field: "picture",
  })
  Picture?: Buffer;

  @HasMany(() => Products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "CategoryID",
    constraints: false,
  })
  Products: Products[];
}
