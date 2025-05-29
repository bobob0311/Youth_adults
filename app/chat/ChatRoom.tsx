"use client";

import { useMemo, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useUser } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRoom";
import MessageContainer from "./_component/MessageContainer";
import styles from "./ChatRoom.module.scss";
import WrapperLayout from "./WrapperLayout";
import LoadingModal from "@/components/Modal/LoadingModal";
import ChatRoomAction from "./ChatRoomAction";

export default function ChatRoom({userId, roomId,roomStatus}: {userId:string, roomId: string, roomStatus:boolean}) {
    const [rematch, setRematch] = useState<boolean>(false);
    
    const userData = useUser(userId || "");
    
    const roomInfo = useMemo(() => {
        if (!userData) return null;
        
        return {
            myGroupName: userData.group_name,
            otherGroupName: userData.matched_name,
            myGroupId: userData.id,
            otherGroupId: userData.matched_id,
            isFirst: userData.is_first
        };

    }, [userData]);
        
    const {socket, messages, isLoading, isOpen, chatHandler } = useChat(roomId, userId,roomStatus);
    const roomInfoRef = useRoom(socket, roomId, roomInfo);

    const handleCheckRematch = () => {
        setRematch(true);
    }

    return (
        <WrapperLayout onRematchClick={handleCheckRematch}>
            <div id="chatRoom" className={styles.chatContainer}>
                {isLoading ? (
                    <LoadingModal>채팅을 불러오고있습니다..</LoadingModal>
                ) : (
                    <>
                        <MessageContainer
                            onResend={(msg) => chatHandler.handleResend(msg)}
                            onDelete={(tempId) => chatHandler.handleDeleteMessage(tempId)}
                            messages={messages}
                            roomInfo={roomInfoRef.current}
                        />
                        <ChatRoomAction rematch = {rematch} onRematch = {() => setRematch((prev) => !prev)} roomId={roomId} isOpen={isOpen} chatHandler={chatHandler} roomInfo={roomInfo} />
                    </>
                )}
                
            </div>
        </WrapperLayout> 
    );
}
