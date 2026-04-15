"use client";

import { useState } from "react";
import { X, Hash, Lock } from "lucide-react";
import { useJoinPublicLeague } from "@/hooks/leagues/useLeagues";

interface JoinLeagueModalProps {
    isOpen: boolean;
    onClose: () => void;
    leagueName?: string;
    leagueId?: string;
    requiresCode?: boolean;
}

export const JoinLeagueModal = ({
    isOpen,
    onClose,
    leagueName,
    leagueId,
    requiresCode = false,
}: JoinLeagueModalProps) => {
    const [inviteCode, setInviteCode] = useState("");
    const {mutate: joinPublicLeague , isPending , isError} = useJoinPublicLeague();
    console.log(leagueId)
    if (!isOpen) return null;

    const handleJoinPublicLeague = (leagueId: string) => {
        joinPublicLeague(leagueId, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/90 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md mx-4 bg-surface-container-low border border-on-secondary-container/15 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-on-secondary-container/10">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container mb-1">
                            Confirm Enrollment
                        </p>
                        <h2 className="font-display font-bold italic text-on-surface text-2xl leading-none">
                            Join League
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-on-secondary-container hover:text-on-surface cinematic-transition p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-8 py-8 flex flex-col gap-6">
                    {/* League info */}
                    {leagueName && (
                        <div className="bg-surface-container-high px-5 py-4 border-l-2 border-primary/30">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container mb-2">
                                Joining
                            </p>
                            <p className="font-display font-bold italic text-on-surface text-xl leading-tight">
                                {leagueName}
                            </p>
                            {leagueId && (
                                <p className="font-mono text-xs text-on-secondary-container mt-1">
                                    ID: {leagueId}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Invite code field (private leagues) */}
                    {requiresCode && (
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container flex items-center gap-1.5">
                                <Lock className="w-3 h-3" />
                                Invite Code
                            </label>
                            <input
                                type="text"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                className="underline-input w-full py-2.5 text-xl tracking-[0.5em] text-center placeholder:tracking-widest placeholder:text-on-secondary-container/30 font-mono"
                            />
                            <p className="font-mono text-[10px] text-on-secondary-container/50 text-center">
                                Ask the league commissioner for the invite code.
                            </p>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="flex items-start gap-3 p-4 bg-surface-container-high/50">
                        <Hash className="w-4 h-4 text-on-secondary-container/40 mt-0.5 flex-shrink-0" />
                        <p className="font-ui font-light text-sm text-on-secondary-container leading-relaxed">
                            By joining, your studio&apos;s performance will be tracked against all competitors 
                            for the current season. Results cannot be reversed.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                        <button
                            onClick={onClose}
                            className="font-mono text-xs uppercase tracking-wider text-on-secondary-container hover:text-on-surface cinematic-transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleJoinPublicLeague(leagueId!)}
                            disabled={isPending || (requiresCode && inviteCode.length < 6)}
                            className="bg-primary text-on-surface px-6 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Joining..." : "Confirm & Join"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
