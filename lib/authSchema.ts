import z from "zod";

export const loginSchema = z.object({
    email: z.string()
    .min(1 , {message: "Email Address Is Required"})
    .email({message: "Please Enter Valid Email Address"}),

    password: z.string()
    .min(1 , {message: "Password Is Required"})
    .min(8 , {message: "Password Must Be 8 Characters At Least"})
})

export const signupSchema = z.object({
    studioName: z.string().min(1 , {message: "Enter a valid Studio Name"})
    .min(6 , {message: "Studio Name must be at least 6 characters"}),

    email: z.string()
    .min(1 , {message: "Email Address Is Required"})
    .email({message: "Please Enter Valid Email Address"}),

    password: z.string()
    .min(1 , {message: "Password Is Required"})
    .min(8 , {message: "Password Must Be 8 Characters At Least"})
})

export type LoginSchema = z.infer<typeof loginSchema>
export type SignupSchema = z.infer<typeof signupSchema>