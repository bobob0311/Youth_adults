import styles from "./page.module.scss"

export const dynamic = "force-static";

export default function CancelPage() {
    return (
        <div className={styles.container}>
            <p>신청이 취소되었습니다.</p>
        </div>
    )
}