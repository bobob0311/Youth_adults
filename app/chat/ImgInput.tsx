'use client'

import styles from "./ImgInput.module.scss"

interface PropsState{
    onImg: (imageUrl: string) => void;
    onClose: () => void;
    visible: boolean;
}

export default function ImgInput(props: PropsState) {
    const { onImg, onClose,visible } = props;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            onImg(imageUrl);
            onClose();
        }
    }
    
    return (
        <div className={`${styles.container} ${visible? "" : styles.none}`}>
            <div>
            <label htmlFor="galleryInput" >
                사진 보관함
            </label>
            <input
                type="file"
                id="galleryInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            ></input>  
            <label htmlFor="cameraInput">
                사진 찍기
            </label>
            <input
                type="file"
                id="cameraInput"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
            ></input>  
            </div>
        </div>
    )
}