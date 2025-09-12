import DB_CONNECTION from "../../../lib/Database";
import { MyResponse } from "../../../helper/Myresponse";
import usermodel from "../../../models/user.model";
import mongoose from "mongoose";

import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/options";

export async function DELETE(req: Request) {
    await DB_CONNECTION();

    const session = await getServerSession(AuthOptions)
    const user = session?.user;



    try {

        const { searchParams } = new URL(req.url);
        const messageId = searchParams.get("id");

        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return Response.json(new MyResponse(false, "Invalid or missing message id."), { status: 400 });
        }

        if (!session || !user) {
            return Response.json(new MyResponse(false, "User must be logged in to delete the messages."), { status: 400 });
        }
        const userId = user._id;

        const userinstance = await usermodel.findById(userId);

        if (!userinstance) {
            return Response.json(new MyResponse(false, "User does not exists in db."), { status: 400 });

        }

        const message_array = userinstance.messages;
        if (message_array.length === 0) {
            return Response.json(new MyResponse(false, "User does not have any messages."), { status: 400 });

        }

        const DeletedMessage = message_array.filter((SingleMSG) => (SingleMSG.id !== messageId));

        userinstance.messages = DeletedMessage;
        await userinstance.save();



        return Response.json(new MyResponse(true, "Message deleted successfully."), { status: 200 });

    } catch (error) {

        console.log("Error while Deleting the message from DB.");
        return Response.json(new MyResponse(false, "Coudn't delete the message from DB RN."), { status: 500 })

    }



}