"use client";

import { useState } from "react";
import {
    Trophy, Users, Globe, Crown, Calendar, ChevronRight, AlertCircle, RefreshCw
} from "lucide-react";
import { JoinLeagueModal } from "./JoinLeagueModal";
import { useGetPublicLeagues } from "@/hooks/leagues/useLeagues";


export interface PublicLeague {
    _id: string;
    name: string;
    createdAt: string;
    ownerName: string[];
    membersCount: number;
}

const SkeletonLeagueCard = () => (
    <div className="flex flex-col bg-surface-container-low animate-pulse p-6 gap-4">
        <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2.5 flex-1">
                <div className="h-2 w-16 bg-surface-bright" />
                <div className="h-5 w-3/4 bg-surface-bright" />
                <div className="h-2 w-1/2 bg-surface-bright" />
            </div>
            <div className="w-12 h-12 bg-surface-bright" />
        </div>
        <div className="h-px bg-surface-bright" />
        <div className="h-8 bg-surface-bright" />
    </div>
);


interface LeagueCardProps {
    league: PublicLeague;
    onJoin: (l: PublicLeague) => void;
}

const LeagueCard = ({ league, onJoin }: LeagueCardProps) => {
    const createdDate = new Date(league.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const ownerName = league.ownerName?.[0] ?? "Unknown Studio";

    return (
        <div className="group flex flex-col bg-surface-container-low hover:bg-surface-container-high cinematic-transition border-l-2 border-transparent hover:border-primary/50 relative overflow-hidden">
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/3 pointer-events-none -rotate-12 translate-x-6 -translate-y-6" />

            {/* Card Header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Public badge */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#4E9268]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4E9268]" />
                            Open
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50">
                            <Globe className="w-2.5 h-2.5" /> Public
                        </span>
                    </div>

                    <h3 className="font-display font-bold italic text-on-surface text-xl leading-tight line-clamp-1 group-hover:text-primary cinematic-transition">
                        {league.name}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-2">
                        <Crown className="w-3 h-3 text-on-secondary-container/40" />
                        <span className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider truncate">
                            {ownerName}
                        </span>
                    </div>
                </div>

                {/* Members badge */}
                <div className="flex-shrink-0 bg-surface-container-high px-3 py-2 text-center min-w-[52px]">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">Studios</p>
                    <p className="font-mono text-xl text-on-surface leading-none mt-0.5">
                        {String(league.membersCount).padStart(2, "0")}
                    </p>
                </div>
            </div>

            {/* Stats row */}
            <div className="px-6 pb-4 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-on-secondary-container/50" />
                    <span className="font-mono text-xs text-on-surface">
                        {league.membersCount}
                        <span className="text-on-secondary-container/50"> competing</span>
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-on-secondary-container/50" />
                    <span className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider">
                        {createdDate}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-on-secondary-container/8 mb-5" />

            {/* CTA */}
            <div className="mt-auto px-6 pb-6">
                <button
                    onClick={() => onJoin(league)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-on-surface px-4 py-2.5 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_15px_rgba(200,53,42,0.15)] group-hover:shadow-[0_0_25px_rgba(200,53,42,0.3)]"
                >
                    Join League <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
};


export const LeagueBrowser = () => {
    const [joinTarget, setJoinTarget] = useState<PublicLeague | null>(null);
    const { data, isLoading, isError, error, refetch } = useGetPublicLeagues();

    const leagues: PublicLeague[] = data?.data?.leagues ?? [];
    const pagination = data?.pagination;

    return (
        <>
            {/* Count row */}
            {!isLoading && !isError && (
                <div className="flex items-center justify-between mb-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container/50">
                        {pagination?.totalAvailableLeagues ?? leagues.length}{" "}
                        {(pagination?.totalAvailableLeagues ?? leagues.length) === 1 ? "league" : "leagues"} available
                    </p>
                    {pagination && (
                        <span className="font-mono text-[10px] text-on-secondary-container/40 uppercase tracking-wider">
                            Page {pagination.currentPage} / {pagination.totalPages}
                        </span>
                    )}
                </div>
            )}

            {/* League grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-on-secondary-container/10">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonLeagueCard key={i} />)
                ) : isError ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-24 gap-5 bg-surface-container-low">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10">
                            <AlertCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-display font-bold italic text-on-surface text-xl mb-1">
                                Failed to load leagues.
                            </p>
                            <p className="font-ui font-light text-sm text-on-secondary-container">
                                {(error as Error)?.message ?? "Something went wrong. Try again."}
                            </p>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="flex items-center gap-2 bg-surface-container-high text-on-surface px-5 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-surface-bright cinematic-transition"
                        >
                            <RefreshCw className="w-3.5 h-3.5" /> Retry
                        </button>
                    </div>
                ) : leagues.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 bg-surface-container-low">
                        <Trophy className="w-10 h-10 text-on-secondary-container/20" />
                        <p className="font-display font-bold italic text-on-surface text-xl">No public leagues yet.</p>
                        <p className="font-ui font-light text-sm text-on-secondary-container">
                            Be the first to create one and set the standard.
                        </p>
                    </div>
                ) : (
                    leagues.map((league) => (
                        <LeagueCard
                            key={league._id}
                            league={league}
                            onJoin={setJoinTarget}
                        />
                    ))
                )}
            </div>

            {/* Join modal */}
            <JoinLeagueModal
                isOpen={!!joinTarget}
                onClose={() => setJoinTarget(null)}
                leagueName={joinTarget?.name}
                leagueId={joinTarget?._id}
                requiresCode={false}
            />
        </>
    );
};
