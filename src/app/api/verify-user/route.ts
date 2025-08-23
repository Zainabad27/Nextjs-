import DB_CONNECTION from "../../../lib/Database";
import usermodel from "../../../models/user.model";
import { MyResponse } from "../../../helper/Myresponse";


export async function POST(req: Request) {
    await DB_CONNECTION();


    try {
        const { username, code } = await req.json();

        const userExistsInDB = await usermodel.findOne({ username });

        if (!userExistsInDB) {
            return Response.json(new MyResponse(false, "(User does not exists in the DB.) Please first sign-up your for your account"), { status: 400 })
        }
        if (userExistsInDB.isverified) {
            return Response.json(new MyResponse(false, "user is already verified."), { status: 400 })
        };

        const CorrectCode = userExistsInDB.verifycode === code;
        const expiredCode = new Date(userExistsInDB.expiryverifycode) < new Date();

        if (!CorrectCode) {
            return Response.json(new MyResponse(false, "incorrect Verification Code"), { status: 400 });

        }

        if (expiredCode) {
            return Response.json(new MyResponse(false, "Code expired, please sign-up again."), { status: 400 })
        }


        userExistsInDB.isverified = true;
        await userExistsInDB.save();

        return Response.json(new MyResponse(true, "User verified successfully."), { status: 201 });




    } catch (error) {

        console.log("error occured while verification of the user.", error);
        return Response.json(new MyResponse(false, "problem while verifying the user."), { status: 500 })

    }
}