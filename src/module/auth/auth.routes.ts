import {Router} from "express"
import { AuthController } from "./auth.controller"


const router = Router()
const controller = new AuthController()

router.get("/refresh-token", controller.refreshTokenHandler.bind(controller))

router.post("/login", controller.login.bind(controller))
router.post("/register", controller.register.bind(controller))

export default router