'use client'
import styles from "./InputBox.module.scss";

import { useRef } from "react"

interface PropsState{
    onSend : (message:string) => void 
}

export default function InputBox(props: PropsState) {
    const { onSend } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const sendMessage = () => {
        if (inputRef.current) {
            onSend(inputRef.current.value);
            inputRef.current.value = '';
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    
    return (
        <div>
            <input
                ref = {inputRef}
                onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}> 전송 </button>        
        </div>
    )
}