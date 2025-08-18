import DB_CONNECTION from "@/app/lib/Database";
import usermodel from "@/app/models/user.model";
import bcrypt from "bcrypt"
import { SendVerificationEmail } from "@/app/helper/SendVerificationEmail";
import { success } from "zod";



export async function POST (req:Request) {
    await DB_CONNECTION();



    try {


        const {username,password , email }=await req.json();

        if(!username||!password||!email){
            return Response.json({
                success:false,
                message:"Please Enter full details."
            },{status:400})
        }


        const userexistinDB=await usermodel.findOne({
            email:email
        });

        if (userexistinDB){
           if(userexistinDB.isverified){
            return Response.json({
                success:false,
                message:"Email already in use."
            },{status:400})
           }
           // User already exists but is not verified
           else{

            

           }
        };


        // user does not exists att all
















    } catch (error) {
        console.log(error);
    }

}