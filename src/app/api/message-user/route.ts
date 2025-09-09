import DB_CONNECTION from "../../../lib/Database";
import usermodel, { message } from "../../../models/user.model";
import { MyResponse } from "../../../helper/Myresponse";
import { message_schema } from "../../../schemas/messageschema";
import mongoose from "mongoose";


 


export async function POST(req: Request) {
    await DB_CONNECTION();

    try {
        const { content } = await req.json()
        if (!content) {
            return Response.json(new MyResponse(false, "message Content is necessary"), { status: 400 });
        }

        const zod_response = message_schema.safeParse({ content: content });

        if (!zod_response.success) {
            return Response.json(new MyResponse(false, "invalid text given for a message."), { status: 400 });

        };


        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        if (!username) {
            return Response.json(new MyResponse(false, "Username was not given"), { status: 400 });
        };
       
        const userexists = await usermodel.findOne({
            username: username,
            isverified: true
        });
        if (!userexists) {
            return Response.json(new MyResponse(false, "User does not exists"), { status: 200 });

        }
        if(!userexists.isacceptingmessage){
            return Response.json(new MyResponse(false,"this user is not accepting the messages currently."),{status:200})
        }

        // @ts-ignore
        const new_message: message = {
            content: content,
            createdAt: new Date(Date.now())
        };


        userexists.messages.push(new_message);
        await userexists.save();


        return Response.json(new MyResponse(true, "Message sent successfully to the user."), { status: 201 });



    } catch (error) {
        console.log("Error occured while sending the message: ", error);
        return Response.json(new MyResponse(false, "Coudn't send message"), { status: 500 });
    }
}