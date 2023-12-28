import express from "express";
import bcrypt from "bcrypt";
import userModel from "../mongodb/models/userModel.js";

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(
      "🚀 ~ file: registerRoute.js:10 ~ router.route ~ username:",
      username
    );

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(
      "🚀 ~ file: registerRoute.js:13 ~ router.route ~ hashedPassword:",
      hashedPassword
    );
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
