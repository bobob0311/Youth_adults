"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useUser } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRoom";
import MessageContainer from "./_component/MessageContainer";
import InputBox from "./_component/InputBox";
import styles from "./ChatRoom.module.scss";
import WrapperLayout from "./WrapperLayout";

export default function ChatRoom({userId, roomId}: {userId:string, roomId: string}) {
    const [rematch, setRematch] = useState(false);
    const userData = useUser(userId || "");

    const roomInfo = userData ?
        {
            myGroupName: userData.group_name,
            otherGroupName: userData.matched_name,
            myGroupId: userData.id,
            otherGroupId: userData.matched_id,
            isFirst: userData.first_in
        }
    :
        null;
        
    const { socket,messages, sendTextMessage, sendImgMessage } = useChat(roomId, userId);
    const roomInfoRef = useRoom(socket, roomId, roomInfo);

    const handleCheckRematch = () => {
        setRematch(true);
    }
    
    return (
        <WrapperLayout onRematchClick={handleCheckRematch}>
            <div className={styles.chatContainer}>
                <MessageContainer messages={messages} roomInfo={roomInfoRef.current} />
                <InputBox
                    onRematch={() => setRematch(prev => !prev)}
                    rematch={rematch}
                    onSend={(message) => sendTextMessage(message)}
                    onImgSend={(imgFile) => sendImgMessage(imgFile)}
                />
            </div>
        </WrapperLayout> 
    );
}
