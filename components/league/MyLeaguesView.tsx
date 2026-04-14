"use client";

import { useState } from "react";
import {
    Trophy, Users, Crown, Copy, Check, Globe, Lock,
    ChevronRight, Plus, Search, AlertCircle, RefreshCw, Flame
} from "lucide-react";
import Link from "next/link";
import { useGetMyLeagues } from "@/hooks/leagues/useLeagues";

interface MyLeague {
    _id: string;
    name: string;
    createdAt: string;
    ownerName?: string;
    memberCount: number;
    isPublic?: boolean;
    inviteCode?: string;
    role?: "OWNER" | "MEMBER";
    rank?: number;
    totalScore?: number;
}

const CopyInviteCode = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-bright cinematic-transition px-4 py-2.5 w-full group"
        >
            <span className="font-mono text-[11px] text-on-secondary-container uppercase tracking-widest flex-1">
                Invite Code
            </span>
            <span className="font-mono text-sm text-on-surface tracking-[0.4em] font-bold">
                {code}
            </span>
            <span className="ml-2 text-on-secondary-container group-hover:text-primary cinematic-transition">
                {copied ? <Check className="w-3.5 h-3.5 text-[#4E9268]" /> : <Copy className="w-3.5 h-3.5" />}
            </span>
        </button>
    );
};

