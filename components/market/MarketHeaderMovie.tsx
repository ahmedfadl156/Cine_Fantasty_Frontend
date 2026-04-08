import Image from "next/image";
import { Plus, Calendar } from "lucide-react";

export const MarketHeaderMovie = ({ movie }: { movie: any }) => {
    const releaseYear = new Date(movie.releaseDate).getFullYear();
    const formattedDate = new Date(movie.releaseDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(movie.basePriceInDollars || (movie.basePrice / 100));

    const imageUrl = movie.posterPath?.startsWith('http')
        ? movie.posterPath
        : `https://image.tmdb.org/t/p/original${movie.posterPath}`;

    return (
        <section className="relative w-full overflow-hidden rounded-2xl bg-surface-container-low border border-outline/20 shadow-2xl cinematic-transition group mb-12">
            <div className="flex flex-col md:flex-row min-h-[500px]">
                {/* Left side: Poster */}
                <div className="relative w-full md:w-1/2 min-h-[500px] md:min-h-full overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-surface-container-low/90 md:to-surface-container-low z-10 hidden md:block" />
                    <div className="absolute inset-0 bg-linear-to-t from-surface-container-low via-surface-container-low/50 to-transparent z-10 md:hidden block" />
                    <Image 
                        src={imageUrl}
                        alt={movie.title}
                        fill
                        className="object-cover object-center grayscale-20 group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
                
                {/* Right side: Info */}
                <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center z-20 bg-transparent md:bg-surface-container-low">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-primary/20 text-primary px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-sm border border-primary/30">
                            Featured
                        </span>
                        <span className="flex items-center gap-1 text-sm text-on-surface-muted font-mono">
                            <Calendar className="w-4 h-4" />
                            {releaseYear}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
                        {movie.title}
                    </h1>

                    <div className="flex flex-col gap-6 mb-8 border-l-2 border-primary/30 pl-6">
                        <div>
                            <p className="text-xs text-on-surface-muted uppercase tracking-widest font-ui mb-1">Release Date</p>
                            <p className="text-lg text-on-surface font-medium">{formattedDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-on-surface-muted uppercase tracking-widest font-ui mb-1">Base Price</p>
                            <p className="text-3xl font-mono font-bold text-primary">{formattedPrice}</p>
                        </div>
                    </div>

                    <div className="mt-auto md:mt-8 pt-6 flex flex-col sm:flex-row gap-4">
                        <button className="flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                            <Plus className="w-5 h-5" />
                            Buy Movie
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
