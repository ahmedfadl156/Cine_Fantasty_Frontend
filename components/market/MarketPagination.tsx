import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalMovies: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export const MarketPagination = ({ 
    pagination, 
    onPageChange 
}: { 
    pagination: PaginationData, 
    onPageChange: (page: number) => void 
}) => {
    if (!pagination || pagination.totalPages <= 1) return null;

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-16 mb-8 w-full">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => onPageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPreviousPage}
                    className="flex items-center justify-center w-10 h-10 rounded-sm bg-surface-container border border-outline/20 text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-container disabled:hover:text-on-surface transition-all select-none"
                    aria-label="Previous Page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="hidden md:flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum = pagination.currentPage;
                        if (pagination.currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (pagination.currentPage >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                        } else {
                            pageNum = pagination.currentPage - 2 + i;
                        }
                        
                        if (pageNum < 1 || pageNum > pagination.totalPages) return null;

                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-10 h-10 flex items-center justify-center rounded-sm font-mono text-sm transition-all select-none ${
                                    pageNum === pagination.currentPage 
                                        ? 'bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(var(--color-primary),0.3)]' 
                                        : 'bg-transparent text-on-surface hover:bg-surface-container-high'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                {/* Mobile basic view */}
                <div className="md:hidden flex items-center justify-center px-4 font-mono text-sm bg-surface-container-high rounded-full py-2">
                    {pagination.currentPage} <span className="text-on-surface-muted mx-1">/</span> {pagination.totalPages}
                </div>

                <button 
                    onClick={() => onPageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="flex items-center justify-center w-10 h-10 rounded-sm bg-surface-container border border-outline/20 text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-container disabled:hover:text-on-surface transition-all select-none"
                    aria-label="Next Page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            
            <p className="text-xs text-on-surface-muted font-ui tracking-wider uppercase mt-2">
                Showing {pagination.totalMovies} Total Movies
            </p>
        </div>
    );
};
