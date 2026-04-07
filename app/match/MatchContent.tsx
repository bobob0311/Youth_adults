import ImgContainer from "@/features/match/components/imgContainer/ImgContainer";
import MatchActions from "@/features/match/components/MatchActions";
import { getMatchContentData } from "@/features/match/services/getMatchContentData";

export default async function MatchContent({ id }: { id: string }) {
  try {
    const { matchedInfo, isPayment, isEnter, myId } =
      await getMatchContentData(id);

    return (
      <>
        <ImgContainer matchedUserInfo={matchedInfo} />
        <MatchActions isEnter={isEnter} isPayment={isPayment} myId={myId} />
      </>
    );
  } catch {
    // 에러 정보에 따라 구분되는 말을 써야할듯.
    return <div>매칭 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }
}
