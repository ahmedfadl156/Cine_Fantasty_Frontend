"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useUpdateMyPassword } from "@/hooks/auth/useAuth";

const PasswordInput = ({
    id,
    label,
    value,
    onChange,
    placeholder,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
}) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#9c8e7e]"
            >
                <Lock className="w-3.5 h-3.5" />
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#16130f] border border-[#5c554d]/50 focus:border-[#c8352a]/70 text-[#eee4d4] font-mono text-sm px-4 py-3 pr-12 outline-none transition-colors duration-200 placeholder:text-[#5c554d]"
                    placeholder={placeholder}
                    required
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5c554d] hover:text-[#9c8e7e] transition-colors"
                >
                    {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export const ChangePasswordForm = () => {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [mismatch, setMismatch] = useState(false);

    const updatePassword = useUpdateMyPassword();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMismatch(false);

        if (form.newPassword !== form.confirmPassword) {
            setMismatch(true);
            return;
        }

        updatePassword.mutate(
            {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            },
            {
                onSuccess: () => {
                    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                },
            }
        );
    };

    return (
        <div className="bg-surface-container-low border border-[#5c554d]/30">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 md:px-8 py-5 border-b border-[#5c554d]/20">
                <div className="w-px h-5 bg-[#c8352a]" />
                <h2 className="font-display italic font-bold text-xl text-[#eee4d4]">
                    Change Password
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <PasswordInput
                    id="current-password"
                    label="Current Password"
                    value={form.currentPassword}
                    onChange={(v) => setForm((f) => ({ ...f, currentPassword: v }))}
                    placeholder="Enter your current password"
                />

                <div className="h-px bg-[#5c554d]/20" />

                <PasswordInput
                    id="new-password"
                    label="New Password"
                    value={form.newPassword}
                    onChange={(v) => {
                        setMismatch(false);
                        setForm((f) => ({ ...f, newPassword: v }));
                    }}
                    placeholder="Enter your new password"
                />

                <PasswordInput
                    id="confirm-password"
                    label="Confirm New Password"
                    value={form.confirmPassword}
                    onChange={(v) => {
                        setMismatch(false);
                        setForm((f) => ({ ...f, confirmPassword: v }));
                    }}
                    placeholder="Re-enter your new password"
                />

                {mismatch && (
                    <p className="text-[#a85a3a] text-xs font-mono flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-[#a85a3a] rounded-full" />
                        New passwords do not match.
                    </p>
                )}

                {/* Security note */}
                <div className="flex items-start gap-3 p-4 bg-[#16130f] border border-[#5c554d]/20">
                    <ShieldCheck className="w-4 h-4 text-[#4e9268] mt-0.5 shrink-0" />
                    <p className="text-[#9c8e7e] text-xs font-mono leading-relaxed">
                        Use a strong password with at least 8 characters, mixing letters, numbers, and symbols.
                    </p>
                </div>

                <div className="flex items-center justify-end pt-2">
                    <button
                        id="change-password-btn"
                        type="submit"
                        disabled={
                            updatePassword.isPending ||
                            !form.currentPassword ||
                            !form.newPassword ||
                            !form.confirmPassword
                        }
                        className="flex items-center gap-2.5 px-6 py-3 bg-[#c8352a] hover:bg-[#b02e24] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono uppercase tracking-widest transition-all duration-300"
                    >
                        {updatePassword.isPending ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Lock className="w-3.5 h-3.5" />
                                Update Password
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
