"use client";

import { CalendarDays, Clock, Hash, Trophy, Wallet, TrendingUp, Film } from "lucide-react";

interface AccountMetaProps {
    userId: string;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    activeSeason: {
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
    } | null;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const formatDateRange = (start: string, end: string) =>
    `${formatDate(start)} — ${formatDate(end)}`;

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);

const MetaRow = ({
    icon: Icon,
    label,
    value,
    mono = true,
    accent = false,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    mono?: boolean;
    accent?: boolean;
}) => (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-[#5c554d]/15 last:border-0">
        <div className="flex items-center gap-2.5 min-w-0">
            <Icon className="w-3.5 h-3.5 text-[#5c554d] shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e] shrink-0">
                {label}
            </span>
        </div>
        <span
            className={`text-xs truncate text-right ${mono ? "font-mono" : ""} ${
                accent ? "text-[#c8352a] font-bold" : "text-[#eee4d4]"
            }`}
        >
            {value}
        </span>
    </div>
);

export const AccountMeta = ({
    userId,
    createdAt,
    updatedAt,
    lastLogin,
    activeSeason,
}: AccountMetaProps) => {
    return (
        <div className="space-y-4">
            {/* Account Info Card */}
            <div className="bg-surface-container-low border border-[#5c554d]/30 p-6">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-px h-4 bg-[#c8352a]" />
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e]">
                        Account Details
                    </h3>
                </div>
                <div>
                    <MetaRow
                        icon={Hash}
                        label="User ID"
                        value={`${userId.slice(0, 8)}…`}
                    />
                    <MetaRow icon={CalendarDays} label="Member Since" value={formatDate(createdAt)} />
                    <MetaRow icon={Clock} label="Last Updated" value={formatDate(updatedAt)} />
                    <MetaRow icon={Clock} label="Last Login" value={formatDate(lastLogin)} />
                </div>
            </div>

            {/* Active Season Card */}
            {activeSeason && (
                <div className="bg-surface-container-low border border-[#5c554d]/30 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-px h-4 bg-[#c8352a]" />
                            <h3 className="text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e]">
                                Active Season
                            </h3>
                        </div>
                        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#4e9268]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4e9268] animate-pulse" />
                            {activeSeason.status}
                        </span>
                    </div>

                    <p className="font-display italic font-bold text-[#eee4d4] text-base mb-4 leading-snug">
                        {activeSeason.seasonName}
                    </p>

                    <div>
                        <MetaRow
                            icon={CalendarDays}
                            label="Season Period"
                            value={formatDateRange(activeSeason.startDate, activeSeason.endDate)}
                        />
                        <MetaRow
                            icon={Wallet}
                            label="Cash Balance"
                            value={formatCurrency(activeSeason.currentStudio.cashBalanceInDollars)}
                        />
                        <MetaRow
                            icon={TrendingUp}
                            label="Net Worth"
                            value={formatCurrency(activeSeason.currentStudio.netWorthInDollars)}
                            accent
                        />
                        <MetaRow
                            icon={Trophy}
                            label="Current Rank"
                            value={
                                activeSeason.currentStudio.finalRank
                                    ? `#${activeSeason.currentStudio.finalRank}`
                                    : "Unranked"
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
