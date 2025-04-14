"use client";

import { getChatData, uploadChat } from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Messages{
    user: string;
    msg: string | null;
    img: string | null;
}

export function useChat(roomId: string|null, userId: string | null) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [messages, setMessages] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const messagesRef = useRef(messages);

    useEffect(() => {
        if (!roomId) return;

        const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
        setSocket(newSocket);

        newSocket.on("message", (msg, sendrId) => {
            setMessages((prev) => [...prev, { msg, img: null, user: sendrId }]);
        })

        newSocket.on("img", (imgFile, senderId) => {
            setMessages((prev) => [...prev, { msg: null, img: imgFile, user: senderId }]);
        });

        newSocket.on("uploadChatData", () => {
            handlePostMessage(newSocket);
        });

        newSocket.on("getPrevChatData", (chatData) => {
            setMessages((prev) => [...chatData, ...prev])
            setIsLoading(false);
        })

        newSocket.on("sendBySystem", (message) => {
            setMessages((prev) => [{msg: message, img: null, user: "system"},...prev])
        })

        newSocket.on("getDataFromStorage", async () => {
            const messageData = await handleGetChatData(roomId);
            if (messageData.data) {
                setMessages((prev) =>[ ...messageData.data,...prev ]);
            }
            setIsLoading(false);
        })

        window.addEventListener("beforeunload", handleUnload);
        
        return () => {
            window.removeEventListener("beforeunload",handleUnload)
            newSocket.disconnect();
    };
    }, [roomId]);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const handleUnload = () => {
    if (!roomId || messagesRef.current.length == 0) return;

        const payload = JSON.stringify({ roomName: roomId, data: messagesRef.current });
        const blob = new Blob([payload], { type: "application/json" });

        navigator.sendBeacon("/api/chats?type=blob", blob);
    };

    const handleGetChatData = async (roomId: string) => {
        const data = await getChatData(roomId)
        return data;
    }

    const sendTextMessage = (message: string) => {
        if (socket && message.trim()) {
            socket.emit("message", message, userId, roomId);
        }
    };

    const sendImgMessage = (imgFile: string) => {
        if (socket) {
            socket.emit("img", imgFile, userId, roomId);
        }
    };

    

    const handlePostMessage = (newSocket: Socket) => {
        uploadChat({ roomName: roomId, data: messagesRef.current });
        newSocket.emit("uploadComplete", roomId, userId, messagesRef.current);
    };

    return {socket ,messages, sendTextMessage, sendImgMessage,isLoading}
}