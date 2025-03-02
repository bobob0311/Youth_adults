'use Client'
import { uploadImg } from "@/utils/api";
import styles from "./ImgContainer.module.scss"

interface PropsState{
    src: string;
    onSendImg: () => void
}

export default function ImgContainer(props:PropsState) {
    const { src,onSendImg } = props;
    
    const handleUploadImg = () => {
        const input = document.getElementById("galleryInput") as HTMLInputElement;
        if (input?.files?.length) {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            uploadImgToStorage(formData);
            onSendImg();
            console.log(file);
        }
    }

    async function uploadImgToStorage(formData) {
       await uploadImg(formData);
    }

    const handleRetry = () => {
        //다시 창 열 수 있게 
    }

    return (
        <div className={styles.imageContainer}>
            <img className={styles.image} src={src} />
            <div className={styles.wrapper}>
                <h2>이 사진으로 공유할까요?</h2>
                <button className={styles.uploadBtn} onClick={handleUploadImg}>공유하기</button>
                <button className={styles.retryBtn } onClick={handleRetry}>다시 찍기</button>
            </div>
        </div>
    )
}