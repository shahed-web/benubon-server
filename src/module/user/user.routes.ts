import {Router} from "express"
import { UserController } from "./user.controller";

const router = Router()

const controller = new UserController()

router.get("/get-users", controller.getUser.bind(controller))

router.get("/details/:userId", controller.userDetails.bind(controller))

router.post("/create", controller.createUser.bind(controller))

router.put("/:userId/assign-role", controller.assignRole.bind(controller))

export default router;