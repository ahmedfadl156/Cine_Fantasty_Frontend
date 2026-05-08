import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    buyMovieFromMarket,
    BuyMoviePayload,
    cancelMovieListing,
    CancelListingPayload,
    getMarketListings,
    listMovieForSale,
    ListForSalePayload,
    SortOption,
} from "@/services/transferMarket/transferMarket";


export const TRANSFER_MARKET_QUERY_KEY = (page: number, sort: SortOption) =>
    ["transferMarket", page, sort] as const;


export const useGetMarketListings = (page: number, sort: SortOption) => {
    return useQuery({
        queryKey: TRANSFER_MARKET_QUERY_KEY(page, sort),
        queryFn: () => getMarketListings(page, sort),
        placeholderData: keepPreviousData,
        staleTime: 2 * 60 * 1000, // 2 min — market data is live
        retry: 1,
    });
};


export const useListMovieForSale = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ListForSalePayload) => listMovieForSale(payload),
        onSuccess: (data) => {
            // Invalidate market and studio views so they reflect the new listing
            queryClient.invalidateQueries({ queryKey: ["transferMarket"] });
            queryClient.invalidateQueries({ queryKey: ["myStudio"] });
            toast.success("Movie Listed for Sale", {
                description: data.data?.marketStats
                    ? `Listed at $${(data.data.marketStats.listedPrice / 100).toLocaleString()}`
                    : "Your movie is now visible in the transfer market.",
            });
        },
        onError: (error: Error) => {
            toast.error("Listing Failed", {
                description: error.message,
            });
        },
    });
};


export const useBuyMovieFromMarket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: BuyMoviePayload) => buyMovieFromMarket(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transferMarket"] });
            queryClient.invalidateQueries({ queryKey: ["myStudio"] });
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Purchase Complete", {
                description: "The movie has been added to your studio.",
            });
        },
        onError: (error: Error) => {
            toast.error("Purchase Failed", {
                description: error.message,
            });
        },
    });
};

export const useCancelMovieListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CancelListingPayload) => cancelMovieListing(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transferMarket"] });
            queryClient.invalidateQueries({ queryKey: ["myStudio"] });
            toast.success("Listing Cancelled", {
                description: "Your movie has been removed from the transfer market.",
            });
        },
        onError: (error: Error) => {
            toast.error("Cancellation Failed", {
                description: error.message,
            });
        },
    });
};
