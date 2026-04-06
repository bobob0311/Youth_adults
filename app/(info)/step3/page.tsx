"use client";

import styles from "./page.module.scss";
import { changeUserDetail } from "@/features/signup/model/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InputBox from "@/features/signup/components/InputBox";
import { GROUP_INPUT_INFO } from "@/features/signup/constants";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  type UserDetailsFormValues,
  type UserDetailsSubmitValues,
  userDetailsSchema,
} from "@/features/signup/schema/userDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/shared/components/Button/SubmitButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useAppDispatch();
  const storedUserDetails = useAppSelector((state) => state.user.userDetails);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserDetailsFormValues, any, UserDetailsSubmitValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: storedUserDetails,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserDetailsSubmitValues> = (values) => {
    dispatch(changeUserDetail(values));
    router.push("/step4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <section>
        <h2 className={styles.title}>그룹을 간단하게 소개해주세요</h2>

        {GROUP_INPUT_INFO.map((item) => (
          <Controller
            key={item.category}
            control={control}
            name={item.category as keyof UserDetailsFormValues}
            render={({ field }) => (
              <InputBox
                inputInfo={item}
                value={field.value ?? ""}
                onText={field.onChange}
              />
            )}
          />
        ))}
      </section>

      <SubmitButton title="다음으로" isValid={isValid} />
    </form>
  );
}
