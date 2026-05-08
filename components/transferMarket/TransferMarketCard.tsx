"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, XCircle, Store, TrendingUp, TrendingDown } from "lucide-react";
import { BuyFromMarketModal } from "./BuyFromMarketModal";
import { CancelListingModal } from "./CancelListingModal";
import type { TransferListing } from "@/services/transferMarket/transferMarket";

interface TransferMarketCardProps {
    listing: TransferListing;
    currentUserId?: string;
}

const formatCurrency = (cents: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(cents / 100);

const TransferMarketCard = ({ listing, currentUserId }: TransferMarketCardProps) => {
    const [buyOpen, setBuyOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);

    const movie = listing.movieId;
    const seller = listing.userId;
    const isOwner = currentUserId && seller?._id === currentUserId;

    const posterUrl = movie?.posterPath?.startsWith("http")
        ? movie.posterPath
        : `https://image.tmdb.org/t/p/w500${movie?.posterPath}`;

    const systemPriceCents = movie?.basePrice ?? 0;
    const salePriceCents = listing.salePrice;
    const priceDiff = salePriceCents - systemPriceCents;
    const priceDiffPct =
        systemPriceCents > 0 ? Math.round((priceDiff / systemPriceCents) * 100) : 0;

    const listedDate = new Date(listing.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    return (
        <>
            <article className="group relative flex flex-col bg-surface-container-low border border-transparent hover:border-outline/30 overflow-hidden shadow-lg transition-all duration-500 rounded-xl">
                {/* Owner badge */}
                {isOwner && (
                    <div className="absolute top-3 left-3 z-20 bg-primary/90 backdrop-blur-sm px-2 py-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface">
                            Your Listing
                        </span>
                    </div>
                )}

                {/* Poster */}
                <div className="relative aspect-2/3 w-full bg-surface-container-high overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/30 to-transparent z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    <Image
                        src={posterUrl}
                        alt={movie?.title ?? "Movie poster"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Price delta badge */}
                    {systemPriceCents > 0 && (
                        <div className="absolute top-3 right-3 z-20">
                            <span
                                className={`flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold backdrop-blur-sm border ${
                                    priceDiff > 0
                                        ? "bg-[#A85A3A]/80 border-[#A85A3A]/40 text-on-surface"
                                        : priceDiff < 0
                                        ? "bg-[#4E9268]/80 border-[#4E9268]/40 text-on-surface"
                                        : "bg-background/80 border-outline/20 text-on-surface-muted"
                                }`}
                            >
                                {priceDiff > 0 ? (
                                    <TrendingUp className="w-2.5 h-2.5" />
                                ) : priceDiff < 0 ? (
                                    <TrendingDown className="w-2.5 h-2.5" />
                                ) : null}
                                {priceDiff === 0
                                    ? "Market"
                                    : `${priceDiff > 0 ? "+" : ""}${priceDiffPct}%`}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col p-5 relative z-10 -mt-16 transition-transform duration-500">
                    <div className="mb-3">
                        <h3
                            className="text-lg font-bold text-on-surface line-clamp-1 mb-0.5 drop-shadow-md"
                            title={movie?.title}
                        >
                            {movie?.title ?? "Unknown"}
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <Store className="w-3 h-3 text-on-secondary-container/60" />
                            <p className="text-xs text-on-surface-muted font-ui tracking-wide drop-shadow-md line-clamp-1">
                                {seller?.studioName ?? "Unknown Studio"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-3 flex items-end justify-between border-t border-outline/10 group-hover:border-outline/30 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-on-surface-muted font-ui opacity-70">
                                Transfer Price
                            </span>
                            <span className="font-mono text-primary font-bold text-lg leading-none mt-0.5">
                                {formatCurrency(salePriceCents)}
                            </span>
                            <span className="font-mono text-[9px] text-on-secondary-container/50 mt-0.5">
                                Listed {listedDate}
                            </span>
                        </div>

                        {/* CTA */}
                        {isOwner ? (
                            <button
                                id={`cancel-listing-${listing._id}`}
                                onClick={() => setCancelOpen(true)}
                                className="flex items-center gap-1.5 bg-[#A85A3A]/15 border border-[#A85A3A]/30 px-3 py-1.5 text-xs font-ui uppercase font-semibold text-[#A85A3A] hover:bg-[#A85A3A]/25 hover:border-[#A85A3A]/50 transition-colors focus:outline-none focus:ring-1 focus:ring-[#A85A3A] cursor-pointer"
                                aria-label={`Cancel listing for ${movie?.title}`}
                            >
                                <XCircle className="w-3 h-3" />
                                Cancel
                            </button>
                        ) : (
                            <button
                                id={`buy-listing-${listing._id}`}
                                onClick={() => setBuyOpen(true)}
                                className="flex items-center gap-1.5 bg-surface-container border border-outline/20 px-3 py-1.5 text-xs font-ui uppercase font-semibold text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                                aria-label={`Buy ${movie?.title} from transfer market`}
                            >
                                <ShoppingCart className="w-3 h-3" />
                                Buy
                            </button>
                        )}
                    </div>
                </div>
            </article>

            {/* Modals */}
            <BuyFromMarketModal
                isOpen={buyOpen}
                onClose={() => setBuyOpen(false)}
                listing={listing}
            />
            <CancelListingModal
                isOpen={cancelOpen}
                onClose={() => setCancelOpen(false)}
                assetId={listing._id}
                movieTitle={movie?.title ?? "Movie"}
                salePriceCents={salePriceCents}
            />
        </>
    );
};

export default TransferMarketCard;
