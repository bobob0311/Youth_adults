"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { useUser } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRoom";
import MessageContainer from "./MessageContainer";
import InputBox from "./InputBox";
import styles from "./page.module.scss";
import WrapperLayout from "./WrapperLayout";

function Home() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const userId = searchParams.get("id");
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

export default function ChatPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Home />
    </Suspense>
  );
}
