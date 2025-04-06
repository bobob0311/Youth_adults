import { checkNumberLength, checkSpecialCharacters } from "./regex";
import { isEmpty } from "./valid";

interface ListInfo{
    category: string;
    label: string;
    checkList: string[];
}

interface LocationInfo{
    locationName: string;
    imgUrl: string;
}

interface GroupInfo{
    category: string;
    label: string;
    inputType: string;
    placeholder: string;
    limit: number;
}

interface Valid {
    onInputCondition: (text: string) => boolean; 
    onValidCondition: (text: string) => boolean;
}

export const LOCATION_INFO: LocationInfo[] = [
    { locationName: "강남/신논현", imgUrl: "/gangnam.png" },
    { locationName: "홍대/합정", imgUrl: "/hongdae.png" },
    { locationName: "이태원", imgUrl: "/itaewon.png" },
    { locationName: "건대입구", imgUrl: "/konkuk.png" },
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
        placeholder: "ENFP, ESFJ 신입생이에요",
        limit: 20,    
    },
]

export const GROUP_VALID: Record<string, Valid> = {
    name: {
        onInputCondition: (input: string) => checkSpecialCharacters(input) && checkNumberLength(input, 10),
        onValidCondition: (input: string) => isEmpty(input),
    },
    summary: {
        onInputCondition: (input: string) => checkSpecialCharacters(input) && checkNumberLength(input, 20),
        onValidCondition: (input: string) => isEmpty(input),
    }
};
