'use client'
import ImgContainer from "./_inputBox/ImgContainer";
import ImgInput from "./_inputBox/ImgInput";
import styles from "./InputBox.module.scss";

import { useEffect, useState } from "react"
import RematchContainer from "./_inputBox/RematchContainer";
import Container from "./_inputBox/Container";

interface PropsState{
    rematch: boolean;
    onSend: (message: string) => void,
    onImgSend: (imgFile: string) => void,
    onRematch: () => void;
}



export default function InputBox(props: PropsState) {
    const { onSend, onImgSend, rematch, onRematch} = props;
    const [isImgInputOpen, setIsImgInputOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const [contentType, setContentType] = useState<string>('text');

    useEffect(() => {
        if (rematch) {
            setContentType("rematch");    
        }
    },[rematch])

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
                <Container
                    onImgInput={() => setIsImgInputOpen(true)}
                    onSendMessage = {(msg) => onSend(msg)}
                />
                <ImgInput
                
                    visible={isImgInputOpen}
                    isRetry={(!!image)}
                    onImg={(imageUrl) => handleUploadImg(imageUrl)}
                    onClose={() =>setIsImgInputOpen(false)}
                />
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
                onRetry={()=> setIsImgInputOpen((prev) => !prev)}
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
            </div>
        </div>
    )
}