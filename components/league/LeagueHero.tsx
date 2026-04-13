"use client";

export const LeagueHero = () => {
    return (
        <section className="relative overflow-hidden bg-surface-container-lowest border-b border-on-secondary-container/10">
            {/* Film-strip grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(90deg, #EEE4D4 0px, #EEE4D4 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #EEE4D4 0px, #EEE4D4 1px, transparent 1px, transparent 80px)",
                }}
            />

            {/* Diagonal red accent slash */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rotate-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 -rotate-12 pointer-events-none" />

            <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-20">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-px bg-primary" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                            Season 01 · Now Active
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-display font-bold italic text-on-surface text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-6">
                        Enter the <br />
                        <span className="text-primary">Cinema</span> Arena.
                    </h1>

                    <p className="font-ui font-light text-on-secondary-container text-base md:text-lg leading-relaxed max-w-xl mb-10">
                        Compete head-to-head against studios worldwide. Build your portfolio, 
                        draft the right films, and climb the leaderboard.
                    </p>
                </div>
            </div>
        </section>
    );
};
