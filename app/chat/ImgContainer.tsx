'use Client'
import { uploadImg } from "@/utils/api";
import styles from "./ImgContainer.module.scss"
import Image from "next/image";

interface PropsState{
    src: string;
    onSendImg: (imgURL:string) => void;
    onRetry: () => void;
}

export default function ImgContainer(props:PropsState) {
    const { src,onSendImg, onRetry } = props;
    
    const handleUploadImg = async() => {
        const input = document.getElementById("galleryInput") as HTMLInputElement;
        if (input?.files?.length) {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            const ImgURL = await uploadImgToStorage(formData);
            console.log("이거먼저 확인:",ImgURL.data.data.publicUrl)
            onSendImg(ImgURL.data.data.publicUrl);
        }
    }

    async function uploadImgToStorage(formData) {
       return await uploadImg(formData);
    }

    const handleRetry = () => {
        onRetry();
    }

    return (
        <div className={styles.imageContainer}>
            <Image width={120} height={120} className={styles.image} src={src} alt="현재 공유할 사진"/>
            <div className={styles.wrapper}>
                <h2>이 사진으로 공유할까요?</h2>
                <button className={styles.uploadBtn} onClick={handleUploadImg}>공유하기</button>
                <button className={styles.retryBtn } onClick={handleRetry}>다시 찍기</button>
            </div>
        </div>
    )
}