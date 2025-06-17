import { getUserDataById } from "@/utils/api";
import { useEffect, useState } from "react";

interface RoomInfo{
    myGroupName: string;
    otherGroupName: string;
    myGroupId: string;
    otherGroupId: string;
    isFirst: boolean;
}

// user 정보에서 필요한 room 정보뽑아내기
export function useUserWithRoomInfo(userId: string) {
    const [roomInfoByUserInfo, setRoomInfoByUserInfo] = useState<RoomInfo | undefined>(undefined);

    useEffect(() => {

        if (!userId) return;

        (async () => {
            const data = await getUserDataById(userId);

            setRoomInfoByUserInfo({
                myGroupName: data.group_name,
                otherGroupName: data.matched_name,
                myGroupId: data.id,
                otherGroupId: data.matched_id,
                isFirst: data.is_first
            });
        })();

    }, [userId]);

    return roomInfoByUserInfo;
}