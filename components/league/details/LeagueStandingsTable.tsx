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
            <div className="hidden sm:grid grid-cols-[28px_1fr_100px_100px] items-center gap-4 px-6 py-3 border-b border-on-secondary-container/10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">#</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">Studio</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Net Worth</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Cash Balance</span>
            </div>

            <div className="flex flex-col divide-y divide-on-secondary-container/5">
                {entries.length === 0 ? (
                    <div className="px-4 md:px-6 py-8 text-center text-sm font-mono text-on-secondary-container/50">
                        No studios enrolled yet.
                    </div>
                ) : null}

                {entries.map((entry , index) => (
                    <div
                        key={entry.userId}
                        className={`grid grid-cols-[24px_1fr_auto] sm:grid-cols-[28px_1fr_100px_100px] items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 cinematic-transition ${
                            entry.isMe
                                ? "bg-primary/8 border-l-2 border-primary"
                                : "hover:bg-surface-container-high border-l-2 border-transparent"
                        }`}
                    >
                        <div className="flex-shrink-0 flex justify-center">{rankMedal(entry.rank)}</div>

                        <div className="min-w-0 pr-2 sm:pr-0">
                            <p
                                className={`font-ui font-medium text-sm truncate ${
                                    entry.isMe ? "text-primary" : "text-on-surface"
                                }`}
                            >
                                {index + 1}. {entry.studioName}
                                {entry.isMe && (
                                    <span className="ml-1.5 sm:ml-2 font-mono text-[8px] sm:text-[9px] text-primary/70 uppercase tracking-wider">
                                        you
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Mobile stacked stats / Desktop separate columns */}
                        <div className="flex flex-col items-end sm:block h-full justify-center">
                            <span className="font-mono text-[11px] sm:text-xs text-on-surface text-right sm:hidden">
                                {formatCurrency(entry.netWorthInDollars)}
                            </span>
                            <span className="hidden sm:inline font-mono text-xs text-on-surface text-right">
                                {formatCurrency(entry.netWorthInDollars)}
                            </span>

                            <span className="font-mono text-[9px] sm:text-xs text-[#4E9268] mt-1 sm:mt-0 items-center justify-end gap-0.5 sm:hidden flex">
                                <DollarSign className="w-2.5 h-2.5 opacity-70" />
                                {formatCurrency(entry.cashBalanceInDollars)}
                            </span>
                        </div>

                        {/* Only visible on desktop (sm & above) */}
                        <div className="hidden sm:flex font-mono text-xs text-[#4E9268] items-center justify-end gap-0.5">
                            <DollarSign className="w-3 h-3 text-[#4E9268]/70" />
                            <span>{formatCurrency(entry.cashBalanceInDollars)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
