const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createLeague = async (leagueData: { name: string, isPublic: boolean }) => {
    const response = await fetch(`${API_URL}/leagues/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(leagueData),
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed To Create League");
    }

    const createdLeague = await response.json();
    return createdLeague;
}

export const getPublicLeagues = async () => {
    const response = await fetch(`${API_URL}/leagues/get-public-leagues`, {
        credentials: "include"
    });

    if (!response.ok) {
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


export const joinPublicLeague = async (leagueId: string) => {
    const response = await fetch(`${API_URL}/leagues/join-public/${leagueId}`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join public league");
    }

    return response.json();
}

export interface SeasonInfo {
    id: string;
    name: string;
    status: string;
}

export interface LeagueDetails {
    _id: string;
    name: string;
    isPublic: boolean;
    createdAt: string;
    inviteCode: string;
    memberCount: number;
    ownerName: string;
    seasonInfo: SeasonInfo;
    role: string;
}

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    studioName: string;
    netWorthInDollars: number;
    cashBalanceInDollars: number;
    isMe: boolean;
}

export interface LeagueLeaderboardData {
    leagueDetails: {
        id: string;
        name: string;
        totalMembers: number;
    };
    myStats: LeaderboardEntry | null;
    leaderboard: LeaderboardEntry[];
}

export const getLeagueDetails = async (leagueId: string): Promise<LeagueDetails> => {
    const response = await fetch(`${API_URL}/leagues/get-league-details/${leagueId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get league details");
    }

    const { data } = await response.json();
    return data.league;
}

export const getLeagueLeaderboard = async (leagueId: string): Promise<LeagueLeaderboardData> => {
    const response = await fetch(`${API_URL}/leagues/get-league-leaderboard/${leagueId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get league leaderboard");
    }

    const { data } = await response.json();
    return data;
}

export const joinLeague = async (inviteCode: string) => {
    const response = await fetch(`${API_URL}/leagues/join`, {
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