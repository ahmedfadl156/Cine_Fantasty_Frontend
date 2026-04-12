"use client";

import { Trophy, Medal, ChevronRight, Users } from "lucide-react";

export interface LeagueEntry {
    rank: number;
    studioName: string;
    portfolioValue: number;
    netPnl: number;
    isCurrentUser?: boolean;
}

interface LeagueStandingsProps {
    entries: LeagueEntry[];
    isLoading?: boolean;
    leagueName?: string;
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
        <span className="font-mono text-[11px] text-on-secondary-container/50 w-4 text-center">
            {rank}
        </span>
    );
};

const SkeletonRow = () => (
    <div className="flex items-center gap-4 px-6 py-4 animate-pulse">
        <div className="w-4 h-4 bg-surface-bright rounded-full" />
        <div className="flex-1 h-3 bg-surface-bright" />
        <div className="w-16 h-3 bg-surface-bright" />
        <div className="w-16 h-3 bg-surface-bright" />
    </div>
);

const EmptyLeague = () => (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Users className="w-8 h-8 text-on-secondary-container/30" />
        <p className="font-ui font-light text-sm text-on-secondary-container">
            Not enrolled in any league yet.
        </p>
    </div>
);

export const LeagueStandings = ({
    entries,
    isLoading,
    leagueName,
}: LeagueStandingsProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col divide-y divide-on-secondary-container/10">
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </div>
        );
    }

    if (!entries || entries.length === 0) {
        return <EmptyLeague />;
    }

    return (
        <div className="flex flex-col">
            {/* Column headers */}
            <div className="flex items-center gap-4 px-6 py-2 border-b border-on-secondary-container/10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50 w-4">
                    #
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50 flex-1">
                    Studio
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50 w-20 text-right">
                    Value
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50 w-20 text-right">
                    Net P&L
                </span>
            </div>

            {entries.map((entry) => (
                <div
                    key={entry.rank}
                    className={`flex items-center gap-4 px-6 py-3.5 cinematic-transition ${
                        entry.isCurrentUser
                            ? "bg-primary/8 border-l-2 border-primary"
                            : "hover:bg-surface-container-high border-l-2 border-transparent"
                    }`}
                >
                    <div className="flex-shrink-0">{rankMedal(entry.rank)}</div>
                    <span
                        className={`flex-1 font-ui font-medium text-sm leading-tight truncate ${
                            entry.isCurrentUser
                                ? "text-primary"
                                : "text-on-surface"
                        }`}
                    >
                        {entry.studioName}
                        {entry.isCurrentUser && (
                            <span className="ml-2 font-mono text-[9px] text-primary/70 uppercase tracking-wider">
                                you
                            </span>
                        )}
                    </span>
                    <span className="font-mono text-xs text-on-surface w-20 text-right">
                        {formatCurrency(entry.portfolioValue)}
                    </span>
                    <span
                        className={`font-mono text-xs w-20 text-right ${
                            entry.netPnl >= 0 ? "text-[#4E9268]" : "text-[#A85A3A]"
                        }`}
                    >
                        {entry.netPnl >= 0 ? "+" : "-"}
                        {formatCurrency(entry.netPnl)}
                    </span>
                </div>
            ))}

            {leagueName && (
                <div className="flex items-center justify-between px-6 py-3 border-t border-on-secondary-container/10 mt-1">
                    <span className="font-mono text-[10px] text-on-secondary-container/50 uppercase tracking-widest">
                        {leagueName}
                    </span>
                    <button className="flex items-center gap-1 font-mono text-[10px] text-on-secondary-container hover:text-primary cinematic-transition uppercase tracking-wider">
                        Full Standings <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            )}
        </div>
    );
};
