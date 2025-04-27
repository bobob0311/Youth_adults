'use Client'
import styles from "./ImgContainer.module.scss"
import Image from "next/image";
import { useMemo } from "react";

interface PropsState{
    src: File;
    onSendImg: (imgURL:string, src:File) => void;
}

export default function ImgContainer(props:PropsState) {
    const { src, onSendImg } = props;

    const previewUrl = useMemo(() => URL.createObjectURL(src), [src]);

    const handleShare = () => {
        onSendImg(previewUrl, src);
    }

    const handleRetry = () => {
        const input = document.getElementById("galleryInput") as HTMLInputElement;
        if (input) {
            input.click();
        }
    }

    return (
        <div className={styles.imageContainer}>
            <Image width={120} height={120} className={styles.image} src={previewUrl} unoptimized alt="현재 공유할 사진" />
            <div className={styles.wrapper}>
                <h2>이 사진으로 공유할까요?</h2>
                <button className={styles.uploadBtn} onClick={handleShare}>공유하기</button>
                <button className={styles.retryBtn} onClick={handleRetry}>다시 찍기</button>
            </div>
        </div>
    )
    
}