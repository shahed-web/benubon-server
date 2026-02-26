import type { Application } from "express";
import categoryRoutes from "./module/category/category.routes";
import productRoutes from "./module/product/product.routes";

export default async (app: Application) => {
    app.use("/api/category", categoryRoutes)
    app.use("/api/product", productRoutes)
}