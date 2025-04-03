import { getRoomInfoByRoomName } from "@/apiHandler/room";
import ChatRoom from "./ChatRoom";
import PasswordCheck from "./PasswordCheck";
import { verifyPassword } from "@/serverActions/verifyPassword";

interface SearchParams {
  id?: string;
  roomId?: string;
}

export default async function ChatStartPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  let isAvailable:boolean = false;
  let roomInfo;
  const { roomId, id } = await searchParams;
  try {
    
    if (!roomId || !id) return <div>잘못된 접근입니다.</div>;

    roomInfo = await getRoomInfoByRoomName(roomId);
    isAvailable = roomInfo?.allow_user_id?.includes(id) ? true : false;  
  
    const isVerified = await verifyPassword(roomId);
    if (isVerified) {
      return <ChatRoom userId={ id } roomId={roomId} roomStatus={roomInfo.is_open} />
    }

  } catch (error: any) {
    if (error.status === 400 || error.status === 404) {
      return <div>생성된 Room이 없당께요??</div>
    } else {
      return <div>서버 오류가 발생했습니다 다시한번 시도해주세요.</div>
    }
  }



  return (
    <div>
      {isAvailable ? (
        <PasswordCheck roomId={roomId}  />
    ) : (
      <div>이 방에 입장할 수 없습니다.</div>
    )}
  </div>
  )
}