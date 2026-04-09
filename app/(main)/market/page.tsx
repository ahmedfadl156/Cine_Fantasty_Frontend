"use client";
import { useUpcomingMovies } from "@/hooks/movies/UseMovies";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MarketHeaderMovie } from "@/components/market/MarketHeaderMovie";
import MarketMovieCard from "@/components/market/MarketMovieCard";
import { MarketPagination } from "@/components/market/MarketPagination";

const MarketPage = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // هنجيب الصفحة الحالية اللى احنا فيها
    const currentPage = Number(searchParams.get("page")) || 1;
    // هنبعت الصفحة للهوك بتاعنا علشان ينفذا لريكوست
    const { data, isLoading, isError, isPlaceholderData } = useUpcomingMovies(currentPage);

    const upcomingMovies = data?.data?.movies || [];
    const pagination = data?.pagination || null;

    const topMovie = upcomingMovies.length > 0 ? upcomingMovies[0] : null;
    const restMovies = upcomingMovies.length > 1 ? upcomingMovies.slice(1) : [];

    // الفانكشن المسئولة عن ان احنا نبدل بين الصفح
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <main className="flex flex-col px-4 py-8 items-center justify-center min-h-[70vh]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex flex-col px-4 py-8 items-center justify-center min-h-[70vh]">
                <p className="text-red-500 font-mono text-lg bg-red-500/10 px-6 py-4 rounded-lg border border-red-500/20">
                    Failed to load market movies. Please try again later.
                </p>
            </main>
        );
    }

    return (
        <main className="flex flex-col px-4 lg:px-8 py-8 w-full max-w-7xl mx-auto pb-24">
            {/* Header will show a top movie */}
            {topMovie && (
                <MarketHeaderMovie movie={topMovie} />
            )}

            {/* section => will show all movies cards except the one on the header */}
            {restMovies.length > 0 && (
                <section className="mt-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-outline/10 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-bold font-ui text-on-surface tracking-tight">
                                Market Offerings
                            </h2>
                        </div>
                        {pagination && (
                            <span className="text-sm font-mono text-on-surface-muted bg-surface-container-high px-3 py-1.5 rounded-sm shadow-inner">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                        )}
                    </div>

                    <div style={{ opacity: isPlaceholderData ? 0.5 : 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {restMovies.map((movie: any) => (
                            <MarketMovieCard key={movie._id || movie.id} movie={movie} />
                        ))}
                    </div>
                </section>
            )}

            {/* Pagination Controls */}
            {pagination && (
                <MarketPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            )}

            {!isLoading && upcomingMovies.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-on-surface-muted bg-surface-container-low rounded-2xl border border-outline/10 mt-8">
                    <p className="text-lg font-ui p-8 text-center">No movies available at the moment.</p>
                </div>
            )}
        </main>
    )
}

export default MarketPage;