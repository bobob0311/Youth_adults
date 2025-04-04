'use client'

import styles from "./LocationPage.module.scss";
import NavigationButton from "@/components/button/NavigationButton";
import LocationCheckButton from "../(component)/LocationCheck";

import { RootState } from "@/redux/store";
import { changeLocation } from "../userSlice";
import { useEffect } from "react";
import { LOCATION_INFO } from "@/utils/dummyData";
import { useSelectionState } from "@/hooks/useSelectionState";


export default function LocationPage() {
    const { selectedValue: location, dispatch, isValid: isBtnValid, setIsValid: setIsBtnValid } =
        useSelectionState<string>((state: RootState) => state.user.location);

    useEffect(() => {
        if (location !== '') {
            setIsBtnValid(true);
        }
    }, [location])

    const handleLocationChange = (location: string) => {
        dispatch(changeLocation(location))
    }

    return (
        <div className={styles.container}>
            <section className={styles.location}>
                <h2 className={styles.title}>현재 위치를 선택해주세요</h2>
                <LocationCheckButton
                    locationInfo={LOCATION_INFO}
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