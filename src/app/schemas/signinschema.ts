import { z } from "zod"


export const signin_schema = z.object({
    identifier: z.string(),
    password: z.string(),
});

