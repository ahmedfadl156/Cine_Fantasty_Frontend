import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface TopMovieCardProps {
    movie: {
        _id: string;
        backdropPath: string;
        basePrice: number;
        posterPath: string;
        releaseDate: string;
        title: string;
        basePriceInDollars: number;
        boxOfficeRevenueInDollars: null | number;
        currentProfitOrLoss: null | number;
        id: string;
    }
}

const TopMovieCard = ({ movie }: TopMovieCardProps) => {
    const releaseYear = new Date(movie.releaseDate).toLocaleDateString();
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(movie.basePriceInDollars);

    const imageUrl = movie.posterPath.startsWith('http') 
        ? movie.posterPath 
        : `https://image.tmdb.org/t/p/w500${movie.posterPath}`;

    return (
        <div className="group relative flex flex-col bg-surface-container-low cinematic-transition hover:border-outline p-3 sm:p-4">
            {/* Poster */}
            <div className="relative aspect-2/3 w-full bg-surface-container-high overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent z-10 opacity-0 group-hover:opacity-100 cinematic-transition" />
                
                <Image 
                    src={imageUrl} 
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover grayscale-20 group-hover:grayscale-0 cinematic-transition group-hover:scale-105"
                    loading="lazy"
                />
                
                {/* Action Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 z-20 group-hover:opacity-100 cinematic-transition translate-y-4 group-hover:translate-y-0">
                    <Link href={`/market/movie/${movie.id}`} scroll={false} className="flex items-center gap-2 bg-primary px-6 py-3 text-on-primary font-ui uppercase tracking-widest text-xs font-semibold cursor-pointer hover:bg-white hover:text-primary cinematic-transition shadow-2xl">
                        <Eye className="h-4 w-4" />
                        Details
                    </Link>
                </div>
            </div>

            {/* Typography & Data */}
            <div className="flex flex-1 flex-col pt-4 pb-1 gap-2 relative z-10">
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-xl md:text-2xl font-bold text-on-surface line-clamp-2" title={movie.title}>
                        {movie.title}
                    </h3>
                    <span className="font-mono text-sm text-on-surface-muted shrink-0 pt-1">
                        {releaseYear}
                    </span>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/30">
                    <span className="text-xs uppercase tracking-widest text-on-surface-muted font-ui">Base Price</span>
                    <span className="font-mono text-primary font-bold">
                        {formattedPrice}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopMovieCard;