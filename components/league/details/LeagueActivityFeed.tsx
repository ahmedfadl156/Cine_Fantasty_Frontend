import { Film } from "lucide-react";
import { SectionDivider } from "./SectionDivider";

export const LeagueActivityFeed = () => {
    return (
        <div>
            <SectionDivider label="Recent Activity" />
            <div className="bg-surface-container-low flex flex-col items-center justify-center py-12 px-6 text-center border border-on-secondary-container/5 border-dashed">
                <Film className="w-8 h-8 text-on-secondary-container/20 mb-3" />
                <p className="font-ui text-sm text-on-secondary-container">
                    Activity feed is coming soon.
                </p>
                <p className="font-mono text-[10px] text-on-secondary-container/50 mt-1 uppercase tracking-widest">
                    Stay tuned
                </p>
            </div>
        </div>
    );
};
