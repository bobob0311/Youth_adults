// features/match/hooks/useMatchRoomEntry.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { enterMatchedRoom } from "../services/enterMatchRoom";

interface UseMatchRoomEntryOptions {
  myId: string;
  failModalDuration?: number;
}

export function useMatchRoomEntry({
  myId,
  failModalDuration = 2000,
}: UseMatchRoomEntryOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const clearFailModalTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const openFailModal = useCallback(() => {
    clearFailModalTimeout();
    setIsFailModalOpen(true);

    timeoutRef.current = window.setTimeout(() => {
      setIsFailModalOpen(false);
      timeoutRef.current = null;
    }, failModalDuration);
  }, [clearFailModalTimeout, failModalDuration]);

  const handleEnterRoom = useCallback(async () => {
    setIsLoading(true);

    try {
      const success = await enterMatchedRoom(myId);

      if (!success) {
        setIsLoading(false);
        openFailModal();
        return false;
      }

      return true;
    } catch {
      setIsLoading(false);
      openFailModal();
      return false;
    }
  }, [myId, openFailModal]);

  useEffect(() => {
    return () => {
      clearFailModalTimeout();
    };
  }, [clearFailModalTimeout]);

  return {
    isLoading,
    isFailModalOpen,
    handleEnterRoom,
  };
}
