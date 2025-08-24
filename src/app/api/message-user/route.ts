import DB_CONNECTION from "../../../lib/Database";
import usermodel from "../../../models/user.model";
import { MyResponse } from "../../../helper/Myresponse";
import { message_schema } from "../../../schemas/messageschema";

 



export async function POST(req: Request) {
    await DB_CONNECTION();

    try {
        const {content}=await req.json()
        if(!content){
            return Response.json(new MyResponse(false,"message Content is necessary"),{status:400});
        }
        
        // secured route.
        // i wan't to send message from one user to another user, so i have username/id of the sender (person that is logged-in) and i have Id of the reciever too that i'll get by by queryparams. and in req.body(req.json() for next js) i'll also have the content of message that will be of message type(we defined it in usermodel file).




    } catch (error) {
        console.log("Error occured while sending the message: ", error);
        return Response.json(new MyResponse(false, "Coudn't send message"), { status: 500 });
    }
}