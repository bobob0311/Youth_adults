'use client'

import { v4 as uuidv4 } from "uuid";
import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePhoneNumber } from "../userSlice";
import { checkNumber, checkNumberLength, checkPhoneNumber } from "@/utils/regex";
import { insertUserData } from "@/utils/api";
import { RootState } from "@/redux/store";
import { changeUserFormat } from "@/utils/dataFomat";

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}

const phoneData = [
    {
        inputInfo:{
            category: "phoneNumber",
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
            category: "authNumber",
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
    const verificationCodeRef = useRef<string>('');
    const myCodeRef = useRef<string>('');
    const phoneNumberRef = useRef<string>('');
    const [isBtnValid, setIsBtnValid] = useState<boolean>(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
    const dispatch = useDispatch();

    const userInfo = useSelector((state: RootState) => state.user);
    
    const handleInput = (newValue: string, category: string, isValid:boolean) => {
        if (category === "phoneNumber") {
            phoneNumberRef.current = newValue;
            setIsPhoneNumberValid(isValid);

        } else if (category === "authNumber") {
            myCodeRef.current = newValue
        }
    }

    const handleSendMessage = () => {
        setIsBtnValid(false);
        if (isPhoneNumberValid) {
            const number = Number(phoneNumberRef.current);
            dispatch(changePhoneNumber(number));
            const code = uuidv4();
            console.log(code);
            verificationCodeRef.current = code;
            // 메세지 보내는 code생성    
        } else {
            alert("핸드폰 번호 제대로 입력해라 ;;")
        }
        
    }

    const handleCheckNumber = () => {
        if (myCodeRef.current === verificationCodeRef.current) {
            setIsBtnValid(true);
        } else {
            setIsBtnValid(false);
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


    phoneData[0].valid = phoneNumberValidCondition;
    phoneData[0].button.onClick = handleSendMessage;

    phoneData[1].button.onClick = handleCheckNumber;

    const userData = changeUserFormat(userInfo)
    
    async function insertData(userData) {
        insertUserData(userData);
    }

    

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.title}>카카오톡을 통해 인증을 받아주세요</h2>
                {
                    phoneData.map((item) => (
                        <div key={item.inputInfo.label}>
                            <InputBox
                                inputInfo={item.inputInfo}
                                valid={item.valid}
                                onText={(newValue, category,isValid) => handleInput(newValue,category,isValid)}
                            />
                            <button
                                onClick={item.button.onClick}
                            >
                                {item.button.name}
                            </button>
                        </div>
                    ))
                }
            </section>
            <NavigationButton onStore={() => {insertData(userData)}} isValid={true} title="다음으로" url="done" />
        </div>
    )
}