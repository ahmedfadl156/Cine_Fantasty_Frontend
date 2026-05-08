"use client";

import React, { Suspense } from "react";
import { TransferMarketGrid } from "@/components/transferMarket/TransferMarketGrid";
import { ArrowLeftRight } from "lucide-react";

const TransferMarketContent = () => {
    return (
        <main className="flex flex-col px-4 lg:px-8 py-8 w-full max-w-7xl mx-auto pb-24">
            {/* Page header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary/15">
                        <ArrowLeftRight className="w-4 h-4 text-primary" />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                        Studio-to-Studio Trading
                    </p>
                </div>
                <h1 className="font-display font-bold italic text-on-surface text-4xl md:text-5xl leading-tight">
                    Transfer Market
                </h1>
                <p className="font-ui font-light text-sm text-on-secondary-container mt-2 max-w-xl">
                    Buy and sell studio assets with other players. List your movies at a price
                    within ±20% of the current system value — or scout for deals.
                </p>
            </div>

            {/* Grid with filters, cards and pagination */}
            <TransferMarketGrid />
        </main>
    );
};

const TransferMarketPage = () => {
    return (
        <Suspense
            fallback={
                <main className="flex items-center justify-center min-h-[70vh]">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </main>
            }
        >
            <TransferMarketContent />
        </Suspense>
    );
};

export default TransferMarketPage;
