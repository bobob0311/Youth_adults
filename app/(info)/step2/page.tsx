'use client'

import NavigationButton from "@/components/button/NavigationButton";
import styles from "./selectionPage.module.scss"
import { changeUserProfile } from "../userSlice";
import { RootState } from "@/redux/store";
import { UserProfile } from "@/types/user";
import { LIST_INFO } from "@/utils/dummyData";
import { useSelectionState } from "@/hooks/useSelectionState";
import SelectionGroup from "./SelectionGroup";



export default function SelectionPage() {
    const { selectedValue: userProfile, dispatch, isValid: isBtnValid, setIsValid: setIsBtnValid } =
        useSelectionState<UserProfile>((state: RootState) => state.user.userProfile);

    const handleSelectionChange = (category:string,selected: string) => {
        dispatch(changeUserProfile({...userProfile, [category]:selected}));
    }

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>
                <SelectionGroup
                    userProfile={userProfile}
                    listInfo={LIST_INFO}
                    onSelectionChange={handleSelectionChange}
                    onBtnValid = { (isValid) => setIsBtnValid(isValid)}
                />
            </section>
            <NavigationButton isValid={isBtnValid} title="다음으로" url="/step3" />
        </div>
    )
}