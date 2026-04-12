"use client";

import { buyMovie, getAllMovies, getMovieDetails, getMyStudio, getTopMovies } from "@/services/movies/getMovies";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// get top Movies
export const useMovies = () => {
    return useQuery({
        queryKey: ["top-movies"],
        queryFn: getTopMovies,
        staleTime: 5 * 60 * 1000,
        retry: 1,
        select: (data) => data.data.movies
    })
}

// get all upcoming movies for market page
export const useUpcomingMovies = (page: number) => {
    return useQuery({
        queryKey: ["upcomingMovies" , page],
        queryFn: () => getAllMovies(page),
        placeholderData: keepPreviousData,
        staleTime: 12 * 60 * 60 * 1000 
    })
} 

// get movie details
export const useMovieDetails = (id: string) => {
    return useQuery({
        queryKey: ["movieDetails" , id],
        queryFn: () => getMovieDetails(id),
        staleTime: 12 * 60 * 60 * 1000,
        retry: 1,
        enabled: !!id,
        select: (data) => data.data
    })
}

export const useBuyMovie = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (movieId: string) => buyMovie(movieId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["upcomingMovies"] });
            toast.success("Movie Bought Successfully" , {
                description: "You can now watch this movie in your studio"
            })
            router.push("/my-studio")
        },
        onError: (error) => {
            toast.error("Failed To Buy Movie" , {
                description: error.message
            })
        }   
    })
}

// get my studio dashboard
export const useMyStudio = () => {
    return useQuery({
        queryKey: ["myStudio"],
        queryFn: getMyStudio,
        staleTime: 2 * 60 * 1000,
        retry: 1,
        select: (data) => data.data,
    });
};