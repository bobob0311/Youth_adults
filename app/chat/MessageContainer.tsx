"use client"
import { useEffect, useRef } from "react";
import styles from "./MessageContainer.module.scss";

interface PropsState {
    messages: Messages[]
}
interface Messages{
    user : User,
    msg : string,
}
type User = "another" | "system" | "me";

export default function MessageContainer(props: PropsState) {
    const { messages } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    let prevUser = "";
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
    },[messages])
    return (
        <div ref={containerRef} className={styles.container}>
            {messages.map((item, idx) => {
                const isDifferentUser = prevUser !== item.user;
                prevUser = item.user;

                return (
                    <>
                        {isDifferentUser && <span key={`user-${idx}`} className={styles[item.user+"name"]}>{item.user}</span>}
                        <p key={idx} className={styles[item.user]}>{item.msg}</p>
                    </>
                );
            })}
        </div>
    );
}