'use client'

import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/user";
import GroupInput from "./GroupInput";
import { useSelectionState } from "@/hooks/useSelectionState";
import { GROUP_INPUT_INFO } from "@/utils/dummyData";
import { changeUserDetail } from "../userSlice";
import { useRef } from "react";

export default function Page() {
    const { selectedValue: userDetails, dispatch, isValid: isBtnValid, setIsValid: setIsBtnValid } =
        useSelectionState<UserDetails>((state: RootState) => state.user.userDetails);

    const inputChangeRef = useRef<UserDetails>(userDetails);
    
    const handleInputChange = (newValue: string, selectedCategory: string) => {
        inputChangeRef.current = {
            ...inputChangeRef.current,
            [selectedCategory]: newValue
        };
    }

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>
                <GroupInput
                    userDetails={userDetails}
                    groupInputInfo={GROUP_INPUT_INFO}
                    onSelectionChange={(newValue, selectedCategory) => handleInputChange(newValue, selectedCategory)}
                    onBtnValid={(isValid) => setIsBtnValid(isValid)}
                />
            </section>
            <NavigationButton onAction={() => dispatch(changeUserDetail(inputChangeRef.current))} isValid={isBtnValid} title="다음으로" url="step4" />
        </div>
    )
}