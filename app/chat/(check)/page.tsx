import { getRoomInfoByRoomName } from "@/apiHandler/room";
import ChatRoom from "../ChatRoom";
import PasswordCheck from "./PasswordCheck";
import { verifyPassword } from "@/serverActions/verifyPassword";
import BasicLayout from "./BasicLayout";

interface SearchParams {
  id?: string;
  roomId?: string;
}

export default async function ChatStartPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  let roomInfo;
  const { roomId, id } = await searchParams;
  try {
    
    if (!roomId || !id) throw Error("잘못된 접근입니다|발송된 링크를 통해 접속해주세요!");

    roomInfo = await getRoomInfoByRoomName(roomId);
    if (!roomInfo?.allow_user_id?.includes(id)) {
      const error = new Error("방에 들어갈 수 있는 권한이 없습니다.| 링크를 다시 확인하고 접속해주세요!");
        (error as any).status = 403;
      throw error;
    }
  
    const isVerified = await verifyPassword(roomId);
    if (isVerified) {
      return <ChatRoom userId={id} roomId={roomId} roomStatus={roomInfo.is_open} />
    }

  } catch (error: any) {
    if (error.status === 400 || error.status === 404) {
      throw Error("생성되어있는 방이 없습니다.|발송된 링크를 통해 접속해주세요!")
    } else if(error.status === 403){
      throw Error(error.message)
    } else {
      throw Error("서버 오류가 발생했습니다|발송된 링크를 통해 다시 시도해주세요!")
    }
  }



  return (
    <BasicLayout>
      <PasswordCheck roomId={roomId}  />
    </BasicLayout>
  )
}