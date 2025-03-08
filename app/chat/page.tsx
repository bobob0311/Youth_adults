"use client";

import { useEffect, useRef, useState } from "react";
import { io,Socket } from "socket.io-client";
import MessageContainer from "./MessageContainer";
import styles from "./page.module.scss"
import InputBox from "./InputBox";
import { useSearchParams } from "next/navigation";
import { getChatData, getUserDataById, uploadChat } from "@/utils/api";

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
  const id = searchParams.get("id");
  
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    
    newSocket.on("connect", async() => {
      // 정보 실제로 받아서 변경해야됩니다.
      const userData = await handleGetUserData(id);
      console.log("받아온 userData", userData);
      const newRoomInfo = {
        myGroupName: userData.group_name,
        otherGroupName: userData.matchedName,
        myGroupId: userData.id,
        otherGroupId: userData.matchedId,
      };
      roomInfoRef.current = newRoomInfo;
      setMyId(newSocket.id);

      handleEnterRoom(newSocket, roomId,newSocket.id);
    });

    newSocket.on("roomFull", (msg) => {
      alert(msg);
    })

    newSocket.on("getData", async () => {
      console.log("getData실행!!")
      const messageData = await handleGetChatData(roomId);
      if (messageData.data) {
        console.log(messageData.data, messageData.length)
        setMessages([...messageData.data]);  
      }
    })

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

    newSocket.on("uploadChatData", async () => {
      await handlePostMessage();
      newSocket.emit("uploadComplete",roomId,myId);
    })

    setSocket(newSocket);

    return () => { newSocket.disconnect() };
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
    console.log(messagesRef.current);
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

  const handleEnterRoom = (socket:Socket,roomId,myId) => {
    if (socket) {
      console.log("handleEnterRoom");
      console.log(myId);
      socket.emit("joinRoom", roomId,myId);
      sendConnectMessage(socket, roomInfoRef.current?.myGroupName, roomId);
    }
  }
  
  const handlePostMessage = () => {
    const chatData = { roomName: roomId, data: messagesRef.current };
    return uploadChat(chatData);
  };

  
  async function handleGetChatData(roomId) {
    const data = await getChatData(roomId);
    return data;  // data를 반환
  }

  const handleGetUserData = (id) => {
    const userData = getUserDataById(id);
    return userData;
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
