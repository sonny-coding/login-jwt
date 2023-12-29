import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  task: { type: String, required: true },
  isFinished: { type: Boolean, required: true },
});

const todoModel = mongoose.model("Todo", todoSchema);
export default todoModel;
