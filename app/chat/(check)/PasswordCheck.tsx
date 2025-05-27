"use client";
import { useState } from "react";
import { checkAndStorePassword } from "../../../serverActions/verifyPassword";
import { useRouter } from "next/navigation";
import InputBox from "@/components/input/InputBox";
import { checkNumberLength } from "@/utils/regex";
import styles from "./PasswordCheck.module.scss"
import LoadingModal from "@/components/Modal/LoadingModal";

const inputInfo = {
  category: "password",
  label: "비밀번호",
  inputType: "password",
  placeholder: "12345",
  limit: 5
}

const valid = {
  onInputCondition: (input: string) => checkNumberLength(input, 5),
  onValidCondition: (input: string) => checkNumberLength(input, 5)
}
  
export default function PasswordCheck({ roomId }: { roomId: string;}) {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCheckPassword = async () => {
    setError("");
    setLoading(true);

    const result = await checkAndStorePassword(roomId, password)
    
    if (result) {
      router.refresh();
    } else {
      setError("잘못된 비밀번호입니다. 다시 입력해주세요!");
      setTimeout(() => {
        setError("");
      }, 3000)
      setLoading(false);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.box}>
          <h2 className={styles.title}>발송된 비밀번호를 입력해주세요!</h2>  
          
            <InputBox
              inputInfo={inputInfo}
              onText={(newValue) => setPassword(newValue)}
              valid={valid}
            />
          
          {error && <p className={styles.errorText}>{error}</p>} 
          {loading? <LoadingModal><span>확인중...</span></LoadingModal> : null}
        </div>
      </div>
      
      <button
        className={styles.navBtn}
        onClick={handleCheckPassword}
      >
        매칭룸 입장하기
      </button>
      
    </div>
  );
}