import { leaveRoom } from "@/apiHandler/room";
import RematchContainer from "./_inputBox/RematchContainer";
import matching from "@/utils/matching";
import { useRouter } from "next/navigation";

export default function RematchDecisionBox({chatHandler,roomId,roomInfo,onRematch}) {
    const router = useRouter();

    const handleLeaveRoom = async (myName) => {
        await leaveRoom(roomId, roomInfo.myGroupId);
        await matching();
        chatHandler.alertLeave(myName);
        router.push("/chat/done");
    }

    return (
        <RematchContainer
            title="다른 매칭을 찾으시겠습니까?"
            subTitle="재매칭을 진행하면 현재 매칭팀을 다시 만날 수 없어요."
            leftBtn={{name: "다른 매칭 찾기" , fn :() => handleLeaveRoom(roomInfo.myGroupName)}}
            rightBtn={{name: "게속 대화할래요" , fn :() => { onRematch()}}}
        />
    )
}