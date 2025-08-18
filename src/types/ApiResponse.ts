import { message } from "@/app/models/user.model";

export interface ApiResponse{
    success:boolean;
    message:string;
    isacceptingmessage?:boolean;
    messages?:Array<message>;
}