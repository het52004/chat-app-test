import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const userId = req.userId;
  const { receiverId, message } = req.body;
  try {
    const messageRes = await Message.create({
      senderId: userId,
      receiverId,
      content: message,
      timestamp: Date.now(),
    });
    if (!messageRes) {
      return res.json({
        success: false,
        message: "Failed to send the message!",
      });
    } else {
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
  const receiverName = req.params.receiverName;
  try {
    const messages = await Message.find({ senderId, receiverId });
    if (messages.length === 0) {
      res.json({
        success: true,
        message: `This is the beginning of your conversation with ${receiverName}`,
      });
    } else {
      res.json({
        success: true,
        message: `Messages with ${receiverName} feteched successfully`,
        fetchedMessages: messages,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured while fetching the messages!",
      error: error.message,
    });
  }
};
