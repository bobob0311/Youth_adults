'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePhoneNumber } from "../userSlice";
import { checkNumber, checkNumberLength, checkPhoneNumber } from "@/utils/regex";
import { insertUserData, sendAligoMessage } from "@/utils/api";
import { RootState } from "@/redux/store";
import { changeUserFormat } from "@/utils/dataFomat";
import matching from "@/utils/matching";
import { makeValidCode } from "@/utils/message";

const PHONEDATA = [
    {
        category: "phoneNumber",
        label: "대표자 번호",
        inputType: "text",
        placeholder: "01012345678",
    },
    {
        category: "authNumber",
        label : "인증 번호",
        inputType : "text",
        placeholder : "12345"
    }
]

export default function Page() {
    const verificationCodeRef = useRef<number>(undefined);
    const [verificationTime,setVerificationTime] = useState<number>(0);
    const myCodeRef = useRef<number>(undefined);
    const phoneNumberRef = useRef<string>('');
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
    const [isSend, setIsSend] = useState<boolean>(false);
    
    const dispatch = useDispatch();

    const userInfo = useSelector((state: RootState) => state.user);
    
    const handleInput = (newValue: string, category: string, isValid:boolean) => {
        if (category === "phoneNumber") {
            phoneNumberRef.current = newValue;
            setIsPhoneNumberValid(isValid);

        } else if (category === "authNumber") {
            myCodeRef.current = Number(newValue)
        }
    }
    
    const handleCountDown = () => {
        const remainingTime = 30;
        setVerificationTime(remainingTime);

        const countdown = setInterval(() => {
        setVerificationTime((prev) => prev -1)

        if (verificationTime <= 0) {
                clearInterval(countdown);
            }
        }, 1000);
    }
    

    const handleSendMessage = () => {
        setIsBtnValid(false);
        if (isPhoneNumberValid) {
            setIsSend(true);
            handleCountDown();
            setTimeout(() => {
                setIsSend(false);
            },30000)
            dispatch(changePhoneNumber(phoneNumberRef.current));
            const code = Math.floor(10000 + Math.random() * 90000);
            verificationCodeRef.current = code;

            sendVerificationCodeMessage(phoneNumberRef.current,code);         
        } else {
            alert("핸드폰 번호 제대로 입력해라;;")
        }
        
    }

    const sendVerificationCodeMessage = (phoneNumber,code) => {
        const info = { phoneNumber, code };
        const messageInfo = makeValidCode(info);
        sendAligoMessage(messageInfo);
        console.log(code);    
    }

    const handleCheckNumber = () => {
        if (phoneNumberRef.current) {
            if (myCodeRef.current === verificationCodeRef.current) {
                setIsBtnValid(true);
            } else {
                alert("인증번호가 잘못되었습니다. 다시 확인해주세요")
                setIsBtnValid(false);
            }    
        }
        
    }

    const phoneNumberValidCondition = {
        onInputCondition : (input:string) => {
            return checkNumber(input) && checkNumberLength(input,11);
        },
        onValidCondition : (input: string) => {
            return checkPhoneNumber(input);
        },
    }

    const userData = changeUserFormat(userInfo)
    
    async function insertData(userData) {
        insertUserData(userData);
        matching();
    }

    const handleBlockSendMessage = () => {
        alert(`${verificationTime}초만 기다려주세요`);
    }

    

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>카카오톡을 통해 인증을 받아주세요</h2>
                <div className={styles.wrapper}>
                    <InputBox
                        inputInfo={PHONEDATA[0]}
                        valid={phoneNumberValidCondition}
                        onText={(newValue, category,isValid) => handleInput(newValue,category,isValid)}
                    />
                    <button 
                        onClick={isSend ? handleBlockSendMessage : handleSendMessage}
                    >
                        {isSend? `인증번호 문자 발송완료! 재전송은 ${verificationTime}초 후에 할 수 있어요.`: "인증번호 받기"}
                    </button>
                </div>
                <div className={styles.wrapper}>
                    <InputBox
                        inputInfo={PHONEDATA[1]}
                        valid={undefined}
                        onText={(newValue, category,isValid) => handleInput(newValue,category,isValid)}
                    />
                    <button
                        onClick={handleCheckNumber}
                    >
                        인증번호 확인
                    </button>
                </div>
            </section>
            <NavigationButton onStore={() => {insertData(userData)}} isValid={isBtnValid} title="다음으로" url="done" />
        </div>
    )
}