import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import DB_CONNECTION from "@/app/lib/Database";
import usermodel from "@/app/models/user.model";
import bcrypt from "bcrypt";


export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await DB_CONNECTION();

                try {
                    const userinstance = await usermodel.findOne({
                        $or: [
                            { username: credentials.identifier },
                            { email: credentials.identifier }
                        ],
                    });


                    if(!userinstance){
                        throw new Error("User does not Exists.");
                    };

                    if(!userinstance.isverified){
                        throw new Error("Please verify your account to login.")
                    }

                    const password_correct=await bcrypt.compare(userinstance.password,credentials.password); // true /false
                    if(!password_correct){
                        throw new Error("Incorrect password.");
                    }
                    else{
                        return userinstance;
                    };







                } catch (error:any) {
                    throw new Error(error)
                }

            }

        })
    ],
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}