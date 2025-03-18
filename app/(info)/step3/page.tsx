'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useEffect, useState } from "react";
import { isEmpty } from "@/utils/valid";
import { checkNumberLength, checkSpecialCharacters } from "@/utils/regex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeUserDetail } from "../userSlice";
import { UserDetails } from "@/types/user";

interface Check{
    category: Category;
    isChecked: boolean;
}

type Category = "name" | "summary";

const DUMMY_INFO = [
    {
        category: "name",
        label: "그룹명",
        inputType: "text",
        placeholder: "서초구 에스파",
        limit: 10,
    },
    {
        category: "summary",
        label:"한줄소개",
        inputType:"text",
        placeholder: "ENFP, ESFJ 신입생이에요",
        limit: 20,    
    },
]

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}

const VALID_CONDITIONS: Record<Category, Valid> = {
    name: {
        onInputCondition: (input: string) => checkSpecialCharacters(input) && checkNumberLength(input, 10),
        onValidCondition: (input: string) => isEmpty(input),
    },
    summary: {
        onInputCondition: (input: string) => checkSpecialCharacters(input) && checkNumberLength(input, 20),
        onValidCondition: (input: string) => isEmpty(input),
    }
};


export default function Page() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [, setValidArr] = useState<Check[]>([]);

    const userDetails: UserDetails = useSelector((state: RootState) => state.user.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        const newArr: Check[] = []
        Object.entries(userDetails).forEach(([key, value]) => {
            newArr.push({ category: key as Category, isChecked:Boolean(value)});
        })
        setValidArr(newArr);
        checkBtnValid(newArr);
    },[])

    const handleValid = (category: Category,isChecked:boolean) => {
        setValidArr(prevArr => {
            const updatedArr = prevArr.map(item =>
                item.category === category ? { ...item, isChecked } : item
            );
            checkBtnValid(updatedArr);
            return updatedArr;
        });
    }

    const handleStore = (newValue:string, selectedCategory:string, check:boolean) => {
        dispatch(changeUserDetail({ ...userDetails, [selectedCategory as Category]: newValue }))
        handleValid(selectedCategory as Category, check);
    }

    const checkBtnValid = (nowValidArr: Check[]) => {
        const allValid = nowValidArr.every((value) => value.isChecked === true);
        setIsBtnValid(allValid);
    }

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>

                {
                    DUMMY_INFO.map((item) => (
                        <InputBox
                            key={item.label}
                            inputInfo={item}
                            valid={VALID_CONDITIONS[item.category]}
                            storedText={userDetails[item.category]}
                            onText={(newValue, selectedCategory,check) => handleStore(newValue, selectedCategory,check)}
                        />
                    ))
                }
            </section>
            <NavigationButton isValid={isBtnValid} title="다음으로" url="step4" />
        </div>
    )
}