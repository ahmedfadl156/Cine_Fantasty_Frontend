const steps = [
    {
        number: "01",
        title: "Acquire Your Slate",
        description:
            "Use your seasonal budget to bid on upcoming releases and archival classics. Build a diverse portfolio across genres.",
    },
    {
        number: "02",
        title: "Track the Market",
        description:
            "Monitor box office performance and critical reception in real-time. Execute trades to maximize your studio's valuation.",
    },
    {
        number: "03",
        title: "Claim the Cup",
        description:
            "Outperform rival studios over 16 weeks to win the CinemaGM Archive Trophy and exclusive Season 2 benefits.",
    },
];

const HowItWorksSection = () => {
    return (
        <section className="py-32 px-12 bg-surface-container-low">
        <div className=" max-w-[1440px] mx-auto">
            {/* Section header */}
            <div className="flex items-center gap-8 mb-24">
                <span className="data-mono text-xs tracking-widest text-on-secondary-container shrink-0">
                    HOW IT WORKS
                </span>
                <div className="h-[1px] w-full bg-outline-variant opacity-20" />
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                {steps.map(({ number, title, description }) => (
                    <div key={number} className="relative group">
                        <span className="absolute -top-12 -left-4 text-9xl font-headline italic text-on-secondary-container/5 select-none transition-all duration-500 group-hover:text-primary-container/10">
                            {number}
                        </span>

                        <h3 className="editorial-title text-3xl mb-6 relative z-10">
                            {title}
                        </h3>
                        <p className="font-body text-on-secondary-container leading-relaxed relative z-10">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        </section>
    );
};

export default HowItWorksSection;
