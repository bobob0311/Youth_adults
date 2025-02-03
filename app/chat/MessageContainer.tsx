"use client"
import { useState } from "react";
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
    let prevUser = "";

    return (
        <div className={styles.container}>
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