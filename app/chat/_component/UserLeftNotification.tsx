import { deleteUser } from "@/apiHandler/user";
import RematchContainer from "./_inputBox/RematchContainer"
import { leaveRoom } from "@/apiHandler/room";
import matching from "@/utils/matching";
import { useRouter } from "next/navigation";

export default function UserLeftNotification({roomInfo,roomId,chatHandler}) {
    const router = useRouter();

    // 매칭취소해서 나가기
    const handleCancelMatch = async () => {
        await deleteUser(roomInfo.myGroupId);
        router.push('/match/cancel');
    }
    
    // 방나가기 
    const handleLeaveRoom = async (myName) => {
        await leaveRoom(roomId, roomInfo.myGroupId);
        await matching();
        chatHandler.alertLeave(myName);
        router.push("/chat/done");
    }


    return (
        <RematchContainer
            title="상대가 매칭룸을 나갔어요."
            subTitle="다른 매칭 찾기를 선택하시면 우선적으로 매칭을 찾아드려요"
            leftBtn={{ name: "매칭 취소", fn: () => { handleCancelMatch() } }}
            rightBtn={{ name: "다른 매칭 찾기", fn: () => { handleLeaveRoom(roomInfo.myGroupName) } }}
        />
    )
}