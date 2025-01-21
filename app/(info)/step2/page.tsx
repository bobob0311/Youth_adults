'use client'

import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./selectionPage.module.scss"

export default function SelectionPage() {
    return (
        <>
            <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>
            <CheckButton info={{ type: "label", label: "인원 수", checkList: ['2명', '3명', '4명'] }} />
            <CheckButton info={{ type: "label", label: "그룹 성별", checkList: ['여성', '남성', '혼성'] }} />
            <CheckButton info= {{type: "label", label: "평균 연령",checkList : ['20대 초','20대 초','20대 초']}}/>
            <NavigationButton title="다음으로" url="/step3"/>
        </>
    )
}