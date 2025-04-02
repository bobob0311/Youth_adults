import styles from "./Introduce.module.scss"

export default function Introduce(props) {
    const { userInfo } = props;
    const { group_name, group_description, gender, age, member_count } = userInfo;
    return (
        <div className={styles.box}>
            <div>이번에 소개할 팀은 <span className={styles.var}>{group_name}</span>입니다!</div>
            <div><span className={styles.var}>{age}의 {gender} {member_count}</span>으로 이루어진,</div>
            <div>다소 매력적인 팀이랄까요?</div><div> 살짝만 더 말씀드리면,</div>
            <div className={styles.var}>{group_description }</div>
            <div>재밌게 놀 준비 되셨으면</div>
            <div> 바로 연결해드릴게요!!</div>
        </div>
    )
}