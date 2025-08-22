interface CustomResponse {
    success: boolean;
    message: string;
}

class MyResponse implements CustomResponse {
    success: boolean;
    message: string;

    constructor(success = true, message = "message was not given") {
        this.success = success;
        this.message = message;
    }
}


export { MyResponse };