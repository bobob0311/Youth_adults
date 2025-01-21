'use client'
import styles from "./InputBox.module.scss"

interface PropsState{
    label: string;
    inputType: string;
    placeholder: string;

}
export default function InputBox(props: PropsState) {
    const { inputType, label, placeholder } = props;
    
    // 유효성 검사 하는 로직 받아서 유효성 검사해주고 검사 올려주기 

    return (
        <label className={styles.InputBox}>
            <span>{label}</span>
            <input type={inputType} placeholder={placeholder} />
        </label>
    )
}