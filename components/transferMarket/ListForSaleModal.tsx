"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
    X,
    Tag,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Info,
} from "lucide-react";
import { useListMovieForSale } from "@/hooks/transferMarket/use-transfer-market";

interface ListableAsset {
    _id: string;           // assetId
    movieId: {
        _id: string;
        title: string;
        posterPath: string;
        basePrice: number; // cents
    };
}

interface ListForSaleModalProps {
    isOpen: boolean;
    onClose: () => void;
    asset: ListableAsset;
}

const formatCurrency = (cents: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(cents / 100);


export const ListForSaleModal = ({
    isOpen,
    onClose,
    asset,
}: ListForSaleModalProps) => {
    const [mounted, setMounted] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [priceDollars, setPriceDollars] = useState<string>("");
    const [validationError, setValidationError] = useState<string>("");

    const { mutate: listForSale, isPending, isSuccess, data: mutationData } = useListMovieForSale();

    const posterUrl = asset.movieId.posterPath?.startsWith("http")
        ? asset.movieId.posterPath
        : `https://image.tmdb.org/t/p/w500${asset.movieId.posterPath}`;

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
        setTimeout(() => inputRef.current?.focus(), 50);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, isPending, onClose]);

    useEffect(() => {
        if (!isOpen) {
            setPriceDollars("");
            setValidationError("");
        }
    }, [isOpen]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        setPriceDollars(raw);
        setValidationError("");
    };

    const validate = (): boolean => {
        const dollars = parseInt(priceDollars || "0", 10);
        const cents = dollars * 100;
        if (isNaN(dollars) || dollars <= 0) {
            setValidationError("Please enter a valid price.");
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const priceCents = parseInt(priceDollars, 10) * 100;
        listForSale(
            { assetid: asset._id, price: priceCents },
            {
                onSuccess: () => {
                    setTimeout(onClose, 1500);
                },
                onError: (error: any) => {
                    setValidationError(
                        error?.response?.data?.message || 
                        error.message || 
                        "Failed to list for sale. Check the price."
                    );
                }
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
            style={{ animation: "lsFadeIn 200ms ease forwards" }}
            aria-modal="true"
            role="dialog"
            aria-label={`List ${asset.movieId.title} for sale`}
        >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

            <div
                className="relative w-full max-w-lg bg-surface-container-low border border-on-secondary-container/15 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{ animation: "lsSlideUp 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />

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
                            alt={asset.movieId.title}
                            fill
                            className="object-cover"
                            sizes="112px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low/80" />
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="flex-1 p-8">
                        {/* Header */}
                        <div className="mb-5">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-1.5 flex items-center gap-1.5">
                                <Tag className="w-3 h-3" />
                                List for Sale
                            </p>
                            <h2 className="font-display font-bold italic text-on-surface text-2xl md:text-3xl leading-tight line-clamp-2">
                                {asset.movieId.title}
                            </h2>
                        </div>



                        {/* Price input */}
                        <div className="mb-2">
                            <label
                                htmlFor="ls-price"
                                className="block font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-2"
                            >
                                Your Asking Price (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-on-secondary-container text-sm select-none">
                                    $
                                </span>
                                <input
                                    ref={inputRef}
                                    id="ls-price"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    value={priceDollars}
                                    onChange={handlePriceChange}
                                    disabled={isPending || isSuccess}
                                    placeholder="Enter your asking price"
                                    className="w-full bg-surface-container-high border border-on-secondary-container/20 focus:border-primary pl-7 pr-4 py-3 font-mono text-on-surface text-lg outline-none cinematic-transition placeholder:text-on-secondary-container/30 disabled:opacity-40"
                                    aria-describedby="ls-price-hint"
                                />
                            </div>
                            


                        </div>

                        {/* Validation error */}
                        {validationError && (
                            <div className="flex items-center gap-2 mb-4 p-2.5 bg-[#A85A3A]/10 border border-[#A85A3A]/25">
                                <AlertTriangle className="w-3.5 h-3.5 text-[#A85A3A] flex-shrink-0" />
                                <p className="font-ui text-xs text-[#A85A3A]">{validationError}</p>
                            </div>
                        )}

                        {/* Success */}
                        {isSuccess && (
                            <div className="flex flex-col gap-2 mb-4 p-3 bg-[#4E9268]/10 border border-[#4E9268]/25">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#4E9268]" />
                                    <p className="font-mono text-sm text-[#4E9268]">
                                        Listed successfully!
                                    </p>
                                </div>
                                {mutationData?.data?.marketStats && (
                                    <div className="pl-6 font-mono text-[10px] text-on-secondary-container/80 flex flex-col gap-0.5">
                                        <p>System Price: {formatCurrency(mutationData.data.marketStats.systemPrice)}</p>
                                        <p>Listed Price: {formatCurrency(mutationData.data.marketStats.listedPrice)}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        {!isSuccess && (
                            <div className="flex gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isPending}
                                    className="flex-1 py-3.5 text-sm font-ui font-medium uppercase tracking-widest text-on-secondary-container border border-on-secondary-container/25 hover:border-on-surface/50 hover:text-on-surface cinematic-transition disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending || !priceDollars}
                                    className="flex-1 py-3.5 px-3 text-sm font-ui font-medium uppercase tracking-widest bg-primary text-on-surface flex items-center justify-center gap-2 hover:bg-primary/80 cinematic-transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(200,53,42,0.3)]"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Listing…
                                        </>
                                    ) : (
                                        <>
                                            <Tag className="w-4 h-4" />
                                            List for Sale
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes lsFadeIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes lsSlideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </div>,
        document.body
    );
};
