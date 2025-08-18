import { resend } from "../lib/resendemailsetup";


import VerificationEmail from "../../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(username: string, verificationcode: string, email: string): Promise<ApiResponse> {



    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verifying user by sending an OTP to the email.',
            react: VerificationEmail({ username, otp: verificationcode }),
        });



        return {
            success: true,
            message: "Email sent successfully."
        }

    } catch (emailerror) {
        console.log(emailerror);

        return {
            success: false,
            message: "Failed to send email."
        }
    }




}
