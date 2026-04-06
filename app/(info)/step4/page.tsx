"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { insertUserData } from "@/utils/api";
import { changeUserFormat } from "@/utils/dataFomat";
import matching from "@/utils/matching";
import LoadingModal from "../../../shared/components/LoadingModal";
import { PHONE_INPUT_INFO } from "@/features/signup/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changePhoneNumber } from "@/features/signup/model/userSlice";
import type { VerificationStatus } from "@/features/signup/types/phone";
import PhoneVerification from "@/features/signup/components/PhoneVerification";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  type PhoneVerificationFormValues,
  type PhoneVerificationSubmitValues,
  phoneVerificationSchema,
} from "@/features/signup/schema/phoneVerification";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/shared/components/Button/SubmitButton";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("idle");
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<PhoneVerificationFormValues, any, PhoneVerificationSubmitValues>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      phoneNumber: userInfo.phoneNumber,
      verificationStatus: "idle",
    },
    mode: "onChange",
  });

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber, { shouldValidate: true });
  };

  const handleVerificationStatusChange = (status: VerificationStatus) => {
    setVerificationStatus(status);
    setValue("verificationStatus", status, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<PhoneVerificationSubmitValues> = async ({
    phoneNumber,
  }) => {
    setLoading(true);

    try {
      dispatch(changePhoneNumber(phoneNumber));
      const userData = changeUserFormat({ ...userInfo, phoneNumber });

      await insertUserData(userData);
      await matching();
      router.push("/done");
    } catch (error) {
      console.error("❌ 전체 흐름 중 에러 발생:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <section>
          <h2 className={styles.title}>문자를 통해 인증을 받아주세요</h2>

          <PhoneVerification
            phoneInputInfo={PHONE_INPUT_INFO}
            verificationStatus={verificationStatus}
            onVerificationStatusChange={handleVerificationStatusChange}
            onPhoneNumberChange={handlePhoneNumberChange}
          />

          {verificationStatus === "fail" && (
            <div className={styles.btnFailMsg}>
              인증에 실패하였습니다. 잠시 후 다시 시도해주세요!
            </div>
          )}
        </section>

        <SubmitButton title="다음으로" isValid={isValid && !loading} />
      </form>

      {loading && <LoadingModal />}
    </>
  );
}
