import { getUserDataById } from "@/utils/api";
import { createChatRoomIfReady } from "@/features/match/services/createChatRoomIfReady";

export default async function handleMatchRoom(myId) {
  try {
    const myData = await getUserDataById(myId);
    const matchedData = await getUserDataById(myData.matched_id);

    return await createChatRoomIfReady(myData, matchedData);
  } catch (error) {
    console.error(" Error in enterRoom", error);
    return false;
  }
}
