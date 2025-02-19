'use client'

import { v4 as uuidv4 } from "uuid";
import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changePhoneNumber } from "../userSlice";
import { checkNumber, checkNumberLength, checkPhoneNumber } from "@/utils/regex";

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}

const phoneData = [
    {
        inputInfo:{
            id: "phoneNumber",
            label: "대표자 번호",
            inputType: "text",
            placeholder: "01012345678",
        },
        valid: undefined as undefined | Valid,
        button: {
            name: "인증번호 받기",
            onClick: undefined as undefined | (() => void),
        },
    },
    {
        inputInfo: {
            id: "authNumber",
            label : "인증 번호",
            inputType : "text",
            placeholder : "12345"
        },
        valid: undefined as undefined | Valid,
        button: {
            name: "인증번호 확인",
            onClick: undefined as undefined | (() => void),
        },
    }
]

export default function Page() {
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const phoneNumber = useSelector((state:RootState) => state.user.phoneNumber)
    const dispatch = useDispatch();
    
    const handlePhoneNumber = (newValue: string) => {
        const number = Number(newValue);
        dispatch(changePhoneNumber(number));
    }

    const handleSendMessage = () => {
        const code = uuidv4();
        console.log(code);
        setVerificationCode(code);
        // 메세지 보내는 code생성
    }

    const handleCheckNumber = () => {
        // 맞는 번호인지 확인 후 맞으면 Btn 활성화 
    }

    const phoneNumberValidCondition = {
        onInputCondition : (input:string) => {
            return checkNumber(input) && checkNumberLength(input,11);
        },
        onValidCondition : (input: string) => {
            return checkPhoneNumber(input);
        },
    }
    phoneData[0].valid = phoneNumberValidCondition;
    phoneData[0].button.onClick = handleSendMessage;

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>카카오톡을 통해 인증을 받아주세요</h2>
                {
                    phoneData.map((item) => (
                        <>
                            <InputBox
                                inputInfo={item.inputInfo}
                                valid={item.valid}
                                onText={(newValue) => handlePhoneNumber(newValue)}
                            />
                            <button
                                onClick={item.button.onClick}
                            >
                                {item.button.name}
                            </button>
                        </>
                    ))
                }
            </section>
            <NavigationButton isValid={isBtnValid} title="다음으로" url="step5" />
        </div>
    )
}