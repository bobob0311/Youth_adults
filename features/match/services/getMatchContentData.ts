import { getUserDataById } from "@/utils/api";

interface User {
  id: string;
  matched_id: string;
  payment: boolean;
  is_enter_room: boolean;
}

interface MatchContentData {
  matchedInfo: User;
  isPayment: boolean;
  isEnter: boolean;
  myId: string;
}

export async function getMatchContentData(
  id: string,
): Promise<MatchContentData> {
  const matchedInfo = await getUserDataById(id);
  const myInfo = await getUserDataById(matchedInfo.matched_id);

  return {
    matchedInfo,
    isPayment: myInfo.payment,
    isEnter: myInfo.is_enter_room,
    myId: myInfo.id,
  };
}
