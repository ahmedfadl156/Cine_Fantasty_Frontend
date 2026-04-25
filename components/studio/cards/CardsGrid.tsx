"use client";

import { useState } from "react";
import { useGetCards } from "@/hooks/cards/use-cards";
import { CardItem } from "./CardItem";
import { ActivateCardModal } from "./ActivateCardModal";
import { type Card } from "@/services/cards/cards";
import { type MyStudioFilm } from "@/services/movies/getMovies";
import { CreditCard, AlertCircle } from "lucide-react";

interface CardsGridProps {
    films: MyStudioFilm[];
}

const SkeletonCard = () => (
    <div className="flex flex-col bg-surface-container-low border border-on-secondary-container/10 animate-pulse">
        <div className="flex items-start justify-between p-5 pb-4">
            <div className="w-10 h-10 bg-surface-bright" />
            <div className="w-20 h-5 bg-surface-bright" />
        </div>
        <div className="px-5 pb-4 flex-1 flex flex-col gap-2">
            <div className="h-5 bg-surface-bright w-3/4" />
            <div className="h-3 bg-surface-bright w-full" />
            <div className="h-3 bg-surface-bright w-4/5" />
        </div>
        <div className="px-5 pb-4">
            <div className="h-7 bg-surface-bright w-28" />
        </div>
        <div className="mx-5 h-px bg-on-secondary-container/10" />
        <div className="p-4">
            <div className="h-9 bg-surface-bright w-full" />
        </div>
    </div>
);

export const CardsGrid = ({ films }: CardsGridProps) => {
    const { data, isLoading, isError, error } = useGetCards();
    const [activeCard, setActiveCard] = useState<Card | null>(null);
    const cards = data?.data?.cards ?? [];

    return (
        <>
            <div>
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                        <h2 className="font-display font-bold italic text-on-surface text-2xl leading-none">
                            Power Cards
                        </h2>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mt-1">
                            Activate a card to boost your next film(you can activate just 2 cards of 3 so choose wisley)
                        </p>
                    </div>
                </div>

                {/* Error state */}
                {isError && (
                    <div className="flex items-center gap-3 p-4 bg-[#A85A3A]/10 border border-[#A85A3A]/30 mb-4">
                        <AlertCircle className="w-4 h-4 text-[#A85A3A] flex-shrink-0" />
                        <p className="font-mono text-xs text-[#A85A3A]">
                            {error instanceof Error ? error.message : "Failed to load cards."}
                        </p>
                    </div>
                )}

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        : cards.map((card) => (
                            <CardItem
                                key={card._id}
                                card={card}
                                onActivate={setActiveCard}
                            />
                        ))}
                </div>
            </div>

            <ActivateCardModal
                isOpen={!!activeCard}
                onClose={() => setActiveCard(null)}
                card={activeCard}
                films={films}
            />
        </>
    );
};
