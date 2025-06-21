import { Server } from "socket.io";
import JoinUsers from "../models/joinUsers.js";
import Message from "../models/messages.js";
import { joinUser } from "./userJoin.js";

const InitializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New user connected ${socket.id}`);

    const { userName, userId, roomName } = socket.handshake.auth;

    if (!userName || !userId || !roomName) {
      console.log("unauthorized!");
      socket.disconnect();
    }

    socket.on("join", async ({ userName, userId, roomName }, callBack) => {
      const { error, user } = await joinUser({ userName, userId, roomName });

      if (error) {
        callBack({ error });
        return;
      }

      socket.join(user.roomName);

      socket.to(user.roomName).emit("message", {
        userName: "Admin",
        roomId: roomName,
        joinUser: user.userName,
        text: `${user.userName} joined!`,
        timeStamp: new Date(),
      });

      callBack();
    });

    socket.on("sendMessage", async ({ message, userName, roomId }, next) => {
      if (!message || !roomId || !userName) {
        return console.log("message and roomid required");
      }
      await Message.create({
        roomId,
        text: message,
        userName,
        timeStamp: new Date(),
      });
      io.to(roomId).emit("message", {
        roomId,
        text: message,
        userName,
        timeStamp: new Date(),
      });
      next();
    });

    socket.on("user_disconnect", async () => {
      try {
        const user = await JoinUsers.findOne({ userId });
        if (user) {
          socket.to(user.roomName).emit("message", {
            userName: "Admin",
            roomId: roomName,
            joinUser: user.userName,
            text: `${user.userName} has left!`,
            timeStamp: new Date(),
          });
          await JoinUsers.deleteOne(user);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected ${socket.id}`);
    });
  });
};

export default InitializeSocket;
