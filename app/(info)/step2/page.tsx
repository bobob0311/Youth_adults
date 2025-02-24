'use client'

import NavigationButton from "@/components/button/NavigationButton";
import styles from "./selectionPage.module.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../userSlice";
import ListCheckButton from "../(component)/ListCheck";
import { RootState } from "@/redux/store";

interface Check{
    category: string,
    isChecked: boolean,
}

const DUMMY_INFO = [
    { category: "cnt", label: "인원 수", checkList: ["2명", "3명", "4명", "5명","그 이상"] },
    { category: "sex",label: "그룹 성별", checkList: ['여성', '남성', '혼성'] },
    { category: "old", label: "평균 연령",checkList : ['20대 초','20대 중','20대 말']},
]

export default function SelectionPage() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [validArr, setValidArr] = useState<Check[]>([]);
   
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const dispatch = useDispatch();

    const handleStore = (category:string,selected: string) => {
        dispatch(changeUserInfo({...userInfo, [category]:selected}));
    }
    useEffect(() => {
        const newArr: Check[] = []
        Object.entries(userInfo).forEach(([key, value]) => {
            if (value) {
                newArr.push({ category: key, isChecked:true});
            } else {
                newArr.push({ category: key, isChecked:false});
            }
        })
        setValidArr(newArr);
        checkBtnValid(newArr);
    },[])

    const handleValid = (category:string, isChecked:boolean) => {
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
                            storedItem={userInfo[item.category]? userInfo[item.category]: ''}
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