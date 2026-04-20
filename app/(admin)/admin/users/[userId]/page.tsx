"use client";

import { use, Suspense } from "react";
import { useGetUserPortfolio } from "@/hooks/admin/adminData/useAdminData";
import { AlertTriangle, ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { PortfolioMetrics } from "@/components/admin/users/portfolio/PortfolioMetrics";
import { OwnedMoviesGrid } from "@/components/admin/users/portfolio/OwnedMoviesGrid";
import { useSearchParams } from "next/navigation";

function PortfolioContent({ userId }: { userId: string }) {
    const { data: ResponseData, isLoading, isError } = useGetUserPortfolio(userId);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 w-full animate-pulse mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-surface-container-lowest rounded-[2px]" />
                    ))}
                </div>
                <div className="h-[400px] w-full bg-surface-container-lowest rounded-[2px] mt-4" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-10 mt-8 border border-destructive bg-destructive/10 text-destructive-foreground rounded-[2px]">
                <AlertTriangle className="w-10 h-10 mb-4" />
                <h2 className="text-xl font-display font-bold uppercase tracking-wider">Failed to load portfolio</h2>
            </div>
        );
    }

    const portfolio = ResponseData?.data?.portfolio;

    if (!portfolio) {
        return <div className="text-muted-foreground p-16 mt-8 border border-dashed border-outline/50 bg-surface-container-low text-center font-mono uppercase rounded-[2px]">User portfolio could not be retrieved</div>;
    }

    return (
        <div className="flex flex-col gap-10 mt-8 pb-10">
            {/* Header Identity */}
            <div className="flex items-center gap-4 bg-surface-container-lowest p-6 border border-outline rounded-[2px]">
                <div className="w-16 h-16 bg-primary/20 flex flex-col items-center justify-center text-primary rounded-[2px]">
                    <Building2 className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-display font-bold tracking-wider">{portfolio.userName}</h1>
                    <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-widest bg-surface px-2 py-1 border border-outline rounded-[2px] self-start inline-flex">
                        Studio Portfolio View
                    </p>
                </div>
            </div>

            {/* Metrics */}
            <PortfolioMetrics portfolio={portfolio} />

            {/* Movies Grid */}
            <div className="bg-surface-container-low p-6 border border-outline rounded-[2px]">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-display italic font-bold tracking-wide">Acquired Repertoire</h2>
                    <span className="bg-surface text-muted-foreground px-3 py-1 font-mono text-xs uppercase tracking-widest border border-outline rounded-[2px]">
                        {portfolio.moviesCount} Titles
                    </span>
                </div>
                <OwnedMoviesGrid movies={portfolio.ownedMovies} />
            </div>
        </div>
    );
}


export default function UserPortfolioPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = use(params);

    return (
        <div className="flex flex-col max-w-7xl mx-auto w-full">
            {/* Nav Back Header */}
            <div className="flex items-center gap-4 border-b border-outline/50 pb-4">
                <Link href="/admin/users">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-outline bg-surface-container-low hover:bg-surface-container-high transition-colors font-mono text-xs uppercase tracking-widest rounded-[2px] text-muted-foreground hover:text-white">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Fleet
                    </button>
                </Link>
            </div>
            
            <Suspense fallback={<div className="font-mono p-10 animate-pulse text-muted-foreground">INITIALIZING VIEWER...</div>}>
                <PortfolioContent userId={userId} />
            </Suspense>
        </div>
    );
}
