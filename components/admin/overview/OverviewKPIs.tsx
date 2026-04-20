import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, Clapperboard, Wallet, DollarSign } from "lucide-react";
import { formatCurrencyString } from "@/lib/utils";

interface OverviewKPIsProps {
  overview: {
    totalUsers: number;
    activeSeasonStats: {
      seasonName: string;
      participatingPlayers: number;
      econmy: {
        totalNetWorth: number;
        totalCashBalance: number;
      };
    };
  };
}

export const OverviewKPIs = ({ overview }: OverviewKPIsProps) => {
  const { activeSeasonStats } = overview;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {/* Total Users */}
      <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Users className="w-24 h-24 text-on-surface" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
              Platform Users
            </p>
            <div className="w-8 h-8 rounded-[2px] bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-display font-bold tracking-wide text-on-surface">
              {overview.totalUsers.toLocaleString()}
            </h3>
            <p className="text-xs text-primary mt-2 font-mono uppercase font-bold flex items-center gap-1">
              <Activity className="w-3 h-3" /> Live
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Participating Players */}
      <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Clapperboard className="w-24 h-24 text-on-surface" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
              Active Season
            </p>
            <div className="w-8 h-8 rounded-[2px] bg-primary/10 flex items-center justify-center text-primary">
              <Clapperboard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-display font-bold tracking-wide text-on-surface">
              {activeSeasonStats.participatingPlayers.toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-2 font-mono line-clamp-1">
              {activeSeasonStats.seasonName}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Economy Net Worth */}
      <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Wallet className="w-24 h-24 text-on-surface" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
              Total Net Worth
            </p>
            <div className="w-8 h-8 rounded-[2px] bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-display font-bold tracking-wide text-emerald-500">
              {formatCurrencyString(activeSeasonStats.econmy.totalNetWorth)}
            </h3>
            <p className="text-xs text-muted-foreground mt-2 font-mono flex gap-1">
              Across all active studios
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Cash Balance */}
      <Card className="rounded-[2px] border-outline bg-surface-container-low overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <DollarSign className="w-24 h-24 text-on-surface" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
              Total Cash Balance
            </p>
            <div className="w-8 h-8 rounded-[2px] bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-display font-bold tracking-wide text-on-surface">
              {formatCurrencyString(
                activeSeasonStats.econmy.totalCashBalance
              )}
            </h3>
            <p className="text-xs text-muted-foreground mt-2 font-mono flex gap-1">
              Liquid cash in season
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
