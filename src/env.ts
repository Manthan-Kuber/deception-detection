import { z } from "zod";

const envVariablesSchema = z.object({
    SERVER_URL:z.string()
})

export const env = envVariablesSchema.parse(process.env) 

