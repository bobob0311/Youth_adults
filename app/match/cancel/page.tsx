'use client'
import { useSearchParams } from "next/navigation";
import ChooseMathingBox from "../_component/chooseMatchingBox";
import userApiHandler from "../../../utils/apiHandler/user";

export default function CancelMatchingPage() {
    const params = useSearchParams();
    const myId = params.get("id");

    const text = "매칭을 정말 그만두시겠어요?"
    
    const handleRematching = async () => {
        if (myId) {
            const updateInfo = {
                id: myId,
                info: [
                    { column: "matchedId", value: null },
                    { column: "matchedName", value: null},
                ]
            }
            try{
                userApiHandler.changeUserData(updateInfo)
            } catch (e) {
                console.log("데이터 변경 중 오류가 발생했습니다", e);
            }
        } else {
            throw Error("사용자 ID가 없습니다")
        }

    }
    const handlePaymentCancel = () => {
        //결제 취소 아직 미정
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