import { Resend } from "resend";


if (!process.env.RESEND_API_KEY) {
    console.log(process.env.RESEND_API_KEY)
    console.log(process.env.DB_URI)
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

export const resend=new Resend(process.env.RESEND_API_KEY);