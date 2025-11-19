'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type PatternCategory = 'sleep' | 'energy' | 'stress' | 'activity';

interface Pattern {
  id: number;
  category: PatternCategory;
  title: string;
  description: string;
  confidence: number;
  impact: string;
  dateDiscovered: string;
  dataPoints: number;
  actionable?: string;
}

export default function PatternsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<PatternCategory | 'all'>('all');

  // Mock patterns data
  const patterns: Pattern[] = [
    // Sleep Patterns
    {
      id: 1,
      category: 'sleep',
      title: 'You sleep best on Saturdays',
      description: 'Weekend sleep is 54 minutes longer than weekdays with 18% better quality. Less stress and no alarms contribute to deeper rest.',
      confidence: 95,
      impact: '+18% sleep quality',
      dateDiscovered: '2 weeks ago',
      dataPoints: 30,
      actionable: 'Try to replicate Saturday conditions on weeknights: earlier bedtime, no evening stress'
    },
    {
      id: 2,
      category: 'sleep',
      title: 'Evening walks improve sleep by 23%',
      description: 'On days you walk 7-9 PM, deep sleep increases from 15% to 18%. Parasympathetic activation before bed helps recovery.',
      confidence: 89,
      impact: '+23% sleep quality',
      dateDiscovered: '3 weeks ago',
      dataPoints: 45,
      actionable: 'Schedule 20-min evening walks at 7:30 PM'
    },
    {
      id: 3,
      category: 'sleep',
      title: 'Caffeine after 4 PM delays sleep 45 min',
      description: 'When caffeine consumed after 4 PM, sleep onset averages 11:45 PM vs usual 11:00 PM. Half-life affects sleep architecture.',
      confidence: 87,
      impact: '-45 min sleep onset',
      dateDiscovered: '1 week ago',
      dataPoints: 25,
      actionable: 'Cut caffeine by 3 PM for optimal sleep'
    },
    
    // Energy Patterns
    {
      id: 4,
      category: 'energy',
      title: 'Morning workouts boost energy 23%',
      description: 'Exercise between 6-8 AM increases all-day energy levels. Cortisol optimization and endorphin release provide sustained vitality.',
      confidence: 92,
      impact: '+23% daily energy',
      dateDiscovered: '4 weeks ago',
      dataPoints: 60,
      actionable: 'Schedule workouts at 7 AM for peak energy'
    },
    {
      id: 5,
      category: 'energy',
      title: 'Skipping breakfast reduces energy 12%',
      description: 'On days without breakfast, morning energy drops 12% and afternoon crashes occur 2 hours earlier.',
      confidence: 88,
      impact: '-12% morning energy',
      dateDiscovered: '2 weeks ago',
      dataPoints: 35,
      actionable: 'Eat protein-rich breakfast by 8 AM'
    },
    {
      id: 6,
      category: 'energy',
      title: 'Your energy peaks at 10 AM and 3 PM',
      description: 'Consistent daily energy spikes at these times. Cortisol rhythm and circadian patterns drive this cycle.',
      confidence: 94,
      impact: 'Peak performance windows',
      dateDiscovered: '5 weeks ago',
      dataPoints: 90,
      actionable: 'Schedule important work at 10 AM or 3 PM'
    },
    
    // Stress Patterns
    {
      id: 7,
      category: 'stress',
      title: '2 PM breathing reduces stress 28 points',
      description: 'Pre-meeting stress intervention is 89% effective. Proactive breathing before typical stress spike prevents escalation.',
      confidence: 89,
      impact: '-28 stress points',
      dateDiscovered: '3 weeks ago',
      dataPoints: 40,
      actionable: 'Set daily 2 PM breathing reminder'
    },
    {
      id: 8,
      category: 'stress',
      title: 'Stress peaks during office hours (2-4 PM)',
      description: 'Weekday stress spikes to 70/100 at 3 PM. Meeting density and decision fatigue are primary drivers.',
      confidence: 94,
      impact: '+40 stress points',
      dateDiscovered: '6 weeks ago',
      dataPoints: 120,
      actionable: 'Block calendar at 2 PM for stress management'
    },
    
    // Activity Patterns
    {
      id: 9,
      category: 'activity',
      title: 'You\'re most consistent on Mon/Wed/Fri',
      description: 'Workout completion rate: 94% on these days vs 67% on Tue/Thu. Scheduling pattern creates habit strength.',
      confidence: 88,
      impact: '+27% consistency',
      dateDiscovered: '4 weeks ago',
      dataPoints: 50,
      actionable: 'Stick to M/W/F workout schedule'
    },
    {
      id: 10,
      category: 'activity',
      title: 'Zone 2 cardio has 94% completion rate',
      description: 'Lower intensity workouts show highest adherence. Sustainable pace prevents burnout and builds endurance.',
      confidence: 91,
      impact: '94% completion',
      dateDiscovered: '2 weeks ago',
      dataPoints: 30,
      actionable: 'Focus on 30-min Zone 2 sessions'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Patterns', count: patterns.length, icon: '🧠' },
    { id: 'sleep', label: 'Sleep', count: patterns.filter(p => p.category === 'sleep').length, icon: '😴' },
    { id: 'energy', label: 'Energy', count: patterns.filter(p => p.category === 'energy').length, icon: '⚡' },
    { id: 'stress', label: 'Stress', count: patterns.filter(p => p.category === 'stress').length, icon: '🧘' },
    { id: 'activity', label: 'Activity', count: patterns.filter(p => p.category === 'activity').length, icon: '💪' }
  ];

  const filteredPatterns = activeCategory === 'all' 
    ? patterns 
    : patterns.filter(p => p.category === activeCategory);

  const getCategoryColor = (category: PatternCategory) => {
    const colors = {
      sleep: {
        bg: 'from-blue-500/20 to-purple-500/20',
        border: 'border-blue-500/50',
        text: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      },
      energy: {
        bg: 'from-orange-500/20 to-yellow-500/20',
        border: 'border-orange-500/50',
        text: 'text-orange-400',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      },
      stress: {
        bg: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-500/50',
        text: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      },
      activity: {
        bg: 'from-teal-500/20 to-green-500/20',
        border: 'border-teal-500/50',
        text: 'text-teal-400',
        badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
      }
    };
    return colors[category];
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-28">
      
      {/* Header */}
      <div className="bg-card/50 border-b border-border/20 px-6 py-5 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Pattern Library</h1>
            <p className="text-sm text-muted-foreground">Discovered correlations in your health data</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as PatternCategory | 'all')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0
                ${activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${activeCategory === cat.id
                  ? 'bg-white/20'
                  : 'bg-card'
                }
              `}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card/50 border border-border/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white mb-1">{patterns.length}</p>
            <p className="text-xs text-muted-foreground">Total Patterns</p>
          </div>
          <div className="bg-card/50 border border-border/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent mb-1">
              {Math.round(patterns.reduce((acc, p) => acc + p.confidence, 0) / patterns.length)}%
            </p>
            <p className="text-xs text-muted-foreground">Avg Confidence</p>
          </div>
          <div className="bg-card/50 border border-border/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white mb-1">
              {Math.max(...patterns.map(p => p.dataPoints))}
            </p>
            <p className="text-xs text-muted-foreground">Data Points</p>
          </div>
        </div>

        {/* Patterns List */}
        <div className="space-y-4">
          {filteredPatterns.map((pattern) => {
            const colors = getCategoryColor(pattern.category);
            
            return (
              <div
                key={pattern.id}
                className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-5`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors.badge}`}>
                    {pattern.category.toUpperCase()}
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted/50 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${colors.bg.replace('/20', '')} h-2 rounded-full`}
                          style={{ width: `${pattern.confidence}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-semibold ${colors.text}`}>
                        {pattern.confidence}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {pattern.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {pattern.description}
                </p>

                {/* Impact & Meta */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`font-semibold ${colors.text}`}>
                      {pattern.impact}
                    </span>
                    <span className="text-muted-foreground">- </span>
                    <span className="text-muted-foreground">
                      {pattern.dataPoints} data points
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {pattern.dateDiscovered}
                  </span>
                </div>

                {/* Actionable Insight */}
                {pattern.actionable && (
                  <div className="bg-card/30 border border-border/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-accent mb-1">
                          What to do:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {pattern.actionable}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPatterns.length === 0 && (
          <div className="bg-card/50 border border-border/20 rounded-xl p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-muted-foreground mb-2">No patterns found in this category</p>
            <p className="text-sm text-muted-foreground/70">Try selecting a different filter</p>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">How patterns are discovered</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We analyze your health data over 30+ days to find statistically significant correlations. Confidence scores represent the strength of the relationship based on data consistency.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
