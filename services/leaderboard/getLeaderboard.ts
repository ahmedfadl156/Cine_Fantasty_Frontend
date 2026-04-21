const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LeaderboardEntry {
    rank: number;
    studioId: string;
    studioName: string;
    avatar: string;
    netWorthInDollars: number;
    cashInDollars: number;
}

export interface LeaderboardData {
    seasonName: string;
    leaderboard: LeaderboardEntry[];
}

export interface LeaderboardResponse {
    status: string;
    results: number;
    data: LeaderboardData;
}

export const getLeaderboard = async (): Promise<LeaderboardData> => {
    const response = await fetch(`${API_URL}/leaderboard`, {
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch leaderboard");
    }

    const result: LeaderboardResponse = await response.json();
    return result.data;
};
