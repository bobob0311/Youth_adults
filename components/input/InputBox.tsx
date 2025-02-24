'use client'
import { useState } from "react";
import styles from "./InputBox.module.scss"

interface PropsState{
    inputInfo: {
        category: string;
        label: string;
        inputType: string;
        placeholder: string;
        limit?: number;
    }
    valid?:{
        onInputCondition: (text: string) => boolean; 
        onValidCondition: (text: string) => boolean;
    }
    onText: (newValue: string, category: string, check:boolean) => void
    storedText?: string;
}

export default function InputBox(props: PropsState) {
    const { inputInfo, valid,onText,storedText} = props;
    const [text, setText] = useState<string>(storedText? storedText : '');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, category:string) => {
        const newValue = e.target.value;
        if (valid) {
            const { onInputCondition, onValidCondition } = valid;
            if (onInputCondition(newValue)) {
                const isValid = onValidCondition(newValue);
                
                setText(newValue);
                onText(newValue, category,isValid);
            }
        } else {
            setText(newValue);
            onText(newValue, category, true);
        }
    }
    
    return (
        <label className={styles.InputBox}>
            <span>{inputInfo.label}</span>
            <input
                value={text}
                onChange={(e) => handleChange(e,inputInfo.category)}
                type={inputInfo.inputType}
                placeholder={inputInfo.placeholder}
            />
            {inputInfo.limit && <span className={`${styles.count} ${text.length >= inputInfo.limit ? styles.limit : ''}`}>{`${text.length}/${inputInfo.limit}`}</span>}
        </label>
    )
}