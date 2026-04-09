"use client";
import { login } from "@/services/auth/auth"
import { getMe } from "@/services/auth/getMe"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuth = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: getMe,
        staleTime: 1000 * 60 * 60,
        retry: false
    })
}

export const useLogin = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            queryClient.setQueryData(['authUser'] , user);
            toast.success("Login Success" , {
                description: "Welcome back to Cine Fantasty"
            })
            router.push("/")
        },
        onError: (error) => {
            toast.error("Login Failed" , {
                description: error.message
            })
            console.error("Login Failed" , error.message)
        }
    })
}