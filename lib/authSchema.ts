import z from "zod";

export const loginSchema = z.object({
    email: z.string()
    .min(1 , {message: "Email Address Is Required"})
    .email({message: "Please Enter Valid Email Address"}),

    password: z.string()
    .min(1 , {message: "Password Is Required"})
    .min(8 , {message: "Password Must Be 8 Characters At Least"})
})

export type LoginSchema = z.infer<typeof loginSchema>