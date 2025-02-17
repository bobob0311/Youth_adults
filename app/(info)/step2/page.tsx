'use client'

import NavigationButton from "@/components/button/NavigationButton";
import styles from "./selectionPage.module.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../userSlice";
import ListCheckButton from "../(component)/ListCheck";
import { RootState } from "@/redux/store";

interface Check{
    id: string,
    chk: boolean,
}

const DUMMY_INFO = [
    { id: "cnt", label: "인원 수", checkList: ["2명", "3명", "4명", "5명"] },
    { id: "sex",label: "그룹 성별", checkList: ['여성', '남성', '혼성'] },
    { id: "old", label: "평균 연령",checkList : ['20대 초','20대 중','20대 말']},
]

export default function SelectionPage() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [validArr, setValidArr] = useState<Check[]>([]);
   
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const dispatch = useDispatch();

    const handleStore = (id:string,selected: string) => {
        dispatch(changeUserInfo({...userInfo, [id]:selected}));
    }
    useEffect(() => {
        const newArr: Check[] = []
        Object.entries(userInfo).forEach(([key, value]) => {
            if (value) {
                newArr.push({ id: key, chk:true});
            } else {
                newArr.push({ id: key, chk:false});
            }
        })
        setValidArr(newArr);
        checkBtnValid(newArr);
    },[])

    const handleValid = (selectedId:string, isChecked:boolean) => {
        const updateValidArr = [...validArr];
        const foundItem = updateValidArr.find(item => item.id === selectedId);
        if (foundItem) {
            foundItem.chk = isChecked;
        }
        setValidArr(updateValidArr);
        checkBtnValid(updateValidArr);
    }

    const checkBtnValid = (nowValidArr: Check[]) => {
        const allValid = nowValidArr.every((value) => value.chk === true);
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
                            storedIdx={userInfo[item.id]? item.checkList.indexOf(userInfo[item.id]): -1}
                            onValid={(selectedId, chk) => handleValid(selectedId, chk)}
                            onSeletedChange={(id,selected) => handleStore(id,selected)}
                        />
                    ))
                }
            </section>
            <NavigationButton isValid={isBtnValid} title="다음으로" url="/step3" />
        </div>
    )
}