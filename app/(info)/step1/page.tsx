'use client'

import styles from "./LocationPage.module.scss";
import NavigationButton from "@/components/button/NavigationButton";
import LocationCheckButton from "../(component)/LocationCheck";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeLocation } from "../userSlice";
import { useEffect, useState } from "react";

let DUMMY_INFO = [
    { locationName: "강남/신논현", imgUrl: "gangnam.png" },
    { locationName: "홍대/합정", imgUrl: "hongdae.png" },
    { locationName: "이태원", imgUrl: "itaewon.png" },
    { locationName: "건대입구", imgUrl: "konkuk.png" },
]

export default function LocationPage() {
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    
    const dispatch = useDispatch();
    const location = useSelector((state:RootState) => state.user.location);
    
    useEffect(() => {
        if (location !== '') {
            setIsBtnValid(true);
        } else {
            setIsBtnValid(false);
        }
    }, [location])

    const handleLocationChange = (location: string) => {
        if (location !== '') {
            dispatch(changeLocation(location));
        } else {
            dispatch(changeLocation(''));
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.location}>
                <h2 className={styles.title}>현재 위치를 선택해주세요</h2>
                <LocationCheckButton
                    locationInfo={DUMMY_INFO}
                    storedLocation={location}
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