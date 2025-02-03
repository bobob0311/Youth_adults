"use client";

import { useEffect, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"

interface Messages{
    user : "another" | "system" | "me",
    msg : string,
}

export default function Home() {
  const [socket, setSocket] = useState<Socket|null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [input, setInput] = useState<string>("");
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

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.emit("message", input, myId)
      setInput("");
    }
  };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };


  return (
    <div className={styles.chatContainer}>
      <MessageContainer messages={messages} />
      <div className={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} >전송</button>
      </div>
    </div>
  );
}
