'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useState } from "react";
import { isEmpty } from "@/utils/valid";
import { checkNumberLength, checkSpecialCharacters } from "@/utils/regex";
import { useDispatch } from "react-redux";
import { changeGroupInfo } from "../userSlice";

export default function Page() {
    const [text, setText] = useState<string[]>(['', '']);
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [validArr, setValidArr] = useState<boolean[]>([false, false]);
    const dispatch = useDispatch();

    const handleValid = (idx:number, isChecked:boolean) => {
        const updateValidArr = [...validArr];
        updateValidArr[idx] = isChecked;
        setValidArr(updateValidArr);

        const allValid = updateValidArr.every((value) => value === true);
        setIsBtnValid(allValid);
    }

    const handleText = (item: string, idx: number) => {
        const newValue = [...text];
        newValue[idx] = item;
        setText(newValue);
    }

    const handleStore = () => {
        dispatch(changeGroupInfo([...text]));
    }



    const groupNameValid = {
        onCondition : (input:string) => {
            return checkSpecialCharacters(input) && checkNumberLength(input, 10);
        },
        onValidCondition : (input: string) => {
            return isEmpty(input);
        },
        onValid: (chk:boolean) => handleValid(0, chk)
    }

    const groupSummaryValid = {
        onCondition : (input:string) => {
            return checkSpecialCharacters(input) && checkNumberLength(input, 20);
        },
        onValidCondition : (input: string) => {
            return isEmpty(input);
        },
        onValid: (chk:boolean) => handleValid(1, chk)
    }

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>
                <InputBox
                    label="그룹명"
                    inputType="text"
                    placeholder="서초구 에스파"
                    valid={groupNameValid}
                    onText={(item) => handleText(item, 0)}
                    limit={10}
                />
                <InputBox
                    label="한줄소개"
                    inputType="text"
                    placeholder="ENFP, ESFJ 신입생이에요"
                    valid={groupSummaryValid}
                    onText ={(item) => handleText(item,1)}
                    limit={20}
                />
            </section>
            <NavigationButton onStore={handleStore} isValid={isBtnValid} title="다음으로" url="step4" />
        </div>
    )
}