"use client";

import { useEffect, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"
import InputBox from "./InputBox";

interface Messages{
    user : "another" | "system" | "me",
    msg : string,
}

export default function Home() {
  const [socket, setSocket] = useState<Socket|null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [myId, setMyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    
    newSocket.on("connect", () => {
      console.log("✅ 서버에 WebSocket 연결됨:", newSocket.id);
      setMyId(newSocket.id);
    });

    newSocket.on("message", (msg, senderId) => {
      console.log("서버에서 메시지 수신:", msg, newSocket.id, senderId);
      let user: "me" | "another";
      if (senderId === newSocket.id) {
        user = "me";
      } else {
        user = "another";
      }
      console.log(user);
      setMessages((prev) => [...prev, { msg, user}]);
    });

    setSocket(newSocket);

    return () => { newSocket.disconnect() };
  }, []);

  const sendMessage = (message:string) => {
    if (socket && message.trim()) {
      socket.emit("message", message, myId)
    }
  };


  return (
    <>
      <div className={styles.chatContainer}>
        <MessageContainer 
          messages={messages}
        />
        <InputBox 
          onSend={(message) => sendMessage(message)}
        />
      </div>
    </>
  );
}
