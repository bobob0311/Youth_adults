import styles from "../MatchActions.module.scss";

export default function MatchActionStatus() {
  return (
    <div className={styles.matched}>
      <p className={styles.text}>현재 매칭된 상태입니다.</p>
      <p className={styles.subText}>
        아래 매칭 포기하기 버튼을 통해 취소가 가능합니다.
      </p>
    </div>
  );
}
