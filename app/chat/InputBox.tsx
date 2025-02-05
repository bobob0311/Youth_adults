'use client'
import styles from "./InputBox.module.scss";

import { useRef } from "react"

interface PropsState{
    onSend : (message:string) => void 
}

const MAX_LINE = 8;
const LINE_HEIGHT = 14;

export default function InputBox(props: PropsState) {
    const { onSend } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const sendMessage = () => {
        if (textareaRef.current) {
            onSend(textareaRef.current.value);
            textareaRef.current.value = '';
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
            sendMessage();
        }
    };

    const handleResizeHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';

            const maxHeight = MAX_LINE * LINE_HEIGHT;

            if (textareaRef.current.scrollHeight > maxHeight) {
                textareaRef.current.style.height = `${maxHeight}px`;
                textareaRef.current.style.overflowY = "auto"; 
            } else {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                textareaRef.current.style.overflowY = "hidden";
            }
        }
    }

    
    return (
        <div className={styles.InputContainer}>
            <div className={styles.box}>
            <textarea
                rows={1}
                ref = {textareaRef}
                onKeyDown={handleKeyDown}
                onInput={handleResizeHeight}
            />
            <button className={styles.sendBtn} onClick={sendMessage}> 전송 </button>        
            </div>
        </div>
    )
}