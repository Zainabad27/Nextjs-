import DB_CONNECTION from "../../../lib/Database";
import usermodel from "../../../models/user.model";
import { z } from "zod"
import { username_validation } from "../../../schemas/signupschema";
import { MyResponse } from "../../../helper/Myresponse";



const QueryParamsSchema = z.object({
    username: username_validation
})

export async function GET(req: Request) {
    await DB_CONNECTION();

    try {

        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");
        if(!username){
            return Response.json(new MyResponse(false,"No query params were sent for validation."),{status:400})
        }
       
        const zod_response = QueryParamsSchema.safeParse({username:username});
        console.log("this is zods response: ",zod_response);
        if (!zod_response.success) {
            return Response.json(new MyResponse(false, "invalid username, please enter a valid username."), { status: 400 });

        };


        const userAlreadyExists = await usermodel.findOne({
            username: username,
            isverified: true
        });

        if (userAlreadyExists) {
            return Response.json(new MyResponse(false, "username is already taken."), { status: 400 })
        }


        return Response.json(new MyResponse(true, "Username is available."), { status: 200 });



    } catch (error) {
        console.log("error while checking the username: ", error);

        return Response.json(new MyResponse(false, "coudn't check the username."), { status: 500 })
    }


}
