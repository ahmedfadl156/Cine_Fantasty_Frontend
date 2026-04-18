"use client";
import { login, logout, signup } from "@/services/auth/auth"
import { getMe } from "@/services/auth/getMe"
import { updateMe, updateMyPassword } from "@/services/auth/userService"
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
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            queryClient.invalidateQueries({queryKey: ["myStudio"]})
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
            queryClient.invalidateQueries({queryKey: ["authUser"]})
            queryClient.invalidateQueries({queryKey: ["myStudio"]})
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
            queryClient.clear();
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

export const useUpdateMe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMe,
        onSuccess: (data) => {
            queryClient.setQueryData(["authUser"], (old: any) => ({
                ...old,
                user: { ...old?.user, ...data?.user },
            }));
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Profile Updated", {
                description: "Your profile has been updated successfully.",
            });
        },
        onError: (error) => {
            toast.error("Update Failed", {
                description: error.message,
            });
        },
    });
};

export const useUpdateMyPassword = () => {
    return useMutation({
        mutationFn: updateMyPassword,
        onSuccess: () => {
            toast.success("Password Changed", {
                description: "Your password has been changed successfully.",
            });
        },
        onError: (error) => {
            toast.error("Password Update Failed", {
                description: error.message,
            });
        },
    });
};