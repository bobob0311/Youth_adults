'use client'

import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useState } from "react";
import { insertUserData } from "@/utils/api";
import { RootState } from "@/redux/store";
import { changeUserFormat } from "@/utils/dataFomat";
import matching from "@/utils/matching";
import { UserState } from "@/types/user";
import LoadingModal from "./LoadingModal";
import { useSelectionState } from "@/hooks/useSelectionState";
import { PHONE_INPUT_INFO, PHONE_VALID_CONDITION } from "@/utils/dummyData";
import PhoneVerification from "./_input/PhoneVerification";

export default function Page() {
    const { selectedValue: userInfo, dispatch, isValid: isBtnValid, setIsValid: setIsBtnValid } =
        useSelectionState<UserState,string>((state: RootState) => state.user, "wait");
    
    const [loading, setLoading] = useState<boolean>(false);

    async function handleClickNavBtn(userInfo: UserState) {
        setLoading(true);
        try {
            const userData = changeUserFormat(userInfo);

            await insertUserData(userData);

            const result = await matching();

            if (result) {
                console.log("✅ matching 완료");
            }
        } catch (error) {
            console.error("❌ 전체 흐름 중 에러 발생:", error);
            return false;
        }

        return true;
    }


    const handleFail = () => {
        setLoading(false);
    }

    return (
        <>
            <div className={styles.container}>
                <section>
                    <h2 className={styles.title}>문자를 통해 인증을 받아주세요</h2>
                    <PhoneVerification
                        phoneInputInfo={PHONE_INPUT_INFO}
                        phoneValidCondition={PHONE_VALID_CONDITION}
                        setIsBtnValid={(isValid) => setIsBtnValid(isValid)}
                        dispatch={dispatch}
                    />
                    {isBtnValid === "fail"? <div className={styles.btnFailMsg}>인증에 실패하였습니다. 잠시 후 다시 시도해주세요!</div>: null}
                </section>
                <NavigationButton onFail={() => {handleFail()}} onAction={() => { return handleClickNavBtn(userInfo);}} isValid={isBtnValid === "success"} title="다음으로" url="done" />
            </div>
            {loading ? <LoadingModal/>:null }
        </>
    )
}