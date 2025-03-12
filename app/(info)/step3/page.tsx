'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useEffect, useState } from "react";
import { isEmpty } from "@/utils/valid";
import { checkNumberLength, checkSpecialCharacters } from "@/utils/regex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeGroupInfo } from "../userSlice";

interface Check{
    category: string;
    isChecked: boolean;
}

const DUMMY_INFO = [
    {
        inputInfo:{
            category: "name",
            label: "그룹명",
            inputType: "text",
            placeholder: "서초구 에스파",
            limit: 10,
        },
        valid: undefined as Valid | undefined,
    },
    {
        inputInfo: {
            category: "summary",
            label:"한줄소개",
            inputType:"text",
            placeholder: "ENFP, ESFJ 신입생이에요",
            limit: 20,    
        },
        valid: undefined as Valid | undefined,
    }
]

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}


export default function Page() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [, setValidArr] = useState<Check[]>([]);

    const groupInfo = useSelector((state: RootState) => state.user.groupInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        const newArr: Check[] = []
        Object.entries(groupInfo).forEach(([key, value]) => {
            if (value) {
                newArr.push({ category: key, isChecked:true});
            } else {
                newArr.push({ category: key, isChecked:false});
            }
        })
        setValidArr(newArr);
        checkBtnValid(newArr);
    },[groupInfo])

    const handleValid = (category: string,isChecked:boolean) => {
        setValidArr(prevArr => {
            const updatedArr = prevArr.map(item =>
                item.category === category ? { ...item, isChecked } : item
            );
            checkBtnValid(updatedArr);
            return updatedArr;
        });
    }

    const handleInput = (newValue:string, category:string, check:boolean) => {
        dispatch(changeGroupInfo({ ...groupInfo, [category]: newValue }))
        handleValid(category, check);
    }

    const checkBtnValid = (nowValidArr: Check[]) => {
        const allValid = nowValidArr.every((value) => value.isChecked === true);
        setIsBtnValid(allValid);
    }

    const groupNameValidCondition = {
        onInputCondition : (input:string) => {
            return checkSpecialCharacters(input) && checkNumberLength(input, 10);
        },
        onValidCondition : (input: string) => {
            return isEmpty(input);
        },
    }

    const groupSummaryValidCondition = {
        onInputCondition : (input:string) => {
            return checkSpecialCharacters(input) && checkNumberLength(input, 20);
        },
        onValidCondition : (input: string) => {
            return isEmpty(input);
        },
    }

    DUMMY_INFO[0].valid = groupNameValidCondition;
    DUMMY_INFO[1].valid = groupSummaryValidCondition;
    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>

                {
                    DUMMY_INFO.map((item) => (
                        <InputBox
                            key={item.inputInfo.label}
                            inputInfo={item.inputInfo}
                            valid={item.valid}
                            storedText = {groupInfo[item.inputInfo.category]}
                            onText={(newValue, selectedId,check) => handleInput(newValue, selectedId,check)}
                        />
                    ))
                }
            </section>
            <NavigationButton isValid={isBtnValid} title="다음으로" url="step4" />
        </div>
    )
}