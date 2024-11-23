import User from "../models/user.model.js";

const verifyChat = async (req, res, next) => {
  const senderId = req.userId;
  const receiverId = req.body.receiverId || req.params.receiverId;
  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      res.clearCookie("jwt");
      return res.json({
        success: false,
        message:
          "You need to login again, we have detected some suspicious activities with your account!",
      });
    }
    if (sender.incomingFriendRequests.includes(receiverId)) {
      return res.json({
        success: false,
        message:
          "The user you are trying to send message has sent you a friend request, please accept the friend request for starting a conversation with them",
      });
    } else if (sender.outgoingFriendRequests.includes(receiverId)) {
      return res.json({
        success: false,
        message:
          "The user you are trying to send message has not accepted your friend request, you can only have converstion with them once they accept your friend request!",
      });
    } else if (!sender.friends.includes(receiverId)) {
      return res.json({
        success: false,
        message:
          "The user you are trying to send message is not your friend, you can only send message to them once they are friends with you",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.json({
      success: false,
      message:
        "Some error has occured while sending the message please try again!",
      error: error.message,
    });
  }
};

export default verifyChat;
