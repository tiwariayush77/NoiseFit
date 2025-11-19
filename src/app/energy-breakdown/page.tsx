
'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function EnergyBreakdownContent() {
const router = useRouter();

const components = [
{
name: 'Sleep Quality',
score: 85,
weight: 30,
color: 'bg-blue-500',
textColor: 'text-blue-400',
detail: 'Deep: 18% | REM: 22%',
explanation: 'Both deep and REM sleep are above optimal thresholds',
icon: '😴'
},
{
name: 'Sleep Consistency',
score: 92,
weight: 20,
color: 'bg-purple-500',
textColor: 'text-purple-400',
detail: '±15 min variance',
explanation: 'Highly consistent bedtime and wake time over 7 days',
icon: '📅'
},
{
name: 'HRV Recovery',
score: 61,
weight: 25,
color: 'bg-green-500',
textColor: 'text-green-400',
detail: 'Avg HRV: 61ms',
explanation: 'Average recovery, room for improvement with stress management',
icon: '❤️'
},
{
name: 'Activity Load',
score: 83,
weight: 15,
color: 'bg-orange-500',
textColor: 'text-orange-400',
detail: 'Avg steps: 8,340',
explanation: 'Consistently hitting daily movement goals',
icon: '💪'
},
{
name: 'Stress Recovery',
score: 53,
weight: 10,
color: 'bg-red-500',
textColor: 'text-red-400',
detail: 'Avg stress: 47/100',
explanation: 'Moderate stress levels, breathing sessions help',
icon: '🧘'
}
];

const finalScore = Math.round(
components.reduce((acc, c) => acc + (c.score * (c.weight / 100)), 0)
);

return (
<div className="min-h-screen bg-background text-foreground p-6 pb-28">
<div className="max-w-2xl mx-auto">

    {/* Header */}
    <div className="mb-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <span className="mr-2">←</span> Back
      </button>
      <h1 className="text-2xl font-bold mb-2">Energy Score Breakdown</h1>
      <p className="text-muted-foreground text-sm">How your {finalScore}/100 score is calculated</p>
    </div>

    {/* Final Score Card */}
    <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 border-2 border-teal-500/50 rounded-2xl p-6 mb-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Your Energy Score</p>
        <p className="text-5xl font-bold text-white mb-2">{finalScore}</p>
        <p className="text-lg font-semibold text-green-400">EXCELLENT</p>
      </div>
    </div>

    {/* Component Breakdown */}
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-semibold">Score Components</h2>
      
      {components.map((component, idx) => (
        <div key={idx} className="bg-card/50 border border-border/20 rounded-xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{component.icon}</span>
              <span className="text-base font-semibold text-white">{component.name}</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {component.score}
              <span className="text-sm text-muted-foreground">/100</span>
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted/30 rounded-full h-3 mb-3">
            <div
              className={`${component.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${component.score}%` }}
            ></div>
          </div>
          
          {/* Details */}
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-muted-foreground">{component.detail}</span>
            <span className={`font-semibold ${component.textColor}`}>
              {component.weight}% weight
            </span>
          </div>
          
          {/* Explanation */}
          <div className="bg-muted/20 rounded-lg p-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 {component.explanation}
            </p>
          </div>
        </div>
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
    <div className="bg-card/50 border border-border/20 rounded-xl p-5">
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
            <p className="text-white font-medium mb-1">Sleep Quality (85/100)</p>
            <p className="text-muted-foreground text-xs">Already excellent! Maintain your evening routine.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 pt-3 border-t border-border/20">
          <span className="text-orange-400 text-lg flex-shrink-0">⚠</span>
          <div>
            <p className="text-white font-medium mb-1">HRV Recovery (61/100)</p>
            <p className="text-muted-foreground text-xs">Try evening walks and reduce evening screen time to boost recovery.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 pt-3 border-t border-border/20">
          <span className="text-red-400 text-lg flex-shrink-0">!</span>
          <div>
            <p className="text-white font-medium mb-1">Stress Recovery (53/100)</p>
            <p className="text-muted-foreground text-xs">Your 2 PM breathing sessions work - do them daily! Success rate: 89%</p>
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

</div>
</div>
);
}

export default function EnergyBreakdownPage() {
return (
<Suspense fallback={
<div className="min-h-screen bg-background text-foreground flex items-center justify-center">
  <div className="text-center">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p className="text-muted-foreground">Loading...</p>
  </div>
</div>
}>
<EnergyBreakdownContent />
</Suspense>
);
}

    