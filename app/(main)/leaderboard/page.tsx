"use client";

import { useLeaderboard } from "@/hooks/leaderboard/useLeaderboard";
import { useAuth } from "@/hooks/auth/useAuth";
import { Trophy, Medal, Crown, TrendingUp, DollarSign, Wallet } from "lucide-react";
import { cn, formatCompactDollars, formatDollars } from "@/lib/utils";



export default function LeaderboardPage() {
    const { data: leaderboardData, isPending, isError } = useLeaderboard();
    const { data: authUser } = useAuth();

    const currentStudioId = authUser?.user?._id;

    if (isPending) {
        return (
            <main className="flex flex-col px-4 py-8 items-center justify-center min-h-[70vh]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-on-surface-muted font-ui animate-pulse">Loading Live Standings...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex flex-col px-4 py-8 items-center justify-center min-h-[70vh]">
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md text-center">
                    <p className="text-red-500 font-mono text-lg mb-2">Error Loading Data</p>
                    <p className="text-on-surface-muted text-sm">Failed to retrieve the leaderboard. Please try again later.</p>
                </div>
            </main>
        );
    }

    const seasonName = leaderboardData?.seasonName || "Current Season";
    const entries = leaderboardData?.leaderboard || [];

    const topThree = entries.slice(0, 3);
    const rest = entries.slice(3, 100);

    const podiumOrder = [
        topThree[1], 
        topThree[0], 
        topThree[2], 
    ].filter(Boolean);

    return (
        <main className="flex flex-col px-4 lg:px-8 py-10 w-full max-w-6xl mx-auto pb-24">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center mb-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2 ring-1 ring-primary/30">
                    <Trophy className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black font-ui text-primary tracking-tight">
                    Global Leaderboard
                </h1>
                <p className="text-sm md:text-xl text-on-surface-muted font-mono bg-surface-container px-4 py-1.5 rounded-full border border-outline/10 shadow-inner inline-flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    Season: <span className="text-on-surface font-semibold">{seasonName}</span>
                </p>
            </div>

            {podiumOrder.length > 0 && (
                <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 lg:gap-8 mb-20 px-2 lg:px-10 h-auto md:h-72">
                    {podiumOrder.map((entry) => {
                        const isCurrent = entry.studioId === currentStudioId;
                        
                        const isGold = entry.rank === 1;
                        const isSilver = entry.rank === 2;
                        const isBronze = entry.rank === 3;

                        let rankColors = "";
                        let heightClass = "";
                        let icon = null;

                        if (isGold) {
                            rankColors = "from-yellow-300 via-yellow-500 to-yellow-600 border-yellow-400/50 shadow-yellow-500/20";
                            heightClass = "h-auto md:h-[300px] scale-100 md:scale-110 z-10 md:-translate-y-4";
                            icon = <Crown className="w-7 h-7 text-yellow-100" />;
                        } else if (isSilver) {
                            rankColors = "from-gray-300 via-gray-400 to-gray-500 border-gray-300/50 shadow-gray-400/20";
                            heightClass = "h-auto md:h-[260px]";
                            icon = <Medal className="w-6 h-6 text-gray-100" />;
                        } else if (isBronze) {
                            rankColors = "from-orange-400 via-orange-600 to-orange-800 border-orange-500/50 shadow-orange-600/20";
                            heightClass = "h-auto md:h-[240px]";
                            icon = <Medal className="w-6 h-6 text-orange-100" />;
                        }

                        return (
                            <div 
                                key={entry.studioId} 
                                className={cn(
                                    "relative flex flex-col justify-between p-1 rounded-2xl md:rounded-t-3xl md:rounded-b-xl w-full md:w-1/3 max-w-sm transition-all duration-300",
                                    heightClass,
                                    "bg-gradient-to-t shadow-xl",
                                    rankColors,
                                    isCurrent ? "ring-4 ring-white/90 ring-offset-4 ring-offset-theme-background" : ""
                                )}
                            >
                                <div className="bg-surface-container-high/90 backdrop-blur-md w-full h-full rounded-xl md:rounded-t-[22px] md:rounded-b-lg p-6 flex flex-col items-center text-center relative border border-white/10 group hover:bg-surface-container-high/95 transition-colors">
                                    
                                    <div className={cn(
                                        "absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-surface-container-high",
                                        isGold ? "bg-gradient-to-br from-yellow-300 to-yellow-600" : 
                                        isSilver ? "bg-gradient-to-br from-gray-200 to-gray-500" :
                                        "bg-gradient-to-br from-orange-300 to-orange-600"
                                    )}>
                                        {icon}
                                    </div>

                                    {/* Current User Pill */}
                                    {isCurrent && (
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest leading-none">
                                            You
                                        </div>
                                    )}

                                    <div className="mt-4 mb-3 relative">
                                        <div className="w-20 h-20 rounded-full border-2 border-outline/20 p-1 bg-surface-container">
                                            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-primary/20 text-primary font-black text-3xl font-ui uppercase">
                                                {entry.studioName.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold font-ui text-on-surface truncate shrink-0 w-full" title={entry.studioName}>
                                        {entry.studioName}
                                    </h3>
                                    
                                    <div className="mt-auto space-y-2 w-full pt-4">
                                        <div className="flex flex-col items-center bg-surface-container py-2 px-3 rounded-lg border border-outline/10">
                                            <span className="text-[10px] uppercase text-on-surface-muted tracking-wider font-semibold mb-0.5">Net Worth</span>
                                            <span className="text-xl font-black text-green-400 font-mono tracking-tighter">
                                                {formatCompactDollars(entry.netWorthInDollars)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* List View For Rest 4 to 100 */}
            {rest.length > 0 && (
                <div className="bg-surface-container-low rounded-3xl border border-outline/10 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container border-b border-outline/10 text-on-surface-muted text-sm uppercase tracking-wider font-semibold font-ui">
                                    <th className="px-6 py-5 w-20 text-center">Rank</th>
                                    <th className="px-6 py-5 min-w-[250px]">Studio</th>
                                    <th className="px-6 py-5 text-right w-48">Net Worth</th>
                                    <th className="px-6 py-5 text-right w-48 hidden sm:table-cell">Available Cash</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline/5 font-mono">
                                {rest.map((entry) => {
                                    const isCurrent = entry.studioId === currentStudioId;

                                    return (
                                        <tr 
                                            key={entry.studioId}
                                            className={cn(
                                                "transition-colors duration-200 group",
                                                isCurrent 
                                                    ? "bg-primary/5 hover:bg-primary/10 border-l-4 border-l-primary" 
                                                    : "hover:bg-surface-container border-l-4 border-l-transparent"
                                            )}
                                        >
                                            <td className="px-6 py-4 text-center font-bold text-on-surface-muted group-hover:text-on-surface transition-colors">
                                                #{entry.rank}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-10 h-10 rounded-full border border-outline/20 overflow-hidden flex-shrink-0 flex items-center justify-center bg-primary/20 text-primary font-bold text-lg uppercase font-ui">
                                                        {entry.studioName.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={cn(
                                                            "font-ui font-semibold text-base truncate max-w-[200px] md:max-w-xs",
                                                            isCurrent ? "text-primary font-bold" : "text-on-surface"
                                                        )}>
                                                            {entry.studioName}
                                                        </span>
                                                        {isCurrent && (
                                                            <span className="text-[10px] text-primary/80 uppercase font-black tracking-widest mt-0.5">
                                                                Your Studio
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5 text-green-400 font-semibold text-base">
                                                    {formatDollars(entry.netWorthInDollars)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right hidden sm:table-cell">
                                                <div className="flex items-center justify-end gap-1.5 text-on-surface font-medium text-sm">
                                                    <Wallet className="w-3.5 h-3.5 opacity-50 text-blue-400" />
                                                    {formatDollars(entry.cashInDollars)}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {!isPending && entries.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-on-surface-muted bg-surface-container-low rounded-2xl border border-outline/10 p-8 text-center">
                    <Trophy className="w-16 h-16 opacity-20 mb-4" />
                    <p className="text-xl font-ui">No users found on the leaderboard yet.</p>
                </div>
            )}
        </main>
    );
}