import express, {Application} from "express";
import dotenv from "dotenv";
import { BaseRoutesConfig } from "./routes/base-config.routes";
import { ProductsRoutesConfig } from "./routes/products-config.routes";
import { Server, createServer } from "http";
import {DataBaseConnection} from "./data/database";
import { Dialect } from "sequelize/types";
import { CategoriesRoutesConfig } from "./routes/categories-config.routes";
import { SuppliersRoutesConfig } from "./routes/suppliers-config.routes";

if (process.env.NODE_ENV === 'production'){
    dotenv.config();
}else{
    dotenv.config({path: './debug.env'});
}
const port = process.env.PORT || 5000;
const app: Application = express();
const server: Server = createServer(app);
const routes: Array<BaseRoutesConfig> = [];
const connection = new DataBaseConnection(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    process.env.DB_HOST,
    process.env.DB_DIALECT as Dialect
);

routes.push(new ProductsRoutesConfig('/api/products'));
routes.push(new CategoriesRoutesConfig('/api/categories'));
routes.push(new SuppliersRoutesConfig('/api/suppliers'));
app.use(express.json());

server.listen(port, () => {
    console.log(`App running on port ${port}`);
    connection.authenticate();
    routes.forEach(route => {
        app.use(route.getPathBase(), route.configureRoutes());
        console.log(`Route configured for ${route.getName()}`);
    })
})
