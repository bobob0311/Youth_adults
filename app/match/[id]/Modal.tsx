'use client'
import { createPortal } from 'react-dom';
import styles from "./Modal.module.scss"
import { useRouter } from 'next/navigation';
import ChooseMathingBox from '../_component/chooseMatchingBox';

export function Modal({ onModal }: { onModal: () => void }) {
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



  return createPortal(
    <div className={styles.modalBackdrop}>
      <ChooseMathingBox onClose={() => onModal()} text={text} btnInfo={btnInfo} />
    </div>,
    document.getElementById('modal-root')!
  );
}
