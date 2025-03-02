"use client";

import { useEffect, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"
import InputBox from "./InputBox";

interface Messages{
    user : "another" | "system" | "me",
    msg? : string,
    img? : string,
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
      // 이름 전달 받아야함
      sendConnectMessage(newSocket,"이름");
    });

    newSocket.on("message", (msg, senderId) => {
      console.log("서버에서 메시지 수신:", msg, newSocket.id, senderId);
      let user: "me" | "another";
      if (senderId === newSocket.id) {
        user = "me";
      } else {
        user = "another";
      }
      setMessages((prev) => [...prev, { msg, user}]);
    });

    newSocket.on("sendFromSystem", (msg)=> {
      setMessages((prev) => [...prev, { msg, user: "system" }]);
    })

    newSocket.on("img", (imgFile, senderId) => {
      let user: "me" | "another";
      if (senderId === newSocket.id){
        user = "me";
      } else{
        user = "another";
      }
      console.log(user);
      setMessages((prev) => [...prev, {img:imgFile ,user}])
    })

    setSocket(newSocket);

    return () => { newSocket.disconnect() };
  }, []);

  const sendMessage = (message:string) => {
    if (socket && message.trim()) {
      socket.emit("message", message, myId)

    }
  };

  const sendConnectMessage = (sk:Socket,name: string) => {
    sk.emit("sendFromSystem", `${name}님이 입장하였습니다.`);
  }

  const sendImgMessage = (imgFile) => {
    if (socket) {
      socket.emit("img",imgFile,myId)  
    }
    
  }
  return (
    <>
      <div className={styles.chatContainer}>
        <MessageContainer 
          messages={messages}
        />
        <InputBox 
          onSend={(message) => sendMessage(message)}
          onImgSend={(imgFile) => sendImgMessage(imgFile)}
        />
      </div>
    </>
  );
}
