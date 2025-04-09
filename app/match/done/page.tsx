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
            <p>메시지를 통해 링크를 전송해 드릴게요!</p>
            <span>매칭 링크 전송은 최대 10분까지 소요될 수 있습니다.</span>
        </div>
    )
}
