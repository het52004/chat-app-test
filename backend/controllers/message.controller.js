import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const sendMessage = async (req, res) => {
  const user = req.user;
  const { receiverId, message } = req.body;

  if (user._id.toString() === receiverId) {
    res.json({ success: false, message: "You cannot message yourself!" });
  }
  if (!message || message.length < 1) {
    res.json({ success: false, message: "Messages cannot be blank!" });
  }
  try {
    const messageRes = await Message.create({
      senderId: user._id.toString(),
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
      res.json({
        success: true,
        message: "Message sent successfully!",
        message: messageRes,
      });
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
  const senderId = req.user._id.toString();
  const receiverId = req.params.receiverId;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
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
    const loggedInUserId = req.user._id.toString();
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
