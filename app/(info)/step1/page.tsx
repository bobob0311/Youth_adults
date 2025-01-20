'use client'

import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";

let DUMMY_INFO = [
    { title: "강남/신논현", url: "zz" },
    { title: "홍대/합정", url: "sdfasdf" },
    { title: "이태원", url: "sdfasdf" },
    { title: "건대입구", url: "sdfasdf" },
]


export default function Page() {
    return (
        <div>
            <h2>현재 위치를 선택해주세요</h2>
            <CheckButton info= {{type: "location", checkList : DUMMY_INFO}}/>
            <NavigationButton title="다음으로" url="/step2"/>
        </div>
    )
}