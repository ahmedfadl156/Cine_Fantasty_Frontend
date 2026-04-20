"use client";

import Link from "next/link";
import { Trash2, Mail, Calendar, Eye, User } from "lucide-react";

export const UsersTable = ({ users }: { users: any[] }) => {
    
    if (!users || users.length === 0) {
        return (
            <div className="flex items-center justify-center p-12 text-muted-foreground font-mono border border-dashed border-outline/50 rounded-[2px]">
                No users found.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto cinematic-scrollbar rounded-[2px] border border-outline">
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="border-b border-outline text-muted-foreground font-mono uppercase tracking-widest text-xs bg-surface-container-lowest">
                        <th className="px-6 py-4 font-normal">Studio Details</th>
                        <th className="px-6 py-4 font-normal">Email</th>
                        <th className="px-6 py-4 font-normal">Joined</th>
                        <th className="px-6 py-4 font-normal text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b border-outline/50 hover:bg-surface-container-high transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-[2px] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold text-[15px] text-on-surface tracking-wide">{user.studioName}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-on-surface">
                                    <Mail className="w-4 h-4" />
                                    <span className="font-ui">{user.email}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
                                    <Calendar className="w-4 h-4 opacity-70" />
                                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    {/* Action: View Portfolio */}
                                    <Link href={`/admin/users/${user._id}`}>
                                        <button 
                                            title="View Portfolio"
                                            className="p-2 rounded-[2px] text-primary hover:bg-primary/20 transition-colors flex items-center justify-center"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    
                                    {/* Action: Delete User */}
                                    <button 
                                        onClick={() => console.log("Delete user", user._id)}
                                        title="Delete User"
                                        className="p-2 rounded-[2px] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
