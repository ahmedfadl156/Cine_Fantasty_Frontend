"use client";

import { Clock, Calendar, Clapperboard, Building2 } from "lucide-react";

interface MovieCrewProps {
    director: string;
    runtime: number;
    releaseDate: string;
    productionCompanies: string[];
}

export const MovieCrew = ({
    director,
    runtime,
    releaseDate,
    productionCompanies,
}: MovieCrewProps) => {
    const formattedDate = new Date(releaseDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const formattedRuntime = `${hours}h ${minutes}m`;

    const infoItems = [
        {
            icon: Clapperboard,
            label: "Director",
            value: director,
            display: "font-display font-bold italic text-xl text-on-surface",
        },
        {
            icon: Calendar,
            label: "Release Date",
            value: formattedDate,
            display: "font-mono text-base text-on-surface",
        },
        {
            icon: Clock,
            label: "Runtime",
            value: formattedRuntime,
            display: "font-mono text-base text-on-surface",
        },
    ];

    return (
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
            {/* Signature divider */}
            <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-on-secondary-container/20" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container shrink-0">
                    Production
                </span>
                <div className="flex-1 h-px bg-on-secondary-container/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Key info column */}
                <div className="lg:col-span-7 flex flex-col gap-0 divide-y divide-on-secondary-container/10">
                    {infoItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="flex items-center justify-between py-5 group cinematic-transition"
                            >
                                <div className="flex items-center gap-3 text-on-secondary-container">
                                    <Icon className="w-4 h-4" />
                                    <span className="font-ui font-light text-sm tracking-wider uppercase">
                                        {item.label}
                                    </span>
                                </div>
                                <p className={item.display}>{item.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Production companies column */}
                <div className="lg:col-span-5">
                    <div className="flex items-center gap-2 mb-6 text-on-secondary-container">
                        <Building2 className="w-4 h-4" />
                        <span className="font-ui font-light text-sm tracking-wider uppercase">
                            Production Companies
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {productionCompanies.map((company, index) => (
                            <div
                                key={company}
                                className="flex items-center gap-4"
                            >
                                <span className="font-mono text-[10px] text-on-secondary-container/40 w-5 text-right flex-shrink-0">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <p className="font-display font-bold italic text-on-surface text-lg leading-tight">
                                    {company}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
