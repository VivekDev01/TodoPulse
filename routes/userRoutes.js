import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import {registerController, loginController, authController, addToCreatedTasks, deleteTask, fetchUserDataController, deleteCompletedTaskController, toggleTaskController} from "../controllers/userCtrl.js"

const router = express.Router()

router.post("/register", registerController)

router.post("/login", loginController)

router.post('/getUserData', authMiddleware, authController)

router.post("/addToCreatedTasks", authMiddleware, addToCreatedTasks);

router.delete("/deleteTask/:taskId", authMiddleware, deleteTask);

router.get('/fetchUserData', authMiddleware, fetchUserDataController)

router.post("/toggleTask/:taskId", authMiddleware, toggleTaskController);

router.delete("/deleteCompletedTask/:taskId", authMiddleware, deleteCompletedTaskController);

export default router;