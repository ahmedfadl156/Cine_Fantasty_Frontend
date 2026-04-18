"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { ProfileHeader } from "@/components/account/ProfileHeader";
import { EditProfileForm } from "@/components/account/EditProfileForm";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";
import { AccountMeta } from "@/components/account/AccountMeta";
import { AccountSkeleton } from "@/components/account/AccountSkeleton";
import { AlertTriangle, LogIn } from "lucide-react";
import Link from "next/link";

const AccountPage = () => {
    const { data, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
                <AccountSkeleton />
            </div>
        );
    }

    if (!data?.user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center space-y-5 max-w-sm">
                    <div className="w-16 h-16 mx-auto bg-[#c8352a]/10 border border-[#c8352a]/30 flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-[#c8352a]" />
                    </div>
                    <div>
                        <h2 className="font-display italic font-bold text-2xl text-[#eee4d4] mb-2">
                            Not Authenticated
                        </h2>
                        <p className="text-[#9c8e7e] text-sm font-mono">
                            You must be logged in to access your account profile.
                        </p>
                    </div>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8352a] hover:bg-[#b02e24] text-white text-xs font-mono uppercase tracking-widest transition-all duration-300"
                    >
                        <LogIn className="w-4 h-4" />
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    const { user, activeSeason } = data;

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
            {/* Page Title */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-px bg-[#c8352a]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e]">
                        Account
                    </span>
                </div>
                <h1 className="font-display italic font-bold text-4xl md:text-5xl text-[#eee4d4]">
                    Studio Profile
                </h1>
            </div>

            {/* Profile Header */}
            <div className="mb-8">
                <ProfileHeader
                    studioName={user.studioName}
                    email={user.email}
                    role={user.role}
                    createdAt={user.createdAt}
                    lastLogin={user.lastLogin}
                    activeSeason={activeSeason ?? null}
                />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Forms */}
                <div className="lg:col-span-2 space-y-6">
                    <EditProfileForm
                        studioName={user.studioName}
                        email={user.email}
                    />
                    <ChangePasswordForm />
                </div>

                {/* Right: Meta */}
                <div className="space-y-4">
                    <AccountMeta
                        userId={user._id}
                        createdAt={user.createdAt}
                        updatedAt={user.updatedAt}
                        lastLogin={user.lastLogin}
                        activeSeason={activeSeason ?? null}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountPage;