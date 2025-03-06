"use client";

import { useEffect, useRef, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"
import InputBox from "./InputBox";
import { useSearchParams } from "next/navigation";
import { getChatData, uploadChat } from "@/utils/api";

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
  const messagesRef = useRef(messages);

  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    
    newSocket.on("connect", async() => {
      // 여기서 채팅방 정보를 불러와야될거같은데 이걸 어떻게 처리해야되는거지?
      // 정보 실제로 받아서 변경해야됩니다.
      const newRoomInfo = {
        myGroupName: "그룹 이름",
        otherGroupName: "상대 그룹 이름",
        myGroupId: "내 그룹 id",
        otherGroupId: "상대 그룹 id",
      };
      roomInfoRef.current = newRoomInfo;
      const messageData = await handleGetChatData(roomId);
      console.log("메시지 데이타:", messageData.data);
      setMessages(messageData.data);
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
      setMessages((prev) => [...prev, { msg, img: null, user }]);
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
      setMessages((prev) => [...prev, { msg: null, img: imgFile, user }])
    })

    newSocket.on("sendFromSystem", (msg)=> {
      setMessages((prev) => [...prev, { msg, img: null, user: "system" }]);
    })

    newSocket.on("uploadChatData", () => {
      handlePostMessage();
    })

    setSocket(newSocket);

    return () => { newSocket.disconnect() };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

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
      sendConnectMessage(socket, roomInfoRef.current?.myGroupName, roomId);
    }
  }
  
  const handlePostMessage = () => {
    const chatData = { roomName: roomId, data: messagesRef.current };
    uploadChat(chatData);
  };

  
  async function handleGetChatData(roomId) {
    const data = await getChatData(roomId);
    return data;  // data를 반환
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
