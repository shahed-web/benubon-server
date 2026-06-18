import { Router } from "express";
import { PermissionController } from "./permission.controller";

const router = Router()
const controller = new PermissionController()

router.post("/create", controller.createPermission.bind(controller))

router.get("/get-permissions", controller.getPermissions.bind(controller))
router.get("view/:id", controller.viewPermission.bind(controller))

router.put("/update-permission/:id", controller.updatePermission.bind(controller))
router.delete("/delete-permission/:id", controller.deletePermission.bind(controller))

export default router