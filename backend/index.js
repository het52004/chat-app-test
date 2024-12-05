import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import connectDb from "./DB/connectDb.js";
import authRoutes from "./routes/authentication.routes.js";
import userOperation from "./routes/userOperation.routes.js";
import currentUser from "./routes/currentUser.routes.js";
import messages from "./routes/messages.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import Message from "./models/message.model.js";


const port = process.env.PORT || 4000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userOperation);
app.use("/api/currentUser", currentUser);
app.use("/api/message", messages);

// app.get("/deleteAllMessages", async(req,res)=>{
//   try {
//     await Message.deleteMany({});
//     console.log('All records deleted successfully.');
//   } catch (error) {
//     console.error('Error deleting records:', error);
//   }
// })

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`server running on port ${port}`);
  connectDb();
});
