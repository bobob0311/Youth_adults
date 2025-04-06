"use client";
import InputBox from "@/components/input/InputBox";
import styles from "./Phone.module.scss";
import { useRef } from "react";

export default function CodeInputBox({ CodeInput, onCheck }) {
  const myCodeRef = useRef<number>(undefined);
  const handleInput = (newValue:string) => {
      myCodeRef.current = Number(newValue)
  }

  return (
    <div className={styles.wrapper}>
        <InputBox
            inputInfo={CodeInput}
            valid={undefined}
            onText={(newValue) => handleInput(newValue)}
        />
        <button
            className={styles.btn}
            onClick={() => onCheck(myCodeRef.current)}
        >
            인증번호 확인
        </button>
    </div>
  );
}
