import { Mail, Wallet, DollarSign, Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactCurrency } from "@/lib/utils";

export const PortfolioMetrics = ({ portfolio }: { portfolio: any }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
             {/* Email */}
            <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
                <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">Contact Email</p>
                        <div className="p-2 bg-primary/10 rounded-[2px]">
                            <Mail className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-ui tracking-wide text-on-surface truncate" title={portfolio.userEmail}>
                            {portfolio.userEmail}
                        </h3>
                    </div>
                </CardContent>
            </Card>

             {/* Movies Count */}
            <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
                <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">Movies Owned</p>
                        <div className="p-2 bg-primary/10 rounded-[2px]">
                            <Film className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-4xl font-display font-bold tracking-wide text-on-surface">
                            {portfolio.moviesCount}
                        </h3>
                        <p className="text-xs text-primary mt-2 font-mono uppercase font-bold flex items-center gap-1 opacity-80">
                            Purchased Titles
                        </p>
                    </div>
                </CardContent>
            </Card>

             {/* Cash Balance */}
            <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
                <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">Cash Balance</p>
                        <div className="p-2 bg-primary/10 rounded-[2px]">
                            <DollarSign className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-4xl font-display font-bold tracking-wide text-on-surface">
                            {formatCompactCurrency(portfolio.cashBalance)}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 font-mono flex items-center gap-1 opacity-80">
                            Available Funds
                        </p>
                    </div>
                </CardContent>
            </Card>

             {/* Net Worth */}
            <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
                <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">Total Net Worth</p>
                        <div className="p-2 bg-emerald-500/10 rounded-[2px]">
                            <Wallet className="w-4 h-4 text-emerald-500" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-4xl font-display font-bold tracking-wide text-emerald-500">
                            {formatCompactCurrency(portfolio.netWorth)}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 font-mono flex items-center gap-1 opacity-80">
                            Asset Valuation
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
