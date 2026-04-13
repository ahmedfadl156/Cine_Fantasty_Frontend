"use client";

import {
    TrendingUp,
    TrendingDown,
    Film,
    Trophy,
    DollarSign,
    Activity,
} from "lucide-react";
import type { MyStudioOverview } from "@/services/movies/getMovies";

interface StudioStat {
    label: string;
    value: string;
    subValue?: string;
    icon: React.ElementType;
    trend?: "up" | "down" | "neutral";
    accent?: boolean;
}

interface StudioStatsProps {
    stats: StudioStat[];
    isLoading?: boolean;
}

const SkeletonTile = () => (
    <div className="flex flex-col gap-3 p-6 lg:p-8 bg-surface-container-low animate-pulse">
        <div className="flex items-center justify-between">
            <div className="h-2 w-20 bg-surface-bright" />
            <div className="w-4 h-4 bg-surface-bright rounded-sm" />
        </div>
        <div className="h-8 w-24 bg-surface-bright" />
        <div className="h-2 w-16 bg-surface-bright" />
    </div>
);

export const StudioStats = ({ stats, isLoading }: StudioStatsProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-on-secondary-container/10">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonTile key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-on-secondary-container/10">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const trendColor =
                    stat.trend === "up"
                        ? "text-[#4E9268]"
                        : stat.trend === "down"
                        ? "text-[#A85A3A]"
                        : "text-on-secondary-container";

                return (
                    <div
                        key={stat.label}
                        className={`flex flex-col gap-3 p-6 lg:p-8 cinematic-transition hover:bg-surface-container-high ${
                            stat.accent
                                ? "bg-primary/5 border-t-2 border-primary"
                                : "bg-surface-container-low"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-on-secondary-container">
                                {stat.label}
                            </span>
                            <Icon className="w-4 h-4 text-on-secondary-container/50" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span
                                className={`font-mono text-2xl lg:text-3xl font-medium ${
                                    stat.accent ? "text-primary" : "text-on-surface"
                                }`}
                            >
                                {stat.value}
                            </span>
                            {stat.subValue && (
                                <span className={`font-mono text-xs flex items-center gap-1 ${trendColor}`}>
                                    {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                                    {stat.trend === "down" && <TrendingDown className="w-3 h-3" />}
                                    {stat.subValue}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


const formatCompact = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);

export const buildStudioStats = (overview: MyStudioOverview, remainingCash?: number): StudioStat[] => [
    {
        label: "Total Assets",
        value: String(overview.totalFilmsOwned),
        subValue:
            overview.totalFilmsOwned === 1
                ? "1 film owned"
                : `${overview.totalFilmsOwned} films owned`,
        icon: Film,
        trend: "neutral",
    },
    {
        label: "Total Invested",
        value: formatCompact(overview.totalInvestedInDollars),
        subValue: "Capital deployed",
        icon: DollarSign,
        accent: true,
        trend: "neutral",
    },
    {
        label: "Remaining Cash",
        value: remainingCash !== undefined ? formatCompact(remainingCash) : "—",
        subValue: "Remaining Cash In Your Studio",
        icon: DollarSign,
        trend: "neutral",
    },
    {
        label: "Net P&L",
        value: "—",
        subValue: "Awaiting box office",
        icon: Activity,
        trend: "neutral",
    },
];


export const studioStatsPlaceholder: StudioStat[] = [
    { label: "Total Assets",   value: "—", icon: Film,       trend: "neutral" },
    { label: "Total Invested", value: "—", icon: DollarSign, accent: true, trend: "neutral" },
    { label: "Remaining Cash",    value: "—", icon: DollarSign,     trend: "neutral" },
    { label: "Net P&L",        value: "—", icon: Activity,   trend: "neutral" },
];
