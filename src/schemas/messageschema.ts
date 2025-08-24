import { z } from "zod";


export const message_schema = z.object({
    content: z.string().max(500, { message: "message cannot be bigger than 500 characters." })
});

