'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Opportunity {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  impact: 'HIGH' | 'MEDIUM' | 'BONUS';
  successRate: number;
  action: string;
  timeEstimate: string;
}

export default function SmartOpportunitiesCard() {
  const topOpportunity = {
    icon: '🧘',
    title: '5-minute breathing session at 2 PM',
    socialProof: '14 people from your area completed this today',
    successRateText: 'Works 9 out of 10 times for you',
    impact: 'HIGH',
    timeEstimate: '5 min',
    ctaPrimary: 'Remind Me at 2 PM',
    ctaSecondary: 'Start Now',
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Today's Top Action</h3>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 rounded-xl">
        <div className="bg-background rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {topOpportunity.impact} IMPACT
            </span>
            <span className="text-xs text-muted-foreground">{topOpportunity.timeEstimate}</span>
          </div>

          <div className="flex items-start mb-4">
            <span className="text-3xl mr-3">{topOpportunity.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-base mb-2">
                {topOpportunity.title}
              </p>

              <div className="flex items-center mb-2">
                <span className="text-sm text-muted-foreground mr-2">👥</span>
                <p className="text-sm text-muted-foreground">
                  {topOpportunity.socialProof}
                </p>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-purple-300 mr-2">🔥</span>
                <p className="text-sm text-purple-300">
                  {topOpportunity.successRateText}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 py-2.5 h-auto bg-purple-500/20 hover:bg-purple-500/30 text-white font-medium text-sm transition-colors border border-purple-500/30">
              {topOpportunity.ctaPrimary}
            </Button>
            <Button className="flex-1 py-2.5 h-auto bg-purple-600 hover:bg-purple-700 font-medium text-sm text-white transition-colors">
              {topOpportunity.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
      <button className="mt-3 text-sm text-accent hover:text-accent/80 w-full text-center transition-colors">
        View all opportunities →
      </button>
    </div>
  );
}
