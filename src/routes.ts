import type { Application } from "express";
import authRoutes from "./module/auth/auth.routes"
import categoryRoutes from "./module/category/category.routes";
import productRoutes from "./module/product/product.routes";
import permissionRoutes from "./module/permission/permission.routes";
import mediaRoutes from "./module/media/media.routes";
import artisanRoutes from "./module/artisan/artisan.routes"
import buyerRoutes from "./module/buyer/buyer.routes"

export default async (app: Application) => {
    app.use("/api/category", categoryRoutes)
    app.use("/api/product", productRoutes)
    app.use("/api/auth", authRoutes)
    app.use("/api/permission", permissionRoutes)
    app.use("/api/artisan", artisanRoutes)
    app.use("/api/buyer", buyerRoutes)

    app.use("/api/media", mediaRoutes)
}