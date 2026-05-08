"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    X,
    XCircle,
    Loader2,
    AlertTriangle,
} from "lucide-react";
import { useCancelMovieListing } from "@/hooks/transferMarket/use-transfer-market";

interface CancelListingModalProps {
    isOpen: boolean;
    onClose: () => void;
    assetId: string;
    movieTitle: string;
    salePriceCents: number;
}

const formatCurrency = (cents: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(cents / 100);

export const CancelListingModal = ({
    isOpen,
    onClose,
    assetId,
    movieTitle,
    salePriceCents,
}: CancelListingModalProps) => {
    const [mounted, setMounted] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { mutate: cancelListing, isPending, isSuccess } = useCancelMovieListing();

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

    const handleCancel = () => {
        cancelListing(
            { assetId },
            {
                onSuccess: () => {
                    setTimeout(onClose, 1200);
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
            style={{ animation: "clFadeIn 200ms ease forwards" }}
            aria-modal="true"
            role="dialog"
            aria-label={`Cancel listing for ${movieTitle}`}
        >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

            <div
                className="relative w-full max-w-md bg-surface-container-low border border-on-secondary-container/15 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{ animation: "clSlideUp 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}
            >
                {/* Error-tone accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#A85A3A]" />

                {!isPending && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 text-on-secondary-container hover:text-on-surface cinematic-transition"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#A85A3A]/15 flex-shrink-0">
                            <XCircle className="w-5 h-5 text-[#A85A3A]" />
                        </div>
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-[#A85A3A] mb-0.5">
                                Cancel Listing
                            </p>
                            <h2 className="font-display font-bold italic text-on-surface text-xl leading-tight line-clamp-1">
                                {movieTitle}
                            </h2>
                        </div>
                    </div>

                    {/* Info card */}
                    <div className="bg-surface-container-high p-4 mb-5 border-l-2 border-[#A85A3A]/40">
                        <div className="flex items-center justify-between">
                            <span className="font-ui font-light text-xs text-on-secondary-container uppercase tracking-wider">
                                Current Listing Price
                            </span>
                            <span className="font-mono text-lg text-on-surface font-medium">
                                {formatCurrency(salePriceCents)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mb-6 p-3 bg-[#A85A3A]/10 border border-[#A85A3A]/20">
                        <AlertTriangle className="w-4 h-4 text-[#A85A3A] mt-0.5 flex-shrink-0" />
                        <p className="font-ui font-light text-xs text-on-secondary-container leading-relaxed">
                            Your movie will be removed from the transfer market immediately. You can
                            re-list it at any time.
                        </p>
                    </div>

                    {isSuccess && (
                        <p className="font-mono text-sm text-[#4E9268] mb-4">
                            Listing cancelled successfully.
                        </p>
                    )}

                    {!isSuccess && (
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={isPending}
                                className="flex-1 py-3.5 text-sm font-ui font-medium uppercase tracking-widest text-on-secondary-container border border-on-secondary-container/25 hover:border-on-surface/50 hover:text-on-surface cinematic-transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Keep Listed
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isPending}
                                className="flex-1 py-3.5 px-3 text-sm font-ui font-medium uppercase tracking-widest bg-[#A85A3A] text-on-surface flex items-center justify-center gap-2 hover:bg-[#A85A3A]/80 cinematic-transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Removing…
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4" />
                                        Cancel Listing
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes clFadeIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes clSlideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </div>,
        document.body
    );
};
