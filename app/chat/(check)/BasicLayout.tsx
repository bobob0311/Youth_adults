'use client'

import Image from "next/image";
import styles from "./layout.module.scss";

export default function BasicLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.title}><Image width={172} height={65} src="/mainImg.png" alt="청춘 상회"/></h1>
            </header>
            <main>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </>
    )
}