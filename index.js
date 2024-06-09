import * as dotenv from "dotenv";
import express from "express";
import { handleLogin } from "./controllers/authController.js";
import {
  handleRegister,
  handleDelete,
  handleGetUser,
} from "./controllers/userController.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/login", handleLogin);
app.post("/register", handleRegister);
app.delete("/user/:uid", handleDelete);
app.get("/user/:uid", handleGetUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
