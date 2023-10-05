import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: 'User already exist', success: false })
        }
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        //if password not matches
        if (password !== confirmPassword) {
            return res.status(200).send({ message: 'Confirm Password not matchs', success: false })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                completedTasks: [],
                createdTasks: []
            }
        )
        await newUser.save()
        res.status(201).send({ message: 'Registered Successfully', success: true });


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register controller ${error.message}` })
    }
};


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid Email or Password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "User not found", success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Auth Error',
            success: false,
            error
        })
    }
}



const addToCreatedTasks = async (req, res) => {
    try {
        const { text } = req.body;
        const user = await userModel.findById(req.body.userId);
        user.createdTasks.push({ text });
        await user.save();
        res.status(200).send({
            message: 'Task added to created tasks',
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error adding task to created tasks', success: false });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const user = await userModel.findById(req.body.userId);
        user.createdTasks.splice(taskId, 1);
        await user.save();
        res.status(200).send({
            message: 'Task deleted successfully',
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error deleting task', success: false });
    }
};


const fetchUserDataController = async (req, res) => {
    try {
        const user= await userModel.findById(req.body.userId);
        res.status(200).send({
            message: 'User data fetched successfully',
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error fetching user data', success: false });
    }
}

const toggleTaskController = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { taskType } = req.body;
      const user = await userModel.findById(req.body.userId);
  
      let sourceArray, destinationArray;
      if (taskType === "completedTasks") {
        sourceArray = user.completedTasks;
        destinationArray = user.createdTasks;
      } else {
        sourceArray = user.createdTasks;
        destinationArray = user.completedTasks;
      }
  
      const task = sourceArray.splice(taskId, 1)[0];
      task.isCompleted = !task.isCompleted;
      destinationArray.push(task);
  
      await user.save();
  
      res.status(200).send({
        message: 'Task toggled successfully',
        success: true,
        data: user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Error toggling task', success: false });
    }
  };
  
  const deleteCompletedTaskController = async (req, res) => {
    try {
      const { taskId } = req.params;
      const user = await userModel.findById(req.body.userId);
      user.completedTasks.splice(taskId, 1);
      await user.save();
      res.status(200).send({
        message: 'Completed task deleted successfully',
        success: true,
        data: user
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Error deleting completed task', success: false });
    }
  };
  
  
  


export { registerController, loginController, authController, addToCreatedTasks, deleteTask, fetchUserDataController, deleteCompletedTaskController, toggleTaskController }