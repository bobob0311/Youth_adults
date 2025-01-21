import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className={styles.header}>
                <button> 뒤로 가기 버튼</button>
                <h1 className={styles.title}><img src="/mainImg.png" alt="청춘 상회"/></h1>
            </header>
            <main>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </>
    )
}