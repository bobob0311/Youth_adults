'use client'

import NavigationButton from "@/components/button/NavigationButton";
import styles from "./selectionPage.module.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserProfile } from "../userSlice";
import ListCheckButton from "../(component)/ListCheck";
import { RootState } from "@/redux/store";
import { UserProfile } from "@/types/user";

interface Check{
    category: Category,
    isChecked: boolean,
}

interface ListInfo{
    category: Category;
    label: string;
    checkList: string[];
}

type Category = "count" | "gender" | "age";

const DUMMY_INFO:ListInfo[] = [
    { category: "count", label: "인원 수", checkList: ["2명", "3명", "4명", "5명","그 이상"] },
    { category: "gender",label: "그룹 성별", checkList: ['여성', '남성', '혼성'] },
    { category: "age", label: "평균 연령",checkList : ['20대 초','20대 중','20대 말']},
]

export default function SelectionPage() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [, setValidArr] = useState<Check[]>([]);
   
    const userProfile:UserProfile = useSelector((state: RootState) => state.user.userProfile);
    const dispatch = useDispatch();

    const handleStore = (category:Category,selected: string) => {
        dispatch(changeUserProfile({...userProfile, [category]:selected}));
    }

    useEffect(() => {
        const newArr: Check[] = []
        Object.entries(userProfile).forEach(([key, value]) => {
            newArr.push({ category :key as Category, isChecked:Boolean(value)});
        })
        setValidArr(newArr);
        checkBtnValid(newArr);
    },[])

    const handleValid = (category:Category, isChecked:boolean) => {
        setValidArr(prevArr => {
            const updatedArr = prevArr.map(item =>
                item.category === category ? { ...item, isChecked } : item
            );
            checkBtnValid(updatedArr);
            return updatedArr;
        });
    }

    const checkBtnValid = (nowValidArr: Check[]) => {
        const allValid = nowValidArr.every((value) => value.isChecked === true);
        setIsBtnValid(allValid); 
    }

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>
                {
                    DUMMY_INFO.map((item) => (
                        <ListCheckButton
                            key={item.label}
                            listInfo={item}
                            storedItem={userProfile[item.category]? userProfile[item.category]: ''}
                            onValid={(category, chk) => handleValid(category, chk)}
                            onSeletedChange={(category,selectedItem) => handleStore(category,selectedItem)}
                        />
                    ))
                }
            </section>
            <NavigationButton isValid={isBtnValid} title="다음으로" url="/step3" />
        </div>
    )
}