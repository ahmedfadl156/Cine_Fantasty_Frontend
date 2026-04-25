"use client";

import React, { useState, useEffect } from "react";
import { useApplyStreamingRevenue } from "@/hooks/admin/market/use-market";
import { X, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StreamingRevenueModalProps {
    isOpen: boolean;
    onClose: () => void;
    movie: any | null;
}

export const StreamingRevenueModal = ({ isOpen, onClose, movie }: StreamingRevenueModalProps) => {

    const [formData, setFormData] = useState<{
        manualRating: number | "";
        manualVotes: number | "";
    }>({
        manualRating: "",
        manualVotes: "",
    });

    const applyMutation = useApplyStreamingRevenue();

    useEffect(() => {
        if (isOpen) {
            setFormData({
                manualRating: "",
                manualVotes: "",
            });
        }
    }, [isOpen]);

    if (!isOpen || !movie) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const info: { manualRating?: number, manualVotes?: number } = {};
        if (formData.manualRating !== "") info.manualRating = Number(formData.manualRating);
        if (formData.manualVotes !== "") info.manualVotes = Number(formData.manualVotes);

        applyMutation.mutate(
            {
                movieId: movie._id,
                info
            },
            {
                onSuccess: () => {
                    toast.success(`Streaming revenue applied to ${movie.title}!`);
                    onClose();
                },
                onError: (err: any) => {
                    toast.error(err.message || "Failed to apply streaming revenue");
                }
            }
        );
    };

    const isPending = applyMutation.isPending;

    return (
        <div className="fixed h-screen w-full inset-0 z-50 flex justify-center items-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-gray-900 to-black p-6 text-left align-middle shadow-2xl transition-all">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-400 opacity-70 transition-opacity hover:bg-white/10 hover:opacity-100"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                    <PlayCircle className="text-primary w-6 h-6" />
                    <h3 className="text-xl font-display font-medium text-white">
                        Apply Streaming Revenue
                    </h3>
                </div>
                
                <p className="text-sm text-gray-400 mb-6 font-ui">
                    Add streaming revenue for <strong className="text-white">{movie.title}</strong>. Optionally set manual rating and votes.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Manual Rating (Optional)</label>
                            <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                placeholder="e.g. 8.5"
                                value={formData.manualRating}
                                onChange={(e) => setFormData({ ...formData, manualRating: e.target.value ? Number(e.target.value) : "" })}
                                className="bg-black/50 border-white/10 text-white focus:border-primary font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Manual Votes (Optional)</label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="e.g. 1500"
                                value={formData.manualVotes}
                                onChange={(e) => setFormData({ ...formData, manualVotes: e.target.value ? Number(e.target.value) : "" })}
                                className="bg-black/50 border-white/10 text-white focus:border-primary font-mono"
                            />
                        </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 p-3 rounded-md mt-2">
                        <p className="text-xs text-primary/80">
                            <strong>Note:</strong> Applying streaming revenue will trigger recalculation of the movie's total earnings.
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
                            {isPending ? "Applying..." : "Apply Revenue"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
