import Image from "next/image";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <header className={styles.header}>
                <span>
                    <button className={styles.rematchBtn}>
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