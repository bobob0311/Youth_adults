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
        if (!roomInfoRef.current) {
            roomInfoRef.current = roomInfo;    
        }

        if (!socket || !roomId || !roomInfo) return;
        socket.emit("joinRoom", roomId, socket.id);
        if (roomInfoRef.current?.isFirst) {
            roomInfoRef.current.isFirst = false;
            changeFirstIn(false, roomInfo.myGroupId);
            socket.emit("sendBySystem", `${roomInfo.myGroupName}님이 입장하였습니다.`, roomId);
        }
         
        }, [socket,roomId,roomInfo]);

    return roomInfoRef;
}