interface ListInfo {
  category: string;
  label: string;
  checkList: string[];
}

export const LIST_INFO: ListInfo[] = [
  {
    category: "count",
    label: "인원 수",
    checkList: ["2명", "3명", "4명", "5명", "그 이상"],
  },
  {
    category: "gender",
    label: "그룹 성별",
    checkList: ["여성", "남성", "혼성"],
  },
  {
    category: "age",
    label: "평균 연령",
    checkList: ["20대 초", "20대 중", "20대 말"],
  },
];
