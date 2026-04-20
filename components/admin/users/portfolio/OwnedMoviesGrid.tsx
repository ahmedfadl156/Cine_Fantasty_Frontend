import React from 'react';
import { DollarSign, Ticket, CameraOff } from "lucide-react";
import { formatCurrencyString } from "@/lib/utils";

export const OwnedMoviesGrid = ({ movies }: { movies: any[] }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="flex items-center justify-center p-16 border border-dashed border-outline/50 text-muted-foreground font-mono rounded-[2px] bg-surface-container-lowest">
                No movies purchased yet.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map(movie => (
                <div key={movie._id} className="flex flex-col bg-surface border border-outline rounded-[2px] overflow-hidden group hover:border-primary/50 transition-colors">
                    
                    {/* Poster Wrapper */}
                    <div className="relative aspect-[2/3] w-full bg-surface-container-lowest overflow-hidden">
                        {movie.moviePoster ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.moviePoster}`} 
                                alt={movie.movieTitle} 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-surface-container-high/50">
                                <CameraOff className="w-8 h-8 opacity-20 mb-2" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest px-2 py-1 text-white border border-outline/50 rounded-[2px]">
                            {movie.movieStatus.replace('_', ' ')}
                        </div>
                    </div>
                    
                    {/* Details Panel */}
                    <div className="p-4 flex flex-col gap-4 border-t border-outline/50 min-h-[120px]">
                        <h4 className="font-display font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                            {movie.movieTitle}
                        </h4>
                        
                        <div className="flex flex-col gap-2 mt-auto font-mono text-xs w-full bg-surface-container-lowest p-2 rounded-[2px] border border-outline/20">
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-1.5"><DollarSign className="w-3 h-3"/> Cost</span>
                                <span className="text-on-surface font-bold text-[13px]">{formatCurrencyString(movie.purchasePriceInDollars)}</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                                <span className="flex items-center gap-1.5"><Ticket className="w-3 h-3 text-emerald-500"/> Rev</span>
                                <span className="text-emerald-500 font-bold text-[13px]">{formatCurrencyString(movie.boxOfficeRevenue)}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    );
};
