"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    link: string;
    title: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 50;  // Reduced for cleaner layout
const IMG_HEIGHT = 70; // Reduced for cleaner layout

function FlipCard({
    src,
    link,
    title,
    index,
    total,
    phase,
    target,
}: FlipCardProps) {
    const handleClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
            onClick={handleClick}
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 border border-white/10"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={title}
                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-lg bg-[#030303] flex flex-col items-center justify-center p-2 border border-orange-500/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[6px] font-bold text-orange-400 uppercase tracking-widest mb-1">Explore</p>
                        <p className="text-[8px] font-medium text-white leading-tight px-1 line-clamp-2">{title}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Product Data
const PRODUCTS = [
    { title: "n8n Automation Suite", src: "https://images.unsplash.com/photo-1518186239741-999335552345?w=300", link: "https://itskiranbabu.github.io/n8n-workflows/" },
    { title: "Creator Revenue HQ", src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300", link: "https://kiranbabuai.gumroad.com/l/uwjgas" },
    { title: "SaaS Business Hub", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300", link: "https://kiranbabuai.gumroad.com/l/crcrq" },
    { title: "Freelance Business Hub", src: "https://images.unsplash.com/photo-1454165833761-1215b0213821?w=300", link: "https://kiranbabuai.gumroad.com/l/zkpdwi" },
    { title: "Productivity System", src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300", link: "https://kiranbabuai.gumroad.com/l/skjhz" },
    { title: "Habit Stacker Pro", src: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=300", link: "https://kiranbabuai.gumroad.com/l/lekonw" },
    { title: "Goal Tracking Hub", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300", link: "https://kiranbabuai.gumroad.com/l/hquiq" },
    { title: "Student Success System", src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300", link: "https://kiranbabuai.gumroad.com/l/apvhdn" },
    { title: "AI Prompt Power Pack", src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300", link: "https://kiranbabuai.gumroad.com/l/shlhrb" },
    { title: "Content Planner", src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300", link: "https://kiranbabuai.gumroad.com/l/ynnxj" },
    { title: "YouTube Dashboard", src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300", link: "https://kiranbabuai.gumroad.com/l/xxstk" },
    { title: "Affiliate Tracker", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300", link: "https://kiranbabuai.gumroad.com/l/eilcwh" },
    { title: "Finance Tracker", src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300", link: "https://kiranbabuai.gumroad.com/l/haebsi" },
    { title: "Real Estate Manager", src: "https://images.unsplash.com/photo-1560518883-ce09059ee7fa?w=300", link: "https://kiranbabuai.gumroad.com/l/dwicxr" },
    { title: "Wedding Planner", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300", link: "https://kiranbabuai.gumroad.com/l/tvpwgvp" },
    { title: "Career Tracker", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300", link: "https://kiranbabuai.gumroad.com/l/knvwn" },
    { title: "Meal Recipe Manager", src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300", link: "https://kiranbabuai.gumroad.com/l/lcstdth" },
    { title: "Fitness Wellness Hub", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300", link: "https://kiranbabuai.gumroad.com/l/armdis" },
    { title: "AI Framework v2", src: "https://images.unsplash.com/photo-1531746790731-6c307f1d932b?w=300", link: "https://itskiranbabu.github.io/n8n-workflows/" },
    { title: "Automation Blueprint", src: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=300", link: "https://itskiranbabu.github.io/n8n-workflows/" },
];
const IMAGES = PRODUCTS.map(p => p.src); // Keep for compatibility if needed elsewhere
const MAX_SCROLL = 3000; // Total vertical space for animation stages

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Initial set
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0); // Keep track of scroll value without re-renders

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Prevent default to stop browser overscroll/bounce
            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Touch support
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Attach listeners to container instead of window for portability
        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    // Happens between scroll 0 and 600
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling): Starts after morph (e.g., > 600)
    // Rotates the bottom arc as user continues scrolling
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;

            // Normalize -1 to 1
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            // Move +/- 100px
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    // --- Render Loop (Manual Calculation for Morph) ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    // Fade in content when arc is formed (morphValue > 0.8)
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#030303] overflow-hidden">
            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-2xl font-medium tracking-tight text-white md:text-4xl"
                    >
                        The future is built on AI.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500"
                    >
                        SCROLL TO EXPLORE
                    </motion.p>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                        Premium Digital Assets
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed">
                        Scroll to explore battle-tested workflows and templates. <br className="hidden md:block" />
                        Hover to flip and click to explore the full product details.
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {PRODUCTS.map((prod, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        // 1. Intro Phases (Scatter -> Line)
                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 60;
                            const lineTotalWidth = PRODUCTS.length * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            // 2. Circle Phase & Morph Logic
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);
                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / PRODUCTS.length) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (PRODUCTS.length - 1);
                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;
                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={prod.src}
                                link={prod.link}
                                title={prod.title}
                                index={i}
                                total={PRODUCTS.length}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
