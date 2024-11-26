import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";
import verifyChat from "../middlewares/verifyChat.js";

const router = Router();

router.post("/sendMessage", protectedRoute, sendMessage);
router.get("/getMessages/:receiverId", protectedRoute, getMessages);

router.get("/users", protectedRoute, getUsersForSidebar);

export default router;
