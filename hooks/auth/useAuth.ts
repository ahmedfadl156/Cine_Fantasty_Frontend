"use client";
import { login, logout, signup } from "@/services/auth/auth"
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
        }
    })
}

export const useSignup = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: signup,
        onSuccess: (user) => {
            queryClient.setQueryData(['authUser'] , user);
            toast.success("Account created successfully" , {
                description: "Welcome to Cine Fantasty Enjoy Building your studio"
            })
            router.push("/")
        },
        onError: (error) => {
            toast.error("Signup Failed" , {
                description: error.message
            })
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['authUser'] });
            toast.success("Logout Success" , {
                description: "Wish to see you again"
            })
            router.push("/login")
        },
        onError: (error) => {
            toast.error("Logout Failed" , {
                description: error.message
            })
        }
    })
}