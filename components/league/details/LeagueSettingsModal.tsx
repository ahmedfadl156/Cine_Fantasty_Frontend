"use client";

import { useState } from "react";
import {
    X,
    Settings,
    Globe,
    Lock,
    Crown,
    UserMinus,
    LogOut,
    AlertTriangle,
    Loader2,
    Save,
    Shield,
} from "lucide-react";
import {
    useUpdateLeagueSettings,
    useLeaveLeague,
    useKickPlayerFromLeague,
} from "@/hooks/leagues/useLeagues";
import { LeagueDetails, LeagueLeaderboardData } from "@/services/leagues/leagues";
import { useRouter } from "next/navigation";

interface LeagueSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    league: LeagueDetails;
    leaderboardData?: LeagueLeaderboardData;
}

type Tab = "settings" | "members" | "danger";

const LeagueSettingsModal = ({
    isOpen,
    onClose,
    league,
    leaderboardData,
}: LeagueSettingsModalProps) => {
    const router = useRouter();
    const isAdmin = league.role === "OWNER";

    const [activeTab, setActiveTab] = useState<Tab>(isAdmin ? "settings" : "danger");
    const [leagueName, setLeagueName] = useState(league.name);
    const [isPublic, setIsPublic] = useState(league.isPublic);
    const [kickConfirmId, setKickConfirmId] = useState<string | null>(null);
    const [leaveConfirmed, setLeaveConfirmed] = useState(false);

    const { mutate: updateSettings, isPending: isSavingSettings } = useUpdateLeagueSettings();
    const { mutate: leaveLeague, isPending: isLeaving } = useLeaveLeague();
    const { mutate: kickPlayer, isPending: isKicking } = useKickPlayerFromLeague();

    const members = leaderboardData?.leaderboard ?? [];
    const hasChanges = leagueName !== league.name || isPublic !== league.isPublic;

    const handleSaveSettings = () => {
        if (!hasChanges) return;
        updateSettings(
            { leagueId: league._id, settings: { name: leagueName, isPublic } },
            { onSuccess: onClose }
        );
    };

    const handleLeave = () => {
        if (!leaveConfirmed) return;
        leaveLeague(league._id, {
            onSuccess: () => {
                onClose();
                router.push("/leagues");
            },
        });
    };

    const handleKick = (playerId: string) => {
        kickPlayer(
            { leagueId: league._id, playerId },
            { onSuccess: () => setKickConfirmId(null) }
        );
    };

    if (!isOpen) return null;

    const tabs: { id: Tab; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
        { id: "settings", label: "Settings", icon: <Settings className="w-3.5 h-3.5" />, adminOnly: true },
        { id: "members", label: "Members", icon: <Shield className="w-3.5 h-3.5" />, adminOnly: true },
        { id: "danger", label: isAdmin ? "Danger" : "Leave", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    ];

    const visibleTabs = tabs.filter((t) => !t.adminOnly || isAdmin);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full max-w-2xl mx-4 bg-surface-container-low border border-on-secondary-container/15 shadow-2xl max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-on-secondary-container/10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Settings className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold italic text-on-surface text-xl leading-none">
                                League Settings
                            </h2>
                            <p className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/50 mt-0.5">
                                {league.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-on-secondary-container hover:text-on-surface cinematic-transition p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-on-secondary-container/10 flex-shrink-0">
                    {visibleTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3.5 font-mono text-[10px] uppercase tracking-widest cinematic-transition border-b-2 ${
                                activeTab === tab.id
                                    ? tab.id === "danger"
                                        ? "border-[#A85A3A] text-[#A85A3A]"
                                        : "border-primary text-primary"
                                    : "border-transparent text-on-secondary-container hover:text-on-surface"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Body — scrollable */}
                <div className="flex-1 overflow-y-auto">

                    {/* ── SETTINGS TAB ── */}
                    {activeTab === "settings" && isAdmin && (
                        <div className="px-8 py-8 flex flex-col gap-8">

                            {/* League Name */}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                                    League Name
                                </label>
                                <input
                                    type="text"
                                    value={leagueName}
                                    onChange={(e) => setLeagueName(e.target.value)}
                                    placeholder="League name..."
                                    className="underline-input w-full py-2.5 text-base placeholder:text-on-secondary-container/30 font-ui font-light"
                                />
                            </div>

                            {/* Visibility Toggle */}
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container">
                                    Visibility
                                </label>
                                <div className="grid grid-cols-2 gap-px bg-on-secondary-container/10">
                                    <button
                                        onClick={() => setIsPublic(true)}
                                        className={`flex items-center gap-3 p-4 cinematic-transition ${
                                            isPublic
                                                ? "bg-primary/10 border border-primary/30"
                                                : "bg-surface-container-high hover:bg-surface-bright"
                                        }`}
                                    >
                                        <Globe className={`w-4 h-4 ${isPublic ? "text-primary" : "text-on-secondary-container"}`} />
                                        <div className="text-left">
                                            <p className={`font-ui font-medium text-sm ${isPublic ? "text-primary" : "text-on-surface"}`}>
                                                Public
                                            </p>
                                            <p className="font-mono text-[9px] text-on-secondary-container uppercase tracking-wider">
                                                Open to all studios
                                            </p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setIsPublic(false)}
                                        className={`flex items-center gap-3 p-4 cinematic-transition ${
                                            !isPublic
                                                ? "bg-primary/10 border border-primary/30"
                                                : "bg-surface-container-high hover:bg-surface-bright"
                                        }`}
                                    >
                                        <Lock className={`w-4 h-4 ${!isPublic ? "text-primary" : "text-on-secondary-container"}`} />
                                        <div className="text-left">
                                            <p className={`font-ui font-medium text-sm ${!isPublic ? "text-primary" : "text-on-surface"}`}>
                                                Private
                                            </p>
                                            <p className="font-mono text-[9px] text-on-secondary-container uppercase tracking-wider">
                                                Invite code only
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-on-secondary-container/10">
                                <button
                                    onClick={onClose}
                                    className="font-mono text-xs uppercase tracking-wider text-on-secondary-container hover:text-on-surface cinematic-transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveSettings}
                                    disabled={!hasChanges || isSavingSettings || !leagueName.trim()}
                                    className="flex items-center gap-2 bg-primary text-on-surface px-6 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-primary/80 cinematic-transition shadow-[0_0_20px_rgba(200,53,42,0.25)] disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {isSavingSettings ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                        <Save className="w-3.5 h-3.5" />
                                    )}
                                    {isSavingSettings ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── MEMBERS TAB (admin only) ── */}
                    {activeTab === "members" && isAdmin && (
                        <div className="flex flex-col">
                            {/* Column header */}
                            <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-8 py-3 border-b border-on-secondary-container/8">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">Studio</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-on-secondary-container/40">Action</span>
                            </div>

                            <div className="divide-y divide-on-secondary-container/5">
                                {members.length === 0 && (
                                    <p className="px-8 py-10 text-center font-mono text-sm text-on-secondary-container/50">
                                        No members found.
                                    </p>
                                )}
                                {members.map((member) => (
                                    <div
                                        key={member.userId}
                                        className="grid grid-cols-[1fr_auto] items-center gap-4 px-8 py-4 hover:bg-surface-container-high cinematic-transition"
                                    >
                                        {/* Studio info */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center font-display font-bold italic text-sm ${
                                                    member.isMe
                                                        ? "bg-primary text-on-surface"
                                                        : "bg-surface-container-highest text-on-surface"
                                                }`}
                                            >
                                                {member.studioName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`font-ui font-medium text-sm truncate ${member.isMe ? "text-primary" : "text-on-surface"}`}>
                                                    {member.studioName}
                                                    {member.isMe && (
                                                        <span className="ml-2 font-mono text-[9px] text-primary/70 uppercase tracking-wider">you</span>
                                                    )}
                                                </p>
                                                <p className="font-mono text-[10px] text-on-secondary-container/50 uppercase tracking-wider">
                                                    Rank #{member.rank}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Kick action */}
                                        {member.isMe ? (
                                            <div className="flex items-center gap-1.5">
                                                <Crown className="w-3.5 h-3.5 text-primary/60" />
                                                <span className="font-mono text-[9px] uppercase tracking-widest text-primary/60">Owner</span>
                                            </div>
                                        ) : kickConfirmId === member.userId ? (
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-[9px] text-on-secondary-container/60 uppercase tracking-wider hidden sm:block">
                                                    Sure?
                                                </span>
                                                <button
                                                    onClick={() => handleKick(member.userId)}
                                                    disabled={isKicking}
                                                    className="flex items-center gap-1.5 bg-[#A85A3A] text-white px-3 py-1.5 text-[10px] font-ui font-medium uppercase tracking-widest hover:bg-[#A85A3A]/80 cinematic-transition disabled:opacity-50"
                                                >
                                                    {isKicking ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <UserMinus className="w-3 h-3" />
                                                    )}
                                                    Kick
                                                </button>
                                                <button
                                                    onClick={() => setKickConfirmId(null)}
                                                    className="font-mono text-[10px] uppercase tracking-wider text-on-secondary-container hover:text-on-surface cinematic-transition px-2 py-1.5"
                                                >
                                                    No
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setKickConfirmId(member.userId)}
                                                className="flex items-center gap-1.5 border border-[#A85A3A]/30 text-[#A85A3A]/70 px-3 py-1.5 text-[10px] font-ui uppercase tracking-widest hover:border-[#A85A3A] hover:text-[#A85A3A] cinematic-transition"
                                            >
                                                <UserMinus className="w-3 h-3" />
                                                Kick
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── DANGER / LEAVE TAB ── */}
                    {activeTab === "danger" && (
                        <div className="px-8 py-8 flex flex-col gap-6">
                            {/* Danger zone warning banner */}
                            <div className="flex items-start gap-3 p-4 bg-[#A85A3A]/8 border border-[#A85A3A]/25">
                                <AlertTriangle className="w-4 h-4 text-[#A85A3A] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#A85A3A] font-medium">
                                        Danger Zone
                                    </p>
                                    <p className="font-ui text-sm text-on-secondary-container mt-1">
                                        {isAdmin
                                            ? "As the owner, leaving will permanently disband the league. All members will be removed and the league cannot be recovered."
                                            : "Once you leave, your standings and activity will be removed from this league. You can rejoin with an invite code."}
                                    </p>
                                </div>
                            </div>

                            {/* Leave league card */}
                            <div className="border border-[#A85A3A]/20 bg-surface-container-high">
                                <div className="px-6 py-4 border-b border-[#A85A3A]/10 flex items-center gap-3">
                                    <LogOut className="w-4 h-4 text-[#A85A3A]" />
                                    <h3 className="font-ui font-medium text-sm text-on-surface">
                                        {isAdmin ? "Disband League" : "Leave League"}
                                    </h3>
                                </div>

                                <div className="px-6 py-5 flex flex-col gap-5">
                                    <p className="font-mono text-xs text-on-secondary-container/70 leading-relaxed">
                                        You are about to leave{" "}
                                        <span className="text-on-surface font-medium">{league.name}</span>.
                                        {isAdmin && " This action will disband the league entirely."}
                                    </p>

                                    {/* Confirmation checkbox */}
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex-shrink-0">
                                            <input
                                                type="checkbox"
                                                checked={leaveConfirmed}
                                                onChange={(e) => setLeaveConfirmed(e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-4 h-4 border cinematic-transition ${
                                                    leaveConfirmed
                                                        ? "bg-[#A85A3A] border-[#A85A3A]"
                                                        : "border-on-secondary-container/30 group-hover:border-[#A85A3A]/50"
                                                } flex items-center justify-center`}
                                            >
                                                {leaveConfirmed && (
                                                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-on-secondary-container group-hover:text-on-surface cinematic-transition">
                                            I understand this action cannot be undone
                                        </span>
                                    </label>

                                    <div className="flex items-center justify-between pt-2">
                                        <button
                                            onClick={onClose}
                                            className="font-mono text-xs uppercase tracking-wider text-on-secondary-container hover:text-on-surface cinematic-transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleLeave}
                                            disabled={!leaveConfirmed || isLeaving}
                                            className="flex items-center gap-2 bg-[#A85A3A] text-white px-6 py-3 text-xs font-ui font-medium uppercase tracking-widest hover:bg-[#A85A3A]/80 cinematic-transition shadow-[0_0_20px_rgba(168,90,58,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            {isLeaving ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <LogOut className="w-3.5 h-3.5" />
                                            )}
                                            {isLeaving
                                                ? isAdmin ? "Disbanding..." : "Leaving..."
                                                : isAdmin ? "Disband League" : "Leave League"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default LeagueSettingsModal;