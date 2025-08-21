import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import DB_CONNECTION from "@/lib/Database";
import usermodel from "@/models/user.model";
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


                    if (!userinstance) {
                        throw new Error("User does not Exists.");
                    };

                    if (!userinstance.isverified) {
                        throw new Error("Please verify your account to login.")
                    }

                    const password_correct = await bcrypt.compare(credentials.password, userinstance.password);

                    if (!password_correct) {
                        throw new Error("Incorrect password.");
                    }
                    else {
                        return {
                            id: userinstance.id,
                            username: userinstance.username,
                            email: userinstance.email,
                            isverified: userinstance.isverified,

                        }
                    };







                } catch (error: any) {
                    throw new Error(error)
                }

            }

        })
    ],
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id?.toString();
                token.isverified = user.isverified;
                token.isacceptingmessage = user.isacceptingmessage;
                token.username = user.username;

            }
            return token;
        },
        async session({ session, token }) {

            if (token) {
                session.user._id = token.id?.toString();
                session.user.isverified = token.isverified;
                session.user.isacceptingmessage = token.isacceptingmessage;
                session.user.username = token.username;

            }



            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}