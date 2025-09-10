import { MyResponse } from "../../../helper/Myresponse";
import { ApiResponse } from "@/types/ApiResponse";


interface SuggestionMsg {
    MsgId: number;
    content: string
};



export async function GET(req: Request) {
    const suggestedMsg: SuggestionMsg[] = [
        {
            MsgId: 1,
            content: "How are you feeling today?"

        },
        {
            MsgId: 2,
            content: "what is you favorite free time thing to do?"

        },
        {
            MsgId: 3,
            content: "what place do you like the most in your city?"

        },
        {
            MsgId: 4,
            content: "what sports do you like?"

        },
        {
            MsgId: 5,
            content: "would you date me?"

        },
        {
            MsgId: 6,
            content: "your insta handle?"

        },
        {
            MsgId: 7,
            content: "favorite movie ever?"

        },
        {
            MsgId: 8,
            content: "do you have a job?"

        },
    ];



    return Response.json({
        success: true,
        messages: suggestedMsg
    }, { status: 200 })


}