import { SectionDivider } from "./SectionDivider";
import { LeagueDetails, LeagueLeaderboardData } from "@/services/leagues/leagues";

interface LeagueRosterCardProps {
    league: LeagueDetails;
    leaderboardData?: LeagueLeaderboardData;
}

export const LeagueRosterCard = ({ league, leaderboardData }: LeagueRosterCardProps) => {
    const maxPlayers = 100;
    const entries = leaderboardData?.leaderboard ?? [];

    return (
        <div>
            <SectionDivider label="Roster" />
            <div className="bg-surface-container-low p-6">
                <div className="flex justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                        Studios Enrolled
                    </span>
                    <span className="font-mono text-sm text-on-surface">
                        {league.memberCount}
                        <span className="text-on-secondary-container/50">/{maxPlayers}</span>
                    </span>
                </div>
                <div className="h-1.5 bg-on-secondary-container/10 mb-4">
                    <div
                        className="h-full bg-primary cinematic-transition"
                        style={{
                            width: `${Math.round((league.memberCount / maxPlayers) * 100)}%`,
                        }}
                    />
                </div>

                {/* Member dots */}
                <div className="flex flex-wrap gap-2">
                    {entries.map((entry) => (
                        <div
                            key={entry.userId}
                            title={entry.studioName}
                            className={`flex items-center justify-center w-8 h-8 font-display font-bold italic text-sm cinematic-transition cursor-default ${
                                entry.isMe
                                    ? "bg-primary text-on-surface"
                                    : "bg-surface-container-high text-on-surface hover:bg-surface-bright"
                            }`}
                        >
                            {entry.studioName.charAt(0).toUpperCase()}
                        </div>
                    ))}
                    {Array.from({ length: Math.min(15, maxPlayers - league.memberCount) }).map((_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="w-8 h-8 border border-on-secondary-container/15 border-dashed"
                        />
                    ))}
                </div>
                <p className="mt-3 font-mono text-[10px] text-on-secondary-container/50 tracking-wider">
                    Showing top studios
                </p>
            </div>
        </div>
    );
};
