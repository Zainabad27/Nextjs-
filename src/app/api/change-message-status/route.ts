import DB_CONNECTION from "../../../lib/Database";
import usermodel from "../../../models/user.model";
import { MyResponse } from "../../../helper/Myresponse";
import mongoose from "mongoose";
import { AuthOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    await DB_CONNECTION();

    const session = await getServerSession(AuthOptions);

    if (!session) {
        return Response.json(new MyResponse(false, "User must be logged-in to change the message status"))
    }

    const user = session.user;

    if (!user) {
        return Response.json(new MyResponse(false, "User is not logged in."))

    };
    try {
        const userid = user._id;
        const { messagestatus } = await req.json();
        if (!messagestatus) {
            return Response.json(new MyResponse(false, "message status was not given."), { status: 400 });

        };
        if (!(messagestatus === "true" || messagestatus === "false")) {

            return Response.json(new MyResponse(false, "message status should be boolean value."), { status: 400 });
        }
        const Msg_status = (messagestatus === "true");// convert string true false into boolean true false.



        if (user.isacceptingmessage === Msg_status) {
            return Response.json(new MyResponse(true, "Status changed successfully."), { status: 200 });
        }
        const userexists = await usermodel.findByIdAndUpdate({ _id: userid }, { isacceptingmessage: Msg_status }, { new: true })
        if (!userexists) {
            return Response.json(new MyResponse(false, "error occured while changing the status in the DB."), { status: 500 });

        }

        
        return Response.json(new MyResponse(true, "Status changed successfully."), { status: 200 });

    } catch (error) {
        console.log("Error while change=ing the message status of this user. ", error);
        return Response.json(new MyResponse(false, "Coudn't change the message status for this user."), { status: 500 })
    }
}