"use client";

import styles from "./InputBox.module.scss";

interface InputInfo {
  category: string;
  label: string;
  inputType: string;
  placeholder: string;
  limit?: number;
}

interface ValidCondition {
  onInputCondition: (text: string) => boolean;
  onValidCondition: (text: string) => boolean;
}

interface PropsState {
  inputInfo: InputInfo;
  valid?: ValidCondition;
  value: string;
  onText: (newValue: string) => void;
}

export default function InputBox({
  inputInfo,
  valid,
  value,
  onText,
}: PropsState) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (valid) {
      const { onInputCondition } = valid;

      if (!onInputCondition(newValue)) return;
    }

    onText(newValue);
  };

  const isInvalid = valid ? !valid.onValidCondition(value) : false;

  return (
    <label className={styles.InputBox}>
      <span>{inputInfo.label}</span>
      <input
        value={value}
        onChange={handleChange}
        type={inputInfo.inputType}
        placeholder={inputInfo.placeholder}
        aria-invalid={isInvalid}
      />
      {inputInfo.limit && (
        <span
          className={`${styles.count} ${value.length >= inputInfo.limit ? styles.limit : ""}`}
        >
          {`${value.length}/${inputInfo.limit}`}
        </span>
      )}
    </label>
  );
}
