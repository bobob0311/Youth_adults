'use client'

import { useEffect, useState } from "react"
import styles from "./ImgUpload.module.scss"
import { uploadImg } from "@/utils/api";

interface PropsState{
    onClose: () => void;
    onSend: () => void;
}

export default function ImgUpload(props: PropsState) {
    const { onClose, onSend } = props;
    const [img, setImg] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setImg(imageUrl);
        }
    }

    useEffect(() => {
        return () => {
            if (img) {
                URL.revokeObjectURL(img);
            }
        }
    }, [img])
    
    const handleClose = () => {
        setImg('');
        onClose();
    }

    const handleUploadImg = () => {
        const input = document.getElementById("galleryInput") as HTMLInputElement;
        if (input?.files?.length) {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            uploadImgToStorage(formData);
        }
        onSend(img);
    }

    async function uploadImgToStorage(formData) {
       await uploadImg(formData);
    }


    return (
        <>
            <div className={img? styles.imgContainer :styles.container}>
                {img &&<img
                    src={img}
                />}
                <div className={img ? styles.wrapper:""}>
                    {img &&
                        <>
                            <button className={styles.closeBtn} onClick={handleClose}>closes</button>
                            <h2>이 사진으로 공유할까요?</h2>
                            <button onClick={handleUploadImg}>공유하기</button>
                        </>
                    }
                    
                    <label htmlFor="galleryInput" >
                        {img? "다시 찍기":"사진 보관함"}
                    </label>
                    <input
                        type="file"
                        id="galleryInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    ></input>

                    {!img &&
                        <>
                            <label htmlFor="cameraInput">
                                사진 찍기
                            </label>
                            <input type="file" id="cameraInput" accept="image/*" capture="environment" style={{display: 'none'}}></input>
                        </>
                    }
                </div>
                
            </div>
            
        </>
        
    )
}