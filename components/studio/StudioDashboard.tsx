"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Film,
    Clapperboard,
    Archive,
    Tv2,
    Clock,
    Calendar,
    DollarSign,
    Tag,
    XCircle,
} from "lucide-react";
import type { MyStudioDashboard, MyStudioFilm } from "@/services/movies/getMovies";
import { ShareGamePopup } from "./ShareGamePopup";
import { ListForSaleModal } from "@/components/transferMarket/ListForSaleModal";
import { CancelListingModal } from "@/components/transferMarket/CancelListingModal";


const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const getPosterUrl = (path: string) =>
    path?.startsWith("http") ? path : `https://image.tmdb.org/t/p/w200${path}`;


type TabId = "inProduction" | "inTheaters" | "archivedFilms";

interface Tab {
    id: TabId;
    label: string;
    icon: React.ElementType;
}

const TABS: Tab[] = [
    { id: "inProduction",  label: "In Production", icon: Clapperboard },
    { id: "inTheaters",    label: "In Theaters",   icon: Tv2 },
    { id: "archivedFilms", label: "Archived",       icon: Archive },
];


const SkeletonCard = () => (
    <div className="flex gap-4 p-4 bg-surface-container-high animate-pulse">
        <div className="w-12 h-[72px] bg-surface-bright flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2 pt-1">
            <div className="h-4 bg-surface-bright w-3/4" />
            <div className="h-3 bg-surface-bright w-1/3" />
            <div className="h-3 bg-surface-bright w-1/2 mt-auto" />
        </div>
        <div className="flex flex-col items-end gap-2 pt-1">
            <div className="h-4 bg-surface-bright w-20" />
            <div className="h-3 bg-surface-bright w-14" />
        </div>
    </div>
);

const EmptyTab = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-16 h-16 flex items-center justify-center bg-surface-container-high">
            <Film className="w-7 h-7 text-on-secondary-container/40" />
        </div>
        <div className="text-center">
            <p className="font-display font-bold italic text-on-surface text-lg mb-1">
                Nothing {label}
            </p>
            <p className="font-ui font-light text-sm text-on-secondary-container">
                Head to the market to acquire your next title.
            </p>
        </div>
        <Link
            href="/market"
            className="mt-1 px-6 py-3 bg-primary text-on-surface text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition"
        >
            Browse Market
        </Link>
    </div>
);


interface FilmRowProps {
    film: MyStudioFilm;
    index: number;
    canList?: boolean;
}

