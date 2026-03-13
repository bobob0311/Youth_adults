"use client";

import { useState } from "react";
import NavigationButton from "@/shared/components/NavigationButton";
import styles from "./page.module.scss";
import { changeUserDetail } from "@/features/signup/model/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GROUP_VALID_CONDITION } from "@/features/signup/constants";
import { UserDetails } from "@/features/signup/types/user";
import InputBox from "@/features/signup/components/InputBox";
import { GROUP_INPUT_INFO } from "@/features/signup/constants";
import { isUserDetailsValid } from "@/features/signup/helper";

export default function Page() {
  const dispatch = useAppDispatch();
  const storedUserDetails = useAppSelector((state) => state.user.userDetails);

  const [formValues, setFormValues] = useState<UserDetails>(storedUserDetails);

  const handleInputChange = (newValue: string, category: keyof UserDetails) => {
    setFormValues((prev) => ({
      ...prev,
      [category]: newValue,
    }));
  };

  const handleNext = () => {
    dispatch(changeUserDetail(formValues));
  };

  const isBtnValid = isUserDetailsValid(formValues);

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>

        {GROUP_INPUT_INFO.map((item) => (
          <InputBox
            key={item.category}
            inputInfo={item}
            valid={GROUP_VALID_CONDITION[item.category]}
            value={formValues[item.category] ?? ""}
            onText={(newValue) => handleInputChange(newValue, item.category)}
          />
        ))}
      </section>

      <NavigationButton
        onAction={handleNext}
        isValid={isBtnValid}
        title="다음으로"
        url="/step4"
      />
    </div>
  );
}
