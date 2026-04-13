"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useMyStudio } from "@/hooks/movies/UseMovies";
import {
    StudioStats,
    buildStudioStats,
    studioStatsPlaceholder,
} from "@/components/studio/StudioStats";
import { StudioDashboard } from "@/components/studio/StudioDashboard";
import { LeagueStandings } from "@/components/studio/LeagueStandings";
import { Clapperboard, Settings, Trophy, AlertCircle } from "lucide-react";
import Link from "next/link";

const MyStudioPage = () => {
    const { data , isLoading: userLoading } = useAuth();
    const user = data?.user
    const remainingCash = data?.activeSeason?.currentStudio?.cashBalanceInDollars;
    const {
        data: studioData,
        isLoading: studioLoading,
        isError: studioError,
        error,
    } = useMyStudio();


    const leagueEntries: never[] = [];

    return (
        <div className="bg-background min-h-screen">
            {/* Studio Hero Banner  */}
            <section className="relative overflow-hidden bg-surface-container-lowest border-b border-on-secondary-container/10">
                {/* Decorative film-strip grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, #EEE4D4 0px, #EEE4D4 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #EEE4D4 0px, #EEE4D4 1px, transparent 1px, transparent 80px)",
                    }}
                />

                <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        {/* Identity block */}
                        <div className="flex items-end gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(200,53,42,0.3)]">
                                {userLoading ? (
                                    <div className="w-6 h-6 border-2 border-on-surface/20 border-t-on-surface rounded-full animate-spin" />
                                ) : (
                                    <span className="font-display font-bold italic text-on-surface text-3xl md:text-4xl">
                                        {(user?.studioName || "S").charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            {/* Name & meta */}
                            <div className="flex flex-col gap-1 pb-1">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                                    My Studio
                                </p>
                                {userLoading ? (
                                    <div className="h-8 w-48 bg-surface-container-high animate-pulse" />
                                ) : (
                                    <h1 className="font-display font-bold italic text-on-surface text-3xl md:text-4xl leading-none">
                                        {user?.studioName || "Your Studio"}
                                    </h1>
                                )}
                                {user?.email && (
                                    <p className="font-mono text-xs text-on-secondary-container mt-0.5">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/market"
                                className="flex items-center gap-2 bg-primary text-on-surface px-5 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)]"
                            >
                                <Clapperboard className="w-3.5 h-3.5" />
                                Browse Market
                            </Link>
                            <button className="flex items-center gap-2 border border-on-secondary-container/25 text-on-secondary-container px-5 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:border-on-surface/50 hover:text-on-surface cinematic-transition">
                                <Settings className="w-3.5 h-3.5" />
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/*  Stats Bar  */}
            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-10">
                <StudioStats
                    stats={
                        studioData
                            ? buildStudioStats(studioData.overview, remainingCash)
                            : studioStatsPlaceholder
                    }
                    isLoading={studioLoading}
                />
            </section>

            {/*  Error Banner  */}
            {studioError && (
                <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pb-6">
                    <div className="flex items-center gap-3 p-4 bg-[#A85A3A]/10 border border-[#A85A3A]/30">
                        <AlertCircle className="w-4 h-4 text-[#A85A3A] flex-shrink-0" />
                        <p className="font-mono text-xs text-[#A85A3A]">
                            {error instanceof Error
                                ? error.message
                                : "Failed to load your studio. Please try again."}
                        </p>
                    </div>
                </section>
            )}

            {/*  Main Content Grid  */}
            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/*  Studio Dashboard   */}
                    <div className="xl:col-span-7 flex flex-col gap-0">
                        {/* Section header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-on-secondary-container/20" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container">
                                My Assets
                            </span>
                            <div className="flex-1 h-px bg-on-secondary-container/20" />
                        </div>

                        <div className="bg-surface-container-low">
                            <StudioDashboard
                                dashboard={studioData?.dashboard ?? {
                                    inTheaters: [],
                                    inProduction: [],
                                    archivedFilms: [],
                                }}
                                isLoading={studioLoading}
                            />
                        </div>
                    </div>

                    {/*  Right sidebar  */}
                    <div className="xl:col-span-5 flex flex-col gap-8">
                        {/* League Standings */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-on-secondary-container/20" />
                                <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container flex items-center gap-1.5">
                                    <Trophy className="w-3 h-3" />
                                    League
                                </span>
                                <div className="flex-1 h-px bg-on-secondary-container/20" />
                            </div>

                            <div className="bg-surface-container-low">
                                <LeagueStandings
                                    entries={leagueEntries}
                                    isLoading={false}
                                    leagueName="Season 01"
                                />
                            </div>
                        </div>

                        {/* Quick tips / call-to-action panel */}
                        <div className="bg-surface-container-low p-6 border-l-2 border-primary/30">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-3">
                                Getting Started
                            </p>
                            <p className="font-display font-bold italic text-on-surface text-xl leading-snug mb-4">
                                Build your cinematic portfolio.
                            </p>
                            <ul className="flex flex-col gap-2.5 mb-6">
                                {[
                                    "Draft upcoming movies from the Market",
                                    "Track your P&L as box office data arrives",
                                    "Climb the league standings each season",
                                ].map((tip) => (
                                    <li key={tip} className="flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 bg-primary mt-1.5 flex-shrink-0" />
                                        <span className="font-ui font-light text-sm text-on-secondary-container">
                                            {tip}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/market"
                                className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-on-surface cinematic-transition uppercase tracking-wider"
                            >
                                Go to Market →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyStudioPage;