'use client'

import Modal from "@/components/Modal/Modal";
import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import { updateUserEnterRoomStatus } from "@/apiHandler/match";
import {useSearchParams } from "next/navigation"
import { Suspense, useState } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import enterRoom from "@/utils/enterRoom";

function Payment() {
    const params = useSearchParams();
    const myId = params.get("id");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModal, setIsModal] = useState<boolean>(false);

    const handleEnterRoomByPaymentFalse = async () => {
        try {
            if (myId) {
                const res = await updateUserEnterRoomStatus(true, myId, false);
                if (!res.success) {
                    return false;
                }
                const result = await enterRoom(myId);
                if (!result) {
                    return false;
                }

            } else {
                return false
            }
        } catch {
            return false;
        }
        return true;
        
    }

    const handleFailByPaymentFalse = () => {
        setIsLoading(false);
        setIsModal(true);
        setTimeout(() => {
            setIsModal(false);
        },2000)
    }

    return (
        <>
        <div className={styles.wrapper}>
            <div>사실 오늘의</div> 
            <div>결제 금액은</div>
            <div>0원 입니다</div>
        </div>
        <NavigationButton onFail={handleFailByPaymentFalse} onAction={handleEnterRoomByPaymentFalse} url="/match/done" title="결제하기" subtitle="결제금액 0원" isValid={true} />
            {isLoading && <Modal><LoadingSpinner /></Modal>}
            {isModal && <Modal><div>다시 시도해주세요..</div></Modal>}
        
        </>
    )
}

export default function PaymentPage() {
    return (
        <>
            <Suspense fallback={<div>loading...</div>}>
                <Payment/>
            </Suspense>
        </>
        
    )
}