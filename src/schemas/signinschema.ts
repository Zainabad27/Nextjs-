import { z } from "zod"


export const signin_schema = z.object({
    identifier: z.string()
        .min(4, "Username Must be Atleast 4 characters")
        .max(30, "Username canot be bigger than 30 characters"),
    password: z.string().min(1,"Password cannot be empty")
        
});

