'use client'

import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeWant } from "../userSlice";

export default function Page() {
    const [clicked, setClicked] = useState<string[]>(['', '', '']);
    const dispatch = useDispatch();
    const handleStore = () => {
        dispatch(changeWant([...clicked]));
    }
    
    const handleChangeState = (item: string, idx: number) => {
        const newValue = [...clicked];
        newValue[idx] = item;
        setClicked(newValue);
    }
    
    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>
                <CheckButton onChangeState={(item) =>handleChangeState(item,0) } info={{ type: "label", label: "상대그룹 인원 수", checkList: ['2명', '3명', '4명'] }} />
                <CheckButton onChangeState={(item) =>handleChangeState(item,1) } info={{ type: "label", label: "상대그룹 성별", checkList: ['여성', '남성', '혼성'] }} />
                <CheckButton onChangeState={(item) =>handleChangeState(item,2) } info={{ type: "label", label: "상대 그룹 평균 연령", checkList: ['20대 초', '20대 중', '20대 말'] }} />
                <p className={styles.ment}>옵션을 선택하지 않으면 '상관없음'으로 분류됩니다.</p>
            </section>
            <NavigationButton onStore={handleStore} isValid={true} title="매칭 시작" url="/done" />
        </div>
    )
}