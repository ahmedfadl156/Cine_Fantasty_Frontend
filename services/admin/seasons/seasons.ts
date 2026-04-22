const API_URL = process.env.NEXT_PUBLIC_API_URL;

// get all seasos 
export const getAllSeasons = async () => {
    const response = await fetch(`${API_URL}/seasons/getAllSeasons`, {
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get all seasons");
    }

    const seasons = await response.json();
    return seasons;
}

// get season details
export const getSeasonDetails = async (seasonId: string) => {
    const response = await fetch(`${API_URL}/seasons/getSeasonStats/${seasonId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get season details");
    }

    const seasonDetails = await response.json();
    return seasonDetails;
}

// create season
export const createSeason = async (name: string, startDate: string, endDate: string, startingBudget: number) => {
    const response = await fetch(`${API_URL}/seasons/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, startDate, endDate, startingBudget })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create the season please try again later")
    };

    const newSeason = await response.json();
    return newSeason;
}

// update season status
export const updateSeasonStatus = async (seasonId: string, status: string) => {
    const response = await fetch(`${API_URL}/seasons/updateStatus/${seasonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update season status");
    }

    const updatedSeason = await response.json();
    return updatedSeason;
}

// update season details
export const updateSeasonDetails = async (seasonId: string, details: { name?: string, startDate?: string, endDate?: string, startingBudget?: number }) => {
    const response = await fetch(`${API_URL}/seasons/updateDetails/${seasonId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(details)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update season details");
    }

    const updatedSeason = await response.json();
    return updatedSeason;
}