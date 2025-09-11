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
        return Response.json(new MyResponse(false, "User must be logged-in to fetch messages"), { status: 400 })
    }

    const user = session.user;

    if (!user) {
        return Response.json(new MyResponse(false, "User is not logged in."),{status:400})

    };



    try {


        const userid = new mongoose.Types.ObjectId(user._id);

        const usermessages = await usermodel.aggregate([
            {
                $match: { _id:userid}
            },
            {
                $project: {
                    _id: 0,
                    messages: 1,
                }
            }
        ]);



        if (!usermessages) {

            return Response.json(new MyResponse(false, "error occured while fetching the messages"), { status: 500 });
        }
        if (usermessages[0].messages.length === 0) {

            return Response.json(new MyResponse(true, "no messages found"), { status: 200 });
        }

        // now i have the messages array inside which i have all the messages but they are not sorted so now i have to sort them by date.

        const non_sorted_array=usermessages[0].messages;

        //@ts-ignore
        const sorted_array=non_sorted_array.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        


        return Response.json({
            success: true,
            messages: sorted_array,
            message: "Messages fetched successfully."

        }, { status: 200 });

    } catch (error) {
        console.log("Error while fetching the messages of this user. ", error);
        return Response.json(new MyResponse(false, "Coudn't fetch the messages for this user."), { status: 500 })
    }
}