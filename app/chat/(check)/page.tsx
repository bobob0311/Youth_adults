import { getRoomInfoByRoomName } from "@/apiHandler/room";
import ChatRoom from "../ChatRoom";
import PasswordCheck from "./PasswordCheck";
import { verifyPassword } from "@/serverActions/verifyPassword";
import BasicLayout from "./BasicLayout";
import ErrorScreen from "./ErrorScreen";

interface SearchParams {
  id?: string;
  roomId?: string;
}

export default async function ChatStartPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { roomId, id } = await searchParams;
  
  // 룸 ID나 ID가 없는 경우 -> 잘못된 접근
  if (!roomId || !id) {
    return <ErrorScreen message="잘못된 접근입니다|발송된 링크를 통해 접속해주세요!" />;
  }

  try {
    const roomInfo = await getRoomInfoByRoomName(roomId);

    // room에 접근할 수 없는 id인 경우
    console.log(roomInfo);
    if (!roomInfo?.allow_user_id?.includes(id)) {
      return <ErrorScreen message="방에 들어갈 수 있는 권한이 없습니다.|링크를 다시 확인해주세요!" />;
    }
  
    // password 확인
    const isVerified = await verifyPassword(roomId);
    if (isVerified) {
      return <ChatRoom userId={id} roomId={roomId} roomStatus={roomInfo.is_open} />
    }

    
    return (
    <BasicLayout>
      <PasswordCheck roomId={roomId}  />
    </BasicLayout>
  )

  } catch (error: any) {
    if (error.status === 400 || error.status === 404) {
      return <ErrorScreen message="생성되어있는 방이 없습니다.|발송된 링크를 통해 접속해주세요!"/>
    } else if(error.status === 403){
      return <ErrorScreen message={`${error.message}`}/>
    } else {
      return <ErrorScreen message="서버 오류가 발생했습니다|발송된 링크를 통해 다시 시도해주세요!"/>
    }
  }



  
}