import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  deleteCurrentUser,
  getCurrentUserData,
  updateCurrentUserDetails,
} from "../controllers/currentUser.controller.js";
import userImage from "../lib/multerConfig.js";

const router = Router();

router.get("/getCurrentUserData", protectedRoute, getCurrentUserData);
router.post(
  "/updateCurrentUserDetails",
  userImage.single("avatar"),
  protectedRoute,
  updateCurrentUserDetails
);
router.delete("/deleteCurrentUser", protectedRoute, deleteCurrentUser);

export default router;
