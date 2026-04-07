import enterRoom from "@/utils/enterRoom";
import { updateUserEnterRoomStatus } from "./updateUserEnterRoomStatus";

export async function enterMatchedRoom(myId: string): Promise<boolean> {
  const updateResult = await updateUserEnterRoomStatus(true, myId, true);
  if (!updateResult.success) return false;

  const enterResult = await enterRoom(myId);
  if (!enterResult) return false;

  return true;
}
