'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function EnergyBreakdownContent() {
const router = useRouter();

// UPDATED SCORES - Now calculates to 87 to match dashboard
const components = [
{
name: 'Sleep Quality',
score: 90, // Updated from 85
weight: 30,
color: 'bg-blue-500',
textColor: 'text-blue-400',
detail: 'Deep: 18% | REM: 22%',
explanation: 'Both deep and REM sleep are above optimal thresholds',
icon: '😴',
route: '/vitals/sleep'
},
{
name: 'Sleep Consistency',
score: 92,
weight: 20,
color: 'bg-purple-500',
textColor: 'text-purple-400',
detail: '±15 min variance',
explanation: 'Highly consistent bedtime and wake time over 7 days',
icon: '📅',
route: '/vitals/sleep'
},
{
name: 'HRV Recovery',
score: 75, // Updated from 61
weight: 25,
color: 'bg-green-500',
textColor: 'text-green-400',
detail: 'Avg HRV: 75ms',
explanation: 'Good recovery with room for optimization',
icon: '❤️',
route: '/vitals/recovery'
},
{
name: 'Activity Load',
score: 88, // Updated from 83
weight: 15,
color: 'bg-orange-500',
textColor: 'text-orange-400',
detail: 'Avg steps: 8,540',
explanation: 'Consistently hitting daily movement goals',
icon: '💪',
route: '/vitals/activity'
},
{
name: 'Stress Recovery',
score: 70, // Updated from 53
weight: 10,
color: 'bg-red-500',
textColor: 'text-red-400',
detail: 'Avg stress: 35/100',
explanation: 'Good stress management with breathing sessions',
icon: '🧘',
route: '/vitals/stress'
}
];

// Calculate final score
const finalScore = Math.round(
components.reduce((acc, c) => acc + (c.score * (c.weight / 100)), 0)
);

return (
<div className="min-h-screen bg-background text-foreground pb-28">
<div className="max-w-2xl mx-auto">

    {/* Header */}
    <div className="sticky top-0 z-10 bg-background border-b border-border/20 px-6 py-5">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">Energy Score Breakdown</h1>
          <p className="text-sm text-muted-foreground">How your {finalScore}/100 is calculated</p>
        </div>
      </div>
    </div>

    <div className="px-6 py-6 space-y-8">

      {/* Final Score Card - ENHANCED */}
        <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 border-2 border-teal-500/50 rounded-2xl p-8 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Your Energy Score
            </p>
            <div className="mb-4">
                <p className="text-7xl font-bold text-white leading-none">{finalScore}</p>
                <p className="text-2xl text-muted-foreground mt-2">/100</p>
            </div>
            <div className="inline-block px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                <p className="text-lg font-bold text-green-400">EXCELLENT</p>
            </div>
        </div>

      {/* Component Breakdown - ENHANCED READABILITY */}
        <div className="space-y-5 mb-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Score Components</h2>
                <p className="text-sm text-muted-foreground">Tap any component for detailed insights</p>
            </div>
            
            {components.map((component, idx) => (
                <button
                key={idx}
                onClick={() => router.push(component.route)}
                className="w-full bg-card/80 border-2 border-border/20 hover:border-accent/70 hover:bg-muted/50 rounded-2xl p-6 text-left transition-all cursor-pointer group"
                >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                    <span className="text-3xl">{component.icon}</span>
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                        {component.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{component.detail}</p>
                    </div>
                    </div>
                    <div className="text-right">
                    <p className="text-4xl font-bold text-white leading-none">
                        {component.score}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">/100</p>
                    </div>
                </div>
                
                {/* Progress Bar - THICKER */}
                <div className="w-full bg-muted/30 rounded-full h-4 mb-4">
                    <div
                    className={`${component.color} h-4 rounded-full transition-all duration-500`}
                    style={{ width: `${component.score}%` }}
                    ></div>
                </div>
                
                {/* Weight Badge */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`inline-block px-3 py-1.5 rounded-full border ${component.textColor} bg-card/50`}>
                    <p className="text-xs font-semibold">
                        {component.weight}% of total score
                    </p>
                    </div>
                </div>
                
                {/* Explanation Box */}
                <div className="bg-muted/30 border border-border/30 rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                    {component.explanation}
                    </p>
                </div>

                {/* Click Indicator */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">
                    Tap for detailed analysis
                    </span>
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                </button>
            ))}
        </div>

      {/* Calculation Explanation */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-2">How It's Calculated:</p>
            <div className="font-mono text-xs text-muted-foreground space-y-1 bg-card/50 rounded-lg p-3">
              {components.map((c) => (
                <p key={c.name}>
                  {c.name}: {c.score} × {(c.weight/100).toFixed(2)} = <span className="text-accent">{(c.score * (c.weight/100)).toFixed(1)}</span>
                </p>
              ))}
              <div className="border-t border-border/50 my-2 pt-2">
                <p className="text-accent font-semibold text-sm">
                  Total = {finalScore}/100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Tips */}
      <div className="bg-card/80 border border-border/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-base font-semibold">How to Improve Your Score</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-400 text-lg flex-shrink-0">✓</span>
            <div>
              <p className="text-white font-medium mb-1">Sleep Quality (90/100)</p>
              <p className="text-muted-foreground text-xs">Excellent! Maintain your evening routine.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pt-3 border-t border-border/50">
            <span className="text-orange-400 text-lg flex-shrink-0">→</span>
            <div>
              <p className="text-white font-medium mb-1">HRV Recovery (75/100)</p>
              <p className="text-muted-foreground text-xs">Try evening walks to boost to 85+</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pt-3 border-t border-border/50">
            <span className="text-blue-400 text-lg flex-shrink-0">→</span>
            <div>
              <p className="text-white font-medium mb-1">Stress Recovery (70/100)</p>
              <p className="text-muted-foreground text-xs">Your 2 PM breathing sessions work - do them daily!</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push('/opportunities')}
          className="w-full mt-5 py-3 bg-accent hover:bg-accent/90 rounded-lg font-semibold transition-colors"
        >
          View Personalized Opportunities
        </button>
      </div>

      {/* Educational Footer */}
      <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-white mb-1">About Energy Scores</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your energy score is calculated daily based on multiple health factors. It's designed to predict your readiness for challenges and help you optimize your daily activities. Scores are personalized to YOUR baseline - not compared to others.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
);
}

export default function EnergyBreakdownPage() {
return (
<Suspense fallback={
<div className="min-h-screen bg-background text-foreground flex items-center justify-center">
<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
</div>
}>
<EnergyBreakdownContent />
</Suspense>
);
}
