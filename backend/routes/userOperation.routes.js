import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  acceptFriendRequest,
  blockUser,
  cancelFriendRequest,
  rejectFriendRequest,
  removeFriend,
  searchUser,
  sendFriendRequest,
  unblockUser,
} from "../controllers/userOperation.controller.js";
import { getFriendRequestUserData, getincomingFriendRequestUserData, getOutgoingFriendRequestUserData, getUserDataById } from "../controllers/getRequestsData.controller.js";

const router = Router();
+
router.post("/searchUser", protectedRoute, searchUser);
router.put("/sendFriendRequest/:friendUserId", protectedRoute, sendFriendRequest);
router.put("/acceptFriendRequest/:friendUserId", protectedRoute, acceptFriendRequest);
router.delete("/removeFriend/:friendUserId", protectedRoute, removeFriend);
router.delete("/rejectFriendRequest/:friendUserId", protectedRoute, rejectFriendRequest);
router.delete("/cancelFriendRequest/:friendUserId", protectedRoute, cancelFriendRequest);
router.put("/blockUser/:friendUserId", protectedRoute, blockUser);
router.put("/unblockUser/:friendUserId", protectedRoute, unblockUser);

router.get("/getIncomingFriendRequestUserData", protectedRoute, getincomingFriendRequestUserData);
router.get("/getFriendsUserData", protectedRoute, getFriendRequestUserData);
router.get("/getOutgoingFriendRequestUserData", protectedRoute, getOutgoingFriendRequestUserData);
router.get("/getUserDataById/:userId", protectedRoute, getUserDataById);

export default router;
