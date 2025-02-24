'use client'
import ImgUpload from "./ImgUpload";
import styles from "./InputBox.module.scss";

import { useRef, useState } from "react"

interface PropsState{
    onSend : (message:string) => void 
}

const MAX_LINE = 8;
const LINE_HEIGHT = 14;

export default function InputBox(props: PropsState) {
    const { onSend} = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isImgActvie, setIsImgActive] = useState<boolean>(false);

    const sendMessage = () => {
        if (textareaRef.current) {
            onSend(textareaRef.current.value);
            textareaRef.current.value = '';
        }
        setIsActive(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            if(event.shiftKey){
                return;
            }
            event.preventDefault();
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
            sendMessage();
        }
    };

    const handleResizeHeight = () => {
        if (textareaRef.current) {
            const maxHeight = MAX_LINE * LINE_HEIGHT;
            textareaRef.current.style.height = 'auto';

            if (textareaRef.current.scrollHeight > maxHeight) {
                textareaRef.current.style.height = `${maxHeight}px`;
                textareaRef.current.style.overflowY = "auto"; 
            } else {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                textareaRef.current.style.overflowY = "hidden";
            }
        }
    }

    const handleActiveChange = () => {
        if(textareaRef.current){
            setIsActive(textareaRef.current.value.length > 0);
        }
    }

    const sendImg = () => {
        setIsImgActive((prev) => !prev);
    }

    
    return (
        <div className={styles.InputContainer}>
            <div className={styles.box}>
                <textarea
                    placeholder="메시지 입력..."
                    rows={1}
                    ref = {textareaRef}
                    onKeyDown={handleKeyDown}
                    onInput={handleResizeHeight}
                    onChange={handleActiveChange}
                />
                
                {isImgActvie && <ImgUpload onClose={() => setIsImgActive(false)} />}
                <button 
                    className={styles.sendBtn}
                    onClick={isActive? sendMessage : sendImg}
                    > 
                        {isActive? 
                            <img width="20" src="/sent.svg"/>:
                            <img width="20" src="/camera.svg"/> 
                        }
                </button>        
            </div>
        </div>
    )
}