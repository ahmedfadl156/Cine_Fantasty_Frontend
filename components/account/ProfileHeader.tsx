"use client";

import { Crown, Circle, CalendarDays, Wallet, TrendingUp } from "lucide-react";

interface ActiveSeason {
    seasonId: string;
    seasonName: string;
    startDate: string;
    endDate: string;
    status: string;
    currentStudio: {
        cashBalanceInDollars: number;
        netWorthInDollars: number;
        finalRank: number | null;
    };
}

interface ProfileHeaderProps {
    studioName: string;
    email: string;
    role: string;
    createdAt: string;
    lastLogin: string;
    activeSeason: ActiveSeason | null;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const getRoleBadge = (role: string) => {
    if (role === "admin")
        return { label: "Admin", color: "text-[#c8352a] border-[#c8352a]/40 bg-[#c8352a]/10" };
    return { label: "Member", color: "text-[#9c8e7e] border-[#9c8e7e]/40 bg-[#9c8e7e]/10" };
};

export const ProfileHeader = ({
    studioName,
    email,
    role,
    createdAt,
    lastLogin,
    activeSeason,
}: ProfileHeaderProps) => {
    const badge = getRoleBadge(role);
    const initial = (studioName || "U").charAt(0).toUpperCase();

    return (
        <div className="relative overflow-hidden bg-surface-container-low border border-[#5c554d]/30">
            {/* background grain */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8352a]/60 to-transparent" />

            <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#c8352a] to-[#8b2018] flex items-center justify-center border border-[#c8352a]/30 shadow-[0_0_40px_rgba(200,53,42,0.25)]">
                            <span className="font-display text-4xl md:text-5xl font-bold italic text-white">
                                {initial}
                            </span>
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4e9268] border-2 border-[#1f1b16] rounded-full flex items-center justify-center">
                            <Circle className="w-2 h-2 fill-[#4e9268] text-[#4e9268]" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="font-display text-3xl md:text-4xl font-bold italic text-[#eee4d4] leading-tight">
                                {studioName}
                            </h1>
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest border ${badge.color}`}
                            >
                                {role === "admin" && <Crown className="w-3 h-3" />}
                                {badge.label}
                            </span>
                        </div>
                        <p className="text-[#9c8e7e] font-mono text-sm mb-5">{email}</p>

                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            <div className="flex items-center gap-2 text-xs text-[#9c8e7e]">
                                <CalendarDays className="w-3.5 h-3.5 text-[#5c554d]" />
                                <span className="font-mono">
                                    Member since{" "}
                                    <span className="text-[#eee4d4]">{formatDate(createdAt)}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#9c8e7e]">
                                <Circle className="w-2.5 h-2.5 fill-[#4e9268] text-[#4e9268]" />
                                <span className="font-mono">
                                    Last login{" "}
                                    <span className="text-[#eee4d4]">{formatDate(lastLogin)}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Active Season Stats */}
                    {activeSeason && (
                        <div className="shrink-0 w-full md:w-auto">
                            <div className="bg-[#16130f] border border-[#5c554d]/30 p-5 min-w-[220px]">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4e9268] animate-pulse" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#4e9268]">
                                        Active Season
                                    </span>
                                </div>
                                <p className="font-display italic text-[#eee4d4] text-lg font-bold mb-4 leading-snug">
                                    {activeSeason.seasonName}
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Wallet className="w-3.5 h-3.5 text-[#9c8e7e]" />
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9c8e7e]">
                                                Cash
                                            </span>
                                        </div>
                                        <span className="font-mono text-sm text-[#eee4d4]">
                                            {formatCurrency(activeSeason.currentStudio.cashBalanceInDollars)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5 text-[#9c8e7e]" />
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9c8e7e]">
                                                Net Worth
                                            </span>
                                        </div>
                                        <span className="font-mono text-sm text-[#c8352a] font-bold">
                                            {formatCurrency(activeSeason.currentStudio.netWorthInDollars)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
