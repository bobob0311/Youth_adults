"use client"
import { useEffect, useRef } from "react";
import styles from "./MessageContainer.module.scss";
import Image from "next/image";
import RenderStatus from "./_inputBox/RenderState";
import Toast from "./messageToast";
import { createRoot } from "react-dom/client";

interface PropsState {
    messages: Messages[]
    roomInfo: RoomInfo | null;
    onResend: (messages: Messages) => void;
    onDelete: (tempId: string |undefined) => void;
}
interface Messages{
    user : string,
    msg: string | null,
    img: string | null,
    status: string,
    tempId?: string,
    src?: string,
}

interface RoomInfo{
    myGroupName: string,
    otherGroupName: string,
    myGroupId: string,
    otherGroupId: string,
}

export default function MessageContainer(props: PropsState) {
    const { messages, roomInfo,onResend,onDelete } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const containerHeightRef = useRef<number | null>(null);
    

    let prevUser = "";
    
    useEffect(() => {
        const container = containerRef.current;
        if (container) {

            if (containerHeightRef.current === null) {
                containerHeightRef.current = container.clientHeight;
            }

            const resizeObserver = new ResizeObserver(() => {
                if (containerHeightRef.current !== null) {

                    if (Math.abs(container.scrollTop - (container.scrollHeight - container.clientHeight)) > 1) {
                        const diff = containerHeightRef.current - container.clientHeight;  
                        container.scrollTop += diff;
                    }
                    containerHeightRef.current = container.clientHeight;
                }
                
            })
            resizeObserver.observe(container);

            return () => resizeObserver.disconnect();
        }
    },[])

    useEffect(() => {
        const now = containerRef.current;
        if (!now) return;
        
        const isScrolledToBottom = now.scrollTop + 100 > now.scrollHeight - now.clientHeight;
        
        const lastMessage = messages[messages.length - 1];
        const isFromMe = lastMessage?.user === roomInfo?.myGroupId;

        // 밑에 있을 때 밑으로 고정
        if (isScrolledToBottom) {
            now.scrollTop = now.scrollHeight;
        } else {
            // 내가 보내면 밑으로 내려가기
            if (isFromMe) {
                now.scrollTop = now.scrollHeight;

            // 상대가 보내면 토스트
            } else {
                if (lastMessage.msg) {
                    showToast(lastMessage.msg);
                } else {
                    showToast("새로운 사진이 도착했습니다.");
                }
                    
            }
        }
    }, [messages])

    function showToast(message: string) {
        const toastRoot = document.getElementById("toast-root");
        if (!toastRoot) return;

        const existingToast = toastRoot.querySelector(`.${styles["custom-toast"]}`);
        if (existingToast) {
            toastRoot.removeChild(existingToast);
        }

        const toast = document.createElement("div");
        toast.className = styles['toast-container'];
        toastRoot.appendChild(toast);

        const root = createRoot(toast);

        const onDismiss = () => {
            root.unmount(); // 이게 핵심! React 내부 메모리 정리
            if (toastRoot.contains(toast)) {
                toastRoot.removeChild(toast);
            }
        };
        root.render(<Toast message={message} onDismiss={onDismiss} />);
    }




    return (
        <div className={styles.content}>
            <div id="messageContainer" ref={containerRef} className={styles.container}>
                {messages.map((item, idx) => {
                    if(item.user === "system"){
                        return (<div key={item.msg} className={styles.system}>{item.msg}</div>)
                    }
                    const isDifferentUser = prevUser !== item.user;
                    prevUser = item.user;
                    let userName;
                    let userType;
                    if (item.user === roomInfo?.myGroupId) {
                        userName = roomInfo?.myGroupName;
                        userType = "me";
                    } else {
                        userName = roomInfo?.otherGroupName;
                        userType = "another";
                    }
                    
                    return (
                        <div id="messageBox" className={styles.messageBox} key={`message-${item.msg}-${idx}`}>
                            {isDifferentUser && <span className={styles[userType+"name"]}>{userName}</span>}
                            <span className={styles[userType]}>
                                <RenderStatus status={item.status} onResendMessage ={() => onResend(item) } onDeleteMessage = {() => onDelete(item?.tempId) } />
                                {item.img ? 
                                    <Image width={200} height={200} className={styles[`${userType}Img`]} src={item.img} alt="사진" /> 
                                    : 
                                    <p>{item.msg}</p>}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div id="toast-root" />
        </div>    
    );
}