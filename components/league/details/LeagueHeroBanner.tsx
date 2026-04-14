import { Trophy, Globe, Lock, Crown, ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import { LeagueDetails } from "@/services/leagues/leagues";

interface LeagueHeroBannerProps {
    league: LeagueDetails;
}

export const LeagueHeroBanner = ({ league }: LeagueHeroBannerProps) => {
    return (
        <section className="relative overflow-hidden bg-surface-container-lowest border-b border-on-secondary-container/10">
            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(90deg,#EEE4D4 0px,#EEE4D4 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,#EEE4D4 0px,#EEE4D4 1px,transparent 1px,transparent 80px)",
                }}
            />
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-primary/5 rotate-12 pointer-events-none" />

            <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
                {/* Back link */}
                <Link
                    href="/leagues"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-on-secondary-container hover:text-primary cinematic-transition mb-8"
                >
                    <ChevronLeft className="w-3 h-3" /> All Leagues
                </Link>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    {/* Identity */}
                    <div className="flex items-end gap-6">
                        {/* Icon block */}
                        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Trophy className="w-7 h-7 md:w-9 md:h-9 text-primary" />
                        </div>

                        <div className="flex flex-col gap-1.5 pb-1">
                            {/* badges row */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-primary">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    {league.seasonInfo.status === "ACTIVE" ? "In Season" : league.seasonInfo.status}
                                </span>
                                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50">
                                    {!league.isPublic ? (
                                        <><Lock className="w-2.5 h-2.5" /> Private</>
                                    ) : (
                                        <><Globe className="w-2.5 h-2.5" /> Public</>
                                    )}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50">
                                    Season: {league.seasonInfo.name}
                                </span>
                            </div>

                            <h1 className="font-display font-bold italic text-on-surface text-4xl md:text-5xl leading-none">
                                {league.name}
                            </h1>

                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Crown className="w-3 h-3 text-on-secondary-container/40" />
                                <span className="font-mono text-xs text-on-secondary-container uppercase tracking-wider">
                                    {league.ownerName}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-primary text-on-surface px-5 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)]">
                            <Trophy className="w-3.5 h-3.5" />
                            View My Stats
                        </button>
                        {league.role === "OWNER" && (
                            <button className="flex items-center gap-2 border border-on-secondary-container/25 text-on-secondary-container px-5 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:border-on-surface/50 hover:text-on-surface cinematic-transition">
                                <Settings className="w-3.5 h-3.5" />
                                Settings
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
