"use client";  // 클라이언트 컴포넌트

import { useState } from "react";
import NavigationButton from "@/components/button/NavigationButton";
import MatchGiveUpModal from "./_MatchAction/MatchGiveUpModal";
import styles from "./MatchActions.module.scss"
import Modal from "@/components/Modal/Modal";
import { updateUserEnterRoomStatus } from "@/utils/apiHandler/match";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import enterRoom from "@/utils/enterRoom";

export default function MatchActions({ isPayment, myId }: { isPayment: boolean; myId: string; }) {
    const [modal, setModal] = useState(false);
    const [failModal, setFailModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEnterRoomByPaymentTrue = async () => {
        setIsLoading(true);
        try {
            const res = await updateUserEnterRoomStatus(true, myId, true);
            if (!res.success) {
                return false;
            }
            const result = await enterRoom(myId);
            if (!result) {
                return false;
            }
        } catch (error) {
            return false;
        }
        return true;
    }

    const handleFailByPaymentTrue = () => {
        setIsLoading(false);
        setFailModal(true);
        setTimeout(() => {
            setFailModal(false);
        },2000)
    }

    return (
        <>
            {isPayment ?             
                <NavigationButton onFail={handleFailByPaymentTrue} onAction={handleEnterRoomByPaymentTrue} url={`/match/done`} isValid={true} title="매칭룸 입장하기" /> 
                :
                <NavigationButton url={`/match/payment?id=${myId}`} subtitle="결제금액: 2,200원" isValid={true} title="결제 후 매칭룸 입장하기" />
            }

            <div className={styles.btnContainer}>
                <button className={styles.linkWrapper}
                    onClick={()=> setModal(true)}
                >
                    매칭 포기하기
                </button>
            </div>
            {isLoading && <Modal><LoadingSpinner/> </Modal>}
            {failModal && <Modal><div>다시 시도해주세요..</div></Modal>}
            {modal && <MatchGiveUpModal onModal={() => setModal((prev) => !prev)}/>}
        </>
    );
}
