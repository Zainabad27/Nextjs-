import DB_CONNECTION from "../../../lib/Database";
import usermodel from "../../../models/user.model";
import { MyResponse } from "../../../helper/Myresponse";
import { message_schema } from "../../../schemas/messageschema";
import { success } from "zod";
import mongoose from "mongoose";
import { isValid } from "zod/v3";

export async function GET(req: Request) {
    await DB_CONNECTION();
    try {
        const { searchParams } = new URL(req.url);
        console.log(searchParams)
        const userid = searchParams.get("id");

        if (!userid) {
            return Response.json(new MyResponse(false, "User id was not given"), { status: 400 });
        };
        if (!mongoose.Types.ObjectId.isValid(userid)) {
           return Response.json(new MyResponse(false, "invalid user id was given."), { status: 400 });
            
        }
        const userexists = await usermodel.findOne({
            _id: userid,
            isverified: true
        });
        if (!userexists) {
            return Response.json(new MyResponse(false, "User does not exists"), { status: 400 });

        }


        const UserStatus = userexists.isacceptingmessage;

        return Response.json({
            success: true,
            isacceptingmessage: UserStatus,
            message: "Status fetched succesfully."

        }, {
            status: 200
        })

    } catch (error) {
        console.log("Error while getting the Accepting-Message Status of the User.", error);
        return Response.json(new MyResponse(false, "Coudn't get the Message status for this user."), { status: 500 })
    }
}