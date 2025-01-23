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
        <div className={styles.container}>
            <section className={styles.location}>
                <h2 className={styles.title}>현재 위치를 선택해주세요</h2>
                <CheckButton info= {{type: "location", checkList : DUMMY_INFO}}/>
            </section>
            <NavigationButton title="다음으로" url="/step2"/>
        </div>
    )
}