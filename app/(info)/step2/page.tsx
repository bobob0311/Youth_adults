'use client'

import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./selectionPage.module.scss"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCheck, changeGroupInfo } from "../userSlice";

export default function SelectionPage() {
    const [clicked, setClicked] = useState<string[]>(['', '', '']);
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [validArr, setValidArr] = useState<boolean[]>([false, false, false]);
    const dispatch = useDispatch();
    const handleStore = () => {
        dispatch(changeCheck([...clicked]));
    }
    
    const handleChangeState = (item: string, idx: number) => {
        const newValue = [...clicked];
        newValue[idx] = item;
        setClicked(newValue);
    }
    const handleValid = (idx:number, isChecked:boolean) => {
        const updateValidArr = [...validArr];
        updateValidArr[idx] = isChecked;
        setValidArr(updateValidArr);

        const allValid = updateValidArr.every((value) => value === true);
        setIsBtnValid(allValid);
    }

    }

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>
                <CheckButton onChangeState={(item) =>handleChangeState(item,0) } info={{ type: "label", label: "인원 수", checkList: ['2명', '3명', '4명'] }} onValid={(chk) => handleValid(0,chk) }/>
                <CheckButton onChangeState={(item) =>handleChangeState(item,1)} info={{ type: "label", label: "그룹 성별", checkList: ['여성', '남성', '혼성'] }} onValid={(chk) => handleValid(1,chk) }/>
                <CheckButton onChangeState={(item) =>handleChangeState(item,2) } info= {{type: "label", label: "평균 연령",checkList : ['20대 초','20대 중','20대 말']}} onValid={(chk) => handleValid(2,chk) }/>
            </section>
            <NavigationButton onStore={handleStore} isValid={isBtnValid} title="다음으로" url="/step3" />
        </div>
    )
}