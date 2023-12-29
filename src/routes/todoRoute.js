import express from "express";
import todoModel from "../mongodb/models/todoModel.js";

const router = express.Router();

// get todos
router.route("/").get(async (req, res) => {
  try {
    const { username } = req.body;
    const todos = await todoModel.find({ username });
    if (!todos) {
      throw new Error("Cannot get todo(s)");
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// update todo
router.route("/").patch(async (req, res) => {
  try {
    const { id, isFinished } = req.body;
    const todo = await todoModel.findOne({ _id: id });
    todo.isFinished = isFinished;
    const updatedTodo = await todo.save();
    if (!updatedTodo) {
      throw new Error("Cannot update todo");
    }
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// create todo
router.route("/").post(async (req, res) => {
  try {
    const { username, task } = req.body;
    const newTodo = new todoModel({
      username: username,
      task: task,
      isFinished: false,
    });
    const todoCreated = await newTodo.save();
    if (!todoCreated) {
      res.status(500).json({ message: "todo cannot be createad" });
    } else {
      res.status(201).json({ message: "todo created" });
    }
  } catch (error) {
    console.log(error);
  }
});
// delete todo
router.route("/").delete(async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      throw new Error("Not found");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
