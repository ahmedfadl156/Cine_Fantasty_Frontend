"use client";

import { getAllMovies, getMovieDetails, getTopMovies } from "@/services/movies/getMovies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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