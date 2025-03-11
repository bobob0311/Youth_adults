'use client'

import styles from "./page.module.scss"
import NavigationButton from "@/components/button/NavigationButton";
import { changeUserPayment, getUserDataById } from "@/utils/api";
import {useSearchParams } from "next/navigation"

export default function PaymentPage() {
    const params = useSearchParams();
    const myId = params.get("id");
    console.log(myId);
    const handlePayment = async() => {
        const { data: myData } = await changeUserPayment(myId, true);
        console.log(myData[0].matchedId);
        const matchedData = await getUserDataById(myData[0].matchedId);
        console.log(myData[0]);
        console.log(matchedData);
        if (myData[0].payment && matchedData.payment) {
            handleChatRoomMessage(myData[0], matchedData)
        }
    }

    function handleChatRoomMessage(myData, matchedData) {
        const baseURL = "localhost:3000"
        const roomId = "djzpwjdgkwl"

        const url = `${baseURL}/chat?roomId=${roomId}&id=`;

        sendChatRoomMessage(url, myData.id, myData.phone_number);
        sendChatRoomMessage(url, matchedData.id, matchedData.phone_number);
    }
    function sendChatRoomMessage(url, userId, phoneNumber) {
        console.log(`phoneNumber: ${phoneNumber}에게 ${url}${userId} 를 보냅니다`)
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