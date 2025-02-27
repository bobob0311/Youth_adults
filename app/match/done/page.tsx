'use client'
import styles from "./page.module.scss";

export default function DonePage() {

    return (
        <div className={styles.wrapper}>
            <img className={styles.backGound} src="/end.png" />
            <p>메시지를 통해 링크를 전송해 드릴게요!</p>
            <span>매칭 링크 전송은 최대 10분까지 소요될 수 있습니다.</span>
        </div>
    )
}