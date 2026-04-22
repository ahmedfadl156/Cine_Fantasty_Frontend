"use client";

import { useState } from "react";
import { useUpdateSeasonStatus } from "@/hooks/admin/seasons/use-seasons";
import { ChevronDown} from "lucide-react";
import { toast } from "sonner";

export const SeasonStatusToggle = ({ season }: { season: any }) => {
    const { mutate: updateStatus, isPending } = useUpdateSeasonStatus();
    const [isOpen, setIsOpen] = useState(false);

    const statuses = ["PRE_SEASON", "ACTIVE", "POST_SEASON", "CLOSED"];

    const handleStatusUpdate = (newStatus: string) => {
        if (newStatus === season.status) {
            setIsOpen(false);
            return;
        }

        updateStatus({ seasonId: season._id, status: newStatus }, {
            onSuccess: () => {
                toast.success(`Season status updated to ${newStatus}`);
                setIsOpen(false);
            },
            onError: (err: any) => {
                toast.error(err.message || "Failed to update status");
            }
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "PRE_SEASON": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "POST_SEASON": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
            case "CLOSED": return "bg-red-500/20 text-red-400 border-red-500/30";
            default: return "bg-accent/20 text-accent-foreground border-accent/30";
        }
    };

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 ${getStatusColor(season.status)}`}
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
            >
                {isPending ? "Updating..." : season.status.replace("_", " ")}
                <ChevronDown className="w-3 h-3" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-md shadow-2xl bg-black border border-border/40 overflow-hidden backdrop-blur-xl">
                        <div className="p-1" role="menu">
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(status)}
                                    className={`w-full text-left flex items-center px-4 py-2 text-sm rounded-sm transition-colors ${status === season.status
                                            ? "bg-primary/20 text-primary-foreground font-medium"
                                            : "text-muted-foreground hover:bg-accent/30 hover:text-white"
                                        }`}
                                >
                                    {status.replace("_", " ")}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
