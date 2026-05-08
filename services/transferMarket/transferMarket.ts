const API_URL = process.env.NEXT_PUBLIC_API_URL;


export interface TransferMovieDetails {
    _id: string;
    title: string;
    posterPath: string;
    basePrice: number; 
}

export interface TransferListing {
    _id: string;
    movieId: TransferMovieDetails;
    userId: {
        _id: string;
        studioName: string;
    };
    isForSale: boolean;
    salePrice: number; 
    seasonId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MarketListingsResponse {
    status: string;
    results: number;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
    data: {
        listings: TransferListing[];
    };
}

export interface ListForSalePayload {
    assetid: string;
    price: number; 
}

export interface ListForSaleResponse {
    status: string;
    message: string;
    data: {
        asset: TransferListing;
        marketStats: {
            systemPrice: number;
            listedPrice: number;
        };
    };
}

export interface BuyMoviePayload {
    assetid: string;
}

export interface BuyMovieResponse {
    status: string;
    message: string;
    data: {
        asset: TransferListing;
        newBudget: number;
    };
}

export interface CancelListingPayload {
    assetId: string;
}

export interface CancelListingResponse {
    status: string;
    message: string;
}

export type SortOption = "newest" | "lowest_price" | "highest_price";

export const getMarketListings = async (
    page = 1,
    sort: SortOption = "newest"
): Promise<MarketListingsResponse> => {
    const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        sort,
    });

    const response = await fetch(`${API_URL}/transfer-market?${params.toString()}`, {
        credentials: "include",
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch transfer market listings");
    }

    return response.json();
};


export const listMovieForSale = async (
    payload: ListForSalePayload
): Promise<ListForSaleResponse> => {
    const response = await fetch(`${API_URL}/transfer-market/list-movie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            assetid: payload.assetid,
            price: payload.price,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        let message = errorData.message || "Failed to list movie for sale";

        if (message.includes("Price must be between")) {
            message = message.replace(/(\d+)/g, (match: string) => {
                const cents = parseInt(match, 10);
                return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }).format(cents / 100);
            });
        }

        throw new Error(message);
    }

    return response.json();
};

export const buyMovieFromMarket = async (
    payload: BuyMoviePayload
): Promise<BuyMovieResponse> => {
    const response = await fetch(`${API_URL}/transfer-market/buy-movie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ assetid: payload.assetid }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to purchase movie from market");
    }

    return response.json();
};

export const cancelMovieListing = async (
    payload: CancelListingPayload
): Promise<CancelListingResponse> => {
    const response = await fetch(`${API_URL}/transfer-market/cancel-listing`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ assetId: payload.assetId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel listing");
    }

    return response.json();
};
