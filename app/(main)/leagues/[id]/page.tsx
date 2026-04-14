"use client";

import { useParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { useGetLeagueDetails, useGetLeagueLeaderboard } from "@/hooks/leagues/useLeagues";

import { LeagueHeroBanner } from "@/components/league/details/LeagueHeroBanner";
import { LeagueStatsBar } from "@/components/league/details/LeagueStatsBar";
import { LeagueStandingsTable } from "@/components/league/details/LeagueStandingsTable";
import { LeagueAboutCard } from "@/components/league/details/LeagueAboutCard";
import { LeagueActivityFeed } from "@/components/league/details/LeagueActivityFeed";
import { LeagueRosterCard } from "@/components/league/details/LeagueRosterCard";
import { SectionDivider } from "@/components/league/details/SectionDivider";

const LeagueDetailPage = () => {
    const params = useParams();
    const leagueId = params.id as string;

    const {
        data: league,
        isLoading: isLeagueLoading,
        isError: isLeagueError,
        error: leagueError,
    } = useGetLeagueDetails(leagueId);

    const {
        data: leaderboardData,
        isLoading: isLeaderboardLoading,
        isError: isLeaderboardError,
    } = useGetLeagueLeaderboard(leagueId);

    if (isLeagueLoading) {
        return (
            <div className="flex flex-col px-4 py-8 items-center justify-center min-h-[70vh]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isLeagueError || !league) {
        return (
            <div className="flex flex-col px-4 py-8 items-center justify-center min-h-[70vh]">
                <div className="flex items-center gap-3 p-4 bg-[#A85A3A]/10 border border-[#A85A3A]/30 mb-4">
                    <AlertCircle className="w-5 h-5 text-[#A85A3A] flex-shrink-0" />
                    <p className="font-mono text-sm text-[#A85A3A]">
                        {leagueError instanceof Error ? leagueError.message : "Failed to load league details. It might not exist."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">
            <LeagueHeroBanner league={league} />
            <LeagueStatsBar league={league} leaderboardData={leaderboardData} />

            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pb-24">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Standings */}
                    <div className="xl:col-span-7">
                        <SectionDivider label="Standings" />
                        {isLeaderboardLoading ? (
                            <div className="flex items-center justify-center p-12 bg-surface-container-low">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                        ) : isLeaderboardError ? (
                            <div className="p-6 bg-surface-container-low text-on-secondary-container text-sm font-mono text-center border border-on-secondary-container/10">
                                Failed to load leaderboard.
                            </div>
                        ) : (
                            <LeagueStandingsTable leaderboardData={leaderboardData} />
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="xl:col-span-5 flex flex-col gap-8">
                        <LeagueAboutCard league={league} />
                        <LeagueActivityFeed />
                        <LeagueRosterCard league={league} leaderboardData={leaderboardData} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LeagueDetailPage;
