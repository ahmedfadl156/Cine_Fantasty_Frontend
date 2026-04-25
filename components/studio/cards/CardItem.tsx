"use client";

import { type Card } from "@/services/cards/cards";
import { Shield, TrendingUp, Zap, Star } from "lucide-react";

interface CardItemProps {
    card: Card;
    onActivate: (card: Card) => void;
}

const getCardIcon = (code: string) => {
    switch (code) {
        case "BLOCKBUSTER_BET":
            return TrendingUp;
        case "STREAMING_DEAL":
            return Shield;
        case "SLEEPER_HIT":
            return Zap;
        default:
            return Star;
    }
};

const getCardAccentColor = (code: string) => {
    switch (code) {
        case "BLOCKBUSTER_BET":
            return {
                border: "border-[#D4AF37]/30",
                glow: "shadow-[0_0_20px_rgba(212,175,55,0.08)]",
                iconBg: "bg-[#D4AF37]/10",
                iconColor: "text-[#D4AF37]",
                badge: "bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/25",
                button: "bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60",
                multiplierColor: "text-[#D4AF37]",
                shimmer: "from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0",
            };
        case "STREAMING_DEAL":
            return {
                border: "border-[#4E9268]/30",
                glow: "shadow-[0_0_20px_rgba(78,146,104,0.08)]",
                iconBg: "bg-[#4E9268]/10",
                iconColor: "text-[#4E9268]",
                badge: "bg-[#4E9268]/15 text-[#4E9268] border-[#4E9268]/25",
                button: "bg-[#4E9268]/10 hover:bg-[#4E9268]/20 text-[#4E9268] border border-[#4E9268]/30 hover:border-[#4E9268]/60",
                multiplierColor: "text-[#4E9268]",
                shimmer: "from-[#4E9268]/0 via-[#4E9268]/5 to-[#4E9268]/0",
            };
        case "SLEEPER_HIT":
            return {
                border: "border-primary/30",
                glow: "shadow-[0_0_20px_rgba(200,53,42,0.08)]",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
                badge: "bg-primary/15 text-primary border-primary/25",
                button: "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/60",
                multiplierColor: "text-primary",
                shimmer: "from-primary/0 via-primary/5 to-primary/0",
            };
        default:
            return {
                border: "border-on-secondary-container/20",
                glow: "",
                iconBg: "bg-surface-container-high",
                iconColor: "text-on-secondary-container",
                badge: "bg-surface-container-high text-on-secondary-container border-on-secondary-container/20",
                button: "bg-surface-container-high hover:bg-surface-bright text-on-surface border border-on-secondary-container/20",
                multiplierColor: "text-on-surface",
                shimmer: "from-white/0 via-white/3 to-white/0",
            };
    }
};

export const CardItem = ({ card, onActivate }: CardItemProps) => {
    const Icon = getCardIcon(card.code);
    const colors = getCardAccentColor(card.code);

    const formatBudget = (budget: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            maximumFractionDigits: 0,
        }).format(budget);

    return (
        <div
            className={`
                group relative flex flex-col bg-surface-container-low border ${colors.border}
                ${colors.glow} cinematic-transition overflow-hidden
                hover:bg-surface-container-high
            `}
        >
            {/* Shimmer overlay on hover */}
            <div
                className={`
                    absolute inset-0 -translate-x-full group-hover:translate-x-full
                    bg-gradient-to-r ${colors.shimmer}
                    transition-transform duration-700 ease-in-out pointer-events-none
                `}
            />

            {/* Top row: icon + badges */}
            <div className="relative flex items-start justify-between p-5 pb-4">
                <div className={`flex items-center justify-center w-10 h-10 ${colors.iconBg}`}>
                    <Icon className={`w-5 h-5 ${colors.iconColor}`} />
                </div>

                <div className="flex flex-col items-end gap-1.5">
                    {card.isProtection && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${colors.badge}`}>
                            <Shield className="w-2.5 h-2.5" />
                            Protection
                        </span>
                    )}
                    {card.budgetConstraint && (
                        <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest bg-surface-container-high text-on-secondary-container border border-on-secondary-container/15">
                            Under {formatBudget(card.budgetConstraint)}
                        </span>
                    )}
                </div>
            </div>

            {/* Card name + description */}
            <div className="relative px-5 pb-4 flex-1">
                <h3 className="font-display font-bold italic text-on-surface text-lg leading-tight mb-2">
                    {card.name}
                </h3>
                <p className="font-ui font-light text-xs text-on-secondary-container leading-relaxed">
                    {card.description}
                </p>
            </div>

            {/* Multiplier stat */}
            <div className="relative px-5 pb-4">
                <div className="flex items-baseline gap-1.5">
                    <span className={`font-mono font-bold text-2xl ${colors.multiplierColor}`}>
                        {card.isProtection ? "100%" : `${card.multiplier}×`}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                        {card.isProtection ? "refund on flop" : "profit multiplier"}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-on-secondary-container/10" />

            {/* Activate button */}
            <div className="relative p-4">
                <button
                    id={`activate-card-${card.code}`}
                    onClick={() => onActivate(card)}
                    className={`
                        w-full py-2.5 text-[10px] font-mono uppercase tracking-widest
                        ${colors.button} cinematic-transition
                        flex items-center justify-center gap-2
                    `}
                >
                    <Zap className="w-3 h-3" />
                    Activate Card
                </button>
            </div>
        </div>
    );
};
