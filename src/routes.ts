import type { Application } from "express";
import authRoutes from "./module/auth/auth.routes"
import categoryRoutes from "./module/category/category.routes";
import productRoutes from "./module/product/product.routes";
import permissionRoutes from "./module/permission/permission.routes";
import mediaRoutes from "./module/media/media.routes";

export default async (app: Application) => {
    app.use("/api/category", categoryRoutes)
    app.use("/api/product", productRoutes)
    app.use("/api/auth", authRoutes)
    app.use("/api/permission", permissionRoutes)

    app.use("/api/media", mediaRoutes)
}