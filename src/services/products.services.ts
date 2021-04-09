import { Op } from "sequelize";
import { Product } from "../interfaces/product.interface";
import { PaginationQuery } from "../interfaces/pagination-query.interface";
import { Pagination } from "../interfaces/pagination.interface";
import ProductSchema from "../data/models/products.model";
import Categories from "../data/models/categories.model";
import Suppliers from "../data/models/suppliers.model";

export class ProductsServices {
  public async getAll(
    paginationQuery: Partial<PaginationQuery>
  ): Promise<Pagination<Product>> {
    try {
      if (
        !paginationQuery.page ||
        !paginationQuery.order ||
        !paginationQuery.perPage
      ) {
        throw new Error("Need arguments");
      }
      const products = await ProductSchema.findAll({
        order: [["productid", paginationQuery.order.toUpperCase()]],
        limit: paginationQuery.perPage,
        offset: (paginationQuery.page - 1) * paginationQuery.perPage,
        include: [
          {
            model: Categories,
            as: "Category",
            all: true,
            foreignKey: 'CategoryID'
          },
          {
            model: Suppliers,
            as: "Supplier",
            all: true,
            foreignKey: 'SupplierID',
            identifier: 'SupplierID',
            isSingleAssociation: true
          },
        ],
      });
      const totalProducts = await ProductSchema.count();
      return {
        currentPage: paginationQuery.page,
        items: products,
        perPage: paginationQuery.perPage,
        total: totalProducts,
      };
    } catch (error) {
      throw error;
    }
  }

  public async search(
    productName: string,
    categoryName: string,
    contactName: string
  ): Promise<Array<Product>> {
    try {
      const whereArray: any[] = [];

      if (productName) {
        whereArray.push({
          ProductName: { [Op.like]: `%${productName || ""}%` },
        });
      }
      if (categoryName) {
        whereArray.push({
          "$Category.categoryname$": { [Op.like]: `%${categoryName || ""}%` },
        });
      }
      if (contactName) {
        whereArray.push({
          "$Supplier.contactname$": { [Op.like]: `%${contactName || ""}%` },
        });
      }

      if (whereArray.length == 0) {
        throw new Error("Should send at least one search criterial");
      }
      const products = await ProductSchema.findAll({
        include: [
          {
            model: Categories,
            all: true,
            as: "Category",
          },
          {
            model: Suppliers,
            all: true,
            as: "Supplier",
          },
        ],
        where: {
          [Op.or]: whereArray,
        },
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  public async getById(productId: number): Promise<Product> {
    try {
      if (!productId) {
        throw new Error("ProjectId it's needed");
      }

      return await ProductSchema.findByPk(productId, {
        include: [
          {
            model: Categories,
            all: true,
            as: "Category",
          },
          {
            model: Suppliers,
            all: true,
            as: "Supplier",
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public async create(
    product: Omit<Required<Product>, "ProductID" >
  ): Promise<Product> {
    try {
      if (!product) {
        throw new Error("Should send product data");
      } else if (
        Object.values(product).reduce((prev, current, i, array) => {
          return current == null || prev;
        }, false)
      ) {
        throw new Error("Cannot send empty data");
      }
      return await ProductSchema.create(product, {
        include: [
          {
            model: Categories,
            all: true,
            as: "Category",
          },
          {
            model: Suppliers,
            all: true,
            as: "Supplier",
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public async update(
    product: Omit<Required<Product>, "ProductID" | "Category" | "Supplier">,
    productId: number
  ): Promise<Product> {
    try {
      if (!product) {
        throw new Error("Should send product data");
      }

      await ProductSchema.update(product, { where: {ProductID: productId}});
      return await ProductSchema.findByPk(productId); 
    } catch (error) {
      throw error;
    }
  }
}
