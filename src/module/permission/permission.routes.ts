import { Router } from "express";
import { PermissionService } from "./permission.service";

const router = Router()
const controller = new PermissionService()

router.post("/create", controller.createPermission.bind(controller))

export default router