"use client";

import { useOverviewData } from "@/hooks/admin/overview/useOverview";
import { AlertTriangle } from "lucide-react";
import { OverviewLoadingSkeleton } from "@/components/admin/overview/OverviewLoadingSkeleton";
import { OverviewAlerts } from "@/components/admin/overview/OverviewAlerts";
import { OverviewKPIs } from "@/components/admin/overview/OverviewKPIs";
import { OverviewUserChart } from "@/components/admin/overview/OverviewUserChart";

const AdminDashboardPage = () => {
    const { data: ResponseData, isLoading, isError } = useOverviewData();

    if (isLoading) {
        return <OverviewLoadingSkeleton />;
    }

    if (isError || !ResponseData?.data) {
        return (
            <div className="flex flex-col items-center justify-center border border-destructive bg-destructive/10 text-destructive-foreground p-10 h-64 rounded-[2px] backdrop-blur-sm">
                <AlertTriangle className="w-10 h-10 mb-4 animate-pulse" />
                <h2 className="text-xl font-display font-bold uppercase tracking-wider">Failed to load dashboard</h2>
                <p className="text-sm opacity-80 mt-2 font-ui">There was an issue communicating with the core servers.</p>
            </div>
        );
    }

    const { overview, charts, alerts } = ResponseData.data;

    return (
        <div className="flex flex-col gap-8 pb-10">
            <OverviewAlerts alerts={alerts} />

            <OverviewKPIs overview={overview} />

            <OverviewUserChart data={charts?.newUsersLast7Days} />
        </div>
    );
};

export default AdminDashboardPage;