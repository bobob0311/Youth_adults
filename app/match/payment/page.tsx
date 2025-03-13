'use client'

import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import { changeUserPayment, getUserDataById, sendAligoMessage } from "@/utils/api";
import { makeEnterMatchingRoomMessage } from "@/utils/message";
import {useSearchParams } from "next/navigation"
import { Suspense } from "react";

function Payment() {
    const params = useSearchParams();
    const myId = params.get("id");
    
    const handlePayment = async () => {
        if(myId){
            const { data: myData } = await changeUserPayment(myId, true);
            console.log(myData[0].matchedId);
            const matchedData = await getUserDataById(myData[0].matchedId);
            console.log(myData[0]);
            console.log(matchedData);
            if (myData[0].payment && matchedData.payment) {
                handleChatRoomMessage(myData[0], matchedData)
            }
        }
    }

    function handleChatRoomMessage(myData, matchedData) {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const roomId = "testRoomId"

        const url = `${baseURL}/chat?roomId=${roomId}&id=`;

        sendChatRoomMessage(url, myData.id, myData.phone_number);
        sendChatRoomMessage(url, matchedData.id, matchedData.phone_number);
    }
    function sendChatRoomMessage(url, userId, phoneNumber) {
        const messageInfo = makeEnterMatchingRoomMessage({phoneNumber,url,userId})
        sendAligoMessage(messageInfo);
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

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Payment/>
        </Suspense>
    )
}