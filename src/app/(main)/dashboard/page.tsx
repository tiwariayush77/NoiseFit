'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import EnergyScoreCard from '@/components/energy-score-card';
import TodayVitalsCard from '@/components/today-vitals-card';
import SmartTimelineCard from '@/components/smart-timeline-card';
import TopOpportunitiesCard from '@/components/top-opportunities-card';
import QuickActionsCard from '@/components/quick-actions-card';

export default function DashboardPage() {
    const router = useRouter();
    const [corporateEnabled, setCorporateEnabled] = useState(false);
    
    useEffect(() => {
        const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
        setCorporateEnabled(isEnabled);
    }, []);

    return (
        <div className="flex flex-col">
            <div className="space-y-6">
                <PersonalTabContent />
            </div>

            {!corporateEnabled && (
                <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 z-40">
                    <div className="max-w-md mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium mb-1">💼 Want team features?</p>
                                <p className="text-xs text-muted-foreground">Connect with colleagues</p>
                            </div>
                            <button
                                onClick={() => router.push('/corporate-setup')}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
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


// Personal Tab Content Component
function PersonalTabContent() {
return (
<div className="space-y-6">
<div>
<h2 className="text-2xl font-bold mb-4">Good morning! 👋</h2>
<p className="text-muted-foreground">Here's your health overview</p>
</div>

  {/* Health Score Card */}
  <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-6">
    <h3 className="text-lg font-semibold mb-2">YOUR HEALTH SCORE</h3>
    <div className="text-5xl font-bold mb-2">84<span className="text-2xl text-muted-foreground">/100</span></div>
    <div className="w-full bg-muted/50 rounded-full h-3 mb-2">
      <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full" style={{ width: '84%' }}></div>
    </div>
    <p className="text-sm text-muted-foreground">Great progress! Keep it up 💪</p>
  </div>

  {/* Activity Cards */}
    <div className="grid grid-cols-2 gap-4">
    <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 border-2 border-teal-500/50 rounded-xl p-4">
        <div className="text-3xl mb-2">👟</div>
        <p className="text-3xl font-bold text-white">8,540</p>
        <p className="text-sm text-teal-200 font-medium">Steps today</p>
    </div>
    
    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500/50 rounded-xl p-4">
        <div className="text-3xl mb-2">😴</div>
        <p className="text-3xl font-bold text-white">7.2h</p>
        <p className="text-sm text-blue-200 font-medium">Sleep last night</p>
    </div>
    
    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/50 rounded-xl p-4">
        <div className="text-3xl mb-2">❤️</div>
        <p className="text-3xl font-bold text-white">68 bpm</p>
        <p className="text-sm text-red-200 font-medium">Resting HR</p>
    </div>
    
    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-500/50 rounded-xl p-4">
        <div className="text-3xl mb-2">💪</div>
        <p className="text-3xl font-bold text-white">3</p>
        <p className="text-sm text-purple-200 font-medium">Workouts this week</p>
    </div>
    </div>

  {/* AI Insights */}
  <div className="bg-card/50 border border-border/20 rounded-xl p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center">
      <span className="mr-2">💡</span>
      AI Insights
    </h3>
    <div className="space-y-3">
      <div className="flex items-start">
        <span className="text-primary mr-2">- </span>
        <p className="text-sm text-muted-foreground">You sleep best on Saturdays</p>
      </div>
      <div className="flex items-start">
        <span className="text-primary mr-2">- </span>
        <p className="text-sm text-muted-foreground">Morning workouts boost your energy by 23%</p>
      </div>
      <div className="flex items-start">
        <span className="text-primary mr-2">- </span>
        <p className="text-sm text-muted-foreground">Your average daily step count: 8,540</p>
      </div>
    </div>
    <button className="mt-4 text-primary text-sm font-medium hover:underline">
      View All Insights →
    </button>
  </div>
</div>
);
}
