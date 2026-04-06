"use client";

import { useEffect, useRef } from "react";
import PhoneInputBox from "./PhoneInputBox";
import CodeInputBox from "./CodeInputBox";
import { sendAligoMessage } from "@/apiHandler/aligoMessage";
import { makeValidCode } from "@/utils/message";
import type {
  PhoneInputInfo,
  VerificationStatus,
} from "@/features/signup/types/phone";

interface PhoneVerificationProps {
  phoneInputInfo: PhoneInputInfo[];
  verificationStatus: VerificationStatus;
  onVerificationStatusChange: (status: VerificationStatus) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

export default function PhoneVerification({
  phoneInputInfo,
  onPhoneNumberChange,
  verificationStatus,
  onVerificationStatusChange,
}: PhoneVerificationProps) {
  const verificationCodeRef = useRef<number | null>(null);
  const phoneNumberRef = useRef<string>("");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const sendVerificationCodeMessage = async (
    phoneNumber: string,
    code: number,
  ) => {
    const info = { phoneNumber, code };
    console.log(code);
    const messageInfo = makeValidCode(info);
    await sendAligoMessage(messageInfo);
  };

  const handleCode = async (phoneNumber: string) => {
    const code = Math.floor(10000 + Math.random() * 90000);

    verificationCodeRef.current = code;
    phoneNumberRef.current = phoneNumber;

    onVerificationStatusChange("idle");
    await sendVerificationCodeMessage(phoneNumber, code);
  };

  const checkVerificationCode = (myCode: number) => {
    if (!phoneNumberRef.current || verificationCodeRef.current === null) {
      return;
    }

    if (myCode === verificationCodeRef.current) {
      onVerificationStatusChange("success");
      return;
    }

    onVerificationStatusChange("fail");

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      onVerificationStatusChange("idle");
    }, 2000);
  };

  return (
    <>
      <PhoneInputBox
        verificationStatus={verificationStatus}
        phoneInput={phoneInputInfo[0]}
        onPhoneNumberChange={onPhoneNumberChange}
        onPhoneNumber={handleCode}
        onVerificationStatusChange={onVerificationStatusChange}
      />
      <CodeInputBox
        codeInput={phoneInputInfo[1]}
        onCheck={checkVerificationCode}
      />
    </>
  );
}
