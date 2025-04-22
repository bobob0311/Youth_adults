'use client'
import ImgContainer from "./_inputBox/ImgContainer";
import styles from "./InputBox.module.scss";

import { useEffect, useState } from "react"
import RematchContainer from "./_inputBox/RematchContainer";
import Container from "./_inputBox/Container";

interface PropsState{
    rematch: boolean;
    onSend: (message: string) => void,
    onImgSend: (imgFile: string,src : File) => void,
    onRematch: () => void;
    onLeaveRoom: () => void;
}



export default function InputBox(props: PropsState) {
    const { onLeaveRoom, onSend, onImgSend, rematch, onRematch} = props;
    const [image, setImage] = useState<File|null>(null);
    const [contentType, setContentType] = useState<string>('text');

    useEffect(() => {
        if (rematch) {
            setContentType("rematch");    
        }
    },[rematch])

    const handleTempImg = (imageUrl) => {
        setImage(imageUrl);
        if (contentType !== "image") {
            setContentType("image")    
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleTempImg(file);
        }
    }


    let content;
    if (contentType === "text") {
        content = <Container onSendMessage={(msg) => onSend(msg)} />

    } else if (contentType === "image" && image) {
        content = 
            <ImgContainer
                src={image}
                onSendImg={(previewUrl, src) => {
                    onImgSend(previewUrl,src)
                    setImage(null)
                    setContentType('text')
                }}
            />
    } else if (contentType === "rematch") {
        content = <RematchContainer
            title="다른 매칭을 찾으시겠습니까?"
            subTitle="재매칭을 진행하면 현재 매칭팀을 다시 만날 수 없어요."
            leftBtn={{name: "다른 매칭 찾기" , fn :() => onLeaveRoom()}}
            rightBtn={{name: "게속 대화할래요" , fn :() => { onRematch(); setContentType('text') }}}
        />
    }

    
    return (
        <div className={styles.InputContainer}>
            <div className={styles.box}>
                {content}
                <input
                    type="file"
                    id="galleryInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}