import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import {registerController, loginController, authController, addToCreatedTasks, addToCompletedTasks, deleteTask, fetchUserDataController} from "../controllers/userCtrl.js"

const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

router.post('/getUserData', authMiddleware, authController)

router.post("/addToCreatedTasks", authMiddleware, addToCreatedTasks);

router.post("/addToCompletedTasks", authMiddleware, addToCompletedTasks);

router.delete("/deleteTask/:taskId", authMiddleware, deleteTask);

router.get('/fetchUserData', authMiddleware, fetchUserDataController)

export default router;