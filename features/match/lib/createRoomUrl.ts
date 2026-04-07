// features/match/lib/createRoomUrl.ts
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function createRoomUrl(roomId: string) {
  return `${BASE_URL}/chat?roomId=${roomId}&id=`;
}
