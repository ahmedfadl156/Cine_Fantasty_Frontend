"use client";

import { getTopMovies } from "@/services/getMovies";
import { useQuery } from "@tanstack/react-query";

export const useMovies = () => {
    return useQuery({
        queryKey: ["top-movies"],
        queryFn: getTopMovies,
        staleTime: 5 * 60 * 1000,
        retry: 1,
        select: (data) => data.data.movies
    })
}