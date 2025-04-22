import styles from "./RenderStatus.module.scss"


export default function RenderStatus( props ) {
    const { status,onResendMessage,onDeleteMessage, } = props;

    switch (status) {
        case "pending":
            return <span className={styles.spinner}/>;
        case "sent":
            return null;
        case "error":

            return (
                <span className={styles.failUpload}>
                    <button onClick={onResendMessage}>🔄</button>
                    <button onClick={onDeleteMessage}>❌</button>
                </span>
            );
        default:
            return null;
    }
}