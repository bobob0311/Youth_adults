"use client";  // 클라이언트 컴포넌트

import { useState } from "react";
import NavigationButton from "@/components/button/NavigationButton";
import MatchGiveUpModal from "./_MatchAction/MatchGiveUpModal";
import styles from "./MatchActions.module.scss"

export default function MatchActions({ isPayment, matchedId }: { isPayment: boolean; matchedId: string }) {
    const [modal, setModal] = useState(false);

    return (
        <>
            {isPayment ?             
                <NavigationButton url={`/match/done`} isValid={true} title="매칭룸 입장하기" /> 
                :
                <NavigationButton url={`/match/payment?id=${matchedId}`} subtitle="결제금액: 2,200원" isValid={true} title="결제 후 매칭룸 입장하기" />
            }

            <div className={styles.btnContainer}>
                <button className={styles.linkWrapper}
                    onClick={()=> setModal(true)}
                >
                    매칭 포기하기
                </button>
            </div>

            {modal && <MatchGiveUpModal onModal={() => setModal((prev) => !prev)}/>}
        </>
    );
}
