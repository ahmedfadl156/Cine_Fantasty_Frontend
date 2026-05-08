"use client";

import { Clock, TrendingDown, TrendingUp } from "lucide-react";
import type { SortOption } from "@/services/transferMarket/transferMarket";

interface TransferMarketFiltersProps {
    sort: SortOption;
    onSortChange: (sort: SortOption) => void;
    totalItems: number;
    isPlaceholderData: boolean;
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ElementType }[] = [
    { value: "newest",        label: "Newest",        icon: Clock       },
    { value: "lowest_price",  label: "Lowest Price",  icon: TrendingDown },
    { value: "highest_price", label: "Highest Price", icon: TrendingUp  },
];

export const TransferMarketFilters = ({
    sort,
    onSortChange,
    totalItems,
    isPlaceholderData,
}: TransferMarketFiltersProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-outline/10">
            {/* Title + count */}
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-primary rounded-full" />
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-ui text-on-surface tracking-tight">
                        Transfer Market
                    </h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mt-0.5">
                        {isPlaceholderData ? "Loading…" : `${totalItems} active listing${totalItems !== 1 ? "s" : ""}`}
                    </p>
                </div>
            </div>

            {/* Sort controls */}
            <div
                role="group"
                aria-label="Sort listings"
                className="flex items-center gap-1 bg-surface-container-high p-0.5"
            >
                {SORT_OPTIONS.map(({ value, label, icon: Icon }) => {
                    const isActive = sort === value;
                    return (
                        <button
                            key={value}
                            id={`tm-sort-${value}`}
                            onClick={() => onSortChange(value)}
                            aria-pressed={isActive}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest cinematic-transition focus:outline-none focus:ring-1 focus:ring-primary ${
                                isActive
                                    ? "bg-primary text-on-surface shadow-sm"
                                    : "text-on-secondary-container hover:text-on-surface hover:bg-surface-bright"
                            }`}
                        >
                            <Icon className="w-3 h-3" />
                            <span className="hidden sm:inline">{label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
