const API_URL=process.env.NEXT_PUBLIC_API_URL;

export const login = async (credentials: {email: string , password: string}) => {
    const response = await fetch(`${API_URL}/auth/login` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid Email Or Password")
    }

    const result = await response.json();
    return result.data.user;
}