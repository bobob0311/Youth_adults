import express, { Request, Response } from "express";
import next from "next";
import { Server } from "socket.io";
import { createServer } from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const maxCapacity = 2;

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

    socket.on("joinRoom", (roomId, myId) => {
      const currentRoomCount = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      console.log("crc:",currentRoomCount)
      if (currentRoomCount >= maxCapacity) {
        socket.emit("roomFull", "이 방은 이미 최대 인원 수 입니다.")
      } else if(currentRoomCount === 0 ){
        console.log("getData가즈아~")
        socket.join(roomId);
        socket.emit("getData");
      } else {
        console.log("joinRoom 실행");
        socket.join(roomId);
        socket.to(roomId).except(myId).emit("uploadChatData");  
      }
    });

    socket.on("uploadComplete", (roomId,myId) => {
      console.log("✅ 모든 클라이언트가 데이터 업로드 완료!");
      socket.to(roomId).except(myId).emit("getData");
    });


    socket.on("message", (msg, myId, roomId) => {
      console.log("메시지 수신:", msg);
      io.to(roomId).emit("message", msg, myId);
    });

    socket.on("disconnect", () => {
      console.log("클라이언트 연결 종료:", socket.id);
    });

    socket.on("sendFromSystem", (message,roomId) => {
      console.log("serverSystem");
      io.to(roomId).emit("sendFromSystem", message);
    })

    socket.on("img", (imgFile,myId,roomId) => {
      io.to(roomId).emit("img", imgFile,myId)
    })

  });

  httpServer.listen(4000, () => {
    console.log("Socket.IO 서버 4000번 포트");
  });
});
