"use client"
import Image from "next/image";
import styles from "./WrapperLayout.module.scss";

export default function Wrapper({ children, onRematchClick}: { children: React.ReactNode, onRematchClick: ()=> void }) {

    return (
        <>
            <header className={styles.header}>
                <span>
                    <button className={styles.rematchBtn} onClick={onRematchClick}>
                        <Image width={25} height={25} src="/rematchBtn.svg" alt="매칭 다시 찾기"/>
                        <div>매칭 찾기</div>
                    </button>
                </span>
                <h1 className={styles.title}><Image width={175} height={65} src="/mainImg.png" alt="청춘 상회"/></h1>
            </header>
            <main>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </>
    )
}