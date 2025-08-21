import {z} from "zod";
const verification_validation=z.string().length(6,"code must be 6 characters");



export const verification_schema=z.object({
    code:verification_validation,
});


