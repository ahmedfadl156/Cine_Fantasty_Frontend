import { createLeague, getPublicLeagues, getMyLeagues, joinLeague, joinPublicLeague, getLeagueDetails, getLeagueLeaderboard, getLeagueActivityFeed, leaveLeague, updateLeagueSettings, kickPlayerFromLeague } from "@/services/leagues/leagues"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGetLeagueDetails = (leagueId: string) => {
    return useQuery({
        queryKey: ["leagueDetails", leagueId],
        queryFn: () => getLeagueDetails(leagueId),
        enabled: !!leagueId,
        staleTime: 5 * 60 * 1000
    });
}

export const useGetLeagueLeaderboard = (leagueId: string) => {
    return useQuery({
        queryKey: ["leagueLeaderboard", leagueId],
        queryFn: () => getLeagueLeaderboard(leagueId),
        enabled: !!leagueId,
        staleTime: 2 * 60 * 1000
    });
}

export const useGetLeagueActivityFeed = (leagueId: string) => {
    return useQuery({
        queryKey: ["leagueActivityFeed", leagueId],
        queryFn: () => getLeagueActivityFeed(leagueId),
        enabled: !!leagueId,
        staleTime: 1 * 60 * 1000
    });
}


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
        mutationFn: ({inviteCode }: {inviteCode: string }) =>
            joinLeague(inviteCode),
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

export const useJoinPublicLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (leagueId: string) => joinPublicLeague(leagueId),
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

export const useUpdateLeagueSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({leagueId , settings} : {leagueId: string , settings: {isPublic?: boolean , name?: string}}) => updateLeagueSettings(leagueId , settings),
        onSuccess: (_, {leagueId}) => {
            queryClient.invalidateQueries({ queryKey: ["leagueDetails" , leagueId]});
            toast.success("League Settings Updated Successfully" , {
                description: "Your league settings have been updated successfully"
            });
        },
        onError: (error : any) => {
            toast.error("Failed to update league settings" , {
                description: error.message
            })
        }
    })
}

export const useLeaveLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (leagueId: string) => leaveLeague(leagueId),
        onSuccess: (_, leagueId) => {
            queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
            queryClient.invalidateQueries({ queryKey: ["publicLeagues"] });
            queryClient.invalidateQueries({ queryKey: ["myLeagues"] });
            toast.success("Left League!", {
                description: "You have successfully left the league."
            });
        },
        onError: (error: any) => {
            toast.error("Failed to leave league", {
                description: error.message
            });
        }
    });
};

export const useKickPlayerFromLeague = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ leagueId, playerId }: { leagueId: string, playerId: string }) => kickPlayerFromLeague(leagueId, playerId),
        onSuccess: (_, { leagueId }) => {
            queryClient.invalidateQueries({ queryKey: ["leagueDetails", leagueId] });
            queryClient.invalidateQueries({ queryKey: ["leagueLeaderboard", leagueId] });
            toast.success("Player Kicked", {
                description: "The player has been removed from the league."
            });
        },
        onError: (error: any) => {
            toast.error("Failed to kick player", {
                description: error.message
            });
        }
    });
};
