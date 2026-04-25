"use client";

import React, { useState, useEffect } from "react";
import { useUpdateMovieAdmin } from "@/hooks/admin/market/use-market";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MovieEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    movie: any | null;
}

export const MovieEditModal = ({ isOpen, onClose, movie }: MovieEditModalProps) => {

    const [formData, setFormData] = useState({
        status: "",
        releaseDate: "",
        basePriceInDollars: 0,
        boxOfficePriceInDollars: 0
    });

    const updateMutation = useUpdateMovieAdmin();

    useEffect(() => {
        if (movie) {
            setFormData({
                status: movie.status || "",
                releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().split('T')[0] : "",
                basePriceInDollars: movie.basePrice ? movie.basePrice : 0,
                boxOfficePriceInDollars: movie.boxOfficeRevenue ? movie.boxOfficeRevenue : 0
            });
        }
    }, [movie, isOpen]);

    if (!isOpen || !movie) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        updateMutation.mutate(
            {
                movieId: movie._id,
                updates: formData
            },
            {
                onSuccess: () => {
                    toast.success(`Movie ${movie.title} updated successfully!`);
                    onClose();
                },
                onError: (err: any) => {
                    toast.error(err.message || "Failed to update movie");
                }
            }
        );
    };

    const isPending = updateMutation.isPending;

    return (
        <div className="fixed h-screen w-full inset-0 z-50 flex justify-center items-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-gray-900 to-black p-6 text-left align-middle shadow-2xl transition-all">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-400 opacity-70 transition-opacity hover:bg-white/10 hover:opacity-100"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-display font-medium text-white mb-2">
                    Edit Movie Details
                </h3>
                <p className="text-sm text-gray-400 mb-6 font-ui">
                    Target adjustments for <strong className="text-white">{movie.title}</strong>
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                            <select
                                required
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full appearance-none bg-black/50 border border-white/10 text-white focus:border-primary rounded-md px-3 py-2 text-sm outline-none cursor-pointer"
                            >
                                <option value="UPCOMING">Upcoming</option>
                                <option value="IN_THEATERS">In Theaters</option>
                                <option value="FINISHED">Finished</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Release Date</label>
                            <Input
                                required
                                type="date"
                                value={formData.releaseDate}
                                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                                className="bg-black/50 border-white/10 text-white focus:border-primary scheme-dark"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Base Price ($)</label>
                            <Input
                                required
                                type="number"
                                min="0"
                                value={formData.basePriceInDollars}
                                onChange={(e) => setFormData({ ...formData, basePriceInDollars: Number(e.target.value) })}
                                className="bg-black/50 border-white/10 text-white focus:border-primary font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Box Office Rev. ($)</label>
                            <Input
                                required
                                type="number"
                                min="0"
                                value={formData.boxOfficePriceInDollars}
                                onChange={(e) => setFormData({ ...formData, boxOfficePriceInDollars: Number(e.target.value) })}
                                className="bg-black/50 border-white/10 text-emerald-400 focus:border-primary font-mono shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]"
                            />
                        </div>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-md mt-2">
                        <p className="text-xs text-orange-400">
                            <strong>Note:</strong> Modifying the Box Office Revenue will automatically trigger the net worth recalculation for this movie's season!
                        </p>
                    </div>

                    <div className="mt-8 flex justify-end gap-3 pt-2">
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
                            {isPending ? "Updating..." : "Save Movie"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
