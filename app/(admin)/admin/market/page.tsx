"use client";

import { useState } from "react";
import { Film } from "lucide-react";
import { MarketFilterBar } from "@/components/admin/market/MarketFilterBar";
import { MovieListTable } from "@/components/admin/market/MovieListTable";
import { MovieEditModal } from "@/components/admin/market/MovieEditModal";
import { StreamingRevenueModal } from "@/components/admin/market/StreamingRevenueModal";
import { useGetAdminMovies } from "@/hooks/admin/market/use-market";

const AdminMarketPage = () => {
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        seasonId: "",
        page: 1,
        limit: 15
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStreamingModalOpen, setIsStreamingModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);

    const { data: responseData, isLoading, isError } = useGetAdminMovies(filters);

    const handleEdit = (movie: any) => {
        setSelectedMovie(movie);
        setIsEditModalOpen(true);
    };

    const handleAddStreaming = (movie: any) => {
        setSelectedMovie(movie);
        setIsStreamingModalOpen(true);
    };

    const handlePageChange = (newPage: number) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    const movies = responseData?.data?.movies || [];
    const pagination = responseData?.pagination || { currentPage: 1, totalPages: 1, totalMovies: 0 };

    return (
        <>
            <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight text-white flex items-center gap-3">
                        <Film className="text-primary w-8 h-8" />
                        Market Management
                    </h1>
                    <p className="text-sm text-gray-400 mt-1 font-ui">
                        Oversee movies, update box office revenues, and control release statuses.
                    </p>
                </div>
            </div>

            <MarketFilterBar filters={filters} setFilters={setFilters} />

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border border-red-500/20 bg-red-500/5 rounded-xl">
                    <p className="text-red-400 font-medium">Failed to load market data.</p>
                </div>
            ) : (
                <MovieListTable
                    movies={movies}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onEdit={handleEdit}
                    onAddStreaming={handleAddStreaming}
                />
            )}
            </div>

            <MovieEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                movie={selectedMovie}
            />

            <StreamingRevenueModal
                isOpen={isStreamingModalOpen}
                onClose={() => setIsStreamingModalOpen(false)}
                movie={selectedMovie}
            />
        </>
    );
};

export default AdminMarketPage;
