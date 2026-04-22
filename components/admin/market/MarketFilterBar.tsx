"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllSeasons } from "@/hooks/admin/seasons/use-seasons";

interface MarketFilterBarProps {
    filters: {
        search: string;
        status: string;
        seasonId: string;
    };
    setFilters: (filters: any) => void;
}

export const MarketFilterBar = ({ filters, setFilters }: MarketFilterBarProps) => {
    const { data: seasonsResponse } = useGetAllSeasons();
    const seasonsList = seasonsResponse?.data || seasonsResponse || [];
    const seasons = Array.isArray(seasonsList) ? seasonsList : (seasonsList.seasons || []);

    const [localSearch, setLocalSearch] = useState(filters.search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters((prev: any) => ({ ...prev, search: localSearch }));
        }, 500);
        return () => clearTimeout(handler);
    }, [localSearch, setFilters]);

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5 mb-6 shadow-xl">
            {/* Search */}
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                    placeholder="Search movies by title..."
                    className="pl-10 bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary w-full"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                />
                {localSearch && (
                    <button
                        onClick={() => setLocalSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48 relative">
                <select
                    value={filters.status}
                    onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e.target.value, page: 1 }))}
                    className="w-full appearance-none bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary rounded-md px-3 py-2 text-sm outline-none cursor-pointer"
                >
                    <option value="">All Statuses</option>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="IN_THEATERS">In Theaters</option>
                    <option value="FINISHED">Finished</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>

            {/* Season Filter */}
            <div className="w-full md:w-56 relative">
                <select
                    value={filters.seasonId}
                    onChange={(e) => setFilters((prev: any) => ({ ...prev, seasonId: e.target.value, page: 1 }))}
                    className="w-full appearance-none bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary rounded-md px-3 py-2 text-sm outline-none cursor-pointer"
                >
                    <option value="">All Seasons</option>
                    {seasons.map((s: any) => (
                        <option key={s._id} value={s._id}>
                            {s.name}
                        </option>
                    ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
        </div>
    );
};
