"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
    X,
    ShoppingCart,
    AlertTriangle,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { useBuyMovie } from "@/hooks/movies/UseMovies";

interface BuyMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    movie: {
        systemId: string;
        title: string;
        posterPath: string;
        purchasePriceInDollars: number;
        gameStatus: string;
    };
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

export const BuyMovieModal = ({ isOpen, onClose, movie }: BuyMovieModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { mutate: buyMovie, isPending, isSuccess } = useBuyMovie();

    const posterUrl = movie.posterPath?.startsWith("http")
        ? movie.posterPath
        : `https://image.tmdb.org/t/p/w500${movie.posterPath}`;

    // Mount portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isPending) onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, isPending, onClose]);

    useEffect(() => {
        if (!isOpen) setConfirmed(false);
    }, [isOpen]);

    const handleBuy = () => {
        buyMovie(movie.systemId, {
            onSuccess: () => {
                setTimeout(onClose, 1800);
            },
        });
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current && !isPending) onClose();
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ animation: "fadeIn 200ms ease forwards" }}
            aria-modal="true"
            role="dialog"
            aria-label={`Confirm purchase of ${movie.title}`}
        >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

            {/* Modal panel */}
            <div
                className="relative w-full max-w-lg bg-surface-container-low border border-on-secondary-container/15 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{ animation: "slideUp 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
                {/* Red top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />

                {/* Close button */}
                {!isPending && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 text-on-secondary-container hover:text-on-surface cinematic-transition"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <div className="flex gap-0">
                    {/* Poster strip */}
                    <div className="relative w-28 flex-shrink-0 hidden sm:block">
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            sizes="112px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low/80" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                        {/* Header */}
                        <div className="mb-6">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-2">
                                Confirm Draft
                            </p>
                            <h2 className="font-display font-bold italic text-on-surface text-2xl md:text-3xl leading-tight">
                                {movie.title}
                            </h2>
                        </div>

                        {/* Price summary */}
                        <div className="bg-surface-container-high p-4 mb-6 border-l-2 border-primary/50">
                            <div className="flex items-center justify-between">
                                <span className="font-ui font-light text-sm text-on-secondary-container uppercase tracking-wider">
                                    Draft Price
                                </span>
                                <span className="font-mono text-xl text-primary font-medium">
                                    {formatCurrency(movie.purchasePriceInDollars)}
                                </span>
                            </div>
                        </div>

                        {/* Warning notice */}
                        <div className="flex items-start gap-3 mb-6 p-3 bg-[#A85A3A]/10 border border-[#A85A3A]/20">
                            <AlertTriangle className="w-4 h-4 text-[#A85A3A] mt-0.5 flex-shrink-0" />
                            <p className="font-ui font-light text-xs text-on-secondary-container leading-relaxed">
                                This action will deduct{" "}
                                <span className="text-on-surface font-medium">
                                    {formatCurrency(movie.purchasePriceInDollars)}
                                </span>{" "}
                                from your studio budget. Drafts cannot be refunded once confirmed.
                            </p>
                        </div>

                        {/* Confirm checkbox */}
                        {!isPending && !isSuccess && (
                            <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                                <div
                                    onClick={() => setConfirmed((c) => !c)}
                                    className={`w-5 h-5 flex-shrink-0 border cinematic-transition flex items-center justify-center ${
                                        confirmed
                                            ? "bg-primary border-primary"
                                            : "border-on-secondary-container/40 group-hover:border-on-surface/50"
                                    }`}
                                >
                                    {confirmed && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-on-surface" />
                                    )}
                                </div>
                                <span className="font-ui font-light text-xs text-on-secondary-container group-hover:text-on-surface cinematic-transition">
                                    I understand this purchase is final and non-refundable
                                </span>
                            </label>
                        )}

                        {/* Success state */}
                        {isSuccess && (
                            <div className="flex items-center gap-3 mb-6 py-2">
                                <CheckCircle2 className="w-5 h-5 text-[#4E9268]" />
                                <span className="font-mono text-sm text-[#4E9268]">
                                    Purchase confirmed — redirecting to studio…
                                </span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            {!isSuccess && (
                                <>
                                    <button
                                        onClick={onClose}
                                        disabled={isPending}
                                        className="flex-1 py-3.5 text-sm font-ui font-medium uppercase tracking-widest text-on-secondary-container border border-on-secondary-container/25 hover:border-on-surface/50 hover:text-on-surface cinematic-transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleBuy}
                                        disabled={!confirmed || isPending}
                                        className="flex-1 py-3.5 px-3 text-sm font-ui font-medium uppercase tracking-widest bg-primary text-on-surface flex items-center justify-center gap-2 hover:bg-primary/80 cinematic-transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(200,53,42,0.3)]"
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing…
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4" />
                                                Confirm Buying
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(24px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)     scale(1);    }
                }
            `}</style>
        </div>,
        document.body
    );
};
