'use client'

import styles from "./LocationPage.module.scss";
import NavigationButton from "@/components/button/NavigationButton";
import LocationCheckButton from "../(component)/LocationCheck";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeLocation } from "../userSlice";
import { useEffect, useState } from "react";

let DUMMY_INFO = [
    { locationName: "강남/신논현", imgUrl: "location1.png" },
    { locationName: "홍대/합정", imgUrl: "location2.png" },
    { locationName: "이태원", imgUrl: "location3.png" },
    { locationName: "건대입구", imgUrl: "location4.png" },
]

export default function LocationPage() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    
    const dispatch = useDispatch();
    const location = useSelector((state:RootState) => state.user.location);
    
    useEffect(() => {
        if (location.idx !== -1) {
            setIsBtnValid(true);
        }
    }, [])
    
    const handleBtnValid = (chk: boolean) => {
        setIsBtnValid(chk);
    }

    const handleLocationChange = (idx: number) => {
        if (idx !== -1) {
            dispatch(changeLocation({name: DUMMY_INFO[idx].locationName, idx}))
        } else {
            dispatch(changeLocation({name:'',idx:-1}));
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.location}>
                <h2 className={styles.title}>현재 위치를 선택해주세요</h2>
                <LocationCheckButton
                    locationinfo={DUMMY_INFO}
                    onValid={(chk) => handleBtnValid(chk)}
                    storedIdx={location.idx}
                    onLocationChange={handleLocationChange}
                />
            </section>
            <NavigationButton
                isValid={isBtnValid}
                title="다음으로"
                url="/step2"
            />
        </div>
    )
}