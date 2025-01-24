'use client'
import { useState } from "react";
import styles from "./InputBox.module.scss"

interface PropsState{
    label: string;
    inputType: string;
    placeholder: string;
    valid?:{
        onCondition: (text: string) => boolean; 
        onValidCondition: (text: string) => boolean;
        onValid: (isValid: boolean) => void;
    }
    onText: (item: string) => void
    limit?: number;
}

export default function InputBox(props: PropsState) {
    const { inputType, label, placeholder, valid,onText, limit} = props;
    const [text, setText] = useState<string>("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (valid) {
            const { onCondition, onValidCondition, onValid } = valid;
            if (onCondition(newValue)) {
                setText(newValue);
                onText(newValue);
            }

            const isValid = onValidCondition(newValue);
            onValid(isValid);    
        } else {
            setText(newValue);
            onText(newValue);
        }
    }
    
    return (
        <label className={styles.InputBox}>
            <span>{label}</span>
            <input value={text} onChange={(e) => handleChange(e)} type={inputType} placeholder={placeholder} />
            {limit && <span className={`${styles.count} ${text.length >= limit ? styles.limit : ''}`}>{`${text.length}/${limit}`}</span>}
        </label>
    )
}