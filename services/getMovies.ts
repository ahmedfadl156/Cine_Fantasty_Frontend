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