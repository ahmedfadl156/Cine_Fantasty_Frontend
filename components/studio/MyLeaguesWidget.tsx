"use client";

import { ChevronRight, Trophy, Lock, Globe, Users } from "lucide-react";
import Link from "next/link";

interface League {
    _id: string;
    name: string;
    isPublic: boolean;
    memberCount?: number;
    role?: string;
}

interface MyLeaguesWidgetProps {
    leagues?: League[];
    isLoading?: boolean;
}

const SkeletonRow = () => (
    <div className="flex items-center justify-between px-6 py-4 animate-pulse border-b border-on-secondary-container/10 last:border-b-0">
        <div className="space-y-2">
            <div className="w-32 h-4 bg-surface-bright" />
            <div className="w-20 h-3 bg-surface-bright" />
        </div>
        <div className="w-6 h-6 bg-surface-bright rounded-full" />
    </div>
);

const EmptyLeagues = () => (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center gap-3">
        <div className="w-12 h-12 rounded-full border border-on-secondary-container/20 flex items-center justify-center bg-surface-container-highest">
            <Trophy className="w-5 h-5 text-on-secondary-container/50" />
        </div>
        <div className="space-y-1">
            <p className="font-ui font-medium text-sm text-on-surface">No Leagues Yet</p>
            <p className="font-ui font-light text-xs text-on-secondary-container">
                Join or create a league to compete with others.
            </p>
        </div>
        <Link 
            href="/leagues" 
            className="mt-3 text-xs font-mono text-primary hover:text-primary/80 uppercase tracking-wider cinematic-transition inline-flex items-center gap-1"
        >
            Browse Leagues <ChevronRight className="w-3 h-3" />
        </Link>
    </div>
);

export const MyLeaguesWidget = ({ leagues, isLoading }: MyLeaguesWidgetProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col">
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </div>
        );
    }

    if (!leagues || leagues.length === 0) {
        return <EmptyLeagues />;
    }

    return (
        <div className="flex flex-col divide-y divide-on-secondary-container/10">
            {leagues.slice(0, 5).map((league) => (
                <Link
                    key={league._id}
                    href={`/leagues/${league._id}`}
                    className="group flex flex-col px-6 py-4 hover:bg-surface-container-high cinematic-transition border-l-2 border-transparent hover:border-primary"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-ui font-medium text-sm text-on-surface group-hover:text-primary cinematic-transition truncate pr-4">
                            {league.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-on-secondary-container/30 group-hover:text-primary cinematic-transition flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-on-secondary-container">
                            {league.isPublic ? (
                                <Globe className="w-3 h-3 opacity-70" />
                            ) : (
                                <Lock className="w-3 h-3 opacity-70" />
                            )}
                            <span className="font-mono text-[9px] uppercase tracking-widest">
                                {league.isPublic ? "Public" : "Private"}
                            </span>
                        </div>
                        
                        {league.memberCount !== undefined && (
                            <div className="flex items-center gap-1.5 text-on-secondary-container">
                                <Users className="w-3 h-3 opacity-70" />
                                <span className="font-mono text-[9px] uppercase tracking-widest">
                                    {league.memberCount} Mbrs
                                </span>
                            </div>
                        )}

                        {league.role && (league.role === 'owner' || league.role === 'admin') && (
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]">
                                {league.role}
                            </span>
                        )}
                    </div>
                </Link>
            ))}
            
            <div className="flex items-center justify-center p-4 bg-surface-container-highest/30 hover:bg-surface-container-highest cinematic-transition">
                <Link
                    href="/leagues/my-leagues"
                    className="font-mono text-[10px] text-on-secondary-container hover:text-primary cinematic-transition uppercase tracking-wider flex items-center gap-1.5"
                >
                    Manage My Leagues <ChevronRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
};
