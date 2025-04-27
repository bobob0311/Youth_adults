'use client'

import { useRouter } from 'next/navigation';
import ChooseMatchingBox from '../chooseMatchingBox';
import Modal from "../../../../components/Modal/Modal"; 
import { useState } from 'react';
import { findAnotherUserAndNotice, giveUpAndNotice } from '@/apiHandler/function';

interface PropsState{
  onModal: () => void;
  id: string;
}

export default function MatchGiveUpModal(props:PropsState) {
  const { onModal, id } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const handleFindAnother = async () => {
    setIsLoading(true);
    try {
      await findAnotherUserAndNotice(id);
      router.push("/done");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("다시 시도해주세요.")
    }
    
  }

  const handleGiveUp = async () => {
    setIsLoading(true);
    try {
      await giveUpAndNotice(id);
      router.push("/match/cancel");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("다시 시도해주세요.");
    }
  }

  return (
    <Modal>
      <ChooseMatchingBox
        onClose={() => onModal()}
        text="매칭을 정말 포기하시겠어요?"
        btnInfo={{
          firstBtnName: "다른 매칭 찾기",
          firstBtnFn: handleFindAnother,
          secondBtnName: "매칭 포기",
          secondBtnFn: handleGiveUp,
        }}
        loading={isLoading} />
    </Modal>
  )
}
