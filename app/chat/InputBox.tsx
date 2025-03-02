'use client'
import ImgContainer from "./ImgContainer";
import ImgInput from "./ImgInput";
import styles from "./InputBox.module.scss";

import { useRef, useState } from "react"

interface PropsState{
    onSend: (message: string) => void,
    onImgSend: (imgFile: string) => void,
}

const MAX_LINE = 8;
const LINE_HEIGHT = 14;

export default function InputBox(props: PropsState) {
    const { onSend, onImgSend} = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isText, setIsText] = useState<boolean>(false);
    const [isInputOpen, setisInputOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');

    const sendMessage = () => {
        if (textareaRef.current) {
            onSend(textareaRef.current.value);
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
            setIsText(textareaRef.current.value.length > 0);
        }
    }

    const sendImg = () => {
        setisInputOpen((prev) => !prev);
    }

    const handleUploadImg = (imageUrl) => {
        setImage(imageUrl);
    }

    
    return (
        <div className={styles.InputContainer}>
            <div className={styles.box}>
                
                {image ?
                    <ImgContainer
                        src={image}
                        onSendImg={() => {
                            onImgSend(image)
                            setImage('')
                        }}
                    />
                    :
                    <>
                        <textarea
                            placeholder="메시지 입력..."
                            rows={1}
                            ref = {textareaRef}
                            onKeyDown={handleKeyDown}
                            onInput={handleResizeHeight}
                            onChange={handleActiveChange}
                        />
                        <button 
                            className={styles.sendBtn}
                            onClick={isText? sendMessage : sendImg}
                            > 
                                {isText? 
                                <img width="20" src="/sent.svg"/>:
                                <img width="20" src="/camera.svg"/> 
                            }
                            </button>
                    </>        
                }
                
                <ImgInput
                    visible={isInputOpen}
                    onImg={(imageUrl) => handleUploadImg(imageUrl)}
                    onClose={() =>setisInputOpen(false)}
                />
                       
            </div>
        </div>
    )
}