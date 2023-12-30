import express from "express";
import bcrypt from "bcrypt";
import userModel from "../mongodb/models/userModel.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username: username,
      password: hashedPassword,
    });

    const userCreated = await newUser.save();
    if (!userCreated) {
      console.log("user cannot be created");
      return res.status(500).json({ message: "user cannot be created" });
    } else {
      console.log("user has been created ");
      return res.status(200).json({ message: "user has been created" });
    }

    // res.status(200).json({ username, hashedPassword });
  } catch (error) {
    console.log(error);
  }
});

export default router;
