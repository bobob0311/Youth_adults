interface ListInfo{
    category: Category;
    label: string;
    checkList: string[];
}
type Category = "count" | "gender" | "age";


interface LocationInfo{
    locationName: string;
    imgUrl: string;
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