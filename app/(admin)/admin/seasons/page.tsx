"use client";

import React, { useState } from "react";
import { Plus, Calendar, Edit2, Popcorn } from "lucide-react";
import { useGetAllSeasons } from "@/hooks/admin/seasons/use-seasons";
import { SeasonStatusToggle } from "@/components/admin/seasons/SeasonStatusToggle";
import { SeasonDetailsModal } from "@/components/admin/seasons/SeasonDetailsModal";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const SeasonsDashboardPage = () => {
    const { data: responseData, isLoading, isError } = useGetAllSeasons();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<any>(null);

    const handleCreateNew = () => {
        setSelectedSeason(null);
        setIsModalOpen(true);
    };

    const handleEdit = (season: any) => {
        setSelectedSeason(season);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-red-500/20 bg-red-500/5 rounded-xl">
                <p className="text-red-400 font-medium">Failed to load seasons.</p>
            </div>
        );
    }

    const seasons = responseData?.data || responseData || [];
    const seasonsList = Array.isArray(seasons) ? seasons : (seasons.seasons || []);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white flex items-center gap-3">
                        <Popcorn className="text-primary w-8 h-8" />
                        Seasons Management
                    </h1>
                    <p className="text-sm text-gray-400 mt-1 font-ui">
                        Manage active periods, configure budgets, and oversee seasonal leagues.
                    </p>
                </div>
                <Button
                    onClick={handleCreateNew}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Season
                </Button>
            </div>

            {/* Seasons List */}
            {seasonsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-white/10 rounded-xl bg-black/20 backdrop-blur-sm">
                    <Calendar className="w-12 h-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-display font-medium text-gray-300">No Seasons Found</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-md">
                        There are currently no seasons configured in the system. Create a new season to allow users to participate in leagues.
                    </p>
                    <Button
                        onClick={handleCreateNew}
                        variant="outline"
                        className="mt-6 border-white/10 hover:bg-white/5"
                    >
                        Create First Season
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
                    {seasonsList.map((season: any) => (
                        <div
                            key={season._id}
                            className="group relative flex flex-col rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-5 backdrop-blur-md transition-all hover:border-primary/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-primary/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-display font-medium text-white group-hover:text-primary transition-colors line-clamp-1">
                                    {season.name}
                                </h3>
                                <SeasonStatusToggle season={season} />
                            </div>

                            <div className="space-y-3 mb-6 flex-1">
                                <div className="flex items-center text-sm">
                                    <span className="text-gray-500 w-24">Start</span>
                                    <span className="text-gray-300 font-mono text-xs bg-black/40 px-2 py-1 rounded">
                                        {season.startDate ? format(new Date(season.startDate), "MMM dd, yyyy") : "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="text-gray-500 w-24">End</span>
                                    <span className="text-gray-300 font-mono text-xs bg-black/40 px-2 py-1 rounded">
                                        {season.endDate ? format(new Date(season.endDate), "MMM dd, yyyy") : "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="text-gray-500 w-24">Budget</span>
                                    <span className="text-primary font-mono font-medium drop-shadow-[0_0_8px_rgba(var(--primary),0.3)]">
                                        ${(season.startingBudget || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto border-t border-white/5 pt-4">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-center text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-2"
                                    onClick={() => handleEdit(season)}
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    Edit Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <SeasonDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                season={selectedSeason}
            />
        </div>
    );
};

export default SeasonsDashboardPage;
