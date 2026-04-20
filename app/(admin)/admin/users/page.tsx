"use client";

import { useState } from "react";
import { useGetAllUsers } from "@/hooks/admin/adminData/useAdminData";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UsersPagination } from "@/components/admin/users/UsersPagination";
import { UsersLoadingSkeleton } from "@/components/admin/users/UsersLoadingSkeleton";
import { AlertTriangle, Users } from "lucide-react";

export default function UsersPage() {
    const [page, setPage] = useState(1);
    const { data: ResponseData, isLoading, isError } = useGetAllUsers(page);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-10 border border-destructive bg-destructive/10 text-destructive-foreground rounded-[2px]">
                <AlertTriangle className="w-10 h-10 mb-4 animate-pulse" />
                <h2 className="text-xl font-display font-bold uppercase tracking-wider">Failed to load users</h2>
                <p className="text-sm opacity-80 mt-2">Check server connection and try again.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-6xl">
            <div className="flex justify-between items-end border-b border-outline/50 pb-4">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-wider capitalize flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        User Management
                    </h1>
                    <div className="signature-divider mt-4 w-64 hidden sm:flex" />
                </div>
                <div className="hidden sm:block">
                    {ResponseData?.results !== undefined && (
                        <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mt-1 bg-surface-container-low px-3 py-1.5 border border-outline rounded-[2px]">
                            <span className="text-primary font-bold">{ResponseData.results}</span> Records
                        </p>
                    )}
                </div>
            </div>

            <div className="bg-surface-container-low border border-outline rounded-[2px] p-4 lg:p-6 flex flex-col min-h-[500px]">
                {isLoading ? (
                    <UsersLoadingSkeleton />
                ) : (
                    <>
                        {ResponseData?.data?.users && (
                            <div className="flex-1">
                                <UsersTable users={ResponseData.data.users} />
                            </div>
                        )}
                        
                        {ResponseData?.data?.totalPages > 1 && (
                            <UsersPagination 
                                currentPage={ResponseData.data.currentPage} 
                                totalPages={ResponseData.data.totalPages}
                                hasNextPage={ResponseData.data.hasNextPage}
                                hasPreviousPage={ResponseData.data.hasPreviousPage}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}