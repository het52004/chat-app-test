import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  verifyUser,
} from "../controllers/authentication.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const app = express();

app.post("/verifyUser", verifyUser);
app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/checkAuth", protectedRoute, checkAuth);

export default app;