const FilmRow = ({ film, index, canList = false }: FilmRowProps) => {
    const [listModalOpen, setListModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    const { movieDetails, purchasePriceInDollars, daysUntilRelease } = film;
    const posterUrl = getPosterUrl(movieDetails?.posterPath);

    const formattedDate = movieDetails?.releaseDate
        ? formatDate(movieDetails.releaseDate)
        : "Released";

    const daysLabel =
        daysUntilRelease === undefined || daysUntilRelease === null
            ? "In Theaters"
            : daysUntilRelease < 0
            ? "Released"
            : daysUntilRelease === 0
            ? "Releasing today"
            : daysUntilRelease === 1
            ? "1 day left"
            : `${daysUntilRelease} days left`;

    const countdownColor =
        daysUntilRelease === undefined || daysUntilRelease === null || daysUntilRelease <= 0
            ? "text-[#4E9268]"
            : daysUntilRelease <= 7
            ? "text-[#A85A3A]"
            : daysUntilRelease <= 30
            ? "text-[#D4AF37]"
            : "text-on-secondary-container";

    // Base price for the ListForSaleModal — use basePrice from movieDetails if populated by
    // the backend, otherwise fall back to purchasePrice * 100 as an estimate.
    const basePriceCents =
        film.movieDetails?.basePrice ?? film.basePriceCents ?? Math.round(purchasePriceInDollars * 100);

    return (
        <>
            <div className="flex gap-4 p-4 bg-surface-container-low hover:bg-surface-container-high cinematic-transition group">
                {/* Index */}
                <span className="font-mono text-[10px] text-on-secondary-container/40 w-5 flex-shrink-0 pt-[22px] text-right">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Poster */}
                <div className="relative w-12 h-[72px] flex-shrink-0 overflow-hidden">
                    <Image
                        src={posterUrl}
                        alt={movieDetails?.title || "Movie poster"}
                        fill
                        className="object-cover group-hover:scale-105 cinematic-transition"
                        sizes="48px"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                    <p className="font-ui font-medium text-on-surface text-sm leading-tight line-clamp-1 group-hover:text-primary cinematic-transition">
                        {movieDetails?.title || "Unknown Title"}
                    </p>

                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-on-secondary-container/50 flex-shrink-0" />
                        <span className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider">
                            {formattedDate}
                        </span>
                    </div>

                    {/* Status / for-sale badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex w-fit items-center gap-1.5 bg-surface-container-high px-2 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4E9268] animate-pulse" />
                            <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">
                                {film.status}
                            </span>
                        </span>

                        {film.isForSale && (
                            <span className="inline-flex w-fit items-center gap-1 bg-primary/15 border border-primary/25 px-2 py-0.5">
                                <Tag className="w-2.5 h-2.5 text-primary" />
                                <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
                                    Listed
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Financials + Transfer Market CTAs */}
                <div className="flex flex-col items-end justify-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-on-secondary-container/50" />
                        <span className="font-mono text-sm text-on-surface">
                            {formatCurrency(purchasePriceInDollars)}
                        </span>
                    </div>
                    <div className={`flex items-center gap-1 ${countdownColor}`}>
                        <Clock className="w-3 h-3" />
                        <span className="font-mono text-[10px] uppercase tracking-wider">
                            {daysLabel}
                        </span>
                    </div>

                    {/* Transfer market CTA — only on eligible tabs */}
                    {canList && (
                        <div className="mt-1">
                            {film.isForSale ? (
                                <button
                                    id={`studio-cancel-listing-${film._id}`}
                                    onClick={() => setCancelModalOpen(true)}
                                    className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-[#A85A3A] border border-[#A85A3A]/30 bg-[#A85A3A]/10 hover:bg-[#A85A3A]/20 cinematic-transition focus:outline-none focus:ring-1 focus:ring-[#A85A3A] cursor-pointer"
                                    aria-label={`Cancel listing for ${movieDetails?.title}`}
                                >
                                    <XCircle className="w-2.5 h-2.5" />
                                    Cancel Listing
                                </button>
                            ) : (
                                <button
                                    id={`studio-list-for-sale-${film._id}`}
                                    onClick={() => setListModalOpen(true)}
                                    className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-on-secondary-container border border-on-secondary-container/20 hover:border-primary hover:text-primary cinematic-transition focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                                    aria-label={`List ${movieDetails?.title} for sale`}
                                >
                                    <Tag className="w-2.5 h-2.5" />
                                    List for Sale
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals — rendered outside the row so z-index works correctly */}
            {canList && !film.isForSale && (
                <ListForSaleModal
                    isOpen={listModalOpen}
                    onClose={() => setListModalOpen(false)}
                    asset={{
                        _id: film._id,
                        movieId: {
                            _id: movieDetails?._id ?? "",
                            title: movieDetails?.title ?? "",
                            posterPath: movieDetails?.posterPath ?? "",
                            basePrice: basePriceCents,
                        },
                    }}
                />
            )}

            {canList && film.isForSale && (
                <CancelListingModal
                    isOpen={cancelModalOpen}
                    onClose={() => setCancelModalOpen(false)}
                    assetId={film._id}
                    movieTitle={movieDetails?.title ?? "Movie"}
                    salePriceCents={film.salePrice ?? 0}
                />
            )}
        </>
    );
};


interface StudioDashboardProps {
    dashboard: MyStudioDashboard;
    isLoading?: boolean;
}

export const StudioDashboard = ({ dashboard, isLoading }: StudioDashboardProps) => {
    const [activeTab, setActiveTab] = useState<TabId>("inProduction");

    const tabCounts: Record<TabId, number> = {
        inProduction:  dashboard?.inProduction?.length  ?? 0,
        inTheaters:    dashboard?.inTheaters?.length    ?? 0,
        archivedFilms: dashboard?.archivedFilms?.length ?? 0,
    };

    const films: MyStudioFilm[] = isLoading ? [] : (dashboard?.[activeTab] ?? []);

    // Only allow listing on in-production and in-theaters assets
    const canList = activeTab !== "archivedFilms";

    return (
        <div className="flex flex-col">
            {/* Tab Bar */}
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-on-secondary-container/15 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            id={`studio-tab-${tab.id}`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-selected={isActive}
                            role="tab"
                            className={`relative flex items-center justify-center flex-shrink-0 whitespace-nowrap gap-2 px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest cinematic-transition group focus:outline-none ${
                                isActive
                                    ? "text-on-surface"
                                    : "text-on-secondary-container hover:text-on-surface"
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{tab.label}</span>

                            {/* count pill */}
                            {!isLoading && tabCounts[tab.id] > 0 && (
                                <span
                                    className={`font-mono text-[9px] px-1.5 py-0.5 ${
                                        isActive
                                            ? "bg-primary text-on-surface"
                                            : "bg-surface-container-high text-on-secondary-container"
                                    } cinematic-transition`}
                                >
                                    {tabCounts[tab.id]}
                                </span>
                            )}

                            {/* active underline */}
                            <span
                                className={`absolute bottom-0 left-0 h-[2px] w-full cinematic-transition ${
                                    isActive ? "bg-primary" : "bg-transparent"
                                }`}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="flex flex-col gap-px bg-on-secondary-container/10">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                ) : films.length === 0 ? (
                    <EmptyTab label={TABS.find((t) => t.id === activeTab)?.label ?? ""} />
                ) : (
                    films.map((film, i) => (
                        <FilmRow
                            key={film._id}
                            film={film}
                            index={i}
                            canList={canList}
                        />
                    ))
                )}
            </div>

            <ShareGamePopup />
        </div>
    );
};
