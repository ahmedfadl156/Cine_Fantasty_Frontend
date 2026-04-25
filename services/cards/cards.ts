const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Card {
    _id: string;
    name: string;
    code: string;
    description: string;
    multiplier: number;
    isProtection: boolean;
    budgetConstraint: number | null;
    isActive: boolean;
    __v: number;
}

export interface CardsResponse {
    status: string;
    results: number;
    data: {
        cards: Card[];
    };
}

export interface ActivateCardPayload {
    cardCode: string;       
    purchasedmovieId: string; 
}

export const getCards = async (): Promise<CardsResponse> => {
    const response = await fetch(`${API_URL}/cards`, {
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch cards");
    }

    return response.json();
};

export const activateCard = async (payload: ActivateCardPayload): Promise<unknown> => {
    const response = await fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            cardCode: payload.cardCode,
            purchasedmovieId: payload.purchasedmovieId,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to activate card");
    }

    return response.json();
};
