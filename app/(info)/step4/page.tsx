'use client'

import InputBox from "@/components/input/InputBox";
import NavigationButton from "@/components/button/NavigationButton";
import styles from "./page.module.scss"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePhoneNumber } from "../userSlice";
import { checkNumber, checkNumberLength, checkPhone } from "@/utils/regex";
import { insertUserData, sendAligoMessage } from "@/utils/api";
import { RootState } from "@/redux/store";
import { changeUserFormat } from "@/utils/dataFomat";
import matching from "@/utils/matching";
import { makeValidCode } from "@/utils/message";
import Counter from "./counter";
import { UserState } from "@/types/user";
import { Modal } from "@/components/Modal/Modal";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

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

const PHONE_VALID_CONDITION:Valid = {
    onInputCondition : (input:string) => {
        return checkNumber(input) && checkNumberLength(input,11);
    },
    onValidCondition : (input: string) => {
        return checkPhone(input);
    },
}

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}

export default function Page() {
    const verificationCodeRef = useRef<number>(undefined);
    const verificationTimeRef = useRef<number>(undefined);
    const myCodeRef = useRef<number>(undefined);
    const phoneNumberRef = useRef<string>('');
    const phoneNumberValid = useRef<boolean>(false);
    
    const [isBtnValid, setIsBtnValid] = useState<string>("wait");
    const [isSend, setIsSend] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const userInfo:UserState = useSelector((state: RootState) => state.user);
    
    const handleInput = (newValue: string, category: string, isValid:boolean) => {
        if (category === "phoneNumber") {
            phoneNumberRef.current = newValue;
            phoneNumberValid.current = isValid;
        } else if (category === "authNumber") {
            myCodeRef.current = Number(newValue)
        }
    }

    const handleSendMessage = () => {
        setIsBtnValid("wait");

        if (phoneNumberValid.current) {
            setIsSend(true);

            setTimeout(() => {
                setIsSend(false);
            }, 30000)
            
            dispatch(changePhoneNumber(phoneNumberRef.current));

            const code = Math.floor(10000 + Math.random() * 90000);
            verificationCodeRef.current = code;

            sendVerificationCodeMessage(phoneNumberRef.current,code);         
        } else {
            alert("핸드폰 번호를 올바르게 입력해 주세요.")
        }
        
    }

    const sendVerificationCodeMessage = (phoneNumber:string,code:number) => {
        const info = { phoneNumber, code };
        const messageInfo = makeValidCode(info);
        sendAligoMessage(messageInfo);
        console.log(code);    
    }

    const handleCheckNumber = () => {
        if (phoneNumberRef.current) {
            if (myCodeRef.current === verificationCodeRef.current) {
                setIsBtnValid("success");
            } else {
                setIsBtnValid("fail");
                setTimeout(() => {
                    setIsBtnValid("wait");
                },2000)
            }    
        }
    }

    async function handleClickNavBtn(userInfo: UserState) {
        setLoading(true);
        try {
            const userData = changeUserFormat(userInfo);
            await insertUserData(userData);
            matching();
        } catch (error) {
            console.error("Error during the process:", error);
            return false;
        }
        return true;
    }

    const handleFail = () => {
        setLoading(false);

    }
    useEffect(() => {
        console.log("Loading 상태 변경:", loading);
    }, [loading]);

    return (
        <>
            <div className={styles.container}>
                <section>
                    <h2 className={styles.title}>문자를 통해 인증을 받아주세요</h2>
                    <div className={styles.wrapper}>
                        <InputBox
                            inputInfo={PHONEDATA[0]}
                            valid={PHONE_VALID_CONDITION}
                            onText={(newValue, category,isValid) => handleInput(newValue,category,isValid)}
                        />
                        <button 
                            className={`${styles.btn} ${isSend ? styles.send: undefined}`}
                            onClick={isSend ? undefined : handleSendMessage}
                        >
                            {isSend ?
                                <>
                                    인증번호 문자 발송완료! 재전송은
                                        < Counter countTime={30} onTime={(time)=> {verificationTimeRef.current = time}}/>
                                    초 후에 할 수 있어요.
                                </>
                                : "인증번호 받기"
                                }
                        </button>
                    </div>
                    <div className={styles.wrapper}>
                        <InputBox
                            inputInfo={PHONEDATA[1]}
                            valid={undefined}
                            onText={(newValue, category,isValid) => handleInput(newValue,category,isValid)}
                        />
                        <button
                            className={styles.btn}
                            onClick={handleCheckNumber}
                        >
                            인증번호 확인
                        </button>
                    </div>
                    {isBtnValid === "fail"? <div className={styles.btnFailMsg}>인증에 실패하였습니다. 잠시 후 다시 시도해주세요!</div>: null}
                </section>
                <NavigationButton onFail={() => {handleFail()}} onAction={() => { return handleClickNavBtn(userInfo);}} isValid={isBtnValid === "success"} title="다음으로" url="done" />
            </div>
            {loading ?
                <Modal>
                    <div className={styles.modalWrapper}>
                        <LoadingSpinner />
                        <h2 className={styles.loadingText}>저장중입니다...</h2>
                    </div>
                </Modal>
                :
                null
            }
        </>
    )
}