const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UpdateMePayload {
    studioName?: string;
    email?: string;
}

export interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export const updateMe = async (payload: UpdateMePayload) => {
    const response = await fetch(`${API_URL}/user/updateMe`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
    }

    const result = await response.json();
    return result.data;
};

export const updateMyPassword = async (payload: UpdatePasswordPayload) => {
    const response = await fetch(`${API_URL}/user/updateMyPassword`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
    }

    const result = await response.json();
    return result.data;
};
