import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connectDB.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import todoRoute from "./routes/todoRoute.js";
import isLoggedIn from "./middleware/isLoggedIn.js";

dotenv.config();
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1/register", registerRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/todo", todoRoute);

app.get("/", (req, res) => {
  res.status(200).json("hello from server");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("success");
});

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB(process.env.MONGODB_URL);
  });
}

startServer();
