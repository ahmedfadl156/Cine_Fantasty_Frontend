import { useQuery } from "@tanstack/react-query"
import { getAllUsers, getUserPortfolio } from "@/services/admin/adminData/adminData"

export const useGetAllUsers = (page: Number) => {
    return useQuery({
        queryKey: ["all-users", page],
        queryFn: () => getAllUsers(page),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}

export const useGetUserPortfolio = (userId: string) => {
    return useQuery({
        queryKey: ["user-portfolio", userId],
        queryFn: () => getUserPortfolio(userId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}