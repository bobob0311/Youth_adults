import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <button> 뒤로 가기 버튼</button>
                청춘상회
            </header>
            <main className={styles.full}>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </>
    )
}