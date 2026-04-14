import { Users, Calendar, Activity, DollarSign } from "lucide-react";
import { LeagueDetails, LeagueLeaderboardData } from "@/services/leagues/leagues";

interface LeagueStatsBarProps {
    league: LeagueDetails;
    leaderboardData?: LeagueLeaderboardData;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(Math.abs(value));

const StatTile = ({
    label,
    value,
    icon: Icon,
    accent,
}: {
    label: string;
    value: string;
    icon: React.ElementType;
    accent?: boolean;
}) => (
    <div
        className={`flex flex-col gap-2 p-5 lg:p-6 ${
            accent ? "bg-primary/8 border-t-2 border-primary" : "bg-surface-container-low"
        }`}
    >
        <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container">
                {label}
            </span>
            <Icon className="w-4 h-4 text-on-secondary-container/40" />
        </div>
        <span className={`font-mono text-2xl ${accent ? "text-primary" : "text-on-surface"}`}>
            {value}
        </span>
    </div>
);

export const LeagueStatsBar = ({ league, leaderboardData }: LeagueStatsBarProps) => {
    const myStats = leaderboardData?.myStats;

    return (
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-on-secondary-container/10">
                <StatTile
                    label="Studios"
                    value={`${league.memberCount}`}
                    icon={Users}
                />
                <StatTile
                    label="Season Status"
                    value={league.seasonInfo.status}
                    icon={Calendar}
                    accent
                />
                <StatTile
                    label="Your Rank"
                    value={myStats ? `#${myStats.rank}` : "—"}
                    icon={Activity}
                />
                <StatTile
                    label="Your Portfolio"
                    value={myStats ? formatCurrency(myStats.netWorthInDollars) : "—"}
                    icon={DollarSign}
                />
            </div>
        </section>
    );
};
