export function changeUserFormat(data) {
    const newOld = changeOld(data.userInfo.old);
    const userData = {
        location : data.location,
        member_count: data.userInfo.cnt,
        gender: data.userInfo.sex,
        age: newOld,
        group_name: data.groupInfo.name,
        group_description: data.groupInfo.summary,
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