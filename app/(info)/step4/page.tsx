"use client";

import NavigationButton from "@/shared/components/NavigationButton";
import styles from "./page.module.scss";
import { useState } from "react";
import { insertUserData } from "@/utils/api";
import { changeUserFormat } from "@/utils/dataFomat";
import matching from "@/utils/matching";
import LoadingModal from "../../../shared/components/LoadingModal";
import { PHONE_INPUT_INFO, PHONE_VALID_CONDITION } from "@/utils/dummyData";
import { useAppSelector } from "@/redux/hooks";
import type { VerificationStatus } from "@/features/signup/types/phone";
import PhoneVerification from "@/features/signup/components/PhoneVerification";

export default function Page() {
  const userInfo = useAppSelector((state) => state.user);

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("idle");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const userData = changeUserFormat(userInfo);

      await insertUserData(userData);
      await matching();

      return true;
    } catch (error) {
      console.error("❌ 전체 흐름 중 에러 발생:", error);
      setLoading(false);
      return false;
    }
  };

  const handleFail = () => {
    setLoading(false);
  };

  return (
    <>
      <div className={styles.container}>
        <section>
          <h2 className={styles.title}>문자를 통해 인증을 받아주세요</h2>

          <PhoneVerification
            phoneInputInfo={PHONE_INPUT_INFO}
            phoneValidCondition={PHONE_VALID_CONDITION}
            verificationStatus={verificationStatus}
            onVerificationStatusChange={setVerificationStatus}
          />

          {verificationStatus === "fail" && (
            <div className={styles.btnFailMsg}>
              인증에 실패하였습니다. 잠시 후 다시 시도해주세요!
            </div>
          )}
        </section>

        <NavigationButton
          onFail={handleFail}
          onAction={handleSubmit}
          isValid={verificationStatus === "success"}
          title="다음으로"
          url="/done"
        />
      </div>

      {loading && <LoadingModal />}
    </>
  );
}
