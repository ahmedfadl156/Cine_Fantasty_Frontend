import { createLeague, getPublicLeagues, getMyLeagues, joinLeague } from "@/services/leagues/leagues"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (leagueData: {name: string , isPublic: boolean}) => createLeague(leagueData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["publicLeagues"] });
            queryClient.invalidateQueries({ queryKey: ["myLeagues"] });
            toast.success("League Created Successfully" , {
                description: "You can now invite your friends to this league"
            })
        },
        onError: (error: any) => {
            toast.error("Failed To Create League" , {
                description: error.message
            })
        }
    })
}

export const useGetPublicLeagues = () => {
    return useQuery({
        queryKey: ["publicLeagues"],
        queryFn: getPublicLeagues,
        staleTime: 5 * 60 * 1000
    })
}

export const useGetMyLeagues = () => {
    return useQuery({
        queryKey: ["myLeagues"],
        queryFn: getMyLeagues,
        staleTime: 2 * 60 * 1000
    })
}

export const useJoinLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ leagueId, inviteCode }: { leagueId: string; inviteCode?: string }) =>
            joinLeague(leagueId, inviteCode),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["publicLeagues"] });
            queryClient.invalidateQueries({ queryKey: ["myLeagues"] });
            toast.success("Joined League!", {
                description: "Welcome to the arena. May the best studio win."
            });
        },
        onError: (error: any) => {
            toast.error("Couldn't join league", {
                description: error.message
            });
        }
    })
}