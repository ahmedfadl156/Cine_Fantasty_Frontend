"use client";

import { Film, Activity, Ticket, AlertCircle, Loader2 } from "lucide-react";
import { SectionDivider } from "./SectionDivider";
import { useGetLeagueActivityFeed } from "@/hooks/leagues/useLeagues";

export const LeagueActivityFeed = ({ leagueId }: { leagueId?: string }) => {
    const { data: activityData, isLoading, isError } = useGetLeagueActivityFeed(leagueId || "");

    const formatRelativeTime = (dateString: string) => {
        const timestamp = new Date(dateString).getTime();
        const now = Date.now();
        const diffInSeconds = Math.floor((now - timestamp) / 1000);

        if (diffInSeconds < 60) return "Just now";
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div>
            <SectionDivider label="Recent Activity" />
            
            {!leagueId ? (
                null
            ) : isLoading ? (
                <div className="bg-surface-container-low flex flex-col items-center justify-center py-12 px-6 border border-on-secondary-container/5 border-dashed rounded-xl">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-3 opacity-80" />
                    <p className="font-ui text-sm text-on-secondary-container tracking-wide animate-pulse">Scanning the market...</p>
                </div>
            ) : isError ? (
                <div className="bg-surface-container-low flex flex-col items-center justify-center py-12 px-6 text-center border border-red-500/10 border-dashed rounded-xl">
                    <AlertCircle className="w-8 h-8 text-red-500/50 mb-3" />
                    <p className="font-ui text-sm text-red-400">Error retrieving activity feed.</p>
                </div>
            ) : activityData?.feed && activityData.feed.length > 0 ? (
                <div className="bg-surface-container-low border border-outline/10 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="divide-y divide-outline/5 relative">
                        {/* Dramatic lightning accent line */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/10 to-transparent z-10" />
                        
                        {activityData.feed.map((item) => (
                            <div key={item.id} className="p-4 md:p-5 hover:bg-surface-container-highest/30 transition-all duration-300 flex items-start gap-4 md:gap-5 group relative pl-5 md:pl-6">
                                {/* The node indicator */}
                                <div className="absolute left-[-3px] top-7 w-2 h-2 rounded-full bg-primary/60 border-2 border-background group-hover:bg-primary group-hover:scale-125 transition-all z-20 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                
                                {item.details?.moviePoster ? (
                                    <div className="w-14 h-[4.5rem] md:w-16 md:h-24 rounded-lg border border-outline/10 overflow-hidden flex-shrink-0 bg-surface-container-highest shadow-md relative group-hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-shadow">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w200${item.details.moviePoster}`} 
                                            alt={item.details.movieTitle}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-14 h-[4.5rem] md:w-16 md:h-24 rounded-lg border border-outline/5 flex-shrink-0 bg-surface-container-highest flex items-center justify-center shadow-inner">
                                        <Film className="w-6 h-6 text-on-surface-muted/50" />
                                    </div>
                                )}
                                
                                <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[13px] md:text-sm text-on-surface-muted font-medium leading-relaxed font-ui">
                                            <span className="text-primary font-bold tracking-wide drop-shadow-sm">{item.details?.studioName || "A studio"}</span>
                                            {" "}just acquired the rights to{" "}
                                            <span className="text-on-surface font-semibold tracking-wide">«{item.details?.movieTitle}»</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 shadow-sm">
                                            <Ticket className="w-3 h-3" /> 
                                            {formatCurrency(item.details?.purchasePriceInDollars || 0)}
                                        </span>
                                        <span className="text-xs text-on-surface-muted flex items-center gap-1.5 font-mono bg-on-surface/5 px-2 py-1 rounded-md">
                                            <Activity className="w-3 h-3 opacity-60" />
                                            {formatRelativeTime(item.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-surface-container-low flex flex-col items-center justify-center py-16 px-6 text-center border border-on-secondary-container/5 border-dashed rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-surface-container border border-outline/5 flex items-center justify-center mb-4 shadow-inner">
                        <Film className="w-7 h-7 text-on-secondary-container/30" />
                    </div>
                    <p className="font-ui text-base text-on-surface font-medium tracking-wide">
                        The market is perfectly silent.
                    </p>
                    <p className="font-ui text-sm text-on-surface-muted mt-2 max-w-[250px]">
                        No studio has made a move in this league yet. Be the first to strike!
                    </p>
                </div>
            )}
        </div>
    );
};
