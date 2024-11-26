import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const sendMessage = async (req, res) => {
  const userId = req.userId;
  const { receiverId, message } = req.body;
  try {
    const messageRes = await Message.create({
      senderId: userId,
      receiverId,
      content: message,
    });
    if (!messageRes) {
      return res.json({
        success: false,
        message: "Failed to send the message!",
      });
    } else {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", messageRes);
      }
      res.json({ success: true, message: "Message sent successfully!" });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured while sending the message!",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    // if (messages.length === 0) {
    //   res.json({
    //     success: true,
    //     message: `This is the beginning of your conversation with ${receiverName}`,
    //   });
    // } else {
    //   res.json({
    //     success: true,
    //     message: `Messages with ${receiverName} feteched successfully`,
    //     fetchedMessages: messages,
    //   });
    // }
    res.json({ success: true, message: "Messages found", messages: messages });
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured while fetching the messages!",
      error: error.message,
    });
  }
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: filteredUsers,
    });
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
