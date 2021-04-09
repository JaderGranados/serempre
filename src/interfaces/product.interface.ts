import { Category } from "./category.interface";
import { Supplier } from "./supplier.interface";

export interface Product{
    ProductID: number;
    ProductName: string;
    SupplierID: number;
    CategoryID: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
    RecorderLevel: number;
    Discontinued: number,
    Category: Category,
    Supplier: Supplier
}