import { getUserDataById } from "@/utils/api";
import ImgContainer from "./_component/_MatchAction/ImgContainer";
import MatchActions from "./_component/MatchActions"; // 클라이언트 컴포넌트

export default async function MatchContent({ id }: { id: string }) {
    try {
        const matchedInfo = await getUserDataById(id);
        const myInfo = await getUserDataById(matchedInfo.matched_id);
        const isPayment = myInfo.payment;
        const isEnter = myInfo.is_enter_room;

        return (
            <>
                <ImgContainer matchedUserInfo={matchedInfo} />
                <MatchActions isEnter={isEnter} isPayment={isPayment} myId={myInfo.id} />
            </>
        );
    } catch  {
        // 에러 정보에 따라 구분되는 말을 써야할듯.
        return <div>매칭 정보를 불러오는 중 오류가 발생했습니다.</div>;
    }
}
