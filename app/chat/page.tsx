import { getRoomInfoByRoomName } from "@/apiHandler/room";


export default async function ChatStartPage({ searchParams }: { searchParams: { id?: string, roomId?: string } }) {
  let isAvailable:boolean = false;
  
  try {
    const { roomId, id } = await searchParams;
    if (!roomId || !id) return <div>잘못된 접근입니다.</div>;

    const roomInfo = await getRoomInfoByRoomName(roomId);

    isAvailable = roomInfo?.allow_userId?.includes(id) ? true : false;  

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
      <div>입장을 환영합니다!</div>
    ) : (
      <div>이 방에 입장할 수 없습니다.</div>
    )}
  </div>
  )
}