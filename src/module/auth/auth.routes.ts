import {Router} from "express"
import { AuthController } from "./auth.controller"
import { AuthMiddleware } from "../../middleware/auth.middleware"


const router = Router()
const controller = new AuthController()
const middleware = new AuthMiddleware()

router.post("/refresh-token", controller.refreshTokenHandler.bind(controller))

router.post("/login", controller.login.bind(controller))
router.post("/logout", controller.logout.bind(controller))
router.post("/signup", controller.register.bind(controller))

router.get("/verify", [middleware.authUserCheck],controller.authUserData.bind(controller))

export default router