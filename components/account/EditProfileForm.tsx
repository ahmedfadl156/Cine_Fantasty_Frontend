"use client";

import { useState } from "react";
import { User, Mail, Save, Loader2, Edit3, X, Check } from "lucide-react";
import { useUpdateMe } from "@/hooks/auth/useAuth";

interface EditProfileFormProps {
    studioName: string;
    email: string;
}

export const EditProfileForm = ({ studioName, email }: EditProfileFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ studioName, email });
    const updateMe = useUpdateMe();

    const hasChanges = form.studioName !== studioName || form.email !== email;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasChanges) return;

        const payload: Record<string, string> = {};
        if (form.studioName !== studioName) payload.studioName = form.studioName;
        if (form.email !== email) payload.email = form.email;

        updateMe.mutate(payload, {
            onSuccess: () => setIsEditing(false),
        });
    };

    const handleCancel = () => {
        setForm({ studioName, email });
        setIsEditing(false);
    };

    return (
        <div className="bg-surface-container-low border border-[#5c554d]/30">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#5c554d]/20">
                <div className="flex items-center gap-3">
                    <div className="w-px h-5 bg-[#c8352a]" />
                    <h2 className="font-display italic font-bold text-xl text-[#eee4d4]">
                        Studio Profile
                    </h2>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        id="edit-profile-btn"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#9c8e7e] border border-[#5c554d]/40 hover:border-[#c8352a]/50 hover:text-[#c8352a] transition-all duration-300"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                    </button>
                ) : (
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#9c8e7e] border border-[#5c554d]/40 hover:border-[#9c8e7e]/50 transition-all duration-300"
                    >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                {/* Studio Name */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e]">
                        <User className="w-3.5 h-3.5" />
                        Studio Name
                    </label>
                    {isEditing ? (
                        <input
                            id="studio-name-input"
                            type="text"
                            value={form.studioName}
                            onChange={(e) => setForm((f) => ({ ...f, studioName: e.target.value }))}
                            className="w-full bg-[#16130f] border border-[#5c554d]/50 focus:border-[#c8352a]/70 text-[#eee4d4] font-mono text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#5c554d]"
                            placeholder="Your studio name..."
                            required
                        />
                    ) : (
                        <p className="font-mono text-sm text-[#eee4d4] px-4 py-3 bg-[#16130f]/50 border border-[#5c554d]/20">
                            {studioName}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e]">
                        <Mail className="w-3.5 h-3.5" />
                        Email Address
                    </label>
                    {isEditing ? (
                        <input
                            id="email-input"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            className="w-full bg-[#16130f] border border-[#5c554d]/50 focus:border-[#c8352a]/70 text-[#eee4d4] font-mono text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#5c554d]"
                            placeholder="your@email.com"
                            required
                        />
                    ) : (
                        <p className="font-mono text-sm text-[#eee4d4] px-4 py-3 bg-[#16130f]/50 border border-[#5c554d]/20">
                            {email}
                        </p>
                    )}
                </div>

                {/* Save Button */}
                {isEditing && (
                    <div className="flex items-center justify-end pt-2">
                        <button
                            id="save-profile-btn"
                            type="submit"
                            disabled={updateMe.isPending || !hasChanges}
                            className="flex items-center gap-2.5 px-6 py-3 bg-[#c8352a] hover:bg-[#b02e24] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono uppercase tracking-widest transition-all duration-300"
                        >
                            {updateMe.isPending ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};
