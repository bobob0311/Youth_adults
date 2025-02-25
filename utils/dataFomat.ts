export function changeUserFormat(data){
    const userData = {
        location : data.location,
        member_count: data.userInfo.cnt,
        gender: data.userInfo.sex,
        age: data.userInfo.old,
        group_name: data.groupInfo.name,
        group_description: data.groupInfo.summary,
        phone_number: String(data.phoneNumber),
    }
    return userData
}
