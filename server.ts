import express, { Request, Response } from "express";
import next from "next";
import { Server } from "socket.io";
import { createServer } from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("클라이언트 연결됨:", socket.id);

    socket.on("message", (msg,myId) => {
      console.log("메시지 수신:", msg);
      io.emit("message", msg,myId);
    });

    socket.on("disconnect", () => {
      console.log("클라이언트 연결 종료:", socket.id);
    });

    socket.on("sendFromSystem", (message) => {
      console.log("serverSystem");
      io.emit("sendFromSystem", message);
    })

    socket.on("img", (imgFile,myId) => {
      io.emit("img", imgFile,myId)
    })
  });

  httpServer.listen(4000, () => {
    console.log("Socket.IO 서버 4000번 포트");
  });
});
