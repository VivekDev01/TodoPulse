import express from "express";
import dotenv from "dotenv"
import mongoose from 'mongoose';
import "colors"
import morgan from "morgan";
import router from "./routes/userRoutes.js"

dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Server Issue ${error}`.bgRed.white);
  }
};
connectDB();

const app=express();

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/user", router);


// Running the server
const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
});