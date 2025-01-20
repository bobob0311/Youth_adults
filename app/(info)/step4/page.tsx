'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";


export default function Page() {


    return (
        <div>
            <InputBox label="대표자 번호" inputType="text" placeholder="01012345678"/>
            <InputBox label="인증 번호" inputType="text" placeholder="12345"/>
            <NavigationButton title="다음으로" url="done"/>
        </div>
    )
}