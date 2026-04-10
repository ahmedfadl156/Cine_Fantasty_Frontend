"use client";
import { useSignup } from "@/hooks/auth/useAuth"
import { signupSchema, SignupSchema } from "@/lib/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useForm } from "react-hook-form"

const SignupForm = () => {
    const {mutate: signup , isPending , isError , error: serverError} = useSignup();
    const {register , handleSubmit , formState: {errors}} = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            studioName: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: SignupSchema) => {
        signup(data)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4">
                <h1 className="text-6xl font-bold text-primary">CGM</h1>
                <div className="flex items-center gap-2">
                    <div className="w-20 md:w-32 lg:w-40 h-0.5 bg-[#9C8E7E]"></div>
                    <p className="text-base font-medium text-[#9C8E7E]">Bureau of cinema</p>
                    <div className="w-20 md:w-32 lg:w-40 h-0.5 bg-[#9C8E7E]"></div>
                </div>           
            </div>
            <div className="flex flex-col items-start justify-start w-full max-w-md gap-2 mt-10">
                <h1 className="italic text-[#EEE4D4] text-4xl tracking-wide">Welcome To Cine Fantasty</h1>
                <p className="text-md text-[#9C8E7E]">The Studio of your Imagination</p>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start justify-start w-full max-w-md gap-4 mt-12">
                <div className="flex flex-col items-start justify-start w-full gap-2">
                    <label 
                    htmlFor="studioName" 
                    className="text-md text-[#EEE4D4]">Studio Name</label>
                    <input 
                    type="text" 
                    id="studioName" 
                    {...register("studioName")} 
                    placeholder="e.g. Ahmed's Studio"
                    className="w-full text-[#EEE4D4] placeholder-[#2D2924] focus:outline-none border-b border-b-[#9C8E7E] py-3 px-2" />
                    {errors.studioName && <p className="text-sm text-red-500">{errors.studioName.message}</p>}
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-2 mt-10">
                    <label 
                    htmlFor="email" 
                    className="text-md text-[#EEE4D4]">Email Address</label>
                    <input 
                    type="email" 
                    id="email" 
                    {...register("email")} 
                    placeholder="cinematic@gmail.com"
                    className="w-full text-[#EEE4D4] placeholder-[#2D2924] focus:outline-none border-b border-b-[#9C8E7E] py-3 px-2" />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-2 mt-10">
                    <label htmlFor="password" className="text-md text-[#EEE4D4]">Password</label>
                    <input 
                    type="password" 
                    id="password" 
                    {...register("password")} 
                    placeholder="********"
                    className="w-full text-[#EEE4D4] placeholder-[#2D2924] focus:outline-none border-b border-b-[#9C8E7E] py-3 px-2" />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <button type="submit" disabled={isPending} className="w-full px-4 py-[14px] mt-10 cursor-pointer text-lg font-medium rounded-md bg-primary text-[#EEE4D4] hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary">
                    {isPending ? "Creating Account..." : "Create Account"}
                </button>
            </form>
            <div className="flex items-center justify-center w-full max-w-md gap-2 mt-10">
                <p className="text-md text-[#9C8E7E]">Already have an account?</p>
                <Link href="/login" className="text-md text-primary">Login</Link>
            </div>
            <p className="text-center text-sm text-[#9C8E7E] mt-20">© 2026 CINEMAGM ARCHIVE. ALL RIGHTS RESERVED.</p>
        </div>
    )
}

export default SignupForm