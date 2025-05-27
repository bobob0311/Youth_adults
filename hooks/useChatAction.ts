import { uploadImg, uploadChat, getChatData } from "@/utils/api";
import { useRef } from "react";

interface Messages{
    user: string;
    msg: string | null;
    img: string | null;
    status: "pending" | "sent" | "error";
    tempId?: string;
    src?: string;
}

export const useChatActions = (roomId: string | null, userId: string | null, messagesRef: any, setMessages: any) => {
    const socketRef = useRef(null);
    
    const setSocket = (socket) => {
        socketRef.current = socket;
        console.log(socketRef.current)
    }
    
    const handleGetChatData = async (roomId: string | null) => {
        if (!roomId) return;
        
        const data = await getChatData(roomId)
        return data;
    }

    const sendTextMessage = (message: string) => {
        if (!socketRef.current || !message.trim() || !userId) return;

        const tempId = crypto.randomUUID();

        const optimisticTextMessage: Messages = {
            user: userId,
            msg: message,
            img: null,
            status: "pending",
            tempId,
        } 

        setMessages(prev => [...prev, optimisticTextMessage]);

        socketRef.current.emit("message", message, userId, roomId, tempId, (ack: { success: boolean ,tempId:string}) => {
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
        if (!socketRef.current || !userId) return;
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

            socketRef.current.emit("img", uploadedUrl, userId, roomId, tempId, (ack: { success: boolean, tempId: string }) => {

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

    const handlePostMessage = () => {
        if (!socketRef.current || !roomId) return;
        
        uploadChat({ roomName: roomId, data: messagesRef.current });
        socketRef.current.emit("uploadComplete", roomId, userId, messagesRef.current);
    };

  const alertLeave = (myName: string) => {
    socketRef.current?.emit("alertLeaveRoom", roomId, myName);
  };

  const handleDeleteMessage = (tempId: string | undefined) => {
    if (!tempId) return;
    setMessages((prev) => prev.filter((m) => m.tempId !== tempId));
  };

  const handleResend = (message) => {
    handleDeleteMessage(message.tempId);
    if (message.msg) {
      sendTextMessage(message.msg);
    } else if (message.img && message.src) {
      sendImgMessage(message.img, message.src);
    }
    };
    
    const chatHandler = {
        sendTextMessage,
        sendImgMessage,
        handlePostMessage,
        alertLeave,
        handleDeleteMessage,
        handleResend,
        handleGetChatData,
        setSocket,
    }

  return chatHandler;

};
