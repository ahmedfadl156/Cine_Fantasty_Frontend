const API_URL=process.env.NEXT_PUBLIC_API_URL;

export const createLeague = async (leagueData: {name: string , isPublic: boolean}) => {
    const response = await fetch(`${API_URL}/leagues/create` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(leagueData),
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed To Create League");
    }

    const createdLeague = await response.json();
    return createdLeague;
}

export const getPublicLeagues = async () => {
    const response = await fetch(`${API_URL}/leagues/get-public-leagues` , {
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed To get public leagues");
    }

    const publicLeagues = await response.json();
    return publicLeagues;
}

export const getMyLeagues = async () => {
    const response = await fetch(`${API_URL}/leagues/my-leagues`, {
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get your leagues");
    }

    const myLeagues = await response.json();
    return myLeagues;
}

export const joinLeague = async (leagueId: string, inviteCode?: string) => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode }),
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join league");
    }

    return response.json();
}