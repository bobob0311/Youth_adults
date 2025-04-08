import LoadingSpinner from "../loading/LoadingSpinner";
import Modal from "./Modal";
import styles from "./LoadingModal.module.scss"

export default function LoadingModal({ children }: { children: React.ReactNode }) {
    return (
        <Modal>
            <div className={styles.container}>
                <LoadingSpinner />
                <div className={styles.pBox}>
                    {children}
                </div>    
            </div>
        </Modal>
    )
}