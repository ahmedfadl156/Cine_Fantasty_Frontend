import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    getAllSeasons,
    getSeasonDetails,
    createSeason,
    updateSeasonStatus,
    updateSeasonDetails
} from "@/services/admin/seasons/seasons"

export const useGetAllSeasons = () => {
    return useQuery({
        queryKey: ["admin-seasons"],
        queryFn: getAllSeasons,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}

export const useGetSeasonDetails = (seasonId: string) => {
    return useQuery({
        queryKey: ["admin-season", seasonId],
        queryFn: () => getSeasonDetails(seasonId),
        enabled: !!seasonId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}

export const useCreateSeason = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ name, startDate, endDate, startingBudget }: { name: string, startDate: string, endDate: string, startingBudget: number }) =>
            createSeason(name, startDate, endDate, startingBudget),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-seasons"] })
        }
    })
}

export const useUpdateSeasonStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ seasonId, status }: { seasonId: string, status: string }) =>
            updateSeasonStatus(seasonId, status),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-seasons"] })
            queryClient.invalidateQueries({ queryKey: ["admin-season", variables.seasonId] })
        }
    })
}

export const useUpdateSeasonDetails = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ seasonId, details }: { seasonId: string, details: { name?: string, startDate?: string, endDate?: string, startingBudget?: number } }) =>
            updateSeasonDetails(seasonId, details),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-seasons"] })
            queryClient.invalidateQueries({ queryKey: ["admin-season", variables.seasonId] })
        }
    })
}
