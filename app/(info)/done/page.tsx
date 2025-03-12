'use client'
import Image from 'next/image';
import styles from "./page.module.scss";

export default function DonePage() {

    return (
        <div className={styles.wrapper}>
            <Image  width={320} height={260} className={styles.backGound} alt="종료 이미지" src="/end.png" />
            <p>신청이 완료되었어요!</p>
            <p>매칭이 되면 연락드릴게요</p>
        </div>
    )
}