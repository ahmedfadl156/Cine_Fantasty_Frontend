"use client";

import { useState } from "react";
import { LeagueHero } from "@/components/league/LeagueHero";
import { LeagueBrowser } from "@/components/league/LeagueBrowser";
import { CreateLeagueModal } from "@/components/league/CreateLeagueModal";
import { Plus, Trophy, User } from "lucide-react";
import Link from "next/link";

const LeaguesPage = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <LeagueHero />

            {/* Main content */}
            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-14 pb-24">
                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 h-px bg-on-secondary-container/20 max-w-[40px]" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container flex items-center gap-1.5">
                                <Trophy className="w-3 h-3" />
                                Open Leagues
                            </span>
                        </div>
                        <h2 className="font-display font-bold italic text-on-surface text-3xl md:text-4xl leading-tight">
                            Find your competition.
                        </h2>
                        <p className="font-ui font-light text-on-secondary-container text-sm mt-2">
                            Browse public leagues or create your own private arena.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <Link
                            href="/leagues/my-leagues"
                            className="shrink-0 flex items-center gap-2 border font-bold border-on-secondary-container/60 text-on-secondary-container px-8 py-4 text-xs font-mono uppercase tracking-widest hover:border-primary/30 hover:text-primary cinematic-transition"
                        >
                            <User className="w-3.5 h-3.5" /> My Leagues
                        </Link>
                        <button
                            onClick={() => setIsCreateOpen(true)}
                            className="shrink-0 flex items-center gap-2 bg-primary text-on-surface px-8 py-4 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)]"
                        >
                            <Plus className="w-4 h-4" />
                            Create League
                        </button>
                    </div>
                </div>

                {/* League browser with search + filter */}
                <LeagueBrowser />
            </section>

            {/* Create League modal */}
            <CreateLeagueModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </div>
    );
};

export default LeaguesPage;
