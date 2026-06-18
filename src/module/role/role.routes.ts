import {Router} from "express";
import { RoleController } from "./role.controller";

const router = Router();
const controller = new RoleController()

router.get("/get-roles", controller.getRoles.bind(controller))

router.get("/details/:id", controller.getRoleById.bind(controller))

router.post("/create", controller.createRole.bind(controller))
router.post("/:roleId/permissions", controller.assignPermission.bind(controller))

router.put("/update-role/:id", controller.updateRole.bind(controller))



router.delete("/delete-role/:id", controller.deleteRole.bind(controller))

export default router;