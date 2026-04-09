const API_URL=process.env.NEXT_PUBLIC_API_URL;

export const getMe = async () => {
    const response = await fetch(`${API_URL}/auth/getMe`, {
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Not Authenticated")
    };

    const result = await response.json();
    return result.data.user;
}