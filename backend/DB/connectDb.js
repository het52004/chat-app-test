import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`error connection to database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
