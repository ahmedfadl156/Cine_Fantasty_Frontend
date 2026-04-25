import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCards, activateCard, ActivateCardPayload } from "@/services/cards/cards";

export const CARDS_QUERY_KEY = ["cards"] as const;

export const useGetCards = () => {
    return useQuery({
        queryKey: CARDS_QUERY_KEY,
        queryFn: getCards,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 20,
    });
};

export const useActivateCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ActivateCardPayload) => activateCard(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-studio"] });
        },
    });
};
