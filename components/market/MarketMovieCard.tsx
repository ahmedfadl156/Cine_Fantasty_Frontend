import { Eye, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface MarketMovieCardProps {
    movie: any;
}

const MarketMovieCard = ({ movie }: MarketMovieCardProps) => {
    const releaseYear = new Date(movie.releaseDate).getFullYear();
    const formattedDate = new Date(movie.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(movie.basePriceInDollars || (movie.basePrice / 100));

    const imageUrl = movie.posterPath?.startsWith('http') 
        ? movie.posterPath 
        : `https://image.tmdb.org/t/p/w500${movie.posterPath}`;

    return (
        <Link prefetch={false} href={`/market/movie/${movie.id}`} className="group relative flex flex-col bg-surface-container-low border border-transparent hover:border-outline/30 overflow-hidden shadow-lg transition-all duration-500 rounded-xl cursor-default">
            {/* Poster */}
            <div className="relative aspect-2/3 w-full bg-surface-container-high overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/40 to-transparent z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                <Image 
                    src={imageUrl} 
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                />

                {/* Top Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span className="bg-background/80 backdrop-blur-md px-2 py-1 text-xs font-mono text-on-surface-muted rounded border border-outline/20 shadow-sm">
                        {releaseYear}
                    </span>
                </div>
                
                {/* Quick Add Button Overlay */}
                <div className="absolute inset-0 m-auto w-12 h-12 opacity-0 z-20 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100 hidden group-hover:flex items-center justify-center pointer-events-none">
                    <div className="bg-primary/90 text-on-primary w-12 h-12 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(var(--color-primary),0.5)]">
                        <Eye className="w-6 h-6 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Typography & Data */}
            <div className="flex flex-col p-5 relative z-10 -mt-16 transition-transform duration-500">
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-on-surface line-clamp-1 mb-1 shadow-sm drop-shadow-md" title={movie.title}>
                        {movie.title}
                    </h3>
                    <p className="text-xs text-on-surface-muted font-ui tracking-wide drop-shadow-md">
                        {formattedDate}
                    </p>
                </div>
                
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-outline/10 group-hover:border-outline/30 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-on-surface-muted font-ui opacity-70">Price</span>
                        <span className="font-mono text-primary font-bold text-lg">
                            {formattedPrice}
                        </span>
                    </div>
                    
                    <button onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 bg-surface-container border border-outline/20 px-3 py-1.5 rounded-sm text-xs font-ui uppercase font-semibold text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-colors focus:outline-none cursor-pointer">
                        <Plus className="w-3 h-3" />
                        Buy
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default MarketMovieCard;
