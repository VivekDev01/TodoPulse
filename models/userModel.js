import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    completedTasks: [taskSchema],
    createdTasks: [taskSchema]
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
