import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(url);
    if (connection) {
      console.log("connected to database");
    } else {
      console.log((error) => error);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;
