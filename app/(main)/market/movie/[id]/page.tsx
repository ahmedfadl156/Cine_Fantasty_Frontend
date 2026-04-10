"use client";

import { useMovieDetails } from "@/hooks/movies/UseMovies";
import { useParams } from "next/navigation";
import { MovieHero } from "@/components/movie-details/MovieHero";
import { MovieOverview } from "@/components/movie-details/MovieOverview";
import { MovieFinancials } from "@/components/movie-details/MovieFinancials";
import { MovieCrew } from "@/components/movie-details/MovieCrew";
import { MovieCast } from "@/components/movie-details/MovieCast";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const { data: movie, isPending, isError } = useMovieDetails(id as string);

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="font-mono text-xs text-on-secondary-container uppercase tracking-widest">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="flex flex-col items-center gap-3">
                    <p className="font-display font-bold italic text-on-surface text-3xl">
                        Something went wrong.
                    </p>
                    <p className="font-mono text-xs text-on-secondary-container">
                        Could not load movie details.
                    </p>
                </div>
            </div>
        );
    }

    const { draftInfo, movieDetails } = movie;

    return (
        <main className="bg-background min-h-screen">
            {/*  Hero */}
            <MovieHero draftInfo={draftInfo} />

            {/* verview / Story  */}
            <MovieOverview
                tagline={movieDetails.tagline}
                overview={movieDetails.overview}
            />

            {/*  Financials  */}
            <MovieFinancials
                budgetInDollars={movieDetails.budgetInDollars}
                realLifeRevenue={movieDetails.realLifeRevenue}
                purchasePriceInDollars={draftInfo.purchasePriceInDollars}
                currentProfitOrLoss={draftInfo.currentProfitOrLoss}
            />

            {/*  Production / Crew  */}
            <MovieCrew
                director={movieDetails.director}
                runtime={movieDetails.runtime}
                releaseDate={movieDetails.releaseDate}
                productionCompanies={movieDetails.productionCompanies}
            />

            {/* Cast */}
            <MovieCast topCast={movieDetails.topCast} />
        </main>
    );
};

export default MovieDetailsPage;