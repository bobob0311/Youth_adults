// features/match/components/MatchActions/index.tsx
"use client";

import { useState } from "react";
import styles from "./MatchActions.module.scss";
import Modal from "@/shared/components/Modal/Modal";
import LoadingModal from "@/shared/components/Modal/LoadingModal";
import MatchGiveUpModal from "./matchAction/MatchGiveUpModal";
import MatchActionContent from "./matchAction/MatchActionContent";
import { useMatchRoomEntry } from "../hooks/useMatchRoomEntry";

interface MatchActionsProps {
  isPayment: boolean;
  myId: string;
  isEnter: boolean;
}

export default function MatchActions({
  isPayment,
  myId,
  isEnter,
}: MatchActionsProps) {
  const [isGiveUpModalOpen, setIsGiveUpModalOpen] = useState(false);
  const { isLoading, isFailModalOpen, handleEnterRoom } = useMatchRoomEntry({
    myId,
  });

  return (
    <>
      <MatchActionContent
        isEnter={isEnter}
        isPayment={isPayment}
        myId={myId}
        onEnterRoom={handleEnterRoom}
      />

      <div className={styles.btnContainer}>
        <button
          type="button"
          className={styles.linkWrapper}
          onClick={() => setIsGiveUpModalOpen(true)}
        >
          매칭 포기하기
        </button>
      </div>

      {isLoading && <LoadingModal>매칭룸에 입장중입니다.</LoadingModal>}

      {isFailModalOpen && (
        <Modal>
          <div>다시 시도해주세요.</div>
        </Modal>
      )}

      {isGiveUpModalOpen && (
        <MatchGiveUpModal
          id={myId}
          onModal={() => setIsGiveUpModalOpen(false)}
        />
      )}
    </>
  );
}
