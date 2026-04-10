"use client";

import Image from "next/image";

interface CastMember {
    name: string;
    character: string;
    profilePic: string;
}

interface MovieCastProps {
    topCast: CastMember[];
}

export const MovieCast = ({ topCast }: MovieCastProps) => {
    return (
        <section className="bg-surface-container-lowest py-16">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Signature divider */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-on-secondary-container/20" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container shrink-0">
                        Top Cast
                    </span>
                    <div className="flex-1 h-px bg-on-secondary-container/20" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-on-secondary-container/10">
                    {topCast.map((member, index) => (
                        <div
                            key={member.name}
                            className="relative flex flex-col bg-surface-container-lowest group cinematic-transition hover:bg-surface-container-high overflow-hidden"
                        >
                            {/* Profile image */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden">
                                <Image
                                    src={member.profilePic}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 cinematic-transition"
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                />
                                {/* Dark gradient at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />

                                {/* Index number */}
                                <span className="absolute top-3 left-3 font-mono text-[10px] text-on-secondary-container/50 bg-surface-container-lowest/70 px-1.5 py-0.5">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Name & character */}
                            <div className="flex flex-col gap-1 p-4">
                                <p className="font-ui font-medium text-on-surface text-sm leading-tight line-clamp-1">
                                    {member.name}
                                </p>
                                <p className="font-mono text-[11px] text-on-secondary-container leading-tight line-clamp-1">
                                    {member.character}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
