import { resend } from "../lib/resendemailsetup";

// import VerificationEmail from "../../emails/VerificationEmail";
import {EmailTemplate} from "../../emails/VerificationEmail";


import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(username: string, verificationcode: string, email: string): Promise<ApiResponse> {



    try {
        await resend.emails.send({
            from: 'testing@resend.dev',
            to: email,
            subject: 'Verifying user by sending an OTP to the email.',
            // react: EmailTemplate({ username,otp:verificationcode }),
            text:`this is your otp ${verificationcode}`,
           
        });



        return {
            success: true,
            message: "Email sent successfully."
        }

    } catch (emailerror) {
        console.log("error that occured while sending the email",emailerror);

        return {
            success: false,
            message: "Failed to send email."
        }
    }




}
