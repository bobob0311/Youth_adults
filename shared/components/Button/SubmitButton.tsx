"use client";

import styles from "./BaseButton.module.scss";

interface Props {
  title: string;
  isValid: boolean;
}

export default function SubmitButton({ title, isValid }: Props) {
  return (
    <button
      type="submit"
      disabled={!isValid}
      className={`${styles.navBtn} ${isValid ? "" : styles.disable}`}
    >
      <span>{title}</span>
    </button>
  );
}
