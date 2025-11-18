'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const phases = [
    { duration: 4, text: 'Breathe in...' },
    { duration: 7, text: 'Hold...' },
    { duration: 8, text: 'Breathe out...' },
];

export default function BreathePage() {
    const router = useRouter();
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isComplete) return;

        const currentPhase = phases[phaseIndex];
        const timer = setTimeout(() => {
            const nextPhaseIndex = (phaseIndex + 1) % phases.length;
            setPhaseIndex(nextPhaseIndex);
            if (nextPhaseIndex === 0) {
                const newCycleCount = cycleCount + 1;
                setCycleCount(newCycleCount);
                if (newCycleCount >= 4) { // Complete after 4 cycles
                    setIsComplete(true);
                }
            }
        }, currentPhase.duration * 1000);

        return () => clearTimeout(timer);
    }, [phaseIndex, cycleCount, isComplete]);

    const currentPhase = phases[phaseIndex];

    return (
        <div className="fixed inset-0 bg-background text-foreground flex flex-col items-center justify-center transition-colors duration-1000"
             style={{ backgroundColor: isComplete ? 'hsl(var(--primary))' : 'hsl(var(--background))' }}>
            
            <AnimatePresence>
                {!isComplete ? (
                    <motion.div
                        key="breathing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <motion.div
                            key={phaseIndex}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
                            className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center mb-12"
                        >
                            <motion.div
                                animate={{ scale: [0.5, 1, 0.5] }}
                                transition={{ duration: currentPhase.duration, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-full bg-primary"
                            />
                        </motion.div>

                        <motion.p
                            key={`text-${phaseIndex}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-semibold"
                        >
                            {currentPhase.text}
                        </motion.p>
                        
                        <p className="text-muted-foreground mt-4">Cycle {cycleCount + 1} of 4</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                         <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Session Complete</h1>
                        <p className="text-white/80 mb-8">Feeling calmer already.</p>
                        <button
                            onClick={() => router.back()}
                            className="px-8 py-3 bg-white text-primary font-semibold rounded-lg"
                        >
                            Return to Dashboard
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isComplete && (
                 <button
                    onClick={() => router.back()}
                    className="absolute bottom-10 text-muted-foreground hover:text-foreground"
                >
                    End Session
                </button>
            )}
        </div>
    );
}
