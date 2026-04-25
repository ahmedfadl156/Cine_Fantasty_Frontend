import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllMovies, updateMovieAdmin, applyStreamingRevenue } from "@/services/admin/market/market"

interface AdminMoviesFilters {
    seasonId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export const useGetAdminMovies = (filters: AdminMoviesFilters) => {
    return useQuery({
        queryKey: ["admin-movies", filters],
        queryFn: () => getAllMovies(filters),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}

export const useUpdateMovieAdmin = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ movieId, updates }: {
            movieId: string,
            updates: {
                status?: string,
                basePriceInDollars?: number,
                boxOfficePriceInDollars?: number,
                releaseDate?: string
            }
        }) => updateMovieAdmin(movieId, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-movies"] })
        }
    })
}

export const useApplyStreamingRevenue = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ movieId, info }: {
            movieId: string,
            info: { manualRating?: number, manualVotes?: number }
        }) => applyStreamingRevenue(movieId, info),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-movies"] })
        }
    })
}
