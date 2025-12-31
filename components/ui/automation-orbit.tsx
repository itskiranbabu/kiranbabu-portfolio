"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OrbitingIcon = ({ angle, radius, delay, children, reverse = false }: { angle: number, radius: number, delay: number, children: React.ReactNode, reverse?: boolean }) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
                rotate: reverse ? [-360, 0] : [0, 360],
            }}
            transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                delay: -delay, // Start at different positions
            }}
            style={{
                width: radius * 2,
                height: radius * 2,
            }}
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${reverse ? 180 : 0}deg)` }} // keep icon upright if needed, or let it rotate
            >
                <motion.div
                    animate={{ rotate: reverse ? [360, 0] : [0, -360] }} // Counter-rotate to keep icon upright
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex items-center justify-center w-12 h-12 bg-black/80 border border-white/10 rounded-full text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] backdrop-blur-md"
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function AutomationOrbit() {
    return (
        <div className="relative flex items-center justify-center w-full h-[600px] bg-[#030303] overflow-hidden rounded-3xl border border-white/5">

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Central Core */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.5)] z-20"
                >
                    <span className="text-5xl font-bold text-white">*</span>
                </motion.div>
                <div className="absolute inset-0 bg-orange-500/30 blur-xl rounded-full z-10" />
            </div>

            {/* Inner Orbit (Core Integrations) */}
            <div className="absolute border border-white/10 rounded-full w-[280px] h-[280px]" />
            <OrbitingIcon angle={0} radius={140} delay={0} reverse={false}><i className="fab fa-slack text-xl"></i></OrbitingIcon>
            <OrbitingIcon angle={120} radius={140} delay={10} reverse={false}><i className="fab fa-stripe text-xl"></i></OrbitingIcon>
            <OrbitingIcon angle={240} radius={140} delay={20} reverse={false}><i className="fab fa-shopify text-xl"></i></OrbitingIcon>

            {/* Outer Orbit (Ecosystem) */}
            <div className="absolute border border-white/5 rounded-full w-[450px] h-[450px]" />
            <OrbitingIcon angle={0} radius={225} delay={0} reverse={true}><i className="fab fa-github text-xl"></i></OrbitingIcon>
            <OrbitingIcon angle={72} radius={225} delay={6} reverse={true}><i className="fab fa-salesforce text-xl"></i></OrbitingIcon>
            <OrbitingIcon angle={144} radius={225} delay={12} reverse={true}><i className="fab fa-hubspot text-xl"></i></OrbitingIcon>
            <OrbitingIcon angle={216} radius={225} delay={18} reverse={true}><i className="fab fa-google-drive text-xl"></i></OrbitingIcon>
            <OrbitingIcon angle={288} radius={225} delay={24} reverse={true}><i className="fab fa-trello text-xl"></i></OrbitingIcon>

        </div>
    );
}
