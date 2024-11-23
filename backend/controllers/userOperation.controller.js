import checkIsFriend from "../helpers/checkIsFriend.js";
import { generateToken } from "../helpers/generateToken.js";
import User from "../models/user.model.js";

export const searchUser = async (req, res) => {
  const { uniqueName } = req.body;
  if (uniqueName.length < 2) {
    return res.json({
      success: false,
      message: "Length of uniqueName must be geater than 3!",
    });
  }
  try {
    const regex = new RegExp(`^${uniqueName}`, "i");
    const foundUsers = await User.find({
      uniqueName: { $regex: regex },
    }).select("-password");
    if (foundUsers.length === 0) {
      res.json({ success: false, message: "No users found!" });
    } else {
      foundUsers.password = undefined;
      res.json({
        success: true,
        message: "User found",
        searchedUsersData: foundUsers,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured while searching the user!",
    });
  }
};

export const sendFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(userId, friendUserId, "sendFriendRequest");
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        { $push: { outgoingFriendRequests: friendUserId } },
        { new: true }
      );
      const updatedFriendProfile = await User.findByIdAndUpdate(
        friendUserId,
        { $push: { incomingFriendRequests: userId } },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        friendData: updatedFriendProfile,
        message: `Friend request sent to user ${updatedFriendProfile.uniqueName} successfully!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Failed to send friend request!",
      });
    }
  }
};

export const acceptFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(
    userId,
    friendUserId,
    "acceptFriendRequest"
  );
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { incomingFriendRequests: friendUserId },
          $push: { friends: friendUserId },
        },

        { new: true }
      );
      const updatedFriendProfile = await User.findByIdAndUpdate(
        friendUserId,
        {
          $pull: { outgoingFriendRequests: userId },
          $push: { friends: userId },
        },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        message: `You are now friends with user ${updatedFriendProfile.uniqueName}!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Failed to accept friend request!",
      });
    }
  }
};

export const removeFriend = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(userId, friendUserId, "removeFriend");
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { friends: friendUserId },
        },

        { new: true }
      );
      const updatedFriendProfile = await User.findByIdAndUpdate(
        friendUserId,
        {
          $pull: { friends: userId },
        },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        message: `Removed ${updatedFriendProfile.uniqueName} from friend list!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Failed to accept friend request!",
      });
    }
  }
};

export const rejectFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(
    userId,
    friendUserId,
    "rejectFriendRequest"
  );
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { incomingFriendRequests: friendUserId },
        },
        { new: true }
      );
      const updatedFriendProfile = await User.findByIdAndUpdate(
        friendUserId,
        {
          $pull: { outgoingFriendRequests: userId },
        },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        message: `Friend request of user ${updatedFriendProfile.uniqueName} has been rejected!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Failed to reject friend request!",
      });
    }
  }
};

export const cancelFriendRequest = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(
    userId,
    friendUserId,
    "cancelFriendRequest"
  );
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { outgoingFriendRequests: friendUserId },
        },

        { new: true }
      );
      const updatedFriendProfile = await User.findByIdAndUpdate(
        friendUserId,
        {
          $pull: { incomingFriendRequests: userId },
        },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        friendData: updatedFriendProfile,
        message: `Friend sent to user ${updatedFriendProfile.uniqueName} has been cancelled!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Failed to cancel friend request!",
      });
    }
  }
};

export const blockUser = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(userId, friendUserId, "blockUser");
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        {
          $push: { blockedUsers: friendUserId },
        },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        message: `User has been blocked successfully!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({ success: false, message: "Failed to block user!" });
    }
  }
};

export const unblockUser = async (req, res) => {
  const userId = req.userId;
  const friendUserId = req.params.friendUserId;
  const status = await checkIsFriend(userId, friendUserId, "unblockUser");
  if (!status.success) {
    return res.json({ success: status.success, message: status.message });
  } else {
    try {
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { blockedUsers: friendUserId },
        },
        { new: true }
      );
      const token = generateToken(updatedUserProfile);
      return res.json({
        success: true,
        userData: updatedUserProfile,
        message: `User has been unblocked successfully!`,
        accessToken: token,
      });
    } catch (error) {
      return res.json({ success: false, message: "Failed to unblock user!" });
    }
  }
};
