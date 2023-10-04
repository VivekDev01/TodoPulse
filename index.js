import express from "express";
import dotenv from "dotenv"
import mongoose from 'mongoose';
import "colors"

const app=express();
dotenv.config();
app.use(express.json());

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

console.log("hello world -> console")

const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
});