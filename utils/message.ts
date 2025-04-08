export function makeMatchingMessage(info) {
    const { phoneNumber, userName, url } = info;
    const messageInfo = {
    message_title: "청춘상회 매칭 알림",
    phoneNumber,
    message:`[청춘상회]\n`+
    `${userName}님이 설정한 그룹 조건에 맞는 그룹이 청춘상회에 입장했어요!\n\n` +
    `매칭그룹의 정보를 확인한 후 이어서 진행할 지 결정해주세요!\n\n`+
    `10분간 응답이 없을 시 자동으로 신청이 취소됩니다.\n\n`+
    `매칭그룹 보러가기:\n${url}`,
    message_type : "LMS",
    }
    return messageInfo;
}

export function makeEnterMatchingRoomMessage(info) {
    const { phoneNumber, url, userId, password } = info; 
    const messageInfo = {
    message_title: "청춘상회 매칭 알림",
    phoneNumber,
    message:`[청춘상회]\n`+
    `매칭을 성공했어요! 지금 즉시 매칭룸에 입장해주세요!\n\n` +
    `10분 내 매칭룸에 입장하지 않으면 매칭이 자동 취소됩니다.\n\n`+
    `매칭룸 입장:\n${url}${userId}\n`+
    `비밀번호:[${password}]`,
    message_type : "LMS",
    }
    return messageInfo;
}

export function makeFailToMatchMessage(info) {
    const { phoneNumber, url } = info;
    const messageInfo = {
    message_title: "청춘상회 매칭 알림",
    phoneNumber,
    message:`[청춘상회]\n`+
    `상대그룹이 매칭을 취소했어요.\n\n` +
    `다른 그룹 매칭을 찾으면 바로 알려드릴께요!\n\n`+
    `매칭중단:\n${url}`,
    message_type : "LMS",
    }
    return messageInfo;
}

export function makeStopMatchingByNoResponse(info) {
    const { phoneNumber } = info;
    const messageInfo = {
    message_title: "청춘상회 매칭 알림",
    phoneNumber,
    message:`[청춘상회]\n`+
    `매칭룸 입장 여부에 응답이 없어 매칭탐색을 중지하였습니다.\n\n`,
    message_type : "SMS",
    }
    return messageInfo;
}

export function makeValidCode(info) {
    const { phoneNumber, code } = info;
    const messageInfo = {
        message_title: "청춘상회 매칭 알림",
        phoneNumber,
        message:`[청춘상회]\n`+
        `인증을 위해 인증번호[${code}]를 입력해주세요\n\n`,
        message_type : "SMS",
    }
    return messageInfo;
}