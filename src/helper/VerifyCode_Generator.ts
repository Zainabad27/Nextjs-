interface code_data {
    code: string,
    expiry: Date;
}


export function VerifyCode_Generator(): code_data {
    const str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num: string = "0123456789";
    let code: string = "";
    for (let i = 0; i < 3; i++) {
        code += str.charAt(Math.floor(Math.random() * str.length));
        code += num.charAt(Math.floor(Math.random() * num.length));
    }

    // generate expiry for verification code
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);


    return {
        code: code,
        expiry: oneHourLater
    };


}