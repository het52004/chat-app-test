import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/authentication.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const app = express();

app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/checkAuth", protectedRoute, checkAuth);

export default app;
