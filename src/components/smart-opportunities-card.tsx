'use client';

import { cn } from '@/lib/utils';

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
  const opportunities: Opportunity[] = [
    {
      id: '1',
      icon: '🧘',
      title: '5-min breathing at 2 PM',
      subtitle: 'Success rate: 89% for you',
      impact: 'HIGH',
      successRate: 89,
      action: 'Set Reminder',
      timeEstimate: '5 min'
    },
    {
      id: '2',
      icon: '🚶',
      title: 'Evening walk tonight',
      subtitle: 'Improves sleep quality 23%',
      impact: 'MEDIUM',
      successRate: 76,
      action: 'Plan Route',
      timeEstimate: '20 min'
    },
    {
      id: '3',
      icon: '💧',
      title: 'Hydration boost',
      subtitle: 'You drink 30% more on active days',
      impact: 'BONUS',
      successRate: 85,
      action: 'Track Water',
      timeEstimate: '1 min'
    }
  ];

  const impactStyles = {
    HIGH: 'from-purple-500 to-pink-500',
    MEDIUM: 'from-blue-500 to-cyan-500',
    BONUS: 'from-green-500 to-teal-500'
  };

  const badgeStyles = {
    HIGH: 'bg-purple-500/20 text-purple-300',
    MEDIUM: 'bg-blue-500/20 text-blue-300',
    BONUS: 'bg-green-500/20 text-green-300'
  };

  const buttonStyles = {
    HIGH: 'bg-purple-500 hover:bg-purple-600',
    MEDIUM: 'bg-blue-500 hover:bg-blue-600',
    BONUS: 'bg-green-500 hover:bg-green-600'
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Smart Opportunities</h3>
      
      <div className="space-y-3">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className={cn(
              'bg-gradient-to-r p-0.5 rounded-xl',
              impactStyles[opp.impact]
            )}
          >
            <div className="bg-background rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={cn('text-xs font-semibold px-2 py-1 rounded-full', badgeStyles[opp.impact])}>
                  {opp.impact} IMPACT
                </span>
                <span className="text-xs text-muted-foreground">{opp.timeEstimate}</span>
              </div>
              
              <div className="flex items-start mb-3">
                <span className="text-2xl mr-3">{opp.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">{opp.title}</p>
                  <p className="text-sm text-muted-foreground">{opp.subtitle}</p>
                </div>
              </div>
              
              <button className={cn('w-full py-2 rounded-lg font-medium text-sm text-white transition-colors', buttonStyles[opp.impact])}>
                {opp.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
