"use client";

export const AccountSkeleton = () => (
    <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="bg-surface-container-low border border-[#5c554d]/30 p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-28 h-28 bg-surface-container-high shrink-0" />
                <div className="flex-1 space-y-3">
                    <div className="h-9 w-56 bg-surface-container-high" />
                    <div className="h-4 w-44 bg-surface-bright/50" />
                    <div className="flex gap-6 mt-4">
                        <div className="h-3 w-32 bg-surface-bright/40" />
                        <div className="h-3 w-28 bg-surface-bright/40" />
                    </div>
                </div>
                <div className="w-full md:w-56 h-40 bg-surface-container-high" />
            </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface-container-low border border-[#5c554d]/30 h-64" />
                <div className="bg-surface-container-low border border-[#5c554d]/30 h-80" />
            </div>
            <div className="space-y-4">
                <div className="bg-surface-container-low border border-[#5c554d]/30 h-56" />
                <div className="bg-surface-container-low border border-[#5c554d]/30 h-64" />
            </div>
        </div>
    </div>
);
