import { z } from "zod";


export const message_schema = z.object({
    content: z.string().max(300, { message: "message cannot be bigger than 300 characters." })
});

