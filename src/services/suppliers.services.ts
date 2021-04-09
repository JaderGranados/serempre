import { Supplier } from "../interfaces/supplier.interface";
import SupplierSchema from "../data/models/suppliers.model";
import Products from "../data/models/products.model";

export class SuppliersServices {
  public async getBasicData(supplierId: number): Promise<Supplier> {
    try {
      if (!supplierId) {
        throw new Error("Supplier Id is required");
      }
      return await SupplierSchema.findByPk(supplierId);
    } catch (error) {
      throw error;
    }
  }

  public async getById(supplierId: number): Promise<Supplier> {
    try {
      if (!supplierId) {
        throw new Error("Supplier Id is required");
      }
      return await SupplierSchema.findByPk(supplierId, {
        include: [
          {
            model: Products,
            all: true,
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeById(supplierId: number): Promise<Supplier> {
    try {
      if (!supplierId) {
        throw new Error("Supplier Id is required");
      }
      const result = await SupplierSchema.findByPk(supplierId, {
        include: [
          {
            model: Products,
            all: true,
          },
        ],
      });

      await SupplierSchema.destroy({ where: { SupplierID: supplierId } });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
