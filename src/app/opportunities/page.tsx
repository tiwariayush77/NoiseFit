'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type OpportunityImpact = 'HIGH' | 'MEDIUM' | 'LOW';
type OpportunityStatus = 'pending' | 'completed' | 'skipped';

interface Opportunity {
id: number;
title: string;
description: string;
impact: OpportunityImpact;
icon: string;
time?: string;
duration: string;
successRate: number;
benefit: string;
status: OpportunityStatus;
completedAt?: string;
}

export default function OpportunitiesPage() {
const router = useRouter();
const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

// Mock opportunities data
const opportunities: Opportunity[] = [
{
id: 1,
title: '5-minute breathing at 2 PM',
description: 'Pre-meeting stress management',
impact: 'HIGH',
icon: '🧘',
time: '2:00 PM',
duration: '5 min',
successRate: 89,
benefit: 'Reduces stress by 28 points',
status: 'pending'
},
{
id: 2,
title: 'Evening walk tonight',
description: 'Improve sleep quality',
impact: 'MEDIUM',
icon: '🚶',
time: '7:00 PM',
duration: '20 min',
successRate: 76,
benefit: 'Improves sleep quality by 23%',
status: 'pending'
},
{
id: 3,
title: 'Hydration boost',
description: 'Drink water before workout',
impact: 'LOW',
icon: '💧',
duration: '1 min',
successRate: 95,
benefit: 'You drink 30% more on active days',
status: 'pending'
},
{
id: 4,
title: 'Morning workout',
description: 'Optimal energy window',
impact: 'HIGH',
icon: '💪',
time: '6:30 AM',
duration: '30 min',
successRate: 82,
benefit: 'Boosts energy by 23% all day',
status: 'pending'
},
{
id: 5,
title: 'Power nap',
description: 'Afternoon energy boost',
impact: 'MEDIUM',
icon: '😴',
time: '3:00 PM',
duration: '15 min',
successRate: 71,
benefit: 'Restores 40% of morning energy',
status: 'pending'
},
{
id: 6,
title: 'Stretching session',
description: 'Post-work recovery',
impact: 'LOW',
icon: '🤸',
time: '6:00 PM',
duration: '10 min',
successRate: 88,
benefit: 'Reduces muscle tension',
status: 'pending'
},
// History
{
id: 7,
title: 'Morning meditation',
description: 'Start day with focus',
impact: 'HIGH',
icon: '🧘',
duration: '10 min',
successRate: 92,
benefit: 'Increased focus by 35%',
status: 'completed',
completedAt: '2 hours ago'
},
{
id: 8,
title: 'Lunch walk',
description: 'Midday movement',
impact: 'MEDIUM',
icon: '🚶',
duration: '15 min',
successRate: 78,
benefit: 'Improved afternoon energy',
status: 'skipped',
completedAt: 'Yesterday'
}
];

const pendingOpportunities = opportunities.filter(o => o.status === 'pending');
const historyOpportunities = opportunities.filter(o => o.status !== 'pending');

const impactColors = {
HIGH: {
bg: 'from-purple-500 to-pink-500',
border: 'border-purple-500',
text: 'text-purple-300',
badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
},
MEDIUM: {
bg: 'from-blue-500 to-cyan-500',
border: 'border-blue-500',
text: 'text-blue-300',
badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
},
LOW: {
bg: 'from-teal-500 to-green-500',
border: 'border-teal-500',
text: 'text-teal-300',
badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
}
};

const handleSetReminder = (opportunityId: number) => {
alert('Reminder set! We\'ll notify you.');
};

const handleStartNow = (opportunityId: number) => {
const opportunity = opportunities.find(o => o.id === opportunityId);
if (opportunity?.title.includes('breathing')) {
router.push('/breathe');
} else {
alert('Starting activity...');
}
};

return (
<div className="min-h-screen bg-background text-foreground pb-28">

  {/* Header */}
  <div className="bg-card/50 border-b border-border/20 px-6 py-5 sticky top-0 z-10">
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => router.back()}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-xl font-bold">All Opportunities</h1>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
    </div>

    {/* Tabs */}
    <div className="flex gap-2">
      <button
        onClick={() => setActiveTab('pending')}
        className={`
          flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors
          ${activeTab === 'pending'
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }
        `}
      >
        Available ({pendingOpportunities.length})
      </button>
      <button
        onClick={() => setActiveTab('history')}
        className={`
          flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors
          ${activeTab === 'history'
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }
        `}
      >
        History
      </button>
    </div>
  </div>

  {/* Content */}
  <div className="px-6 py-6">
    
    {/* Info Banner */}
    {activeTab === 'pending' && (
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Personalized for you</p>
            <p className="text-xs text-muted-foreground">
              These opportunities are ranked by impact on YOUR health patterns. Success rates shown are specific to you.
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Opportunities List */}
    <div className="space-y-4">
      {activeTab === 'pending' ? (
        // Pending Opportunities
        pendingOpportunities.map((opportunity) => {
          const colors = impactColors[opportunity.impact];
          
          return (
            <div
              key={opportunity.id}
              className={`bg-gradient-to-r ${colors.bg} p-0.5 rounded-xl`}
            >
              <div className="bg-background rounded-xl p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.badge}`}>
                    {opportunity.impact} IMPACT
                  </span>
                  <span className="text-xs text-muted-foreground">{opportunity.duration}</span>
                </div>

                {/* Content */}
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-3">{opportunity.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-base mb-1">
                      {opportunity.title}
                    </p>
                    {opportunity.time && (
                      <p className="text-sm text-muted-foreground mb-2">
                        ⏰ {opportunity.time}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-2">
                      {opportunity.description}
                    </p>
                    <p className={`text-sm ${colors.text} mb-2`}>
                      ✓ {opportunity.benefit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      🔥 {opportunity.successRate}% success rate for you
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSetReminder(opportunity.id)}
                    className="flex-1 py-2.5 bg-card/50 hover:bg-muted border border-border rounded-lg font-medium text-sm transition-colors"
                  >
                    Remind Me
                  </button>
                  <button
                    onClick={() => handleStartNow(opportunity.id)}
                    className={`flex-1 py-2.5 bg-gradient-to-r ${colors.bg} hover:opacity-90 rounded-lg font-semibold text-sm transition-opacity`}
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        // History
        historyOpportunities.map((opportunity) => {
          const isCompleted = opportunity.status === 'completed';
          
          return (
            <div
              key={opportunity.id}
              className="bg-card/50 border border-border/20 rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">{opportunity.icon}</span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {opportunity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {opportunity.completedAt}
                    </p>
                  </div>
                </div>
                <span className={`
                  text-xs font-semibold px-3 py-1 rounded-full
                  ${isCompleted
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-muted text-muted-foreground border border-border'
                  }
                `}>
                  {isCompleted ? '✓ Completed' : 'Skipped'}
                </span>
              </div>
              
              {isCompleted && (
                <p className="text-sm text-green-400 ml-12">
                  {opportunity.benefit}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>

  </div>
</div>
);
}
