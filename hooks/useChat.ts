"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSocket } from "./useSocket";
import { useChatEmitActions } from "./useChatEmitActions";
import { useChatOnActions } from "./useChatOnAction";

interface Messages{
    user: string;
    msg: string | null;
    img: string | null;
    status: "pending" | "sent" | "error";
    tempId?: string;
    src?: string;
}

export function useChat(roomId: string, userId: string, roomStatus: boolean) {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(roomStatus);
    const messagesRef = useRef(messages);

    const chatEmitHandler = useChatEmitActions(roomId, userId, messagesRef, setMessages);
    const chatOnHandler = useChatOnActions(messages,messagesRef, setMessages, setIsLoading, setIsOpen)
    
    const socket = useSocket({ roomId, chatOnHandler });

    useEffect(() => {
        chatEmitHandler.setSocket(socket);
        chatOnHandler.setSocket(socket)
    }, [socket]);

    return {isOpen, setIsOpen,socket ,messages, chatEmitHandler,isLoading}
}