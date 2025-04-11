"use client"
import styles from "./Phone.module.scss"
import InputBox from "@/components/input/InputBox"
import { useRef, useState } from "react";
import Counter from "../counter";
import { changePhoneNumber } from "../../userSlice";


export default function PhoneInputBox({setIsBtnValid,phoneInput,valid,dispatch,onPhoneNumber }) {
    const [isSend, setIsSend] = useState<boolean>(false);
    const phoneNumberRef = useRef<string>('');
    const phoneNumberValid = useRef<boolean>(false);
    
    const handleInput = (newValue: string, isValid: boolean) => {
        phoneNumberRef.current = newValue;
        phoneNumberValid.current = isValid;
    }

    const handleSendMessage = () => {
        setIsBtnValid("wait");

        if (phoneNumberValid.current) {
            setIsSend(true);

            setTimeout(() => {
                setIsSend(false);
            }, 30000)
            dispatch(changePhoneNumber(phoneNumberRef.current));
            onPhoneNumber(phoneNumberRef.current);
        } else {
            alert("핸드폰 번호를 올바르게 입력해 주세요.")
        }
        
    }

    return (
        <div className={styles.wrapper}>
            <InputBox
                inputInfo={phoneInput}
                valid={valid}
                onText={(newValue,_,isValid) => handleInput(newValue,isValid)}
            />
            <button 
                className={`${styles.btn} ${isSend ? styles.send: undefined}`}
                onClick={isSend ? undefined : handleSendMessage}
            >
                {isSend ?
                    <>
                        인증번호 문자 발송완료! 재전송은
                            < Counter countTime={30} />
                        초 후에 할 수 있어요.
                    </>
                    : "인증번호 받기"
                    }
            </button>
        </div>
    )
}