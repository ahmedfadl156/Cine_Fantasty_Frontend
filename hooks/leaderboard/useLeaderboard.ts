import { getLeaderboard } from "@/services/leaderboard/getLeaderboard";
import { useQuery } from "@tanstack/react-query";

export const useLeaderboard = () => {
    return useQuery({
        queryKey: ["leaderboard"],
        queryFn: getLeaderboard,
        staleTime: 1000 * 60 * 30, 
    });
};
