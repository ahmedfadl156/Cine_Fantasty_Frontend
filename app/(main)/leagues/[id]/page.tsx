"use client";

import {
    Trophy,
    Users,
    Crown,
    Medal,
    Globe,
    Lock,
    Calendar,
    TrendingUp,
    TrendingDown,
    Film,
    Settings,
    ChevronLeft,
    Activity,
    DollarSign,
} from "lucide-react";
import Link from "next/link";

const MOCK_LEAGUE = {
    id: "LG-001",
    name: "Blockbuster Dynasty",
    commissioner: "Reel Kings Studio",
    memberCount: 7,
    maxPlayers: 10,
    privacy: "public" as const,
    status: "in-season" as const,
    seasonNumber: 1,
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    description:
        "A high-stakes competition for the most ambitious studio executives. Draft wisely, track the box office, and claim the throne.",
};

const MOCK_STANDINGS = [
    { rank: 1, studioName: "Reel Kings Studio",  portfolioValue: 48_200_000, netPnl:  6_800_000, films: 5, isCurrentUser: false },
    { rank: 2, studioName: "Auteur House",        portfolioValue: 42_500_000, netPnl:  3_200_000, films: 4, isCurrentUser: true  },
    { rank: 3, studioName: "Cinematic Vault",     portfolioValue: 39_100_000, netPnl:  1_900_000, films: 6, isCurrentUser: false },
    { rank: 4, studioName: "Dream Factory",       portfolioValue: 35_700_000, netPnl: -400_000,   films: 3, isCurrentUser: false },
    { rank: 5, studioName: "Epic Productions",    portfolioValue: 31_200_000, netPnl: -1_800_000, films: 4, isCurrentUser: false },
    { rank: 6, studioName: "Summit Pictures LLC", portfolioValue: 28_400_000, netPnl: -2_100_000, films: 3, isCurrentUser: false },
    { rank: 7, studioName: "Apex Frame Studio",   portfolioValue: 24_700_000, netPnl: -3_500_000, films: 5, isCurrentUser: false },
];

