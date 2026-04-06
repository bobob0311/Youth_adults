"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Phone.module.scss";
import InputBox from "@/features/signup/components/InputBox";
import Counter from "./counter";
import { checkNumber, checkNumberLength, checkPhone } from "@/utils/regex";
import type {
  PhoneInputInfo,
  VerificationStatus,
} from "@/features/signup/types/phone";

interface PhoneInputBoxProps {
  verificationStatus: VerificationStatus;
  phoneInput: PhoneInputInfo;
  onPhoneNumber: (phoneNumber: string) => Promise<void> | void;
  onVerificationStatusChange: (status: VerificationStatus) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

export default function PhoneInputBox({
  verificationStatus,
  phoneInput,
  onPhoneNumber,
  onVerificationStatusChange,
  onPhoneNumberChange,
}: PhoneInputBoxProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSend, setIsSend] = useState(false);
  const resendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) {
        clearTimeout(resendTimerRef.current);
      }
    };
  }, []);

  const isPhoneValid = checkPhone(phoneNumber);

  const handleInput = (newValue: string) => {
    if (!checkNumber(newValue) || !checkNumberLength(newValue, 11)) {
      return;
    }
    setPhoneNumber(newValue);
    onPhoneNumberChange(newValue);

    if (verificationStatus !== "idle") {
      onVerificationStatusChange("idle");
    }
  };

  const handleSendMessage = async () => {
    onVerificationStatusChange("idle");

    if (!isPhoneValid) {
      alert("핸드폰 번호를 올바르게 입력해 주세요.");
      return;
    }

    setIsSend(true);

    if (resendTimerRef.current) {
      clearTimeout(resendTimerRef.current);
    }

    resendTimerRef.current = setTimeout(() => {
      setIsSend(false);
    }, 30000);

    await onPhoneNumber(phoneNumber);
  };

  return (
    <div className={styles.wrapper}>
      <InputBox
        inputInfo={phoneInput}
        value={phoneNumber}
        onText={handleInput}
      />

      <button
        type="button"
        className={`${styles.btn} ${isSend ? styles.send : ""}`}
        onClick={isSend ? undefined : handleSendMessage}
      >
        {isSend ? (
          <>
            인증번호 문자 발송완료! 재전송은
            <Counter countTime={30} />초 후에 할 수 있어요.
          </>
        ) : (
          "인증번호 받기"
        )}
      </button>
    </div>
  );
}
