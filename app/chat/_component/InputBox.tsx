'use client'
import ImgContainer from "./_inputBox/ImgContainer";
import styles from "./InputBox.module.scss";

import {useState } from "react"
import Container from "./_inputBox/Container";

interface PropsState{
    onSend: (message: string) => void,
    onImgSend: (imgFile: string,src : File) => void,
}



export default function InputBox(props: PropsState) {
    const {onSend, onImgSend} = props;
    const [image, setImage] = useState<File|null>(null);
    const [contentType, setContentType] = useState<string>('text');

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