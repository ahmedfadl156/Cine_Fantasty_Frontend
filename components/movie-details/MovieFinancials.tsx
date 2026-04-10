"use client";

import { DollarSign, TrendingDown, TrendingUp, BarChart3 } from "lucide-react";

interface MovieFinancialsProps {
    budgetInDollars: number;
    realLifeRevenue: number;
    purchasePriceInDollars: number;
    currentProfitOrLoss: number;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(Math.abs(value));

const formatFullCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(Math.abs(value));

export const MovieFinancials = ({
    budgetInDollars,
    realLifeRevenue,
    purchasePriceInDollars,
    currentProfitOrLoss,
}: MovieFinancialsProps) => {
    const isProfit = currentProfitOrLoss >= 0;
    const profitColor = isProfit ? "text-[#4E9268]" : "text-[#A85A3A]";

    const stats = [
        {
            label: "Production Budget",
            value: budgetInDollars === 0 ? "Not Announced" : formatCurrency(budgetInDollars),
            fullValue: budgetInDollars === 0 ? "Not Announced" : formatFullCurrency(budgetInDollars),
            icon: DollarSign,
            iconColor: "text-on-secondary-container",
            accent: false,
        },
        {
            label: "Real-Life Revenue",
            value: realLifeRevenue > 0 ? formatCurrency(realLifeRevenue) : "Unreleased",
            fullValue:
                realLifeRevenue > 0 ? formatFullCurrency(realLifeRevenue) : "—",
            icon: BarChart3,
            iconColor: "text-on-secondary-container",
            accent: false,
        },
        {
            label: "Your Draft Price",
            value: formatCurrency(purchasePriceInDollars),
            fullValue: formatFullCurrency(purchasePriceInDollars),
            icon: DollarSign,
            iconColor: "text-primary",
            accent: true,
        },
        {
            label: "Current P&L",
            value:
                (isProfit ? "+" : "-") + formatCurrency(currentProfitOrLoss),
            fullValue:
                (isProfit ? "+" : "-") + formatFullCurrency(currentProfitOrLoss),
            icon: isProfit ? TrendingUp : TrendingDown,
            iconColor: profitColor,
            accent: false,
            valueColor: profitColor,
        },
    ];

    return (
        <section className="bg-surface-container-low py-16">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Signature divider */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-on-secondary-container/20" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container shrink-0">
                        Financials
                    </span>
                    <div className="flex-1 h-px bg-on-secondary-container/20" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-on-secondary-container/10">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className={`relative flex flex-col gap-4 p-8 ${
                                    stat.accent
                                        ? "bg-primary/5 border-t-2 border-primary"
                                        : "bg-surface-container-low"
                                } group cinematic-transition hover:bg-surface-container-high`}
                                title={stat.fullValue}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-on-secondary-container">
                                        {stat.label}
                                    </span>
                                    <Icon
                                        className={`w-4 h-4 ${stat.iconColor}`}
                                    />
                                </div>
                                <p
                                    className={`font-mono text-3xl font-medium ${
                                        stat.valueColor
                                            ? stat.valueColor
                                            : stat.accent
                                            ? "text-primary"
                                            : "text-on-surface"
                                    }`}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-[11px] font-mono text-on-secondary-container/60 -mt-2">
                                    {stat.fullValue}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