const MOCK_ACTIVITY = [
    { id: 1, studio: "Reel Kings Studio", action: "drafted", film: "Dune: Awakening", date: "2026-04-11", value: 4_200_000 },
    { id: 2, studio: "Auteur House",      action: "drafted", film: "Blade Runner 3",  date: "2026-04-10", value: 3_800_000 },
    { id: 3, studio: "Cinematic Vault",   action: "archived", film: "Optica",         date: "2026-04-09", value: 2_100_000 },
    { id: 4, studio: "Dream Factory",     action: "drafted", film: "Titan Rising",    date: "2026-04-08", value: 1_600_000 },
    { id: 5, studio: "Epic Productions",  action: "drafted", film: "Meridian",        date: "2026-04-07", value: 2_900_000 },
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(Math.abs(value));

const rankMedal = (rank: number) => {
    if (rank === 1) return <Medal className="w-4 h-4 text-[#D4AF37]" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-[#9C8E7E]" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-[#A85A3A]" />;
    return (
        <span className="font-mono text-xs text-on-secondary-container/50 w-4 text-center">
            {rank}
        </span>
    );
};

const SectionDivider = ({ label }: { label: string }) => (
    <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-on-secondary-container/15" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">
            {label}
        </span>
        <div className="flex-1 h-px bg-on-secondary-container/15" />
    </div>
);

const StatTile = ({
    label,
    value,
    icon: Icon,
    accent,
}: {
    label: string;
    value: string;
    icon: React.ElementType;
    accent?: boolean;
}) => (
    <div
        className={`flex flex-col gap-2 p-5 lg:p-6 ${
            accent ? "bg-primary/8 border-t-2 border-primary" : "bg-surface-container-low"
        }`}
    >
        <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">
                {label}
            </span>
            <Icon className="w-4 h-4 text-on-secondary-container/40" />
        </div>
        <span className={`font-mono text-2xl ${accent ? "text-primary" : "text-on-surface"}`}>
            {value}
        </span>
    </div>
);

const LeagueDetailPage = () => {
    const league = MOCK_LEAGUE;

    const daysRemaining = Math.max(
        0,
        Math.ceil(
            (new Date(league.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
    );

    const myEntry = MOCK_STANDINGS.find((e) => e.isCurrentUser);

    return (
        <div className="bg-background min-h-screen">
            {/* ── League Banner ── */}
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
                                        In Season
                                    </span>
                                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50">
                                        {league.privacy === "private" ? (
                                            <><Lock className="w-2.5 h-2.5" /> Private</>
                                        ) : (
                                            <><Globe className="w-2.5 h-2.5" /> Public</>
                                        )}
                                    </span>
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50">
                                        Season {String(league.seasonNumber).padStart(2, "0")}
                                    </span>
                                </div>

                                <h1 className="font-display font-bold italic text-on-surface text-4xl md:text-5xl leading-none">
                                    {league.name}
                                </h1>

                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <Crown className="w-3 h-3 text-on-secondary-container/40" />
                                    <span className="font-mono text-xs text-on-secondary-container uppercase tracking-wider">
                                        {league.commissioner}
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
                            <button className="flex items-center gap-2 border border-on-secondary-container/25 text-on-secondary-container px-5 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:border-on-surface/50 hover:text-on-surface cinematic-transition">
                                <Settings className="w-3.5 h-3.5" />
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-on-secondary-container/10">
                    <StatTile
                        label="Studios"
                        value={`${league.memberCount} / ${league.maxPlayers}`}
                        icon={Users}
                    />
                    <StatTile
                        label="Days Remaining"
                        value={daysRemaining === 0 ? "Final Day" : `${daysRemaining}d`}
                        icon={Calendar}
                        accent
                    />
                    <StatTile
                        label="Your Rank"
                        value={myEntry ? `#${myEntry.rank}` : "—"}
                        icon={Activity}
                    />
                    <StatTile
                        label="Your Portfolio"
                        value={myEntry ? formatCurrency(myEntry.portfolioValue) : "—"}
                        icon={DollarSign}
                    />
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pb-24">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* ── Standings ── */}
                    <div className="xl:col-span-7">
                        <SectionDivider label="Standings" />

                        <div className="bg-surface-container-low">
                            {/* Column headers */}
                            <div className="grid grid-cols-[28px_1fr_80px_80px_50px] items-center gap-4 px-6 py-3 border-b border-on-secondary-container/10">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">#</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">Studio</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Value</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Net P&L</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40 text-right">Films</span>
                            </div>

                            <div className="flex flex-col divide-y divide-on-secondary-container/5">
                                {MOCK_STANDINGS.map((entry) => (
                                    <div
                                        key={entry.rank}
                                        className={`grid grid-cols-[28px_1fr_80px_80px_50px] items-center gap-4 px-6 py-4 cinematic-transition ${
                                            entry.isCurrentUser
                                                ? "bg-primary/8 border-l-2 border-primary"
                                                : "hover:bg-surface-container-high border-l-2 border-transparent"
                                        }`}
                                    >
                                        <div className="flex-shrink-0">{rankMedal(entry.rank)}</div>

                                        <div className="min-w-0">
                                            <p
                                                className={`font-ui font-medium text-sm truncate ${
                                                    entry.isCurrentUser ? "text-primary" : "text-on-surface"
                                                }`}
                                            >
                                                {entry.studioName}
                                                {entry.isCurrentUser && (
                                                    <span className="ml-2 font-mono text-[9px] text-primary/70 uppercase tracking-wider">
                                                        you
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <span className="font-mono text-xs text-on-surface text-right">
                                            {formatCurrency(entry.portfolioValue)}
                                        </span>

                                        <span
                                            className={`font-mono text-xs text-right flex items-center justify-end gap-0.5 ${
                                                entry.netPnl >= 0 ? "text-[#4E9268]" : "text-[#A85A3A]"
                                            }`}
                                        >
                                            {entry.netPnl >= 0 ? (
                                                <TrendingUp className="w-3 h-3" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3" />
                                            )}
                                            {entry.netPnl >= 0 ? "+" : "-"}
                                            {formatCurrency(entry.netPnl)}
                                        </span>

                                        <div className="flex items-center justify-end gap-1">
                                            <Film className="w-3 h-3 text-on-secondary-container/40" />
                                            <span className="font-mono text-xs text-on-secondary-container">
                                                {entry.films}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right Sidebar ── */}
                    <div className="xl:col-span-5 flex flex-col gap-8">
                        {/* About */}
                        <div>
                            <SectionDivider label="About" />
                            <div className="bg-surface-container-low p-6 border-l-2 border-primary/20">
                                <p className="font-display font-bold italic text-on-surface text-xl leading-snug mb-4">
                                    {league.name}
                                </p>
                                <p className="font-ui font-light text-sm text-on-secondary-container leading-relaxed mb-5">
                                    {league.description}
                                </p>
                                <div className="flex flex-col gap-2.5">
                                    {[
                                        {
                                            label: "Season Start",
                                            value: new Date(league.startDate).toLocaleDateString("en-US", {
                                                year: "numeric", month: "long", day: "numeric",
                                            }),
                                        },
                                        {
                                            label: "Season End",
                                            value: new Date(league.endDate).toLocaleDateString("en-US", {
                                                year: "numeric", month: "long", day: "numeric",
                                            }),
                                        },
                                        { label: "League ID", value: league.id },
                                        { label: "Commissioner", value: league.commissioner },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between gap-4">
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container/50 whitespace-nowrap">
                                                {label}
                                            </span>
                                            <span className="font-mono text-xs text-on-surface text-right">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <SectionDivider label="Recent Activity" />
                            <div className="bg-surface-container-low flex flex-col divide-y divide-on-secondary-container/5">
                                {MOCK_ACTIVITY.map((event) => (
                                    <div key={event.id} className="flex items-start gap-4 px-5 py-4 hover:bg-surface-container-high cinematic-transition">
                                        <div className="flex-shrink-0 w-7 h-7 bg-surface-container-high flex items-center justify-center mt-0.5">
                                            <Film className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-ui font-medium text-sm text-on-surface leading-tight">
                                                <span className="text-primary">{event.studio}</span>
                                                {" "}
                                                <span className="text-on-secondary-container font-light">
                                                    {event.action}
                                                </span>
                                                {" "}
                                                <span className="italic">{event.film}</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-mono text-[10px] text-on-secondary-container/50 uppercase tracking-wider">
                                                    {new Date(event.date).toLocaleDateString("en-US", {
                                                        month: "short", day: "numeric",
                                                    })}
                                                </span>
                                                <span className="font-mono text-[10px] text-[#4E9268]">
                                                    +{formatCurrency(event.value)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Capacity gauge */}
                        <div>
                            <SectionDivider label="Roster" />
                            <div className="bg-surface-container-low p-6">
                                <div className="flex justify-between mb-3">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                                        Studios Enrolled
                                    </span>
                                    <span className="font-mono text-sm text-on-surface">
                                        {league.memberCount}
                                        <span className="text-on-secondary-container/50">/{league.maxPlayers}</span>
                                    </span>
                                </div>
                                <div className="h-1.5 bg-on-secondary-container/10 mb-4">
                                    <div
                                        className="h-full bg-primary cinematic-transition"
                                        style={{
                                            width: `${Math.round((league.memberCount / league.maxPlayers) * 100)}%`,
                                        }}
                                    />
                                </div>

                                {/* Member dots */}
                                <div className="flex flex-wrap gap-2">
                                    {MOCK_STANDINGS.map((entry) => (
                                        <div
                                            key={entry.rank}
                                            title={entry.studioName}
                                            className={`flex items-center justify-center w-8 h-8 font-display font-bold italic text-sm cinematic-transition cursor-default ${
                                                entry.isCurrentUser
                                                    ? "bg-primary text-on-surface"
                                                    : "bg-surface-container-high text-on-surface hover:bg-surface-bright"
                                            }`}
                                        >
                                            {entry.studioName.charAt(0).toUpperCase()}
                                        </div>
                                    ))}
                                    {Array.from({ length: league.maxPlayers - league.memberCount }).map((_, i) => (
                                        <div
                                            key={`empty-${i}`}
                                            className="w-8 h-8 border border-on-secondary-container/15 border-dashed"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LeagueDetailPage;
