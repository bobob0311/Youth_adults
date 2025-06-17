"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketHandlers {
    handleOnMessage: (msg: string, senderId: string) => void;
    handleOnImage: (imgFile: string, senderId: string) => void;
    handleOnSystemMessage: (msg: string) => void;
    handleOnGetPrevChatData: (chatData: any) => void;
    handleOnGetChatDataFromDB: () => void;
    handleOnAlertLeaveRoom: (name: string) => void;
    handleOnUploadChatData: () => void;
    handleUnload: () => void;
    handleConnect: () => void;
}

interface UseSocketProps {
  roomId: string | null;
  chatOnHandler: UseSocketHandlers;
}


export function useSocket({ roomId, chatOnHandler }: UseSocketProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    setSocket(newSocket);

    // 이벤트 등록
    newSocket.on("connect",chatOnHandler.handleConnect) 
    newSocket.on("message", chatOnHandler.handleOnMessage);
    newSocket.on("img", chatOnHandler.handleOnImage);
    newSocket.on("sendBySystem", chatOnHandler.handleOnSystemMessage);
    newSocket.on("getPrevChatData", chatOnHandler.handleOnGetPrevChatData);
    newSocket.on("getDataFromStorage", chatOnHandler.handleOnGetChatDataFromDB);
    newSocket.on("alertLeaveRoom", chatOnHandler.handleOnAlertLeaveRoom);
    newSocket.on("uploadChatData", chatOnHandler.handleOnUploadChatData);

    window.addEventListener("beforeunload", chatOnHandler.handleUnload);
        
    return () => {
        window.removeEventListener("beforeunload", chatOnHandler.handleUnload)
        newSocket.disconnect();
    };
  }, [roomId]);

  return socket;
}
