'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GoalsCard } from '@/components/dashboard-cards';
import EnergyScoreCard from '@/components/energy-score-card';
import SmartOpportunitiesCard from '@/components/smart-opportunities-card';
import SmartTimelineCard from '@/components/smart-timeline-card';

export default function DashboardPage() {
    const router = useRouter();
    const [corporateEnabled, setCorporateEnabled] = useState(false);
    const [showTeamBanner, setShowTeamBanner] = useState(false);
    
    useEffect(() => {
        const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
        setCorporateEnabled(isEnabled);
        
        const dismissed = localStorage.getItem('teamBannerDismissed') === 'true';
        setShowTeamBanner(!dismissed && !isEnabled);

    }, []);

    return (
        <div className="flex flex-col">
            <div className="space-y-6">
                <PersonalTabContent />
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


// Personal Tab Content Component
function PersonalTabContent() {
return (
<div className="space-y-6">
<div>
<h2 className="text-2xl font-bold mb-4">Good morning! 👋</h2>
<p className="text-muted-foreground">Here's your health overview</p>
</div>

  <EnergyScoreCard score={87} />
  <SmartOpportunitiesCard />
  <SmartTimelineCard />

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

    <GoalsCard />

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
