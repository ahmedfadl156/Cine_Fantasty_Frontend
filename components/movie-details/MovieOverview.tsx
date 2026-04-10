"use client";

interface MovieOverviewProps {
    tagline: string;
    overview: string;
}

export const MovieOverview = ({ tagline, overview }: MovieOverviewProps) => {
    return (
        <section className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
            {/* Signature divider */}
            <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-on-secondary-container/20" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-on-secondary-container shrink-0">
                    The Story
                </span>
                <div className="flex-1 h-px bg-on-secondary-container/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Tagline — Left editorial column */}
                {tagline && (
                    <div className="lg:col-span-4 flex flex-col justify-start">
                        <p className="font-display font-bold italic text-2xl lg:text-3xl text-on-surface/70 leading-snug">
                            &ldquo;{tagline}&rdquo;
                        </p>
                    </div>
                )}

                {/* Overview — Right column */}
                <div className={tagline ? "lg:col-span-8" : "lg:col-span-12"}>
                    <p className="font-ui font-light text-base lg:text-lg text-on-surface/80 leading-relaxed">
                        {overview}
                    </p>
                </div>
            </div>
        </section>
    );
};
