'use client'
import { useSearchParams } from "next/navigation";
import ChooseMathingBox from "../../_component/chooseMatchingBox";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";


function CancelMatching() {
    const params = useSearchParams();
    const myId = params.get("id");
    console.log(myId);
    const text = "매칭을 정말 그만두시겠어요?"
    
    const handleStopMatching = () => {
        // id를 기준으로 matching에 들어가지 않게 db에서 처리해야할듯.
    }
    const handleClosePage = () => {
        window.close();
    }
    
    const btnInfo = {
        firstBtnName: "매칭 중단",
        firstBtnFn: handleStopMatching,
        secondBtnName: "창 닫기",
        secondBtnFn: handleClosePage
    }
    
    

    
    return (
        <ChooseMathingBox text={text} btnInfo={btnInfo} />
    )
}

export default function CancelMatchingPage() {
    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <CancelMatching/>
        </Suspense>
    )
}