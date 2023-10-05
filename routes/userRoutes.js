import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import {registerController, loginController, authController} from "../controllers/userCtrl.js"

const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

router.post('/getUserData', authMiddleware, authController)

export default router;