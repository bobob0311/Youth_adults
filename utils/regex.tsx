export function checkSpecialCharacters(input: string) {
    const regex = /^[^!@#$%^&*()_+={}\[\]|\\:;\"'<>,.?/`~]*$/; // 특수문자 제외
    return regex.test(input);
}

export function checkNumberLength(input:string, length:number) {
    const regex = new RegExp(`^.{${length+1},}$`); 
    return !regex.test(input);
}

export function checkPhone(input: string) {
    const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return regex.test(input);
}