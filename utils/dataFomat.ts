import { UserState } from "@/types/user";

export function changeUserFormat(data: UserState) {
    const newOld = changeOld(data.userProfile.age);
    const userData = {
        location : data.location,
        member_count: data.userProfile.count,
        gender: data.userProfile.gender,
        age: newOld,
        group_name: data.userDetails.name,
        group_description: data.userDetails.summary,
        phone_number: String(data.phoneNumber),
        payment: false,
    }
    return userData
}

function changeOld(old:string) {
    let calcOld:number = 0;
    const firstTow = Number(old.slice(0, 2));
    const lastOne = old.slice(-1);
    calcOld += (firstTow / 10) * 3;
    
    if (lastOne === "중") {
        calcOld += 1;
    } else if (lastOne === "말") {
        calcOld += 2;
    }

    return calcOld;
}