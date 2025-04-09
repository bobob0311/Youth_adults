"use client";

import { uploadChat } from "@/utils/api";
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
    const messagesRef = useRef(messages);

    const serverUrl = process.env.SERVER_URL;
    useEffect(() => {
        if (!roomId) return;

        const newSocket = io("http://localhost:4000");
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
            setMessages((prev) => [...chatData,...prev])
        })

        newSocket.on("sendBySystem", (message) => {
            setMessages((prev) => [{msg: message, img: null, user: "system"},...prev])
        })
        
        return ()=> {newSocket.disconnect()};
    }, [roomId]);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

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

    return {socket ,messages, sendTextMessage, sendImgMessage}
}