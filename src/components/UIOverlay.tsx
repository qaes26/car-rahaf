"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Play } from 'lucide-react';

export default function UIOverlay() {
    const [started, setStarted] = useState(false);
    const [showMainText, setShowMainText] = useState(false);
    const [audioPlayed, setAudioPlayed] = useState(false);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        if (started) {
            setTimeout(() => {
                setShowMainText(true);
            }, 1000);
        }
    }, [started]);

    const handleStart = () => {
        setStarted(true);
        if (!audioPlayed) {
            const audio = document.getElementById('bg-music') as HTMLAudioElement;
            if (audio) {
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play prevented:", e));
                setAudioPlayed(true);
            }
        }
    };

    const toggleMute = () => {
        const audio = document.getElementById('bg-music') as HTMLAudioElement;
        if (audio) {
            audio.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden">

            {/* Invisible Audio Element */}
            <audio id="bg-music" loop>
                <source src="/bg-music.webm" type="audio/webm" />
                <source src="/bg-music.m4a" type="audio/mp4" />
                <source src="/bg-music.mp3" type="audio/mpeg" />
            </audio>

            {/* Start Screen */}
            <AnimatePresence>
                {!started && (
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto flex items-center justify-center flex-col z-50"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    >
                        <motion.button
                            onClick={handleStart}
                            className="bg-rose-600/20 border border-rose-500/50 hover:bg-rose-600/40 text-rose-100 px-8 py-4 rounded-full flex items-center gap-3 backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Heart className="w-5 h-5 animate-pulse text-rose-400" fill="currentColor" />
                            <span className="text-xl font-medium tracking-wider">ابدأ التجربة</span>
                        </motion.button>
                        <p className="mt-6 text-white/50 text-sm font-light">يُفضل استخدام سماعات الرأس لتجربة أفضل</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Title Area */}
            <div className="flex-1 flex flex-col items-center justify-center pt-20">
                <AnimatePresence>
                    {showMainText && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-4">
                                إلى رهف ❤️
                            </h1>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 2 }}
                            >
                                <h2 className="text-2xl md:text-4xl text-rose-200/90 font-light tracking-wide shadow-black drop-shadow-lg">
                                    كل الطرق تؤدي إليك
                                </h2>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Audio Controls */}
            {started && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    onClick={toggleMute}
                    className="absolute top-6 right-6 pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all"
                >
                    {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </motion.button>
            )}

            {/* Footer Credits */}
            <motion.div
                className="w-full p-6 flex justify-start pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: started ? 1 : 0, y: started ? 0 : 20 }}
                transition={{ delay: 3, duration: 1.5 }}
            >
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <p className="text-white/60 text-sm tracking-widest font-light">
                        إعداد: <span className="text-white/90 font-medium">قيس الجازي</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
