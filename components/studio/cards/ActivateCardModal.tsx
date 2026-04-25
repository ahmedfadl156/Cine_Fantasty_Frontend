"use client";

import { useState, useEffect } from "react";
import { X, Zap, AlertCircle, Film, ChevronDown } from "lucide-react";
import { useActivateCard } from "@/hooks/cards/use-cards";
import { type Card } from "@/services/cards/cards";
import { type MyStudioFilm } from "@/services/movies/getMovies";
import { toast } from "sonner";
import Image from "next/image";

interface ActivateCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: Card | null;
    films: MyStudioFilm[];
}

const getPosterUrl = (path: string) =>
    path?.startsWith("http") ? path : `https://image.tmdb.org/t/p/w92${path}`;

const formatBudget = (budget: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 0,
    }).format(budget);

export const ActivateCardModal = ({ isOpen, onClose, card, films }: ActivateCardModalProps) => {
    const [selectedMovieId, setSelectedMovieId] = useState<string>("");
    const activateMutation = useActivateCard();

    useEffect(() => {
        if (isOpen) {
            setSelectedMovieId("");
        }
    }, [isOpen, card]);

    if (!isOpen || !card) return null;


    const eligibleFilms = films.filter(
        (f) => f.status === "ACTIVE"
    );

    const selectedFilm = eligibleFilms.find((f) => f._id === selectedMovieId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedMovieId) {
            toast.error("Please select a movie to apply this card to.");
            return;
        }

        activateMutation.mutate(
            { cardId: card._id, movieId: selectedMovieId },
            {
                onSuccess: () => {
                    toast.success(`${card.name} activated on ${selectedFilm?.movieDetails?.title ?? "movie"}!`);
                    onClose();
                },
                onError: (err: unknown) => {
                    const message = err instanceof Error ? err.message : "Failed to activate card";
                    toast.error(message);
                },
            }
        );
    };

    const isPending = activateMutation.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal panel */}
            <div className="relative w-full max-w-lg bg-surface-container-lowest border border-on-secondary-container/20 shadow-2xl overflow-hidden">
                {/* Header stripe */}
                <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

                {/* Close button */}
                <button
                    id="activate-modal-close"
                    onClick={onClose}
                    className="absolute right-4 top-5 p-1.5 text-on-secondary-container hover:text-on-surface hover:bg-surface-container-high cinematic-transition"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="p-6">
                    {/* Card identity */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-0.5">
                                Activate Card
                            </p>
                            <h2 className="font-display font-bold italic text-on-surface text-2xl leading-tight">
                                {card.name}
                            </h2>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="font-ui font-light text-sm text-on-secondary-container mb-6 leading-relaxed border-l-2 border-primary/30 pl-4">
                        {card.description}
                    </p>

                    {/* Budget constraint notice */}
                    {card.budgetConstraint && (
                        <div className="flex items-start gap-2.5 bg-surface-container-low border border-on-secondary-container/15 p-3 mb-6">
                            <AlertCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <p className="font-mono text-xs text-[#D4AF37]">
                                This card only applies to movies with a production budget under{" "}
                                <strong>{formatBudget(card.budgetConstraint)}</strong>.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Movie selector */}
                        <div>
                            <label
                                htmlFor="activate-card-movie-select"
                                className="block font-mono text-[10px] uppercase tracking-widest text-on-secondary-container mb-2"
                            >
                                Select Movie
                            </label>

                            {eligibleFilms.length === 0 ? (
                                <div className="flex items-center gap-3 p-4 bg-surface-container-low border border-on-secondary-container/15">
                                    <Film className="w-4 h-4 text-on-secondary-container/50 flex-shrink-0" />
                                    <p className="font-ui font-light text-sm text-on-secondary-container">
                                        No eligible films in your studio. Draft movies from the market first.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <select
                                        id="activate-card-movie-select"
                                        value={selectedMovieId}
                                        onChange={(e) => setSelectedMovieId(e.target.value)}
                                        className="
                                            w-full appearance-none bg-surface-container-low
                                            border border-on-secondary-container/20 focus:border-primary
                                            text-on-surface font-ui font-light text-sm
                                            px-4 py-3 pr-10 outline-none cinematic-transition
                                        "
                                    >
                                        <option value="" className="bg-surface-container-low text-on-secondary-container">
                                            — Choose a movie —
                                        </option>
                                        {eligibleFilms.map((film) => (
                                            <option
                                                key={film._id}
                                                value={film._id}
                                                className="bg-surface-container-low text-on-surface"
                                            >
                                                {film.movieDetails?.title ?? "Unknown Title"} ({film.status})
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-secondary-container pointer-events-none" />
                                </div>
                            )}
                        </div>

                        {/* Selected film preview */}
                        {selectedFilm && (
                            <div className="flex items-center gap-3 bg-surface-container-low border border-primary/20 p-3">
                                <div className="relative w-9 h-[54px] flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={getPosterUrl(selectedFilm.movieDetails?.posterPath)}
                                        alt={selectedFilm.movieDetails?.title}
                                        fill
                                        className="object-cover"
                                        sizes="36px"
                                    />
                                </div>
                                <div>
                                    <p className="font-ui font-medium text-on-surface text-sm leading-tight">
                                        {selectedFilm.movieDetails?.title}
                                    </p>
                                    <p className="font-mono text-[10px] text-on-secondary-container uppercase tracking-wider mt-0.5">
                                        {selectedFilm.status}
                                    </p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="font-mono text-xs text-on-surface">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            notation: "compact",
                                            maximumFractionDigits: 1,
                                        }).format(selectedFilm.purchasePriceInDollars)}
                                    </p>
                                    <p className="font-mono text-[10px] text-on-secondary-container">purchased</p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-on-secondary-container/10">
                            <button
                                type="button"
                                id="activate-modal-cancel"
                                onClick={onClose}
                                className="px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest text-on-secondary-container hover:text-on-surface border border-on-secondary-container/20 hover:border-on-secondary-container/40 cinematic-transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                id="activate-modal-confirm"
                                disabled={isPending || eligibleFilms.length === 0}
                                className="px-6 py-2.5 text-[10px] font-mono uppercase tracking-widest bg-primary text-on-surface hover:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed cinematic-transition flex items-center gap-2 shadow-[0_0_15px_rgba(200,53,42,0.25)]"
                            >
                                <Zap className="w-3 h-3" />
                                {isPending ? "Activating…" : "Activate Card"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