const OwnedLeagueCard = ({ league }: { league: MyLeague }) => {
    const createdDate = new Date(league.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="flex flex-col bg-surface-container-low border border-primary/10 hover:border-primary/25 cinematic-transition relative overflow-hidden group">
            {/* Gold top accent */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            <div className="px-6 pt-6 pb-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2.5">
                            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]">
                                <Crown className="w-2.5 h-2.5" /> Commissioner
                            </span>
                            <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">
                                {league.isPublic === false
                                    ? <><Lock className="w-2.5 h-2.5" /> Private</>
                                    : <><Globe className="w-2.5 h-2.5" /> Public</>
                                }
                            </span>
                        </div>
                        <h3 className="font-display font-bold italic text-on-surface text-2xl leading-tight group-hover:text-primary cinematic-transition">
                            {league.name}
                        </h3>
                    </div>
                    {/* Member count badge */}
                    <div className="flex-shrink-0 bg-primary/10 border border-primary/20 px-3 py-2 text-center min-w-[52px]">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-primary/70">Studios</p>
                        <p className="font-mono text-xl text-primary leading-none mt-0.5 font-bold">
                            {String(league.memberCount).padStart(2, "0")}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-on-secondary-container/60">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">
                            {league.memberCount} {league.memberCount === 1 ? "studio" : "studios"}
                        </span>
                    </div>
                    <div className="w-px h-3 bg-on-secondary-container/20" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                        Est. {createdDate}
                    </span>
                </div>
            </div>

            {/* Invite code */}
            {league.inviteCode && (
                <div className="px-6 pb-4">
                    <CopyInviteCode code={league.inviteCode} />
                </div>
            )}

            {/* Divider */}
            <div className="mx-6 h-px bg-on-secondary-container/8" />

            {/* CTA */}
            <div className="px-6 py-4 flex gap-3">
                <Link
                    href={`/leagues/${league._id}`}
                    className="flex-1 flex items-center justify-center gap-2 border border-primary/30 text-primary px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-primary/10 cinematic-transition"
                >
                    Manage League <ChevronRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
};

const JoinedLeagueCard = ({ league }: { league: MyLeague }) => {
    const ownerName = league.ownerName ?? "Unknown Studio";

    return (
        <div className="flex flex-col bg-surface-container-low hover:bg-surface-container-high cinematic-transition border-l-2 border-transparent hover:border-primary/30 group relative overflow-hidden">
            <div className="px-6 pt-6 pb-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2.5">
                            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#4E9268]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4E9268] animate-pulse" />
                                Member
                            </span>
                            {league.rank && (
                                <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]">
                                    <Flame className="w-2.5 h-2.5" /> Rank #{league.rank}
                                </span>
                            )}
                        </div>
                        <h3 className="font-display font-bold italic text-on-surface text-xl leading-tight group-hover:text-primary cinematic-transition">
                            {league.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <Crown className="w-3 h-3 text-on-secondary-container/40" />
                            <span className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider truncate">
                                {ownerName}
                            </span>
                        </div>
                    </div>

                    {/* Score / members */}
                    <div className="flex-shrink-0 bg-surface-container-high px-3 py-2 text-center min-w-[52px]">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">Studios</p>
                        <p className="font-mono text-xl text-on-surface leading-none mt-0.5">
                            {String(league.memberCount).padStart(2, "0")}
                        </p>
                    </div>
                </div>

                {league.totalScore !== undefined && (
                    <div className="flex items-center gap-1.5">
                        <Trophy className="w-3 h-3 text-[#D4AF37]" />
                        <span className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider">
                            {league.totalScore.toLocaleString()} pts
                        </span>
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="mt-auto px-6 pb-5">
                <Link
                    href={`/leagues/${league._id}`}
                    className="w-full flex items-center justify-center gap-2 border border-on-secondary-container/20 text-on-secondary-container px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:border-primary/30 hover:text-primary cinematic-transition"
                >
                    View League <ChevronRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="flex flex-col bg-surface-container-low animate-pulse p-6 gap-4">
        <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2.5 flex-1">
                <div className="h-2 w-20 bg-surface-bright" />
                <div className="h-6 w-3/4 bg-surface-bright" />
                <div className="h-2 w-1/2 bg-surface-bright" />
            </div>
            <div className="w-12 h-12 bg-surface-bright" />
        </div>
        <div className="h-px bg-surface-bright" />
        <div className="h-9 bg-surface-bright" />
    </div>
);


type Tab = "all" | "owned" | "joined";

export const MyLeaguesView = ({ onCreateOpen }: { onCreateOpen: () => void }) => {
    const [activeTab, setActiveTab] = useState<Tab>("all");
    const { data, isLoading, isError, error, refetch } = useGetMyLeagues();

    // Normalise data — handle various possible API shapes
    const rawLeagues: MyLeague[] = data?.data?.leagues ?? data?.leagues ?? [];

    const owned = rawLeagues.filter((l) => l.role === "OWNER");
    const joined = rawLeagues.filter((l) => l.role !== "OWNER");

    // For display
    const displayOwned = activeTab === "joined" ? [] : owned;
    const displayJoined = activeTab === "owned" ? [] : joined;
    const isEmpty = owned.length === 0 && joined.length === 0;

    const tabs: { id: Tab; label: string; count?: number }[] = [
        { id: "all", label: "All Leagues", count: rawLeagues.length },
        { id: "owned", label: "My Leagues", count: owned.length },
        { id: "joined", label: "Joined", count: joined.length },
    ];

    /*  Loading state  */
    if (isLoading) {
        return (
            <div className="space-y-14">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-on-secondary-container/10">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        );
    }

    /*  Error state  */
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="w-14 h-14 flex items-center justify-center bg-primary/10">
                    <AlertCircle className="w-7 h-7 text-primary" />
                </div>
                <div className="text-center">
                    <p className="font-display font-bold italic text-on-surface text-2xl mb-2">
                        Couldn&apos;t load your leagues.
                    </p>
                    <p className="font-ui font-light text-sm text-on-secondary-container max-w-sm">
                        {(error as Error)?.message ?? "Something went wrong. Please try again."}
                    </p>
                </div>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 bg-surface-container-high text-on-surface px-5 py-3 text-xs font-mono uppercase tracking-widest hover:bg-surface-bright cinematic-transition"
                >
                    <RefreshCw className="w-3.5 h-3.5" /> Try Again
                </button>
            </div>
        );
    }

    /*  Empty state  */
    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-8 bg-surface-container-low">
                {/* Film reel icon */}
                <div className="relative">
                    <div className="w-20 h-20 border border-on-secondary-container/15 flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-on-secondary-container/20" />
                    </div>
                    <div className="absolute -inset-2 border border-on-secondary-container/5" />
                </div>
                <div className="text-center max-w-sm">
                    <p className="font-display font-bold italic text-on-surface text-3xl mb-3">
                        No leagues yet.
                    </p>
                    <p className="font-ui font-light text-on-secondary-container leading-relaxed">
                        Create your own competitive arena or join an existing public league
                        to start building your legacy.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onCreateOpen}
                        className="flex items-center gap-2 bg-primary text-on-surface px-6 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)]"
                    >
                        <Plus className="w-4 h-4" /> Create a League
                    </button>
                    <Link
                        href="/leagues"
                        className="flex items-center gap-2 border border-on-secondary-container/20 text-on-secondary-container px-6 py-3 text-xs font-mono uppercase tracking-widest hover:border-primary/30 hover:text-primary cinematic-transition"
                    >
                        <Search className="w-3.5 h-3.5" /> Browse Leagues
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Tab bar */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-px bg-on-secondary-container/10 overflow-hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-5 py-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest cinematic-transition min-w-[30%] ${
                            activeTab === tab.id
                                ? "bg-primary text-on-surface"
                                : "bg-surface-container-low text-on-secondary-container hover:text-on-surface hover:bg-surface-container-high"
                        }`}
                    >
                        <span className="truncate">{tab.label}</span>
                        {tab.count !== undefined && (
                            <span className={`flex-shrink-0 text-[9px] px-1.5 py-0.5 ${
                                activeTab === tab.id
                                    ? "bg-white/20"
                                    : "bg-surface-container-high"
                            }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Owned leagues section */}
            {displayOwned.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-px bg-[#D4AF37]/60" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                                <Crown className="w-3 h-3" /> Your Leagues
                            </span>
                        </div>
                        <div className="flex-1 h-px bg-on-secondary-container/10" />
                        <span className="font-mono text-[10px] text-on-secondary-container/40">
                            {displayOwned.length} {displayOwned.length === 1 ? "league" : "leagues"}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-on-secondary-container/10">
                        {displayOwned.map((league) => (
                            <OwnedLeagueCard key={league._id} league={league} />
                        ))}
                    </div>
                </section>
            )}

            {/* Joined leagues section */}
            {displayJoined.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-px bg-[#4E9268]/60" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#4E9268] flex items-center gap-1.5">
                                <Trophy className="w-3 h-3" /> Leagues Joined
                            </span>
                        </div>
                        <div className="flex-1 h-px bg-on-secondary-container/10" />
                        <span className="font-mono text-[10px] text-on-secondary-container/40">
                            {displayJoined.length} {displayJoined.length === 1 ? "league" : "leagues"}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-on-secondary-container/10">
                        {displayJoined.map((league) => (
                            <JoinedLeagueCard key={league._id} league={league} />
                        ))}
                    </div>
                </section>
            )}

            {/* Filtered empty */}
            {displayOwned.length === 0 && displayJoined.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-4 bg-surface-container-low">
                    <Trophy className="w-8 h-8 text-on-secondary-container/20" />
                    <p className="font-display font-bold italic text-on-surface text-xl">
                        Nothing here.
                    </p>
                </div>
            )}
        </div>
    );
};
