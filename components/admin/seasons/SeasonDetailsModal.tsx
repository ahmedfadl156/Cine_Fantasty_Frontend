"use client";

import React, { useState, useEffect } from "react";
import { useCreateSeason, useUpdateSeasonDetails } from "@/hooks/admin/seasons/use-seasons";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SeasonDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    season?: any | null; 
}

export const SeasonDetailsModal = ({ isOpen, onClose, season }: SeasonDetailsModalProps) => {
    const isEdit = !!season;

    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        startingBudget: 100000000
    });

    const createMutation = useCreateSeason();
    const updateMutation = useUpdateSeasonDetails();

    useEffect(() => {
        if (season) {
            setFormData({
                name: season.name || "",
                startDate: season.startDate ? new Date(season.startDate).toISOString().split('T')[0] : "",
                endDate: season.endDate ? new Date(season.endDate).toISOString().split('T')[0] : "",
                startingBudget: season.startingBudget || 100000000
            });
        } else {
            setFormData({
                name: "",
                startDate: "",
                endDate: "",
                startingBudget: 400000000
            });
        }
    }, [season, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            updateMutation.mutate(
                { seasonId: season._id, details: formData },
                {
                    onSuccess: () => {
                        toast.success("Season details updated successfully!");
                        onClose();
                    },
                    onError: (err: any) => {
                        toast.error(err.message || "Failed to update season details");
                    }
                }
            );
        } else {
            createMutation.mutate(
                formData,
                {
                    onSuccess: () => {
                        toast.success("Season created successfully!");
                        onClose();
                    },
                    onError: (err: any) => {
                        toast.error(err.message || "Failed to create season");
                    }
                }
            );
        }
    };

    const isPending = isEdit ? updateMutation.isPending : createMutation.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-gray-900 to-black p-6 text-left align-middle shadow-2xl transition-all">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-400 opacity-70 transition-opacity hover:bg-white/10 hover:opacity-100"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-display font-medium text-white mb-6">
                    {isEdit ? "Edit Season Details" : "Create New Season"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Season Name</label>
                        <Input
                            required
                            type="text"
                            placeholder="e.g. Summer Blockbuster 2026"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                            <Input
                                required
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="bg-black/50 border-white/10 text-white focus:border-primary [color-scheme:dark]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                            <Input
                                required
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="bg-black/50 border-white/10 text-white focus:border-primary [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Starting Budget ($)</label>
                        <Input
                            required
                            type="number"
                            min="0"
                            step="1000000"
                            value={formData.startingBudget}
                            onChange={(e) => setFormData({ ...formData, startingBudget: Number(e.target.value) })}
                            className="bg-black/50 border-white/10 text-white focus:border-primary font-mono"
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-[0_0_15px_rgba(var(--primary),0.3)] min-w-[120px]"
                        >
                            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Season"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
