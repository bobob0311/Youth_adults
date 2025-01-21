'use client'

import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./LocationPage.module.scss";

let DUMMY_INFO = [
    { title: "강남/신논현", url: "location1.png" },
    { title: "홍대/합정", url: "location2.png" },
    { title: "이태원", url: "location3.png" },
    { title: "건대입구", url: "location4.png" },
]


export default function LocationPage() {
    return (
        <>
            <h2 className={styles.title}>현재 위치를 선택해주세요</h2>
            <section className={styles.location}>
            
            <CheckButton info= {{type: "location", checkList : DUMMY_INFO}}/>
            <NavigationButton title="다음으로" url="/step2"/>
            </section>
        </>
    )
}