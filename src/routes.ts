import type { Application } from "express";
import categoryRoutes from "./module/category/category.routes";

export default (app: Application) => {
    app.use("/api/category/", categoryRoutes)
}