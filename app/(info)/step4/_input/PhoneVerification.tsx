"use client";
import PhoneInputBox from "./PhoneInputBox";
import CodeInputBox from "./CodeInputBox";
import { useRef } from "react";
import { sendAligoMessage } from "@/apiHandler/aligoMessage";
import { makeValidCode } from "@/utils/message";

export default function PhoneVerification({setIsBtnValid,dispatch,phoneInputInfo,phoneValidCondition}) {
  const verificationCodeRef = useRef<number>(undefined);
  const phoneNumberRef = useRef<string>('');


  const handleCode = (phoneNumber) => {
    const code = Math.floor(10000 + Math.random() * 90000);
    verificationCodeRef.current = code;
    phoneNumberRef.current = phoneNumber
    sendVerificationCodeMessage(phoneNumber, code);
  }  
  
  const sendVerificationCodeMessage = async (phoneNumber: string, code: number) => {
      const info = { phoneNumber, code };
      const messageInfo = makeValidCode(info);
      await sendAligoMessage(messageInfo);
  }

  const checkVerificationCode = (myCode:number) => {
    if (phoneNumberRef.current) {
        if (myCode === verificationCodeRef.current) {
            setIsBtnValid("success");
        } else {
            setIsBtnValid("fail");
            setTimeout(() => {
                setIsBtnValid("wait");
            },2000)
        }    
    }
  }


  return (
    <>
      <PhoneInputBox
        setIsBtnValid={setIsBtnValid}
        phoneInput={phoneInputInfo[0]}
        valid={phoneValidCondition}
        dispatch={dispatch}
        onPhoneNumber={(phoneNumber)=> handleCode(phoneNumber) }
      />
      <CodeInputBox
        CodeInput={phoneInputInfo[1]}
        onCheck= {(myCode:number)=> {checkVerificationCode(myCode)}}
      />
    </>
  );
}
