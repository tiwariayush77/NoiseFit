'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import EnergyScoreCard from '@/components/energy-score-card';
import SmartOpportunitiesCard from '@/components/smart-opportunities-card';
import WeeklyWinsCard from '@/components/weekly-wins-card';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
    const router = useRouter();
    const [corporateEnabled, setCorporateEnabled] = useState(false);
    const [showTeamBanner, setShowTeamBanner] = useState(false);
    const [insightsExpanded, setInsightsExpanded] = useState(false);
    const [winsExpanded, setWinsExpanded] = useState(false);
    const [progressExpanded, setProgressExpanded] = useState(false);
    
    useEffect(() => {
        const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
        setCorporateEnabled(isEnabled);
        
        const dismissed = localStorage.getItem('teamBannerDismissed') === 'true';
        setShowTeamBanner(!dismissed && !isEnabled);

    }, []);

    return (
        <div className="flex flex-col">
            <div className="space-y-6">
                 {/* Streak Counter - NEW */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-4xl mr-3">🔥</span>
                            <div>
                                <p className="text-xl font-bold text-white">7-Day Streak</p>
                                <p className="text-sm text-gray-300">You're on fire! Keep it going 💪</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <button className="text-sm text-orange-400 hover:text-orange-300 mb-1 block transition-colors"> Invite Friends </button>
                            <button className="text-sm text-orange-400 hover:text-orange-300 block transition-colors"> Leaderboard → </button>
                        </div>
                    </div>
                </div>

                <EnergyScoreCard score={87} />
                 <button
                    onClick={() => router.push('/intelligence')}
                    className="w-full text-sm text-center -mt-4 mb-4 text-teal-400 hover:text-teal-300"
                >
                    Explore AI Insights →
                </button>
                <SmartOpportunitiesCard />
                
                {/* Today's Progress - COLLAPSIBLE */}
                <div className="px-6 mb-6">
                    <button
                        onClick={() => setProgressExpanded(!progressExpanded)}
                        className="w-full bg-card/50 border border-border/20 rounded-xl p-5 text-left"
                    >
                        <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-white mb-1">Today's Progress</h2>
                            <p className="text-sm text-muted-foreground">
                            8,540 steps -  7.2h sleep -  68 bpm
                            </p>
                        </div>
                        <span className="text-muted-foreground text-2xl">
                            {progressExpanded ? '▲' : '▼'}
                        </span>
                        </div>
                    </button>
                    
                    {progressExpanded && (
                        <div className="mt-4 space-y-5 px-4 animate-in fade-in-5">
                        {/* Steps */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">👟 Steps</span>
                            <span className="text-sm font-bold text-white">8,540 / 10,000</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                            <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-xs text-teal-400">
                            🏆 You're ahead of 68% in your area
                            </p>
                        </div>

                        {/* Sleep Quality */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">😴 Sleep Quality</span>
                            <span className="text-sm font-bold text-white">7.2h</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                            <p className="text-xs text-blue-400">
                            📈 30 min more than weekly average
                            </p>
                        </div>

                        {/* Active Minutes */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">💪 Active Minutes</span>
                            <span className="text-sm font-bold text-white">23 / 30</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '77%' }}></div>
                            </div>
                            <p className="text-xs text-orange-400">
                            ⚡ Just 7 more minutes to hit your goal!
                            </p>
                        </div>

                        {/* Resting HR */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300">❤️ Resting HR</span>
                            <span className="text-sm font-bold text-white">68 bpm</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <p className="text-xs text-gray-400">
                            ✓ 4 bpm lower than average (excellent!)
                            </p>
                        </div>
                        </div>
                    )}
                </div>

                <WeeklyWinsCard />

            </div>

            {showTeamBanner && (
                <div className="sticky bottom-16 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent pt-8 pb-4 px-4 mt-8">
                    <div className="max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-2xl relative">
                        <button
                            onClick={() => {
                                localStorage.setItem('teamBannerDismissed', 'true');
                                setShowTeamBanner(false);
                            }}
                            className="absolute top-2 right-2 text-white/70 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                                💼
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white mb-1">Team Features Available</p>
                                <p className="text-xs text-white/80">Connect with colleagues</p>
                            </div>
                            <button
                                onClick={() => router.push('/corporate-setup')}
                                className="flex-shrink-0 bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                            >
                                Enable
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
