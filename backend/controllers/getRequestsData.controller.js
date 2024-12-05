import User from "../models/user.model.js";

export const getincomingFriendRequestUserData = async (req, res) => {
  const user = req.user;
  try {
    const incomingFriendReq = user.incomingFriendRequests;
    const friendsData = await User.find({ _id: { $in: incomingFriendReq } });
    if (friendsData.length <= 0) {
      return res.json({
        success: false,
        message: "No incoming friend requests!",
      });
    }
    res.json({
      success: true,
      message: "Users fetched successfully",
      friends: friendsData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User not found! Please login again",
    });
  }
};

export const getFriendRequestUserData = async (req, res) => {
  const user = req.user;
  try {
    const friends = user.friends;
    const friendsData = await User.find({ _id: { $in: friends } });
    if (friendsData.length <= 0) {
      return res.json({
        success: true,
        message:
          "Your friend list is empty! Add new friends by sending them friend request",
      });
    } else {
      res.json({
        success: true,
        message: "Users fetched successfully",
        friends: friendsData,
      });
    }
  } catch (error) {
    console.log(error);
    
    return res.json({
      success: false,
      message: "User not found! Please login again",
    });
  }
};

export const getOutgoingFriendRequestUserData = async (req, res) => {
  const userId = req.userId;
  try {
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      res.clearCookie("jwt");
      return res.json({
        success: false,
        message:
          "You need to login again, we have detected some suspicious activities with your account!",
      });
    }
    const friends = userData.outgoingFriendRequests;
    const outgoingFriendsData = await User.find({ _id: { $in: friends } });
    if (outgoingFriendsData.length <= 0) {
      return res.json({
        success: false,
        message: "The friend requests you sent will appear here",
      });
    }
    res.json(outgoingFriendsData);
  } catch (error) {
    return res.json({
      success: false,
      message: "User not found! Please login again",
    });
  }
};

export const getUserDataById = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User does not exist!" });
    } else {
      res.json({ success: true, message: "User found", userData: user });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Error in get user controller!",
    });
  }
};
