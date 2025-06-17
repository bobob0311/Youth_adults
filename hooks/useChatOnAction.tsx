import { uploadChat, getChatData } from "@/utils/api";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

export const useChatOnActions = (messages,messagesRef: any, setMessages: any, setIsLoading: any, setIsOpen: any) => {
    const socketRef = useRef<Socket|null>(null);
    
    const setSocket = (socket) => {
        socketRef.current = socket;
        console.log(socketRef.current)
    }

    const handleOnMessage = (msg, senderId) => {
        setMessages((prev) => [...prev, { msg, img: null, user: senderId, status: "sent" }]);
    }

    const handleOnImage = (imgFile, senderId) => {
        setMessages((prev) => [...prev, { msg: null, img: imgFile, user: senderId, status: "sent" }]);
    }

    const handleOnSystemMessage = (msg) => {
        setMessages((prev) => [...prev, { msg, img: null, user: "system", status: "sent", tempId: "system" }]);
    }

    const handleOnGetPrevChatData = (chatData) => {
        setMessages((prev) => [...chatData, ...prev]);
        setIsLoading(false);
    }

    const handleOnGetChatDataFromDB = async (roomId: string | null) => {
        if (!roomId) return;
        
        const messageData = await getChatData(roomId);
        if (messageData.data) {
            setMessages((prev) => [ ...messageData.data, ...prev ]);
        }
        setIsLoading(false);
    }

    const handleOnAlertLeaveRoom = (name) => {
        setMessages((prev) => [...prev, { msg: `${name}님이 방을 나가셨습니다.`, img: null, user: "system", status: "sent" }]);
        setIsOpen(false);
    }

    const handleOnUploadChatData = () => {
        if (!socketRef.current || !roomId) return;
        
        uploadChat({ roomName: roomId, data: messagesRef.current });
        socketRef.current.emit("uploadComplete", roomId, userId, messagesRef.current);
    };

    const handleUnload = () => {
        if (!roomId || messagesRef.current.length == 0) return;

        const payload = JSON.stringify({ roomName: roomId, data: messagesRef.current });
        const blob = new Blob([payload], { type: "application/json" });

        navigator.sendBeacon("/api/chats?type=blob", blob);
    }
    

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);
    
    const chatHandler = {
        handleOnMessage,
        handleOnImage,
        handleOnSystemMessage,
        handleOnGetPrevChatData,
        handleOnGetChatDataFromDB,
        handleOnAlertLeaveRoom,
        handleOnUploadChatData,
        handleUnload,
        setSocket,
    }

  return chatHandler;

};
