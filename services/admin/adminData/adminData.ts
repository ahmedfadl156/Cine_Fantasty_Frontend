const API_URL = process.env.NEXT_PUBLIC_API_URL;

// هنا هنجيب كل المستخدمين 
export const getAllUsers = async (page: Number) => {
    const response = await fetch(`${API_URL}/admin/users?page=${page}`, {
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get all users")
    }

    const users = await response.json();
    return users;
}


// هنا هنجيب الصفحة الخاصة وكل المعلومات ليوزر معين
export const getUserPortfolio = async (userId: string) => {
    const response = await fetch(`${API_URL}/admin/users/${userId}` , {
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get user data")
    }

    const userPortfolio = await response.json();
    return userPortfolio;
}
