import { resend } from "../lib/resendemailsetup";

// import VerificationEmail from "../../emails/VerificationEmail";
import { EmailTemplate } from "../../emails/VerificationEmail";


import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(username: string, verificationcode: string, email: string): Promise<ApiResponse> {



    try {
        await resend.emails.send({
            from: 'testing@resend.dev',
            to: email,
            subject: 'Verifying user by sending an OTP to the email.',
            html: `<!doctype html>
                                <html lang="en">
                                <head>
                                    <meta charset="utf-8">
                                    <title>OTP Verification</title>
                                </head>
                                <body style="margin:0; padding:0; background:#f3f4f6; font-family: Arial, sans-serif;">
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6; padding:24px 0;">
                                    <tr>
                                        <td align="center">
                                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                                            
                                            <!-- Header -->
                                            <tr>
                                            <td align="center" style="background:#2563eb; padding:20px;">
                                                <h1 style="margin:0; font-size:22px; color:#ffffff;">Mystery Message</h1>
                                            </td>
                                            </tr>
                                            
                                            <!-- Body -->
                                            <tr>
                                            <td style="padding:24px; color:#1e293b;">
                                                <h2 style="margin:0 0 12px; font-size:20px; color:#0f172a;">Hello, ${username} 👋</h2>
                                                <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#334155;">
                                                Here's your <strong>One-Time Password (OTP)</strong> to complete your sign-in:
                                                </p>
                                                
                                                <!-- OTP Box -->
                                                <div style="margin:20px 0; text-align:center;">
                                                <span style="display:inline-block; background:#2563eb; color:#ffffff; font-size:26px; font-weight:bold; letter-spacing:10px; padding:12px 20px; border-radius:8px;">
                                                    ${verificationcode}
                                                </span>
                                                </div>
                                                
                                                <p style="margin:0; font-size:13px; color:#64748b;">
                                                ⚠️ This code is valid for only <strong>60 minutes</strong>. Do not share it with anyone.
                                                </p>
                                            </td>
                                            </tr>
                                            
                                            <!-- Footer -->
                                            <tr>
                                            <td style="padding:16px; background:#f9fafb; text-align:center; font-size:12px; color:#94a3b8;">
                                                © 2025 Your App · This is an automated email, please don't reply.
                                            </td>
                                            </tr>
                                        
                                        </table>
                                        </td>
                                    </tr>
                                    </table>
                                </body>
                                </html>
`

        });



        return {
            success: true,
            message: "Email sent successfully."
        }

    } catch (emailerror) {
        console.log("error that occured while sending the email", emailerror);

        return {
            success: false,
            message: "Failed to send email."
        }
    }




}
