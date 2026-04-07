import { createRoom } from "@/shared/api/room";
import { generateRoomPassword } from "../lib/generateRoomPassword";
import { createRoomUrl } from "../lib/createRoomUrl";
import { sendChatRoomMessage } from "@/shared/api/aligoMessage";

interface User {
  id: string;
  phone_number: string;
  is_enter_room: boolean;
}

export async function createChatRoomIfReady(
  myData: User,
  matchedData: User,
): Promise<boolean> {
  if (!matchedData.is_enter_room) {
    return true;
  }

  const roomId = crypto.randomUUID();
  const url = createRoomUrl(roomId);
  const password = generateRoomPassword();

  await createRoom(roomId, myData.id, matchedData.id, password);

  await sendChatRoomMessage(url, myData.id, myData.phone_number, password);
  await sendChatRoomMessage(
    url,
    matchedData.id,
    matchedData.phone_number,
    password,
  );

  return true;
}
