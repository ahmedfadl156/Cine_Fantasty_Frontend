import { LeagueDetails } from "@/services/leagues/leagues";
import { SectionDivider } from "./SectionDivider";

interface LeagueAboutCardProps {
    league: LeagueDetails;
}

export const LeagueAboutCard = ({ league }: LeagueAboutCardProps) => {
    return (
        <div>
            <SectionDivider label="About" />
            <div className="bg-surface-container-low p-6 border-l-2 border-primary/20">
                <p className="font-display font-bold italic text-on-surface text-xl leading-snug mb-4">
                    {league.name}
                </p>
                <div className="flex flex-col gap-2.5">
                    {[
                        {
                            label: "Created",
                            value: new Date(league.createdAt).toLocaleDateString("en-US", {
                                year: "numeric", month: "long", day: "numeric",
                            }),
                        },
                        { label: "Season", value: league.seasonInfo.name },
                        { label: "League ID", value: league._id },
                        { label: "Commissioner", value: league.ownerName },
                        { label: "Invite Code", value: league.inviteCode || "N/A" },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between gap-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container/50 whitespace-nowrap">
                                {label}
                            </span>
                            <span className="font-mono text-xs text-on-surface text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
