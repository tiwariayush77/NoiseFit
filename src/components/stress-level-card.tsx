'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StressLevelCard() {
    const router = useRouter();
    const [stress, setStress] = useState(35);

    useEffect(() => {
        const interval = setInterval(() => {
            setStress(prev => {
                const change = (Math.random() - 0.5) * 10;
                let newStress = prev + change;
                if (newStress < 10) newStress = 10;
                if (newStress > 95) newStress = 95;
                return Math.round(newStress);
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const getStressStyle = (stressLevel: number) => {
        if (stressLevel < 40) return {
            color: 'text-green-400',
            bg: 'bg-green-500/20',
            status: 'Low Stress ✓',
            emoji: '😌'
        };
        if (stressLevel < 70) return {
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/20',
            status: 'Moderate Stress',
            emoji: '😐'
        };
        return {
            color: 'text-red-400',
            bg: 'bg-red-500/20',
            status: 'High Stress ⚠️',
            emoji: '😰'
        };
    };

    const style = getStressStyle(stress);

    return (
        <div className="px-6 mb-8">
            <div className="bg-card/50 border border-border/20 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            Current Stress
                        </p>
                        <p className={`text-3xl font-bold ${style.color}`}>{stress}<span className="text-lg text-muted-foreground">/100</span></p>
                    </div>
                    <div className={`w-16 h-16 ${style.bg} rounded-full flex items-center justify-center`}>
                        <span className="text-3xl">{style.emoji}</span>
                    </div>
                </div>

                <div className="mb-3">
                    <p className={`text-sm font-semibold ${style.color} mb-1`}>{style.status}</p>
                    <p className="text-xs text-muted-foreground">Your stress typically peaks at 2-4 PM</p>
                </div>

                <button
                    onClick={() => router.push('/breathe')}
                    className="w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-sm font-semibold text-purple-300 transition-colors"
                >
                    Start Breathing Session
                </button>
            </div>
        </div>
    );
}
