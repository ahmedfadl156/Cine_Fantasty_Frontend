"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const posters = ["/poster-1.png", "/poster-2.png", "/poster-3.png"];

const STACK_POSITIONS = [
    { zIndex: 30, scale: 1, translateY: 0, translateX: 0, rotate: 0, opacity: 1 },
    { zIndex: 20, scale: 0.93, translateY: 20, translateX: 26, rotate: 5, opacity: 0.82 },
    { zIndex: 10, scale: 0.86, translateY: 40, translateX: 52, rotate: 9, opacity: 0.58 },
];

const TRANSITION_DURATION = 700;
const HOLD_DURATION = 2400;

const HeroSection = () => {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setActive((prev) => (prev + 1) % posters.length);
                setAnimating(false);
            }, TRANSITION_DURATION);
        }, HOLD_DURATION + TRANSITION_DURATION);

        return () => clearInterval(interval);
    }, []);

    const getStackIndex = (posterIndex: number) => {
        return (posterIndex - active + posters.length) % posters.length;
    };

    return (
        <main className="relative min-h-screen flex flex-col md:flex-row items-center overflow-hidden">
            {/* Left Section */}
            <section className="w-full md:w-[55%] h-[614px] md:h-full relative flex items-center justify-center p-12">
                <div className="relative w-full max-w-lg aspect-3/4 flex items-center justify-center">
                    {posters.map((src, i) => {
                        const stackIdx = getStackIndex(i);
                        const pos = STACK_POSITIONS[stackIdx];
                        const isAnimatingOut = animating && stackIdx === 0;

                        return (
                            <div
                                key={src}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: pos.zIndex,
                                    transform: isAnimatingOut
                                        ? `scale(${STACK_POSITIONS[2].scale}) translateY(${STACK_POSITIONS[2].translateY}px) translateX(${STACK_POSITIONS[2].translateX}px) rotate(${STACK_POSITIONS[2].rotate}deg)`
                                        : `scale(${pos.scale}) translateY(${pos.translateY}px) translateX(${pos.translateX}px) rotate(${pos.rotate}deg)`,
                                    opacity: isAnimatingOut ? STACK_POSITIONS[2].opacity : pos.opacity,
                                    transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${TRANSITION_DURATION}ms ease, z-index 0ms ${isAnimatingOut ? TRANSITION_DURATION : 0}ms`,
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow:
                                        stackIdx === 0
                                            ? "0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(220,38,38,0.15)"
                                            : "0 8px 32px rgba(0,0,0,0.4)",
                                    backgroundColor: "#1A3A42",
                                    willChange: "transform, opacity",
                                }}
                            >
                                <img
                                    src={src}
                                    alt={`Movie poster ${i + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        opacity: stackIdx === 0 ? 0.9 : 0.6,
                                        filter: stackIdx === 0 ? "none" : "grayscale(30%)",
                                        transition: `opacity ${TRANSITION_DURATION}ms ease, filter ${TRANSITION_DURATION}ms ease`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Right Section */}
            <section className="flex flex-col items-start px-4">
                <span className="text-primary-container text-xs tracking-[0.3em] mb-6">—————— SEASON ONE IS OPEN ——————</span>
                <h1 className="text-6xl md:text-7xl leading-[0.95] text-on-surface mb-8">Pick the films. <br /> Own the season.</h1>
                <p className="font-body text-xl text-on-secondary-container leading-relaxed mb-12 max-w-md">Step into the role of Studio Head. Manage budgets,
                    predict hits, and dominate the cinematic
                    marketplace in the world's first archival movie league.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <Button className="rounded-lg py-6 px-10 text-md cursor-pointer">Start your studio</Button>
                    <Button variant="outline" className="rounded-lg py-6 px-10 text-md cursor-pointer">See how it works</Button>
                </div>
                <div className="text-[7px] md:text-[12px] text-on-secondary-container tracking-widest flex flex-wrap gap-x-6 gap-y-2 opacity-60 my-10">
                    <span>FREE</span>
                    <span>•</span>
                    <span>SEASON 1</span>
                    <span>•</span>
                    <span>16 WEEKS</span>
                    <span>•</span>
                    <span>$500M OPENING BUDGET</span>
                </div>
            </section>
        </main>
    );
};

export default HeroSection;