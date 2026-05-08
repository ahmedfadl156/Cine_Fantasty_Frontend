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
    Store,
    TrendingUp,
} from "lucide-react";
import { useBuyMovieFromMarket } from "@/hooks/transferMarket/use-transfer-market";
import type { TransferListing } from "@/services/transferMarket/transferMarket";

interface BuyFromMarketModalProps {
    isOpen: boolean;
    onClose: () => void;
    listing: TransferListing;
}

const formatCurrency = (cents: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(cents / 100);

export const BuyFromMarketModal = ({
    isOpen,
    onClose,
    listing,
}: BuyFromMarketModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { mutate: buyMovie, isPending, isSuccess } = useBuyMovieFromMarket();

    const movie = listing.movieId;
    const seller = listing.userId;
    const posterUrl = movie?.posterPath?.startsWith("http")
        ? movie.posterPath
        : `https://image.tmdb.org/t/p/w500${movie?.posterPath}`;

    const systemPriceCents = movie?.basePrice ?? 0;
    const salePriceCents = listing.salePrice;
    const priceDiff = salePriceCents - systemPriceCents;
    const priceDiffPct =
        systemPriceCents > 0
            ? Math.round((priceDiff / systemPriceCents) * 100)
            : 0;

    // portal mount
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // body scroll lock + Escape key
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

    // reset confirmed on close
    useEffect(() => {
        if (!isOpen) setConfirmed(false);
    }, [isOpen]);

    const handleBuy = () => {
        buyMovie(
            { assetid: listing._id },
            {
                onSuccess: () => {
                    setTimeout(onClose, 1800);
                },
            }
        );
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
            style={{ animation: "tmFadeIn 200ms ease forwards" }}
            aria-modal="true"
            role="dialog"
            aria-label={`Confirm purchase of ${movie?.title}`}
        >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

            {/* Modal panel */}
            <div
                className="relative w-full max-w-lg bg-surface-container-low border border-on-secondary-container/15 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{ animation: "tmSlideUp 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />

                {/* Close */}
                {!isPending && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 text-on-secondary-container hover:text-on-surface cinematic-transition"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <div className="flex gap-0">
                    {/* Poster strip */}
                    <div className="relative w-28 flex-shrink-0 hidden sm:block">
                        <Image
                            src={posterUrl}
                            alt={movie?.title ?? "Movie poster"}
                            fill
                            className="object-cover"
                            sizes="112px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low/80" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8">
                        {/* Header */}
                        <div className="mb-5">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-1.5 flex items-center gap-1.5">
                                <Store className="w-3 h-3" />
                                Transfer Market Purchase
                            </p>
                            <h2 className="font-display font-bold italic text-on-surface text-2xl md:text-3xl leading-tight">
                                {movie?.title ?? "Unknown Title"}
                            </h2>
                            {seller?.studioName && (
                                <p className="font-ui text-xs text-on-secondary-container mt-1">
                                    Listed by{" "}
                                    <span className="text-on-surface font-medium">
                                        {seller.studioName}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Price breakdown */}
                        <div className="bg-surface-container-high p-4 mb-5 border-l-2 border-primary/50 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="font-ui font-light text-xs text-on-secondary-container uppercase tracking-wider">
                                    Transfer Price
                                </span>
                                <span className="font-mono text-xl text-primary font-medium">
                                    {formatCurrency(salePriceCents)}
                                </span>
                            </div>
                            {systemPriceCents > 0 && (
                                <div className="flex items-center justify-between border-t border-on-secondary-container/10 pt-2">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-on-secondary-container">
                                        System Price
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs text-on-secondary-container line-through">
                                            {formatCurrency(systemPriceCents)}
                                        </span>
                                        <span
                                            className={`font-mono text-[10px] font-bold flex items-center gap-0.5 ${
                                                priceDiff > 0 ? "text-[#A85A3A]" : "text-[#4E9268]"
                                            }`}
                                        >
                                            <TrendingUp className="w-3 h-3" />
                                            {priceDiff > 0 ? "+" : ""}
                                            {priceDiffPct}%
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Warning */}
                        <div className="flex items-start gap-3 mb-5 p-3 bg-[#A85A3A]/10 border border-[#A85A3A]/20">
                            <AlertTriangle className="w-4 h-4 text-[#A85A3A] mt-0.5 flex-shrink-0" />
                            <p className="font-ui font-light text-xs text-on-secondary-container leading-relaxed">
                                This will deduct{" "}
                                <span className="text-on-surface font-medium">
                                    {formatCurrency(salePriceCents)}
                                </span>{" "}
                                from your studio budget. Transfers cannot be reversed once confirmed.
                            </p>
                        </div>

                        {/* Confirm checkbox */}
                        {!isPending && !isSuccess && (
                            <label className="flex items-center gap-3 mb-5 cursor-pointer group">
                                <div
                                    onClick={() => setConfirmed((c) => !c)}
                                    role="checkbox"
                                    aria-checked={confirmed}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === " " && setConfirmed((c) => !c)}
                                    className={`w-5 h-5 flex-shrink-0 border cinematic-transition flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-primary ${
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
                                    I understand this transfer is final and non-refundable
                                </span>
                            </label>
                        )}

                        {/* Success state */}
                        {isSuccess && (
                            <div className="flex items-center gap-3 mb-5 py-2">
                                <CheckCircle2 className="w-5 h-5 text-[#4E9268]" />
                                <span className="font-mono text-sm text-[#4E9268]">
                                    Transfer complete — movie added to your studio.
                                </span>
                            </div>
                        )}

                        {/* Actions */}
                        {!isSuccess && (
                            <div className="flex gap-3">
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
                                            Confirm Purchase
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes tmFadeIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes tmSlideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </div>,
        document.body
    );
};
