import {Router} from "express";
import { RoleController } from "./role.controller";

const router = Router();
const controller = new RoleController()

router.post("/create", controller.createRole.bind(controller))
router.post("/:roleId/permissions", controller.assignPermission.bind(controller))

export default router;