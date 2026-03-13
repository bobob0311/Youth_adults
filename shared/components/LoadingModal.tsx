import Modal from "./Modal/Modal";
import LoadingSpinner from "./loading/LoadingSpinner";
import styles from "./LodadingModal.module.scss";

export default function LoadingModal() {
  return (
    <Modal>
      <div className={styles.modalWrapper}>
        <LoadingSpinner />
        <h2 className={styles.loadingText}>저장중입니다...</h2>
      </div>
    </Modal>
  );
}
