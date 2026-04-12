const API_URL=process.env.NEXT_PUBLIC_API_URL;

export const getTopMovies = async () => {
    const response = await fetch(`${API_URL}/market/get-top-movies`);
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed To Get Top Movies`)
    };

    const topMovies = await response.json();
    return topMovies;
}

export const getAllMovies = async (page = 1) => {
    const response = await fetch(`${API_URL}/market?page=${page}&limit=20`);

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed To Get Market Movies");
    }

    const upcomingMovies = await response.json();
    return upcomingMovies;
}

export const getMovieDetails = async (id: string) => {
    const response = await fetch(`${API_URL}/movie/get-movie-details/${id}`);

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed To Get Movie Details");
    }

    const movieDetails = await response.json();
    return movieDetails;
}

export const buyMovie = async (movieId: string) => {
    const response = await fetch(`${API_URL}/market/buy-movie/${movieId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed To Buy Movie");
    }

    const boughtMovie = await response.json();
    return boughtMovie;
}


export interface MyStudioMovieDetails {
    _id: string;
    posterPath: string;
    releaseDate: string;
    title: string;
}

export interface MyStudioFilm {
    _id: string;
    status: string;
    movieDetails: MyStudioMovieDetails;
    purchasePriceInDollars: number;
    daysUntilRelease: number;
}

export interface MyStudioOverview {
    totalInvestedInDollars: number;
    totalFilmsOwned: number;
}

export interface MyStudioDashboard {
    inTheaters: MyStudioFilm[];
    inProduction: MyStudioFilm[];
    archivedFilms: MyStudioFilm[];
}

export interface MyStudioData {
    overview: MyStudioOverview;
    dashboard: MyStudioDashboard;
}

export interface MyStudioResponse {
    status: string;
    data: MyStudioData;
}

export const getMyStudio = async (): Promise<MyStudioResponse> => {
    const response = await fetch(`${API_URL}/studio/my-studio`, {
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load your studio");
    }

    return response.json();
};