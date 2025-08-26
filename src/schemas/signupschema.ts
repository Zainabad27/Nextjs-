import {z} from "zod";


export const username_validation = z
    .string()
    .min(4, "Username Must be Atleast 4 characters")
    .max(30, "Username canot be bigger than 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username Cannot contain special characters.");

const email_validation = z.string().email();


const password_validation = z
                        .string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/, "A password must have uppercase and lowercase letters and atleast a digit and a special character.")
                        .min(8,"password must be atleast 8 characters")
                        .max(30,"password cannot be bigger than 30 characters.");
                        




export const signup_schema = z.object({
    username: username_validation,
    email: email_validation,
    password: password_validation,
});


