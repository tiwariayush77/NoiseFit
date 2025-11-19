'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EnergyBreakdownPage() {
const router = useRouter();

const components = [
{
name: 'Sleep Quality',
score: 85,
weight: 30,
color: 'bg-blue-500',
textColor: 'text-blue-400',
detail: 'Deep: 18% | REM: 22%',
explanation: 'Both deep and REM sleep are above optimal thresholds'
},
{
name: 'Sleep Consistency',
score: 92,
weight: 20,
color: 'bg-purple-500',
textColor: 'text-purple-400',
detail: '±15 min variance',
explanation: 'Highly consistent bedtime and wake time'
},
{
name: 'HRV Recovery',
score: 61,
weight: 25,
color: 'bg-green-500',
textColor: 'text-green-400',
detail: 'Avg HRV: 61ms',
explanation: 'Average recovery, room for improvement'
},
{
name: 'Activity Load',
score: 83,
weight: 15,
color: 'bg-orange-500',
textColor: 'text-orange-400',
detail: 'Avg steps: 8,340',
explanation: 'Consistently hitting daily movement goals'
},
{
name: 'Stress Recovery',
score: 53,
weight: 10,
color: 'bg-red-500',
textColor: 'text-red-400',
detail: 'Avg stress: 47/100',
explanation: 'Moderate stress levels, breathing sessions help'
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
      <Link
        href="/energy-detail"
        className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <span className="mr-2">←</span> Back
      </Link>
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
            <span className="text-base font-semibold text-white">{component.name}</span>
            <span className="text-2xl font-bold text-white">{component.score}<span className="text-sm text-muted-foreground">/100</span></span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted/30 rounded-full h-3 mb-3">
            <div
              className={`${component.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${component.score}%` }}
            ></div>
          </div>
          
          {/* Details */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">{component.detail}</span>
            <span className={`font-semibold ${component.textColor}`}>
              {component.weight}% weight
            </span>
          </div>
          
          {/* Explanation */}
          <p className="text-xs text-muted-foreground bg-muted/20 rounded-lg p-2">
            💡 {component.explanation}
          </p>
        </div>
      ))}
    </div>

    {/* Calculation Explanation */}
    <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-5 mb-6">
      <p className="text-sm text-muted-foreground font-semibold mb-3">How It's Calculated:</p>
      <div className="font-mono text-xs text-muted-foreground space-y-1">
        {components.map((c) => (
          <p key={c.name}>
            {c.name}: {c.score} × {(c.weight/100).toFixed(2)} = {(c.score * (c.weight/100)).toFixed(1)}
          </p>
        ))}
        <div className="border-t border-teal-500/30 my-2 pt-2">
          <p className="text-teal-400 font-semibold text-sm">
            Total = {finalScore}/100
          </p>
        </div>
      </div>
    </div>

    {/* Improvement Tips */}
    <div className="bg-card/50 border border-border/20 rounded-xl p-5">
      <h3 className="text-base font-semibold mb-3 flex items-center">
        <span className="mr-2">💡</span>
        How to Improve Your Score
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-start">
          <span className="text-green-400 mr-2 mt-0.5">✓</span>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Sleep Quality (85/100):</span> Already excellent! Maintain your evening routine.
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-yellow-400 mr-2 mt-0.5">⚠</span>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">HRV Recovery (61/100):</span> Try evening walks and reduce evening screen time.
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-red-400 mr-2 mt-0.5">!</span>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Stress Recovery (53/100):</span> Your 2 PM breathing sessions work - do them daily!
          </p>
        </div>
      </div>
    </div>

</div>
</div>
);
}
