'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"

export default function Page() {


    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>
                <InputBox label="그룹명" inputType="text"  placeholder="서초구 에스파"/>
                <InputBox label="그룹소개" inputType="text" placeholder="ENFP, ESFJ 신입생이에요"/>
            </section>
            <NavigationButton title="다음으로" url="step4" />
        </div>
    )
}