'use client'
import { createPortal } from 'react-dom';
import styles from "./Modal.module.scss"

export function Modal({ onModal }: { onModal: () => void }) {
  const handleFindAnother = () => {
    // 다른 매칭 찾기 로직
  }

  const handleGiveUp = () => {
    // 매칭 포기 로직
  }

  return createPortal(
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => onModal()}>
          <img src='/close.svg'/>
        </button>
        
        <div className={styles.imgContainer}>
          <img src="/modalImg.png"/>
        </div>
        
        <h3 className={styles.title}>매칭을 정말 포기하시겠어요?</h3>
        
        <div className={styles.pBox}>
          <p>매칭이 마음에 들지 않으면</p>
          <p>다른 매칭을 찾아 볼 수도 있어요.</p>
        </div>
        
        <div className={styles.btnContainer}>
          <button onClick={()=> {handleFindAnother()}}>다른 매칭 찾기</button>
          <button onClick={()=> {handleGiveUp()}}>매칭 포기</button>
        </div>
      </div>
      
    </div>,
    document.getElementById('modal-root')!
  );
}
