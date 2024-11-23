import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
    deleteCurrentUser,
  getCurrentUserData,
  updateCurrentUserDetails,
} from "../controllers/currentUser.controller.js";

const router = Router();

router.get("/getCurrentUserData", protectedRoute, getCurrentUserData);
router.put("/updateCurrentUserDetails", protectedRoute, updateCurrentUserDetails);
router.delete("/deleteCurrentUser", protectedRoute, deleteCurrentUser);

export default router;
