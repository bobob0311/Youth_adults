import { updateUserData } from "@/shared/api/user";

export async function updateUserEnterRoomStatus(
  isEnterRoom: boolean,
  userId: string,
  isPayment: boolean,
) {
  const updateInfo = isPayment
    ? {
        info: [{ column: "is_enter_room", value: isEnterRoom }],
        id: userId,
      }
    : {
        info: [
          { column: "is_enter_room", value: isEnterRoom },
          { column: "payment", value: true },
        ],
        id: userId,
      };

  return updateUserData({ updateInfo });
}
