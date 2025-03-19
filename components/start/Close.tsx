import Image from "next/image"
import styles from "./Close.module.scss"

export default function ClosePage() {
    return (
        <div className={styles.backGroundImg}>
            <div className={styles.content}>
                <h1 className={styles.mainImg}>
                    <Image width={230} height={70} src="/close.png" alt="닫음 이미지" />
                    <span className={styles.srOnly}>청춘 상회 닫음</span>
                </h1>
                <h2 className={styles.subtitle}>
                    <div>청춘상회는 더욱 원활한 매칭을 위해 </div>
                    <div>매주 금요일부터 일요일, 단 3일간 운영됩니다!</div>
                </h2>
            </div>
        </div>
    )
}