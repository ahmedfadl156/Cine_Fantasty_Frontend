"use client";
import { useMovies } from "@/hooks/movies/UseMovies"
import TopMovieCard from "../shared/TopMovieCard";
import { AlertTriangle, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const TopMovies = () => {
    const { data: movies, isLoading, isError } = useMovies();

    if (isLoading) {
        return (
            <div className="mx-auto max-w-[1440px] px-4 py-24 min-h-[50vh] flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="font-mono tracking-widest text-primary animate-pulse uppercase">
                    Loading Archives...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto max-w-[1440px] px-4 py-24 min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
                <AlertTriangle className="w-16 h-16 text-error opacity-80" />
                <h2 className="text-error mt-4 text-3xl font-display">System Error</h2>
                <p className="font-mono text-on-surface-muted">Failed to retrieve the motion picture archives.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-8 py-3 ghost-border text-on-surface uppercase tracking-widest text-sm hover:border-primary hover:text-primary cinematic-transition cursor-pointer"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:py-24">
            <div className="signature-divider mb-16 md:mb-24">
                <span className="font-mono text-sm md:text-base tracking-widest text-on-secondary-container shrink-0 uppercase">
                    Top Movies For This Season
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                {movies?.map((movie: any) => (
                    <TopMovieCard key={movie._id} movie={movie} />
                ))}
            </div>

            <div className="flex items-center justify-center mt-10">
                <Button className="bg-primary text-on-primary hover:bg-primary/90 hover:text-on-primary transition-colors">
                    <Link href="/market" className="flex items-center gap-2">
                        See All In Market
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}

export default TopMovies