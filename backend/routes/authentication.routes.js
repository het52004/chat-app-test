import express from "express";
import {
  login,
  logout,
  signup,
} from "../controllers/authentication.controller.js";

const app = express();

app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);

export default app;
