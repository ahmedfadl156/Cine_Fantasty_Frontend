"use client";

import { useState } from "react";
import { X, Trophy, Lock, Globe } from "lucide-react";
import { useCreateLeague } from "@/hooks/leagues/useLeagues";

interface CreateLeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: { name: string; isPublic: boolean }) => void;
}

export const CreateLeagueModal = ({ isOpen, onClose, onSubmit }: CreateLeagueModalProps) => {
    const [leagueName, setLeagueName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const {mutate: createLeague , isPending , isError} = useCreateLeague();

    const handleSubmit = () => {
        createLeague(
            { name: leagueName, isPublic },
            {
                onSuccess: () => {
                    if (onSubmit) {
                        onSubmit({ name: leagueName, isPublic });
                    }
                    onClose();
                },
            }
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal panel */}
            <div className="relative w-full max-w-lg mx-4 bg-surface-container-low border border-on-secondary-container/15 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-on-secondary-container/10">
                    <div>
                        <h2 className="font-display font-bold italic text-on-surface text-2xl leading-none">
                            Create a League
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-on-secondary-container hover:text-on-surface cinematic-transition p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-8 py-8 flex flex-col gap-8">
                    {/* League Name */}
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                            League Name
                        </label>
                        <input
                            type="text"
                            value={leagueName}
                            onChange={(e) => setLeagueName(e.target.value)}
                            placeholder="e.g. Blockbuster Dynasty League"
                            className="underline-input w-full py-2.5 text-base placeholder:text-on-secondary-container/30 font-ui font-light"
                        />
                    </div>

                    {/* Privacy Toggle */}
                    <div className="flex flex-col gap-3">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                            Visibility
                        </label>
                        <div className="grid grid-cols-2 gap-px bg-on-secondary-container/10">
                            <button
                                onClick={() => setIsPublic(true)}
                                className={`flex items-center gap-3 p-4 cinematic-transition ${
                                    isPublic
                                        ? "bg-primary/10 border border-primary/30"
                                        : "bg-surface-container-high hover:bg-surface-bright"
                                }`}
                            >
                                <Globe className={`w-4 h-4 ${isPublic ? "text-primary" : "text-on-secondary-container"}`} />
                                <div className="text-left">
                                    <p className={`font-ui font-medium text-sm ${isPublic ? "text-primary" : "text-on-surface"}`}>
                                        Public
                                    </p>
                                    <p className="font-mono text-[9px] text-on-secondary-container uppercase tracking-wider">
                                        Open to all studios
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() => setIsPublic(false)}
                                className={`flex items-center gap-3 p-4 cinematic-transition ${
                                    !isPublic
                                        ? "bg-primary/10 border border-primary/30"
                                        : "bg-surface-container-high hover:bg-surface-bright"
                                }`}
                            >
                                <Lock className={`w-4 h-4 ${!isPublic ? "text-primary" : "text-on-secondary-container"}`} />
                                <div className="text-left">
                                    <p className={`font-ui font-medium text-sm ${!isPublic ? "text-primary" : "text-on-surface"}`}>
                                        Private
                                    </p>
                                    <p className="font-mono text-[9px] text-on-secondary-container uppercase tracking-wider">
                                        Invite only
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4">
                        <button
                            onClick={onClose}
                            className="font-mono text-xs uppercase tracking-wider text-on-secondary-container hover:text-on-surface cinematic-transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!leagueName.trim() || isPending}
                            className="flex items-center gap-2 bg-primary text-on-surface px-6 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Trophy className="w-3.5 h-3.5" />
                            {isPending ? "Creating..." : "Create League"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
