'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";


export default function Page() {


    return (
        <div>
            <InputBox label="그룹명" inputType="text"  placeholder="서초구 에스파"/>
            <InputBox label="그룹소개" inputType="text" placeholder="ENFP, ESFJ 신입생이에요"/>
            <NavigationButton title="다음으로" url="step4"/>
        </div>
    )
}