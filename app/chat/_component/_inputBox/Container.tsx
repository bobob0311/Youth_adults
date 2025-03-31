import { useRef, useState } from "react";
import styles from "./Container.module.scss"
import Image from "next/image";

interface PropsState{
    onSendMessage: (msg: string) => void;
}


const MAX_LINE = 8;
const LINE_HEIGHT = 14;

export default function Container(props: PropsState) {
    const { onSendMessage } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isText, setIsText] = useState<boolean>(false);

    const sendMessage = () => {
        if (textareaRef.current) {
            onSendMessage(textareaRef.current.value);
            textareaRef.current.value = '';
        }
        setIsText(false);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            if(event.shiftKey){
                return;
            }
            event.preventDefault();
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
            // 메시지 보내는 로직
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

    const handleBtnChange = () => {
        if(textareaRef.current){
            setIsText(textareaRef.current.value.length > 0);
        }
    }


    return (
        <>
            <textarea
                className={styles.textBox}
                placeholder="메시지 입력..."
                rows={1}
                ref = {textareaRef}
                onKeyDown={handleKeyDown}
                onInput={handleResizeHeight}
                onChange={handleBtnChange}
            />
            <button 
                className={styles.sendBtn}
                onClick={isText? sendMessage : ()=>{}}
                > 
                    {isText? 
                    <Image width={20} height={30} src="/sent.svg" alt="전송 사진" /> :
                    <label htmlFor="galleryInput">
                        <Image width={20} height={30} src="/camera.svg" alt="사진 접근"/>
                    </label>
                }
            </button>
        </> 
    )
}