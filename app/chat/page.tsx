"use client";

import { useEffect, useRef, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"
import InputBox from "./InputBox";

interface Messages{
    user : string,
    msg? : string,
    img? : string,
}

interface RoomInfo{
  myGroupName: string,
  otherGroupName: string,
  myGroupId: string,
  otherGroupId: string,
}

export default function Home() {
  const [socket, setSocket] = useState<Socket|null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const roomInfoRef = useRef<RoomInfo | null>(null);
  const [myId, setMyId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    
    newSocket.on("connect", () => {
      setMyId(newSocket.id);
      const newRoomInfo = {
        myGroupName: "그룹 이름",
        otherGroupName: "상대 그룹 이름",
        myGroupId: "내 그룹 id",
        otherGroupId: "상대 그룹 id",
      };
      roomInfoRef.current = newRoomInfo;
      sendConnectMessage(newSocket,newRoomInfo.myGroupName);
    });

    newSocket.on("message", (msg, senderId) => {
      console.log(roomInfoRef.current?.myGroupName);
      const roomInfo = roomInfoRef.current;
      let user: string | undefined;
      if (senderId === newSocket.id) {
        user = roomInfo?.myGroupId;
      } else {
        user = roomInfo?.otherGroupId;
      }
      setMessages((prev) => [...prev, { msg, user}]);
    });

    newSocket.on("img", (imgFile, senderId) => {
      const roomInfo = roomInfoRef.current;
      let user: string | undefined;
      if (senderId === newSocket.id) {
        user = roomInfo?.myGroupId;
      } else {
        user = roomInfo?.otherGroupId;
      }
      setMessages((prev) => [...prev, {img:imgFile ,user}])
    })

    newSocket.on("sendFromSystem", (msg)=> {
      setMessages((prev) => [...prev, { msg, user: "system" }]);
    })

    setSocket(newSocket);

    return () => { newSocket.disconnect() };
  }, []);

  const sendTextMessage = (message:string) => {
    if (socket && message.trim()) {
      socket.emit("message", message, myId)
    }
  };

  const sendImgMessage = (imgFile:string) => {
    if (socket) {
      socket.emit("img", imgFile, myId)
    } 
  }

  const sendConnectMessage = (sk:Socket,name: string) => {
    sk.emit("sendFromSystem", `${name}님이 입장하였습니다.`);
  }

  

  return (
    <>
      <div className={styles.chatContainer}>
        <MessageContainer 
          messages={messages}
          roomInfo={roomInfoRef.current}
        />
        <InputBox 
          onSend={(message) => sendTextMessage(message)}
          onImgSend={(imgFile) => sendImgMessage(imgFile)}
        />
      </div>
    </>
  );
}
