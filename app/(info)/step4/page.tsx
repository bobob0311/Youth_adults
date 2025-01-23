'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"

export default function Page() {


    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>카카오톡을 통해 인증을 받아주세요</h2>
                <InputBox label="대표자 번호" inputType="text" placeholder="01012345678"/>
                <InputBox label="인증 번호" inputType="text" placeholder="12345"/>
            </section>
            <NavigationButton isValid={true} title="다음으로" url="step5" />
        </div>
    )
}