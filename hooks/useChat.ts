"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSocket } from "./useSocket";
import { useChatActions } from "./useChatAction";

interface Messages{
    user: string;
    msg: string | null;
    img: string | null;
    status: "pending" | "sent" | "error";
    tempId?: string;
    src?: string;
}
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

export function useChat(roomId: string|null, userId: string | null, roomStatus: boolean|null) {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean|null>(roomStatus);
    const messagesRef = useRef(messages);

    const chatHandler = useChatActions(roomId, userId, messagesRef, setMessages);

    const socketHandlers: UseSocketHandlers = useMemo(() =>({
        onMessage: (msg, senderId) => {
            setMessages((prev) => [...prev, { msg, img: null, user: senderId, status: "sent" }]);
        },

        onImage: (imgFile, senderId) => {
            setMessages((prev) => [...prev, { msg: null, img: imgFile, user: senderId, status: "sent" }]);
        },

        onSystemMessage: (message) => {
            setMessages((prev) => [...prev, { msg: message, img: null, user: "system", status: "sent", tempId: "system" }]);
        },

        onPrevChatData: (chatData) => {
            setMessages((prev) => [...chatData, ...prev]);
            setIsLoading(false);
        },

        onGetDataFromStorage: async () => {
            const messageData = await chatHandler.handleGetChatData(roomId);
            if (messageData.data) {
                setMessages((prev) => [ ...messageData.data, ...prev ]);
            }
            setIsLoading(false);
        },

        onAlertLeaveRoom: (name) => {
            setMessages((prev) => [...prev, { msg: `${name}님이 방을 나가셨습니다.`, img: null, user: "system", status: "sent" }]);
            setIsOpen(false);
        },

        onUploadChatData: () => {
            chatHandler.handlePostMessage();
        },

        onUnload: () => {
            if (!roomId || messagesRef.current.length == 0) return;

                const payload = JSON.stringify({ roomName: roomId, data: messagesRef.current });
                const blob = new Blob([payload], { type: "application/json" });

                navigator.sendBeacon("/api/chats?type=blob", blob);
            }
        
        }),[roomId]);

    const socket = useSocket({ roomId, socketHandlers });

    useEffect(() => {
        chatHandler.setSocket(socket);
    }, [socket]);
    
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    return {isOpen, setIsOpen,socket ,messages, chatHandler,isLoading}
}