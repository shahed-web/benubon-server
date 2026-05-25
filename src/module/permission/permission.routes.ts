import { Router } from "express";
import { PermissionController } from "./permission.controller";

const router = Router()
const controller = new PermissionController()

router.post("/create", controller.createPermission.bind(controller))

export default router