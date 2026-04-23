"use client";

import { useState, useEffect } from "react";
import { Share2, X, Copy, Check, Trophy, Users } from "lucide-react";

export function ShareGamePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup
        const hasSeen = localStorage.getItem("cineFantasty_hasSeenSharePopup");
        
        if (!hasSeen) {
            // Show popup after a short delay so the user sees the dashboard first
            const timer = setTimeout(() => {
                setIsOpen(true);
                // Mark as seen so it only shows once
                localStorage.setItem("cineFantasty_hasSeenSharePopup", "true");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleCopy = async () => {
        try {
            // Copy the current origin (the main site link)
            await navigator.clipboard.writeText(window.location.origin);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-surface-container-low border border-on-secondary-container/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 text-on-secondary-container hover:text-on-surface hover:bg-surface-container-high rounded-full cinematic-transition z-10 focus:outline-none"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Decorative Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="p-8 flex flex-col items-center text-center relative z-0">
                    {/* Icon Container with glowing effect */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <div className="relative w-20 h-20 bg-surface-container-high border border-primary/30 flex items-center justify-center rounded-full rotate-3 hover:rotate-0 cinematic-transition shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
                            <Trophy className="w-10 h-10 text-primary" />
                            <Users className="absolute -bottom-2 -right-2 w-6 h-6 text-on-surface bg-surface-container-low p-1 rounded-full border border-on-secondary-container/20" />
                        </div>
                    </div>

                    {/* Content */}
                    <h2 className="font-display font-bold text-2xl text-on-surface mb-3 tracking-wide">
                        Build Your Empire Together
                    </h2>
                    <p className="font-ui text-sm text-on-secondary-container mb-8 leading-relaxed px-2">
                        The box office is better with friends. Invite them to join <span className="text-primary font-medium">Cine Fantasty</span>, create their own studios, and compete in leagues to see who truly rules Hollywood.
                    </p>

                    {/* Action Area */}
                    <div className="w-full flex flex-col gap-3">
                        <button
                            onClick={handleCopy}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 font-ui text-sm font-semibold tracking-widest uppercase cinematic-transition relative overflow-hidden group ${
                                isCopied 
                                ? "bg-green-600 text-white" 
                                : "bg-primary text-on-surface hover:bg-primary/90"
                            }`}
                        >
                            {/* Shine effect */}
                            {!isCopied && (
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            )}
                            
                            {isCopied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Link Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span>Copy Invite Link</span>
                                </>
                            )}
                        </button>
                        
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full py-3 px-6 font-ui text-xs font-medium text-on-secondary-container hover:text-on-surface hover:bg-surface-container-high cinematic-transition uppercase tracking-wider"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
