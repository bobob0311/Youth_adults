'use client'
import { useSearchParams, useRouter } from "next/navigation";
import ChooseMathingBox from "../../_component/chooseMatchingBox";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { deleteUser } from "@/apiHandler/user";
import ErrorScreen from "@/app/chat/(check)/ErrorScreen";


function CancelMatching() {
    const params = useSearchParams();
    const myId = params.get("id");
    const router = useRouter();
    
    if (!myId) return <ErrorScreen message="잘못된 링크입니다."></ErrorScreen>
    

    
    const handleStopMatching = async() => {
        try {
            await deleteUser(myId);
            router.push("/match/cancel");
        } catch (error) {
            console.log(error);
            alert("url를 확인하고 다시 시도해주세요.")
        }
    }
    const handleClosePage = () => {
        window.close();
    }
    
    return (
        <ChooseMathingBox
            text="매칭을 정말 그만두시겠어요?"
            btnInfo={{
                firstBtnName: "매칭 중단",
                firstBtnFn: handleStopMatching,
                secondBtnName: "창 닫기",
                secondBtnFn: handleClosePage
            }}
        />
    )
}

export default function CancelMatchingPage() {
    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <CancelMatching/>
        </Suspense>
    )
}