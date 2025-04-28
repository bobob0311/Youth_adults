'use client'

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div style={{ width: 600, height: 500 }} />
});
import animationData from "@/assets/done.json"; 
import styles from "./page.module.scss";

;

export default function DonePage() {
    return (
        <div className={styles.wrapper}>
            <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: 600, height: 500 }} 
            />
            <p>신청이 완료되었어요!</p>
            <span>매칭이 되면 연락드릴게요</span>
        </div>
    )
}
