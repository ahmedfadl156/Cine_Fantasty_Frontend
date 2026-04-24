const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllMovies = async (filters: { seasonId?: string, status?: string, search?: string, page?: number, limit?: number } = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.seasonId) queryParams.append("seasonId", filters.seasonId);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.page) queryParams.append("page", filters.page.toString());
    if (filters.limit) queryParams.append("limit", filters.limit.toString());

    const queryString = queryParams.toString();
    const url = `${API_URL}/movie/get-all-movies${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get All Movies")
    }

    const movies = await response.json();
    return movies;
}

export const updateMovieAdmin = async (movieId: string, updates: { status?: string, basePriceInDollars?: number, boxOfficePriceInDollars?: number, releaseDate?: string }) => {
    const response = await fetch(`${API_URL}/movie/update-movie/${movieId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update movie");
    }

    const updatedMovie = await response.json();
    return updatedMovie;
}



// export const applyStreamingRevenue = async (manualRating?: number) => {}