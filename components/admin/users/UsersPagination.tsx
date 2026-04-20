"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
}

export const UsersPagination = ({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }: PaginationProps) => {
    return (
        <div className="flex items-center justify-between border-t border-outline/50 pt-6 mt-auto">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest hidden sm:block">
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                    onClick={() => hasPreviousPage && onPageChange(currentPage - 1)}
                    disabled={!hasPreviousPage}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase bg-surface-container-lowest border border-outline hover:bg-surface-container-high hover:text-primary disabled:opacity-50 disabled:hover:text-foreground disabled:cursor-not-allowed transition-colors rounded-[2px]"
                >
                    <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest sm:hidden">
                    {currentPage} / {totalPages}
                </div>
                <button
                    onClick={() => hasNextPage && onPageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase bg-surface-container-lowest border border-outline hover:bg-surface-container-high hover:text-primary disabled:opacity-50 disabled:hover:text-foreground disabled:cursor-not-allowed transition-colors rounded-[2px]"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
