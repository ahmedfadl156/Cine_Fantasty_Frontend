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
    return result;
}

export const signup = async (credentials: {studioName: string , email: string , password: string}) => {
    const response = await fetch(`${API_URL}/auth/signup` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Please Provide a valid data")
    }

    const result = await response.json();
    return result
}

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout` , {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Failed to logout please try again")
    };

    return response.json();
}

export const googleLogin = async (idToken: string) => {
    const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google login failed");
    }

    return response.json();
};

export const facebookLogin = async (accessToken: string) => {
    const response = await fetch(`${API_URL}/auth/facebook`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Facebook login failed");
    }

    return response.json(); 
};