"use client";

import NavigationButton from "@/shared/components/NavigationButton";
import styles from "./selectionPage.module.scss";
import { changeUserProfile } from "@/features/signup/model/userSlice";
import { UserProfile } from "@/features/signup/types/user";
import { LIST_INFO } from "@/features/signup/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ListCheckButton from "../../../features/signup/components/ListCheck";

function isUserProfileValid(userProfile: UserProfile) {
  return Object.values(userProfile).every((value) => value !== "");
}

export default function SelectionPage() {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);

  const isBtnValid = isUserProfileValid(userProfile);

  const handleSelectionChange = (category: string, selected: string) => {
    dispatch(changeUserProfile({ ...userProfile, [category]: selected }));
  };

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>

        {LIST_INFO.map((item) => (
          <ListCheckButton
            key={item.category}
            listInfo={item}
            selectedItem={userProfile[item.category] ?? ""}
            onSelectedChange={handleSelectionChange}
          />
        ))}
      </section>

      <NavigationButton isValid={isBtnValid} title="다음으로" url="/step3" />
    </div>
  );
}
