import { Server } from "socket.io";
import express from "express";
import http from "http";
import { getUserFriends } from "../helpers/getUserFriends.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

async function getOnlineFriendsId(userId) {
  const friends = await getUserFriends(userId);
  return friends
    .filter((friendId) =>
      Object.keys(userSocketMap).some((onlineUserId) =>
        friendId.equals(onlineUserId)
      )
    )
    .map((friendId) => friendId.toString());
}

const userSocketMap = {};

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  const onlineFriends = await getOnlineFriendsId(userId);
  const recId = getReceiverSocketId(userId);
  io.to(recId).emit("getOnlineFriends", onlineFriends);

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
