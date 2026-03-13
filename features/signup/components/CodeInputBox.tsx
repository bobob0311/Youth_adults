"use client";
import InputBox from "@/features/signup/components/InputBox";
import styles from "./Phone.module.scss";
import { useState } from "react";

import type { PhoneInputInfo } from "@/features/signup/types/phone";

interface CodeInputBoxProps {
  codeInput: PhoneInputInfo;
  onCheck: (code: number) => void;
}

export default function CodeInputBox({
  codeInput,
  onCheck,
}: CodeInputBoxProps) {
  const [codeText, setCodeText] = useState("");

  const handleCheck = () => {
    onCheck(Number(codeText));
  };

  return (
    <div className={styles.wrapper}>
      <InputBox inputInfo={codeInput} value={codeText} onText={setCodeText} />
      <button type="button" className={styles.btn} onClick={handleCheck}>
        인증번호 확인
      </button>
    </div>
  );
}
