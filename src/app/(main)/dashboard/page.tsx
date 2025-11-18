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
                <EnergyScoreCard />
                <TodayVitalsCard />
                <SmartTimelineCard />
                <TopOpportunitiesCard />
                <QuickActionsCard />
            </div>

            {!corporateEnabled && (
                <div className="fixed bottom-20 left-0 right-0 px-4 pb-4">
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
