'use client'
import ChooseMathingBox from "../(component)/chooseMatchingBox";

export default function CancelMatchingPage() {
    const text = "매칭을 정말 그만두시겠어요?"
    
    const handleRematching = () => {

    }
    const handlePaymentCancel = () => {

    }
    
    const btnInfo = {
        firstBtnName: "다른 매칭 찾기",
        firstBtnFn: handleRematching,
        secondBtnName: "결제취소",
        secondBtnFn: handlePaymentCancel
    }
    
    

    
    return (
        <ChooseMathingBox text={text} btnInfo={btnInfo} />
    )
}