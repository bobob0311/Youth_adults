"use client";

import { useEffect, useRef, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"
import InputBox from "./InputBox";
import { useSearchParams } from "next/navigation";

interface Messages{
    user : string,
    msg : string | null,
    img : string | null,
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

  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    
    newSocket.on("connect", () => {
      // 정보 실제로 받아서 변경해야됩니다.
      const newRoomInfo = {
        myGroupName: "그룹 이름",
        otherGroupName: "상대 그룹 이름",
        myGroupId: "내 그룹 id",
        otherGroupId: "상대 그룹 id",
      };
      roomInfoRef.current = newRoomInfo;

      setMyId(newSocket.id);
      handleEnterRoom(newSocket, roomId);
    });

    newSocket.on("message", (msg, senderId) => {
      const roomInfo = roomInfoRef.current;
      let user: string;
      if (roomInfo) {
        if (senderId === newSocket.id) {
          user = roomInfo?.myGroupId;
        } else {
          user = roomInfo?.otherGroupId;
        }  
      }
      setMessages((prev) => [...prev, { msg,img:null, user}]);
    });

    newSocket.on("img", (imgFile, senderId) => {
      const roomInfo = roomInfoRef.current;
      let user: string;
      if (roomInfo) {
        if (senderId === newSocket.id) {
          user = roomInfo?.myGroupId;
        } else {
          user = roomInfo?.otherGroupId;
        }  
      }
      setMessages((prev) => [...prev, {msg:null, img:imgFile ,user}])
    })

    newSocket.on("sendFromSystem", (msg)=> {
      setMessages((prev) => [...prev, { msg, img: null, user: "system" }]);
      console.log("야야야야야야");
    })

    setSocket(newSocket);

    return () => { newSocket.disconnect() };
  }, []);

  const sendTextMessage = (message:string) => {
    if (socket && message.trim()) {
      socket.emit("message", message, myId,roomId)
    }
  };

  const sendImgMessage = (imgFile:string) => {
    if (socket) {
      socket.emit("img", imgFile, myId, roomId)
    } 
  }

  const sendConnectMessage = (socket: Socket, name: string, roomId) => {
    socket.emit("sendFromSystem", `${name}님이 입장하였습니다.`,roomId);
  }

  const handleEnterRoom = (socket:Socket,roomId) => {
    if (socket) {
      socket.emit("joinRoom", roomId);
      console.log(`${roomId}에 입장하기!!~`)
      sendConnectMessage(socket, roomInfoRef.current?.myGroupName, roomId);
    }
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
