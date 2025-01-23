'use client'

import CheckButton from "@/components/button/CheckButtons";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./LocationPage.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../userSlice";
import { useState } from "react";

let DUMMY_INFO = [
    { title: "강남/신논현", url: "location1.png" },
    { title: "홍대/합정", url: "location2.png" },
    { title: "이태원", url: "location3.png" },
    { title: "건대입구", url: "location4.png" },
]


export default function LocationPage() {

    const [clicked, setClicked] = useState<string>('');
    const dispatch = useDispatch();
    const handleStore = () => {
        dispatch(changeLocation(clicked));
    }
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const handleValid = (chk:boolean) => {
        setIsBtnValid(chk);

    }

    return (
        <div className={styles.container}>
            <section className={styles.location}>
                <h2 className={styles.title}>현재 위치를 선택해주세요</h2>

                <CheckButton onChangeState={(input) => setClicked(input)} info={{ type: "location", checkList: DUMMY_INFO }} onValid={(chk) => handleValid(chk)} />
            </section>
            <NavigationButton isValid={isBtnValid} onStore={() => handleStore()} title="다음으로" url="/step2"/>
        </div>
    )
}