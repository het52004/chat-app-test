import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  verifyUser,
} from "../controllers/authentication.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";
import userImage from "../lib/multerConfig.js";

const app = express();

app.post(
  "/verifyUser",
  userImage.single("avatar"),
  verifyUser
);
app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/checkAuth", protectedRoute, checkAuth);

export default app;
