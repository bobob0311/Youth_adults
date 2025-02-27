'use client'

import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import { useParams } from "next/navigation"

export default function PaymentPage() {
    const params = useParams();
    const { id } = params;
    const handlePayment = () => {
        //id 값 기준으로 이사람 결제 상태 변경 로직
    }
    return (
        <>
        <div className={styles.wrapper}>
            <div>사실 오늘의</div> 
            <div>결제 금액은</div>
            <div>0원 입니다</div>
        </div>
        <NavigationButton onStore={() => handlePayment()} url="/match/done" title="결제하기" subtitle="결제금액 0원" isValid={true} />
        </>
    )
}