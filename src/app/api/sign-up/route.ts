import DB_CONNECTION from "../../../lib/Database";

import usermodel from "../../../models/user.model";

import { SendVerificationEmail } from "../../../helper/SendVerificationEmail";

import { VerifyCode_Generator } from "../../../helper/VerifyCode_Generator"

import bcrypt from "bcrypt";


export async function POST(req: Request) {
    await DB_CONNECTION();



    try {


        const { username, password, email } = await req.json();
        // console.log("this is username : ",username)
        // console.log("this is email : ",email)
        // console.log("this is password : ",password)

        if (!username || !password || !email) {
            return Response.json({
                success: false,
                message: "Please Enter full details."
            }, { status: 400 })
        }


        const userexistinDB = await usermodel.findOne({
            email: email
        });

        if (userexistinDB) {
            if (userexistinDB.isverified) {
                return Response.json({
                    success: false,
                    message: "Email already in use."
                }, { status: 400 })
            }
            // User already exists but is not verified
            else {
                const {code,expiry}=VerifyCode_Generator();
                const emailresponse = await SendVerificationEmail(username, code, email);
                // console.log(emailresponse);
                if (!emailresponse.success) {
                    return Response.json({
                        success: false,
                        message: "problem occured while sending the verification email."
                    }, { status: 500 })
                }

                const userid = userexistinDB._id;
                const hshed_password=await bcrypt.hash(password,10);


                const updateduser = await usermodel.findOneAndUpdate(
                    {
                        _id: userid
                    },
                    {
                        username: username,
                        password: hshed_password,
                        verifycode:code,
                        expiryverifycode:expiry,


                    },
                    {
                        new: true,
                    }
                );
                // console.log("this is updated user>>>> ",updateduser)

                if (!updateduser) {
                    return Response.json({
                        success: false,
                        message: "error while updating the user details in the db."
                    }, {
                        status: 500
                    })
                };


                return Response.json({
                    success:true,
                    message:"User signed-up successfully."
                },{status:200})

            }
        };


        // user does not exists at all


        const {code,expiry}=VerifyCode_Generator();
        const emailresponse=await SendVerificationEmail(username,code,email);

        // console.log(emailresponse);
        if(!emailresponse.success){
            return Response.json({
                success:false,
                message:"problem occured while sending the verification email."
            },{status:500})
        };

        const hashed_password=await bcrypt.hash(password,10)


       const userinstance= await usermodel.create({
            username,
            email,
            password:hashed_password,
            isverified:false,
            verifycode:code,
            expiryverifycode:expiry,
            messages:[],

        });


        if(!userinstance.id){
            return Response.json({
                success:false,
                message:"Problem occured while saving the Data into the DATABASE."
            },{status:500})
        };

        return Response.json({
            success:true,
            message:"User signed-up successfully."
        },{status:200});



    } catch (error) {
        console.log(error);
    }

}