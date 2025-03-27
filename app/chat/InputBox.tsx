'use client'
import Image from "next/image";
import ImgContainer from "./ImgContainer";
import ImgInput from "./ImgInput";
import styles from "./InputBox.module.scss";

import { useEffect, useRef, useState } from "react"
import RematchContainer from "./RematchContainer";

interface PropsState{
    rematch: boolean;
    onSend: (message: string) => void,
    onImgSend: (imgFile: string) => void,
    onRematch: () => void;
}

const MAX_LINE = 8;
const LINE_HEIGHT = 14;

export default function InputBox(props: PropsState) {
    const { onSend, onImgSend, rematch, onRematch} = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isText, setIsText] = useState<boolean>(false);
    const [isInputOpen, setisInputOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const [contentType, setContentType] = useState<string>('text');

    useEffect(() => {
        if (rematch) {
            setContentType("rematch");    
        }
    },[rematch])

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
        if (contentType !== "image") {
            setContentType("image")    
        }
    }

    let content;
    if (contentType === "text") {
        content = 
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
                        <Image width={20} height={30} src="/sent.svg" alt="전송 사진"/>:
                        <Image width={20} height={30} src="/camera.svg" alt="갤러리 접근"/> 
                    }
                    </button>
            </> 
    } else if (contentType === "image") {
        content = 
            <ImgContainer
                src={image}
                onSendImg={(publicUrl) => {
                    onImgSend(publicUrl)
                    setImage('')
                    setContentType('text')
                }}
                onRetry={()=> setisInputOpen((prev) => !prev)}
            />
    } else if (contentType === "rematch") {
        content = <RematchContainer
            title="다른 매칭을 찾으시겠습니까?"
            subTitle="재매칭을 진행하면 현재 매칭팀을 다시 만날 수 없어요."
            leftBtn={{name: "다른 매칭 찾기" , fn :() => { console.log("아직 안했습니다.") }}}
            rightBtn={{name: "게속 대화할래요" , fn :() => { onRematch(); setContentType('text') }}}
        />
    }

    
    return (
        <div className={styles.InputContainer}>
            <div className={styles.box}>
                {content}
                <ImgInput
                    visible={isInputOpen}
                    isRetry={(!!image)}
                    onImg={(imageUrl) => handleUploadImg(imageUrl)}
                    onClose={() =>setisInputOpen(false)}
                />
                       
            </div>
        </div>
    )
}