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
        return Response.json(new MyResponse(false, "User must be logged-in to fetch messages"))
    }

    const user = session.user;

    if (!user) {
        return Response.json(new MyResponse(false, "User is not logged in."))

    };

    try {

        const userid = new mongoose.Types.ObjectId(user._id);
        const usermessages = await usermodel.aggregate([
            {
                $match: { _id: userid }
            },
            {
                $unwind: "$messages"

            },
            {
                $sort: { "messages.createdAt": -1 }
            },
            {
                $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" }
                }
            }
        ]);

        if (!usermessages) {
           
            return Response.json(new MyResponse(false, "error occured while fetching the messages"), { status: 500 });
        }
        if (usermessages.length===0) {
           
            return Response.json(new MyResponse(true, "eno messages found"), { status: 404 });
        }


        return Response.json({
            success:true,
            messages:usermessages[0],
            message:"Messages fetched successfully."

        }, { status: 200 });

    } catch (error) {
        console.log("Error while change=ing the message status of this user. ", error);
        return Response.json(new MyResponse(false, "Coudn't change the message status for this user."), { status: 500 })
    }
}