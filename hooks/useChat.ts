"use client";

import { getChatData, uploadChat, uploadImg } from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Messages{
    user: string;
    msg: string | null;
    img: string | null;
    status: "pending" | "sent" | "error";
    tempId?: string;
    src?: string;
}

export function useChat(roomId: string|null, userId: string | null, roomStatus: boolean|null) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [messages, setMessages] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean|null>(roomStatus);
    const messagesRef = useRef(messages);

    useEffect(() => {
        if (!roomId) return;

        const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
        setSocket(newSocket);

        newSocket.on("message", (msg, sendrId) => {
            setMessages((prev) => [...prev, { msg, img: null, user: sendrId, status: "sent" }]);
        })

        newSocket.on("img", (imgFile, senderId) => {
            setMessages((prev) => [...prev, { msg: null, img: imgFile, user: senderId, status: "sent" }]);
        });

        newSocket.on("uploadChatData", () => {
            handlePostMessage(newSocket);
        });

        newSocket.on("getPrevChatData", (chatData) => {
            setMessages((prev) => [...chatData, ...prev])
            setIsLoading(false);
        })

        newSocket.on("sendBySystem", (message) => {
            setMessages((prev) => [...prev,{msg: message, img: null, user: "system", status: "sent",tempId : "system"}])
        })

        newSocket.on("getDataFromStorage", async () => {
            const messageData = await handleGetChatData(roomId);
            if (messageData.data) {
                setMessages((prev) =>[ ...messageData.data,...prev ]);
            }
            setIsLoading(false);
        })

        newSocket.on("alertLeaveRoom", (name) => {
            setMessages((prev) => [...prev,{msg: `${name}님이 방을 나가셨습니다.`, img: null, user: "system", status: "sent"}])
            setIsOpen(false);
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
        if (!socket || !message.trim() || !userId) return;
        const tempId = crypto.randomUUID();

        const optimisticMessage: Messages = {
            user: userId,
            msg: message,
            img: null,
            status: "pending",
            tempId,
        } 

        setMessages(prev => [...prev, optimisticMessage]);

        
        socket.emit("message", message, userId, roomId, tempId, (ack: { success: boolean ,tempId:string}) => {
            setMessages((prev) => {
                const index = prev.findLastIndex((m) => m.tempId === ack.tempId);
                if (index === -1) return prev;

                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    status: ack.success ? "sent" : "error",
                };
                return updated;
            });
        });
    };

    const sendImgMessage = async (previewUrl, src) => {
        if (!socket || !userId) return;
        const tempId = crypto.randomUUID();

        const optimisticMessage: Messages = {
            user: userId,
            msg: null,
            img: previewUrl,
            status: "pending",
            tempId,
            src: src,
        } 

        setMessages(prev => [...prev, optimisticMessage]);
        
        try {
            const formData = new FormData();
            formData.append("file", src);
            formData.append("fileName", src.name);

            const res = await uploadImg(formData);
            const uploadedUrl = res.data.data.publicUrl;

            socket.emit("img", uploadedUrl, userId, roomId, tempId, (ack: { success: boolean, tempId: string }) => {

                setMessages((prev) => {
                    const index = prev.findLastIndex((m) => m.tempId === ack.tempId);
                    if (index === -1) return prev;

                    const updated = [...prev];
                    updated[index] = {
                        ...updated[index],
                        img: uploadedUrl,
                        status: ack.success ? "sent" : "error",
                    };
                    return updated;
                });
            });

        } catch (err) {
            setMessages((prev) => {
                const index = prev.findLastIndex((m) => m.tempId === tempId);
                if (index === -1) return prev;

                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    status: "error",
                };
                return updated;
            });
        }
    };

    

    const handlePostMessage = (newSocket: Socket) => {
        uploadChat({ roomName: roomId, data: messagesRef.current });
        newSocket.emit("uploadComplete", roomId, userId, messagesRef.current);
    };

    const alertLeave = (myName: string) => {
        if(socket){
            socket.emit("alertLeaveRoom",roomId,myName);
        }
    }

    const handleDeleteMessage = (tempId: string | undefined) => {
        if (!tempId) return;
        setMessages(prev => prev.filter(m => m.tempId !== tempId));
    }

    const handleResend = (message) => {
        handleDeleteMessage(message.tempId);
        if (message.msg) {
            sendTextMessage(message.msg);
        } else {
            sendImgMessage(message.img, message.src);
        }
    }

    return {isOpen, setIsOpen,socket ,messages, sendTextMessage, sendImgMessage,isLoading, alertLeave,handleDeleteMessage,handleResend}
}