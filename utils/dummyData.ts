import { checkNumber, checkNumberLength, checkPhone, checkSpecialCharacters } from "./regex";
import { isEmpty } from "./valid";

interface ListInfo{
    category: string;
    label: string;
    checkList: string[];
}

interface LocationInfo{
    locationName: string;
    imgUrl: string;
    block: boolean;
}

interface GroupInfo{
    category: string;
    label: string;
    inputType: string;
    placeholder: string;
    limit: number;
}

interface PhoneInfo{
    category: string;
    label: string;
    inputType: string;
    placeholder: string;
}

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}

export const LOCATION_INFO: LocationInfo[] = [
    { locationName: "부평역", imgUrl: "/gangnam.png", block:false },
    { locationName: "부천역", imgUrl: "/hongdae.png",block:false },
    { locationName: "이태원", imgUrl: "/itaewon.png",block:true },
    { locationName: "건대입구", imgUrl: "/konkuk.png",block:true },
]

export const LIST_INFO: ListInfo[] = [
    { category: "count", label: "인원 수", checkList: ["2명", "3명", "4명", "5명","그 이상"] },
    { category: "gender",label: "그룹 성별", checkList: ['여성', '남성', '혼성'] },
    { category: "age", label: "평균 연령",checkList : ['20대 초','20대 중','20대 말']},
]

export const GROUP_INPUT_INFO: GroupInfo[] = [
    {
        category: "name",
        label: "그룹명",
        inputType: "text",
        placeholder: "서초구 에스파",
        limit: 10,
    },
    {
        category: "summary",
        label:"한줄소개",
        inputType:"text",
        placeholder: "첫차까지 달릴 수 있는 텐션 소유자!",
        limit: 20,    
    },
]

export const GROUP_VALID_CONDITION: Record<string, Valid> = {
    name: {
        onInputCondition: (input: string) => checkNumberLength(input, 10),
        onValidCondition: (input: string) => isEmpty(input),
    },
    summary: {
        onInputCondition: (input: string) => checkNumberLength(input, 20),
        onValidCondition: (input: string) => isEmpty(input),
    }
};

export const PHONE_INPUT_INFO: PhoneInfo[]= [
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

export const PHONE_VALID_CONDITION:Valid = {
    onInputCondition : (input:string) => {
        return checkNumber(input) && checkNumberLength(input,11);
    },
    onValidCondition : (input: string) => {
        return checkPhone(input);
    },
}