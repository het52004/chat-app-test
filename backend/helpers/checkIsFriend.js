import User from "../models/user.model.js";

async function checkIsFriend(uid, fid, status) {
  if (uid === fid) {
    return {
      success: false,
      message: "You cannot perform this operation with your own account!",
    };
  }
  try {
    const userProfile = await User.findById(uid);
    const friendProfile = await User.findById(fid);
    if (!userProfile) {
      res.clearCookie("jwt");
      return res.json({
        success: false,
        message:
          "You need to login again, we have detected some suspicious activities with your account!",
      });
    }
    if (!friendProfile) {
      res.clearCookie("jwt");
      return res.json({
        success: false,
        message:
          "User you are trying to interact with, does not exist!",
      });
    }
    switch (status) {
      case "sendFriendRequest":
        if (userProfile.friends.includes(fid)) {
          return {
            success: false,
            message: `You are already friends with ${friendProfile.uniqueName}!`,
          };
        } else if (userProfile.outgoingFriendRequests.includes(fid)) {
          return {
            success: false,
            message: `You have already sent friend request to ${friendProfile.uniqueName}! Please wait till they accept your friend request!`,
          };
        } else if (userProfile.incomingFriendRequests.includes(fid)) {
          return {
            success: false,
            message: `You have already received friend request from ${friendProfile.uniqueName}! You can accept it.`,
          };
        } else if (userProfile.blockedUsers.includes(fid)) {
          return {
            success: false,
            message: `You have to unblock ${friendProfile.uniqueName} in order to send them friend request!`,
          };
        } else if (friendProfile.blockedUsers.includes(uid)) {
          return {
            success: false,
            message: `You cannot send friend request to ${friendProfile.uniqueName} bacause they may have blocked you!`,
          };
        } else {
          return { success: true };
        }
      case "acceptFriendRequest":
        if (userProfile.friends.includes(fid)) {
          return {
            success: false,
            message: `You are already friends with ${friendProfile.uniqueName}!`,
          };
        } else if (!userProfile.incomingFriendRequests.includes(fid)) {
          return {
            success: false,
            message: `${friendProfile.uniqueName} has not sent you friend request, you can only accept their friend request if they send you`,
          };
        } else {
          return { success: true };
        }
      case "removeFriend":
        if (!userProfile.friends.includes(fid)) {
          return {
            success: false,
            message: `${friendProfile.uniqueName} is already not in your friend list!`,
          };
        } else {
          return { success: true };
        }
      case "rejectFriendRequest":
        if (!userProfile.incomingFriendRequests.includes(fid)) {
          return {
            success: false,
            message: `in order to decline friend request of ${friendProfile.uniqueName}. They need to send you friend request first!`,
          };
        } else {
          return { success: true };
        }
      case "cancelFriendRequest":
        if (!userProfile.outgoingFriendRequests.includes(fid)) {
          return {
            success: false,
            message: `in order to cancel friend request sent to ${friendProfile.uniqueName}. You need to send them friend request first!`,
          };
        } else {
          return { success: true };
        }
      case "blockUser":
        if (userProfile.blockedUsers.includes(fid)) {
          return {
            success: false,
            message: `${friendProfile.uniqueName} is already blocked!`,
          };
        } else {
          return { success: true };
        }
      case "unblockUser":
        if (!userProfile.blockedUsers.includes(fid)) {
          return {
            success: false,
            message: `${friendProfile.uniqueName} is already unblocked!`,
          };
        } else {
          return { success: true };
        }
      default:
        return {
          success: false,
          message: "Status is required in order to proceed further!",
        };
    }
  } catch (error) {
    return { success: false, message: "User is not valid!" };
  }
}
export default checkIsFriend;
