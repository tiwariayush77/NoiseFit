'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import EnergyScoreCard from '@/components/energy-score-card';
import SmartOpportunitiesCard from '@/components/smart-opportunities-card';
import WeeklyWinsCard from '@/components/weekly-wins-card';
import { Progress } from '@/components/ui/progress';
import StressLevelCard from '@/components/stress-level-card';

export default function DashboardPage() {
    const router = useRouter();
    const [corporateEnabled, setCorporateEnabled] = useState(false);
    const [showTeamBanner, setShowTeamBanner] = useState(false);
    const [insightsExpanded, setInsightsExpanded] = useState(false);
    const [winsExpanded, setWinsExpanded] = useState(false);
    const [progressExpanded, setProgressExpanded] = useState(false);
    const [streakDismissed, setStreakDismissed] = useState(false);

    useEffect(() => {
        const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
        setCorporateEnabled(isEnabled);
        
        const teamBannerDismissed = localStorage.getItem('teamBannerDismissed') === 'true';
        setShowTeamBanner(!teamBannerDismissed && !isEnabled);

        const streakCardDismissed = localStorage.getItem('streakDismissed') === 'true';
        setStreakDismissed(streakCardDismissed);

    }, []);

    const handleDismissStreak = () => {
      localStorage.setItem('streakDismissed', 'true');
      setStreakDismissed(true);
    };

    return (
        <div className="flex flex-col">
            <div className="space-y-8">
                 {!streakDismissed && (
                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-2xl p-5 relative">
                      <button
                        onClick={handleDismissStreak}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        aria-label="Dismiss"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="flex items-center justify-between pr-8">
                          <div className="flex items-center flex-1">
                              <span className="text-5xl mr-4">🔥</span>
                              <div>
                                  <p className="text-2xl font-bold text-white mb-1">7-Day Streak</p>
                                  <p className="text-sm text-gray-300">You're on fire! Keep it going 💪</p>
                              </div>
                          </div>
                          <div className="flex flex-col gap-2">
                              <button className="text-sm text-orange-400 hover:text-orange-300 transition-colors whitespace-nowrap"> Invite Friends </button>
                              <button className="text-sm text-orange-400 hover:text-orange-300 transition-colors whitespace-nowrap"> Leaderboard → </button>
                          </div>
                      </div>
                  </div>
                )}

                <EnergyScoreCard score={87} />
                <div className="px-6 mb-8">
                  <button
                    onClick={() => router.push('/intelligence')}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Explore AI Insights
                  </button>
                </div>
                <StressLevelCard />
                <SmartOpportunitiesCard />
                
                {/* Today's Progress - COLLAPSIBLE */}
                <div className="px-6 mb-6">
                    <button
                        onClick={() => setProgressExpanded(!progressExpanded)}
                        className="w-full bg-card/50 border border-border/20 rounded-xl p-5 text-left hover:bg-muted/30 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-white mb-1">Today's Progress</h2>
                            <p className="text-sm text-muted-foreground">
                            8,540 steps -  7.2h sleep -  68 bpm
                            </p>
                        </div>
                        <svg
                          className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                            progressExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
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
        </div>
    );
}

    
