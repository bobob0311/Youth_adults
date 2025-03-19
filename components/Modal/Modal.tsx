'use client';
import { createPortal } from 'react-dom';
import styles from "./Modal.module.scss"

interface ModalProps {
  children?: React.ReactNode;
}

export function Modal({ children }: ModalProps) {


  return createPortal(
    <div className={styles.modalBackdrop}>
      {children}
    </div>,
    document.getElementById('modal-root')!
  );
}
