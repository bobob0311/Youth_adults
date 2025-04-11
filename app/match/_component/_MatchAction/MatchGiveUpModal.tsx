'use client'

import { useRouter } from 'next/navigation';
import ChooseMatchingBox from '../chooseMatchingBox';
import Modal from "../../../../components/Modal/Modal"; 
import { deleteUser } from '@/apiHandler/user';

interface PropsState{
  onModal: () => void;
  id: string;
}

export default function MatchGiveUpModal(props:PropsState) {
  const { onModal,id } = props;
  const router = useRouter();
  const text = "매칭을 정말 포기하시겠어요?";
  
  const handleFindAnother = async () => {
    router.push("/match/researching")
  }

  const handleGiveUp = async () => {
    try {
      await deleteUser(id);  
      router.push("/match/cancel");
    } catch(err) {
      console.log(err);
    }
    
    
  }

  const btnInfo = {
    firstBtnName: "다른 매칭 찾기",
    firstBtnFn: handleFindAnother,
    secondBtnName: "매칭 포기",
    secondBtnFn: handleGiveUp,
  }



  return (
    <Modal>
      <ChooseMatchingBox onClose={() => onModal()} text={text} btnInfo={btnInfo} />
    </Modal>
  )
}
