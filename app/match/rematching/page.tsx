'use client'
import ChooseMathingBox from "../(component)/chooseMatchingBox";

export default function CancelMatchingPage() {
    const text = "지금 바로 다른 매칭을 잡을까요?"
    
    const handleRematching = () => {

    }
    const handleStopMatching = () => {

    }
    
    const btnInfo = {
        firstBtnName: "다른 매칭 찾기",
        firstBtnFn: handleRematching,
        secondBtnName: "쉬어가기",
        secondBtnFn: handleStopMatching
    }
    
    

    
    return (
        <ChooseMathingBox text={text} btnInfo={btnInfo} />
    )
}