'use client'

import { useRouter } from 'next/navigation';
import ChooseMatchingBox from '../_component/chooseMatchingBox';
import Modal from "../../../components/Modal/Modal"; 

interface PropsState{
  onModal: () => void;
}

export default function MatchGiveUpModal(props:PropsState) {
  const { onModal } = props;
  const router = useRouter();
  const text = "매칭을 정말 포기하시겠어요?";
  
  const handleFindAnother = () => {
    router.push("/match/researching")
  }

  const handleGiveUp = () => {
    router.push("/match/fail");
    // 매칭 포기 로직
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
