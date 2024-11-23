import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import verifyChat from "../middlewares/verifyChat.js";

const router = Router();

router.post("/sendMessage", protectedRoute, verifyChat, sendMessage);
router.get(
  "/getMessages/:receiverId/:receiverName",
  protectedRoute,
  verifyChat,
  getMessages
);

export default router;
