import DB_CONNECTION from "../../../lib/Database";
import usermodel from "../../../models/user.model";
import { MyResponse } from "../../../helper/Myresponse";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await DB_CONNECTION();

    try {
        const { searchParams } = new URL(req.url);
        const userid = searchParams.get("id");
        const { messagestatus } = await req.json();
        if (!messagestatus) {
            return Response.json(new MyResponse(false, "message status was not given."), { status: 400 });

        };
        if (!(messagestatus === "true" || messagestatus === "false")) {

            return Response.json(new MyResponse(false, "message status should be boolean value."), { status: 400 });
        }
        const Msg_status = (messagestatus === "true");// convert string true false into boolean true false.

        if (!userid) {
            return Response.json(new MyResponse(false, "User id was not given"), { status: 400 });
        };
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return Response.json(new MyResponse(false, "invalid user id was given."), { status: 400 });

        };
        const userexists = await usermodel.findOne({
            _id: userid,
            isverified: true
        });
        if (!userexists) {
            return Response.json(new MyResponse(false, "User does not exists"), { status: 400 });

        };
        if (userexists.isacceptingmessage === Msg_status) {
            return Response.json(new MyResponse(true, "Status changed successfully."), { status: 200 });
        }

        userexists.isacceptingmessage = Msg_status;
        await userexists.save();
        return Response.json(new MyResponse(true, "Status changed successfully."), { status: 200 });

    } catch (error) {
        console.log("Error while change=ing the message status of this user. ", error);
        return Response.json(new MyResponse(false, "Coudn't change the message status for this user."), { status: 500 })
    }
}