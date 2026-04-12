"use client";

import { Film, TrendingUp, TrendingDown, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface DraftedMovie {
    id: string;
    title: string;
    posterPath: string;
    purchasePriceInDollars: number;
    currentProfitOrLoss: number;
    gameStatus: string;
    releaseDate?: string;
}

interface DraftedMoviesProps {
    movies: DraftedMovie[];
    isLoading?: boolean;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(Math.abs(value));

const SkeletonCard = () => (
    <div className="flex gap-4 p-4 bg-surface-container-high animate-pulse">
        <div className="w-14 h-20 bg-surface-bright flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2 pt-1">
            <div className="h-4 bg-surface-bright w-3/4" />
            <div className="h-3 bg-surface-bright w-1/3" />
            <div className="h-3 bg-surface-bright w-1/2 mt-auto" />
        </div>
    </div>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 flex items-center justify-center bg-surface-container-high">
            <Film className="w-7 h-7 text-on-secondary-container" />
        </div>
        <div className="text-center">
            <p className="font-display font-bold italic text-on-surface text-xl mb-1">
                No Assets Yet
            </p>
            <p className="font-ui font-light text-sm text-on-secondary-container">
                Head to the market to buy your first movie.
            </p>
        </div>
        <Link
            href="/market"
            className="mt-2 px-6 py-3 bg-primary text-on-surface text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition"
        >
            Browse Market
        </Link>
    </div>
);

export const DraftedMovies = ({ movies, isLoading }: DraftedMoviesProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-px bg-on-secondary-container/10">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="flex flex-col gap-px bg-on-secondary-container/10">
            {movies.map((movie, index) => {
                const isProfit = movie.currentProfitOrLoss >= 0;
                const posterUrl = movie.posterPath?.startsWith("http")
                    ? movie.posterPath
                    : `https://image.tmdb.org/t/p/w200${movie.posterPath}`;

                return (
                    <Link
                        key={movie.id}
                        href={`/market/movie/${movie.id}`}
                        className="flex gap-4 p-4 bg-surface-container-low hover:bg-surface-container-high cinematic-transition group"
                    >
                        {/* Index */}
                        <span className="font-mono text-[10px] text-on-secondary-container/40 w-5 flex-shrink-0 pt-5 text-right">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Poster */}
                        <div className="relative w-12 h-[72px] flex-shrink-0 overflow-hidden">
                            <Image
                                src={posterUrl}
                                alt={movie.title}
                                fill
                                className="object-cover group-hover:scale-105 cinematic-transition"
                                sizes="48px"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                            <p className="font-ui font-medium text-on-surface text-sm leading-tight line-clamp-1 group-hover:text-primary cinematic-transition">
                                {movie.title}
                            </p>
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-on-secondary-container/50" />
                                <span className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider">
                                    {movie.gameStatus}
                                </span>
                            </div>
                        </div>

                        {/* Financials */}
                        <div className="flex flex-col items-end justify-center gap-1 flex-shrink-0">
                            <span className="font-mono text-sm text-on-surface">
                                {formatCurrency(movie.purchasePriceInDollars)}
                            </span>
                            <span
                                className={`font-mono text-xs flex items-center gap-1 ${
                                    isProfit ? "text-[#4E9268]" : "text-[#A85A3A]"
                                }`}
                            >
                                {isProfit ? (
                                    <TrendingUp className="w-3 h-3" />
                                ) : (
                                    <TrendingDown className="w-3 h-3" />
                                )}
                                {isProfit ? "+" : "-"}
                                {formatCurrency(movie.currentProfitOrLoss)}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
