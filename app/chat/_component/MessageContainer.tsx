"use client"
import { useEffect, useRef } from "react";
import styles from "./MessageContainer.module.scss";
import Image from "next/image";

interface PropsState {
    messages: Messages[]
    roomInfo: RoomInfo | null;
}
interface Messages{
    user : string,
    msg: string | null,
    img: string | null,
    status: string;
}

interface RoomInfo{
    myGroupName: string,
    otherGroupName: string,
    myGroupId: string,
    otherGroupId: string,
}

export default function MessageContainer(props: PropsState) {
    const { messages, roomInfo } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const containerHeightRef = useRef<number|null>(null);

    let prevUser = "";
    
    useEffect(() => {
        const container = containerRef.current;
        if (container) {

            if (containerHeightRef.current === null) {
                containerHeightRef.current = container.clientHeight;
            }

            const resizeObserver = new ResizeObserver(() => {
                if (containerHeightRef.current !== null) {
                    console.log(Math.abs(container.scrollTop - (container.scrollHeight - container.clientHeight)));
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
        if (now) {
            if (now.scrollTop +100 > now.scrollHeight - now.clientHeight) {
                now.scrollTop = now.scrollHeight;
            } else {
                // 만약 위에를 보고 있을 때의 로직을 생성해야함.
                // 지금은 그냥 위로 계속 보고있음
                // 밑에 toast가 제일 괜찮은듯?
            }
        }
        // 내가 보낼경우 맨밑으로 스크롤 이동
        // 근데 만약 위로 쭉올려서 보느라고 messages가 변하면...? true false로 조절하자 ㅇㅇㅇㅇㅇ
        if (messages.length > 0 && messages[messages.length - 1].user == roomInfo?.myGroupId) {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;    
            }
        }
        console.log(messages);
    }, [messages])
    
    const renderStatus = (status: string) => {
        switch (status) {
            case "pending":
                return <span className={styles.spinner}/>;
            case "sent":
                return null;
            case "error":
                return <span className={styles.failedStatus}>전송 실패</span>;
            default:
                return null;
        }
    };

    return (
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
                    <div className={styles.messageBox} key={`message-${item.msg}-${idx}`}>
                        {isDifferentUser && <span className={styles[userType+"name"]}>{userName}</span>}
                        <span className={styles[userType]}>
                            {renderStatus(item.status)}
                            {item.img ? 
                                <Image width={200} height={200} className={styles[`${userType}Img`]} src={item.img} alt="사진" /> 
                                : 
                                <p>{item.msg}</p>}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}