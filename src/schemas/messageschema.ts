import { z } from "zod";


export const message_schema = z.object({
    content: z.string().max(400, { message: "message cannot be bigger than 400 characters." }).min(1,"Message cannot be empty")
});

