"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

import SubmitButton from "@/shared/components/Button/SubmitButton";

import styles from "./selectionPage.module.scss";
import { changeUserProfile } from "@/features/signup/model/userSlice";
import { LIST_INFO } from "@/features/signup/constants/userProfile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ListCheckButton from "@/features/signup/components/ListCheck";
import {
  userProfileSchema,
  type UserProfileFormValues,
  type UserProfileSubmitValues,
} from "@/features/signup/schema/userProfile";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SelectionPage() {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserProfileFormValues, any, UserProfileSubmitValues>({
    resolver: zodResolver(userProfileSchema),
    mode: "onChange",
    defaultValues: {
      count: userProfile.count ?? "",
      gender: userProfile.gender ?? "",
      age: userProfile.age ?? "",
    },
  });

  const onSumit: SubmitHandler<UserProfileSubmitValues> = (values) => {
    dispatch(changeUserProfile(values));
    router.push("/step3");
  };

  return (
    <form onSubmit={handleSubmit(onSumit)} className={styles.container}>
      <section>
        <h2 className={styles.title}>그룹 정보를 선택해주세요</h2>

        {LIST_INFO.map((item) => (
          <Controller
            key={item.category}
            control={control}
            name={item.category as keyof UserProfileFormValues}
            render={({ field }) => (
              <ListCheckButton
                listInfo={item}
                selectedItem={field.value ?? ""}
                onSelectedChange={(_, selected) => field.onChange(selected)}
              />
            )}
          />
        ))}
      </section>

      <SubmitButton title="다음으로" isValid={isValid} />
    </form>
  );
}
