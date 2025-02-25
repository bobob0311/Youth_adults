'use client'
import { getAllData } from "@/utils/api";
import styles from "./page.module.scss";

export default function DonePage() {
    async function fetchData() {
        const data = await getAllData();
        console.log(data); // 정상적인 데이터 출력
    }
    fetchData();
    return (
        <div className={styles.wrapper}>
            <img className={styles.backGound} src="/end.png" />
            <p>신청이 완료되었어요!</p>
            <p>매칭이 되면 연락드릴게요</p>
        </div>
    )
}``