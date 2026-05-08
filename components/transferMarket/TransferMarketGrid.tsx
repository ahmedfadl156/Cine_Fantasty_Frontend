"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import { useGetMarketListings } from "@/hooks/transferMarket/use-transfer-market";
import { useAuth } from "@/hooks/auth/useAuth";
import TransferMarketCard from "./TransferMarketCard";
import { TransferMarketFilters } from "./TransferMarketFilters";
import type { SortOption } from "@/services/transferMarket/transferMarket";

const SkeletonCard = () => (
    <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden animate-pulse">
        <div className="aspect-2/3 bg-surface-container-high" />
        <div className="p-5 flex flex-col gap-3">
            <div className="h-5 bg-surface-container-high rounded w-3/4" />
            <div className="h-3 bg-surface-container-high rounded w-1/2" />
            <div className="flex justify-between items-end mt-2 pt-3 border-t border-outline/10">
                <div className="flex flex-col gap-1.5">
                    <div className="h-2.5 bg-surface-container-high rounded w-16" />
                    <div className="h-5 bg-surface-container-high rounded w-24" />
                </div>
                <div className="h-8 bg-surface-container-high rounded w-16" />
            </div>
        </div>
    </div>
);

export const TransferMarketGrid = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const { data: authData } = useAuth();
    const currentUserId: string | undefined = authData?.user?._id;

    // URL-driven state
    const tmPage = Number(searchParams.get("tmpage")) || 1;
    const tmSort = (searchParams.get("tmsort") as SortOption) || "newest";

    const { data, isPending, isError, isPlaceholderData } = useGetMarketListings(tmPage, tmSort);

    const listings = data?.data?.listings ?? [];
    const pagination = data?.pagination;

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([k, v]) => params.set(k, v));
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSortChange = (sort: SortOption) => {
        updateParams({ tmsort: sort, tmpage: "1" });
    };

    const handlePageChange = (page: number) => {
        updateParams({ tmpage: String(page) });
    };

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-on-surface-muted bg-surface-container-low rounded-2xl border border-outline/10 mt-4">
                <p className="text-lg font-ui p-8 text-center text-red-400">
                    Failed to load transfer market listings. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <section className="mt-2">
            <TransferMarketFilters
                sort={tmSort}
                onSortChange={handleSortChange}
                totalItems={pagination?.totalItems ?? 0}
                isPlaceholderData={isPlaceholderData}
            />

            {/* Grid */}
            {isPending ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-on-surface-muted bg-surface-container-low rounded-2xl border border-outline/10">
                    <Store className="w-12 h-12 opacity-20" />
                    <div className="text-center">
                        <p className="text-lg font-bold font-display italic text-on-surface">
                            No listings yet
                        </p>
                        <p className="text-sm font-ui mt-1">
                            Be the first to list a movie in the transfer market.
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    style={{ opacity: isPlaceholderData ? 0.6 : 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 transition-opacity duration-300"
                >
                    {listings.map((listing) => (
                        <TransferMarketCard
                            key={listing._id}
                            listing={listing}
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && !isPending && (
                <div className="flex flex-col items-center gap-4 mt-16 mb-8 w-full">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(tmPage - 1)}
                            disabled={tmPage <= 1 || isPlaceholderData}
                            className="flex items-center justify-center w-10 h-10 bg-surface-container border border-outline/20 text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Page numbers */}
                        <div className="hidden md:flex items-center gap-1 mx-2">
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                let pageNum = tmPage;
                                if (tmPage <= 3) pageNum = i + 1;
                                else if (tmPage >= pagination.totalPages - 2)
                                    pageNum = pagination.totalPages - 4 + i;
                                else pageNum = tmPage - 2 + i;

                                if (pageNum < 1 || pageNum > pagination.totalPages) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 flex items-center justify-center font-mono text-sm transition-all ${
                                            pageNum === tmPage
                                                ? "bg-primary text-on-primary font-bold"
                                                : "text-on-surface hover:bg-surface-container-high"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="md:hidden flex items-center px-4 font-mono text-sm bg-surface-container-high py-2">
                            {tmPage} / {pagination.totalPages}
                        </div>

                        <button
                            onClick={() => handlePageChange(tmPage + 1)}
                            disabled={tmPage >= pagination.totalPages || isPlaceholderData}
                            className="flex items-center justify-center w-10 h-10 bg-surface-container border border-outline/20 text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-on-surface-muted font-mono uppercase tracking-wider">
                        {pagination.totalItems} total listing{pagination.totalItems !== 1 ? "s" : ""}
                    </p>
                </div>
            )}
        </section>
    );
};
