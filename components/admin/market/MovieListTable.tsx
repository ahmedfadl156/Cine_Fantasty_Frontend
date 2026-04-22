"use client";

import React from "react";
import { Edit2, ChevronLeft, ChevronRight, TrendingUp, Clock, Archive } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface MovieListTableProps {
    movies: any[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalMovies: number;
    };
    onPageChange: (newPage: number) => void;
    onEdit: (movie: any) => void;
}

export const MovieListTable = ({ movies, pagination, onPageChange, onEdit }: MovieListTableProps) => {

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "IN_THEATERS": return <TrendingUp className="w-3.5 h-3.5 mr-1" />;
            case "UPCOMING": return <Clock className="w-3.5 h-3.5 mr-1" />;
            case "FINISHED": return <Archive className="w-3.5 h-3.5 mr-1" />;
            default: return null;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "IN_THEATERS": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "UPCOMING": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "FINISHED": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
            default: return "bg-accent/20 text-white border-accent/30";
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-white/5 text-gray-400 font-ui text-xs uppercase tracking-wider border-b border-white/10">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Movie Title</th>
                                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                                <th scope="col" className="px-6 py-4 font-medium">Release Date</th>
                                <th scope="col" className="px-6 py-4 font-medium">Base Price</th>
                                <th scope="col" className="px-6 py-4 font-medium">Box Office</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {movies.map((movie) => (
                                <tr key={movie._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-display font-medium text-white group-hover:text-primary transition-colors">
                                                {movie.title}
                                            </span>
                                            {movie.seasonId && (
                                                <span className="text-xs text-gray-500 mt-0.5">
                                                    Season: {movie.seasonId.name}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(movie.status)}`}>
                                            {getStatusIcon(movie.status)}
                                            {movie.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 font-mono text-xs">
                                        {movie.releaseDate ? format(new Date(movie.releaseDate), "MMM dd, yyyy") : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono">
                                        ${((movie.basePrice || 0) / 100).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-emerald-400 font-mono font-medium drop-shadow-[0_0_5px_rgba(16,185,129,0.2)]">
                                        ${((movie.boxOfficeRevenue || 0) / 100).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-400 hover:text-white hover:bg-white/10"
                                            onClick={() => onEdit(movie)}
                                        >
                                            <Edit2 className="w-4 h-4 mr-1.5" />
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {movies.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No movies found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/20">
                    <div className="text-sm text-gray-400">
                        Showing <span className="font-medium text-white">{movies.length}</span> of{' '}
                        <span className="font-medium text-white">{pagination.totalMovies}</span> movies
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-white/10 hover:bg-white/5"
                            onClick={() => onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Prev
                        </Button>
                        <span className="text-sm font-medium text-gray-300 px-2 min-w-[3rem] text-center">
                            {pagination.currentPage} / {pagination.totalPages || 1}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent border-white/10 hover:bg-white/5"
                            onClick={() => onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= (pagination.totalPages || 1)}
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
