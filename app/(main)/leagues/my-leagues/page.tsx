"use client";

import { useState } from "react";
import { Trophy, Globe, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MyLeaguesView } from "@/components/league/MyLeaguesView";
import { CreateLeagueModal } from "@/components/league/CreateLeagueModal";
import { JoinLeagueModal } from "@/components/league/JoinLeagueModal";

const MyLeaguesPage = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isJoinOpen, setIsJoinOpen] = useState(false);

    return (
        <div className="bg-background min-h-screen">
            {/* ── Page Hero ── */}
            <section className="relative overflow-hidden bg-surface-container-lowest border-b border-on-secondary-container/10">
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, #EEE4D4 0px, #EEE4D4 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #EEE4D4 0px, #EEE4D4 1px, transparent 1px, transparent 80px)",
                    }}
                />
                {/* Accent shapes */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rotate-12 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/3 -rotate-12 pointer-events-none" />

                <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-18">
                    {/* Back nav */}
                    <Link
                        href="/leagues"
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-on-secondary-container hover:text-primary cinematic-transition mb-8"
                    >
                        <ArrowLeft className="w-3 h-3" /> All Leagues
                    </Link>

                    <div className="max-w-3xl">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-8 h-px bg-[#D4AF37]" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                                Your Arena
                            </span>
                        </div>

                        <h1 className="font-display font-bold italic text-on-surface text-5xl md:text-6xl leading-[0.9] mb-5">
                            My <span className="text-primary">Leagues</span>.
                        </h1>

                        <p className="font-ui font-light text-on-secondary-container text-base md:text-lg leading-relaxed max-w-xl mb-10">
                            Manage the leagues you&apos;ve built from the ground up and track your standing
                            in every arena you&apos;ve entered.
                        </p>

                        {/* Action row */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                id="my-leagues-create-btn"
                                onClick={() => setIsCreateOpen(true)}
                                className="flex items-center gap-2 bg-primary text-on-surface px-6 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)]"
                            >
                                <Plus className="w-4 h-4" /> Create League
                            </button>
                            <button
                                onClick={() => setIsJoinOpen(true)}
                                className="flex items-center gap-2 border border-on-secondary-container/20 text-on-secondary-container px-6 py-3 text-xs font-mono uppercase tracking-widest hover:border-primary/30 hover:text-primary cinematic-transition"
                            >
                                <Plus className="w-3.5 h-3.5" /> Join League
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main content ── */}
            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-14 pb-24">
                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 h-px bg-on-secondary-container/20 max-w-[40px]" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container flex items-center gap-1.5">
                                <Trophy className="w-3 h-3" /> League Dashboard
                            </span>
                        </div>
                        <h2 className="font-display font-bold italic text-on-surface text-3xl md:text-4xl leading-tight">
                            Your competitive history.
                        </h2>
                        <p className="font-ui font-light text-on-secondary-container text-sm mt-2">
                            Leagues you own and competitions you&apos;ve joined — all in one place.
                        </p>
                    </div>
                </div>

                <MyLeaguesView onCreateOpen={() => setIsCreateOpen(true)} />
            </section>

            {/* Create League Modal */}
            <CreateLeagueModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />

            {/* Join Private League Modal */}
            <JoinLeagueModal
                isOpen={isJoinOpen}
                onClose={() => setIsJoinOpen(false)}
                requiresCode={true}
            />
        </div>
    );
};

export default MyLeaguesPage;
