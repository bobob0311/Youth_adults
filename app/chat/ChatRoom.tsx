"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import MessageContainer from "./_component/MessageContainer";
import styles from "./ChatRoom.module.scss";
import WrapperLayout from "./WrapperLayout";
import LoadingModal from "@/components/Modal/LoadingModal";
import ChatRoomAction from "./ChatRoomAction";
import { useUserWithRoomInfo } from "@/hooks/useUserWithRoomInfo";
import { useRoomChat } from "@/hooks/useRoomChat";

export default function ChatRoom({userId, roomId,roomStatus}: {userId:string, roomId: string, roomStatus:boolean}) {
    const [rematch, setRematch] = useState<boolean>(false);
    
    const roomInfo = useUserWithRoomInfo(userId);
    const { socket, messages, isLoading, isOpen, chatEmitHandler } = useRoomChat(roomId, userId, roomStatus);
    //const {socket, messages, isLoading, isOpen, chatHandler } = useChat(roomId, userId,roomStatus);
    // const roomInfoRef = useRoom(socket, roomId, roomInfo);

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
                            onResend={(msg) => chatEmitHandler.handleResend(msg)}
                            onDelete={(tempId) => chatEmitHandler.handleDeleteMessage(tempId)}
                            messages={messages}
                            roomInfo={roomInfo}
                        />
                        <ChatRoomAction rematch = {rematch} onRematch = {() => setRematch((prev) => !prev)} roomId={roomId} isOpen={isOpen} chatHandler={chatEmitHandler} roomInfo={roomInfo} />
                    </>
                )}
                
            </div>
        </WrapperLayout> 
    );
}
