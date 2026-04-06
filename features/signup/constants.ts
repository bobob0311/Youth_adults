import { checkNumberLength, checkNumber, checkPhone } from "@/utils/regex";
import type { GroupInputInfo } from "./types/group";
import { isEmpty } from "@/utils/valid";

interface GroupInfo {
  category: string;
  label: string;
  inputType: string;
  placeholder: string;
  limit: number;
}

interface PhoneInfo {
  category: string;
  label: string;
  inputType: string;
  placeholder: string;
}

interface Valid {
  onInputCondition: (text: string) => boolean;
  onValidCondition: (text: string) => boolean;
}

export const GROUP_INPUT_INFO: GroupInputInfo[] = [
  {
    category: "name",
    label: "그룹명",
    inputType: "text",
    placeholder: "서초구 에스파",
    limit: 10,
  },
  {
    category: "summary",
    label: "한줄소개",
    inputType: "text",
    placeholder: "첫차까지 달릴 수 있는 텐션 소유자!",
    limit: 20,
  },
];

export const GROUP_VALID_CONDITION: Record<string, Valid> = {
  name: {
    onInputCondition: (input: string) => checkNumberLength(input, 10),
    onValidCondition: (input: string) => isEmpty(input),
  },
  summary: {
    onInputCondition: (input: string) => checkNumberLength(input, 20),
    onValidCondition: (input: string) => isEmpty(input),
  },
};

export const PHONE_INPUT_INFO: PhoneInfo[] = [
  {
    category: "phoneNumber",
    label: "대표자 번호",
    inputType: "text",
    placeholder: "01012345678",
  },
  {
    category: "authNumber",
    label: "인증 번호",
    inputType: "text",
    placeholder: "12345",
  },
];

export const PHONE_VALID_CONDITION: Valid = {
  onInputCondition: (input: string) => {
    return checkNumber(input) && checkNumberLength(input, 11);
  },
  onValidCondition: (input: string) => {
    return checkPhone(input);
  },
};
