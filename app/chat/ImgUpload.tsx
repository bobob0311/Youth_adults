'use client'

import styles from "./ImgUpload.module.scss"

export default function ImgUpload() {
    return (
        <div className={styles.container}>
            <label htmlFor="galleryInput">
                사진 보관함
            </label>
            <input type="file" id="galleryInput" accept="image/*" style={{display: 'none'}}></input>
            <label htmlFor="cameraInput">
                사진 찍기
            </label>
            <input type="file" id="cameraInput" accept="image/*" capture="environment" style={{display: 'none'}}></input>
        </div>
    )
}