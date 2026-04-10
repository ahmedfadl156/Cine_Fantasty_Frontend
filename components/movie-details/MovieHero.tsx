"use client";

import Image from "next/image";
import { TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";

interface DraftInfo {
    systemId: string;
    title: string;
    gameStatus: string;
    posterPath: string;
    purchasePriceInDollars: number;
    currentProfitOrLoss: number;
}

interface MovieHeroProps {
    draftInfo: DraftInfo;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(Math.abs(value));

export const MovieHero = ({ draftInfo }: MovieHeroProps) => {
    const posterUrl = draftInfo.posterPath?.startsWith("http")
        ? draftInfo.posterPath
        : `https://image.tmdb.org/t/p/original${draftInfo.posterPath}`;

    const isProfit = draftInfo.currentProfitOrLoss >= 0;
    const isUpcoming = draftInfo.gameStatus === "UPCOMING";

    return (
        <section className="relative w-full min-h-[85vh] overflow-hidden flex items-end">
            {/* background poster */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={posterUrl}
                    alt={draftInfo.title}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="100vw"
                />
                {/* gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 pt-32">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-end gap-10 md:gap-16">
                    {/* Poster card */}
                    <div className="hidden md:block flex-shrink-0 w-48 lg:w-56 xl:w-64 aspect-[2/3] relative overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
                        <Image
                            src={posterUrl}
                            alt={draftInfo.title}
                            fill
                            className="object-cover"
                            sizes="256px"
                        />
                    </div>

                    {/* Text block */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Status badge */}
                        <div className="flex items-center gap-3">
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest ${
                                    isUpcoming
                                        ? "bg-primary/20 text-primary border border-primary/30"
                                        : "bg-[#4E9268]/20 text-[#4E9268] border border-[#4E9268]/30"
                                }`}
                            >
                                <span
                                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                        isUpcoming ? "bg-primary" : "bg-[#4E9268]"
                                    }`}
                                />
                                {draftInfo.gameStatus}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display font-bold italic text-on-surface text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight">
                            {draftInfo.title}
                        </h1>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-6 mt-2">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] uppercase tracking-widest text-on-secondary-container font-ui">
                                    Purchase Price
                                </span>
                                <span className="font-mono text-2xl text-on-surface font-medium">
                                    {formatCurrency(draftInfo.purchasePriceInDollars)}
                                </span>
                            </div>

                            <div className="w-px h-10 bg-on-secondary-container/20" />

                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] uppercase tracking-widest text-on-secondary-container font-ui">
                                    Profit / Loss
                                </span>
                                <span
                                    className={`font-mono text-2xl font-medium flex items-center gap-1.5 ${
                                        isProfit ? "text-[#4E9268]" : "text-[#A85A3A]"
                                    }`}
                                >
                                    {isProfit ? (
                                        <TrendingUp className="w-5 h-5" />
                                    ) : (
                                        <TrendingDown className="w-5 h-5" />
                                    )}
                                    {isProfit ? "+" : "-"}
                                    {formatCurrency(draftInfo.currentProfitOrLoss)}
                                </span>
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="w-fit flex items-center gap-2.5 bg-primary text-on-surface px-8 py-4 text-sm font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_30px_rgba(200,53,42,0.35)]">
                            <ShoppingCart className="w-4 h-4" />
                            Buy This Movie
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
