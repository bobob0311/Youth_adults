import { changeFirstIn } from "@/utils/api";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

interface RoomInfo{
    myGroupName: string;
    otherGroupName: string;
    myGroupId: string;
    otherGroupId: string;
    isFirst: boolean;
}

export function useRoom(socket: Socket | null, roomId: string | null, roomInfo: RoomInfo | null) {
    const roomInfoRef = useRef(roomInfo);

    useEffect(() => {
        if (!socket || !roomId || !roomInfo) return;

        socket.emit("joinRoom", roomId, socket.id);

        if (roomInfo.isFirst) {
            changeFirstIn(false, roomInfo.myGroupId);
            socket.emit("sendFromSystem", `${roomInfo.myGroupName}님이 입장하였습니다.`, roomId);
        }

        roomInfoRef.current = roomInfo;
        }, [socket, roomId, roomInfo]);

    return roomInfoRef;
}