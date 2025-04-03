"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useUser } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRoom";
import MessageContainer from "./_component/MessageContainer";
import InputBox from "./_component/InputBox";
import styles from "./ChatRoom.module.scss";
import WrapperLayout from "./WrapperLayout";
import RematchContainer from "./_component/_inputBox/RematchContainer";
import { leaveRoom } from "@/apiHandler/room";

export default function ChatRoom({userId, roomId,roomStatus}: {userId:string, roomId: string, roomStatus:boolean}) {
    const [rematch, setRematch] = useState(false);
    const [isRoomOpen, setIsRoomOpen] = useState(roomStatus);
    const userData = useUser(userId || "");
    
    const roomInfo = userData ?
        {
            myGroupName: userData.group_name,
            otherGroupName: userData.matchedName,
            myGroupId: userData.id,
            otherGroupId: userData.matchedId,
            isFirst: userData.firstIn
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
                {
                    isRoomOpen ?
                        <InputBox
                            onRematch={() => setRematch(prev => !prev)}
                            rematch={rematch}
                            onSend={(message) => sendTextMessage(message)}
                            onImgSend={(imgFile) => sendImgMessage(imgFile)}
                            onLeaveRoom={() => leaveRoom(roomId,userId)}
                        />
                        :
                        <div className={styles.outContainer}>
                            <RematchContainer
                                title="상대가 매칭룸을 나갔어요."
                                subTitle="다른 매칭 찾기를 선택하시면 우선적으로 매칭을 찾아드려요"
                                leftBtn={{name: "매칭 취소" , fn :() => { console.log("아직 안했습니다.") }}}
                                rightBtn={{name: "다른 매칭 찾기" , fn :() => { leaveRoom(roomId,userId) }}}
                            />
                        </div>
                }
                
                
            </div>
        </WrapperLayout> 
    );
}
