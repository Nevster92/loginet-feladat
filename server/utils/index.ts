import { Server, type ServerOptions, type Socket } from "socket.io";
import moment from "moment";
import type { H3Event } from "h3";
import { User, Message } from "@/server/types";
import { userJoin, userLeave, getCurrentUser } from "./users";
const options: Partial<ServerOptions> = {
  path: "/api/socket.io",
  serveClient: false,
};

export const io = new Server(options);

const roomName = "Chat Room";
var messageBoard: Message[] = [];
const MAX_MESSAGES = 1024;

export function initSocket(event: H3Event) {
  // @ts-ignore
  io.attach(event.node.res.socket?.server);

  io.on("connection", (socket: Socket) => {
    // Join Room
    socket.on("joinRom", (payload: User) => {
      const user = userJoin({ ...payload, id: socket.id });
      socket.join(roomName);

      io.to(roomName).emit("roomUsers", {
        room: roomName,
        users: users,
      });

      for (let i = 0; i < messageBoard.length && i < MAX_MESSAGES; i++) {
        io.to(socket.id).emit("message", messageBoard[i]);
      }
    });

    // Handle Chat Message
    socket.on("chatMessage", (payload) => {
      const sender = getCurrentUser(socket.id);
      const message: Message = {
        user: sender,
        text: payload.text,
        ip: socket.handshake.headers["x-forwarded-for"],
        os: payload.os,
        browser: payload.browser,
      };
      messageBoard.push(message);
      if (sender) {
        io.to(roomName).emit("message", message);
      }
    });
  });
}
