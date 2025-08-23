class MyResponse {
    success: boolean;
    message: string;

    constructor(success:boolean = true, message:string = "message was not given") {
        this.success = success;
        this.message = message;
    }
}


export { MyResponse };