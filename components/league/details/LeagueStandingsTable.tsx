import { Medal, DollarSign } from "lucide-react";
import { LeagueLeaderboardData } from "@/services/leagues/leagues";

interface LeagueStandingsTableProps {
    leaderboardData?: LeagueLeaderboardData;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(Math.abs(value));

const rankMedal = (rank: number) => {
    if (rank === 1) return <Medal className="w-4 h-4 text-[#D4AF37]" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-[#9C8E7E]" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-[#A85A3A]" />;
    return (
        <span className="font-mono text-xs text-on-secondary-container/50 w-4 text-center">
            {rank}
        </span>
    );
};

export const LeagueStandingsTable = ({ leaderboardData }: LeagueStandingsTableProps) => {
    const entries = leaderboardData?.leaderboard ?? [];

    return (
        <div className="bg-surface-container-low">
            {/* Column headers */}
            <div className="grid grid-cols-[28px_1fr_100px_100px] items-center gap-4 px-6 py-3 border-b border-on-secondary-container/10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">#</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">Studio</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Net Worth</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Cash Balance</span>
            </div>

            <div className="flex flex-col divide-y divide-on-secondary-container/5">
                {entries.length === 0 ? (
                    <div className="px-6 py-8 text-center text-sm font-mono text-on-secondary-container/50">
                        No studios enrolled yet.
                    </div>
                ) : null}

                {entries.map((entry) => (
                    <div
                        key={entry.userId}
                        className={`grid grid-cols-[28px_1fr_100px_100px] items-center gap-4 px-6 py-4 cinematic-transition ${
                            entry.isMe
                                ? "bg-primary/8 border-l-2 border-primary"
                                : "hover:bg-surface-container-high border-l-2 border-transparent"
                        }`}
                    >
                        <div className="flex-shrink-0">{rankMedal(entry.rank)}</div>

                        <div className="min-w-0">
                            <p
                                className={`font-ui font-medium text-sm truncate ${
                                    entry.isMe ? "text-primary" : "text-on-surface"
                                }`}
                            >
                                {entry.studioName}
                                {entry.isMe && (
                                    <span className="ml-2 font-mono text-[9px] text-primary/70 uppercase tracking-wider">
                                        you
                                    </span>
                                )}
                            </p>
                        </div>

                        <span className="font-mono text-xs text-on-surface text-right">
                            {formatCurrency(entry.netWorthInDollars)}
                        </span>

                        <span className="font-mono text-xs text-[#4E9268] text-right flex items-center justify-end gap-0.5">
                            <DollarSign className="w-3 h-3" />
                            {formatCurrency(entry.cashBalanceInDollars)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
