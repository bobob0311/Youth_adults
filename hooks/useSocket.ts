"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketHandlers {
    onMessage: (msg: string, senderId: string) => void;
    onImage: (imgFile: string, senderId: string) => void;
    onSystemMessage: (msg: string) => void;
    onPrevChatData: (chatData: any) => void;
    onGetDataFromStorage: () => void;
    onAlertLeaveRoom: (name: string) => void;
    onUploadChatData: () => void;
    onUnload: () => void;
}

interface UseSocketProps {
  roomId: string | null;
  socketHandlers: UseSocketHandlers;
}


export function useSocket({ roomId, socketHandlers }: UseSocketProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    setSocket(newSocket);

    // 이벤트 등록
    newSocket.on("message", socketHandlers.onMessage);
    newSocket.on("img", socketHandlers.onImage);
    newSocket.on("sendBySystem", socketHandlers.onSystemMessage);
    newSocket.on("getPrevChatData", socketHandlers.onPrevChatData);
    newSocket.on("getDataFromStorage", socketHandlers.onGetDataFromStorage);
    newSocket.on("alertLeaveRoom", socketHandlers.onAlertLeaveRoom);
    newSocket.on("uploadChatData", socketHandlers.onUploadChatData);

    window.addEventListener("beforeunload", socketHandlers.onUnload);
        
    return () => {
        window.removeEventListener("beforeunload", socketHandlers.onUnload)
        newSocket.disconnect();
    };
  }, [roomId]);

  return socket;
}
