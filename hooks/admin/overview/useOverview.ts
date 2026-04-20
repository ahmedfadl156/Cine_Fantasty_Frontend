"use client";
import { getOverviewData } from "@/services/admin/overview/overview"
import { useQuery } from "@tanstack/react-query"

export const useOverviewData = () => {
    return useQuery({
        queryKey: ["OverviewData"],
        queryFn: getOverviewData,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}