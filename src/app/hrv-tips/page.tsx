'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HRVTipsPage() {
const router = useRouter();
const [expandedTip, setExpandedTip] = useState<number | null>(null);

const userHRV = 61; // Example - replace with real data

const tips = [
{
id: 1,
title: 'Evening Walks',
impact: 'HIGH',
expectedGain: '+12% HRV',
icon: '🚶',
timeCommitment: '20 min/day',
description: 'Light evening walks 2-3 hours before bed activate the parasympathetic nervous system, improving overnight recovery.',
howTo: [
'Walk at conversational pace (not intense)',
'Aim for 7-9 PM window',
'Outdoors preferred for fresh air',
'15-30 minutes is optimal'
],
successRate: 76
},
{
id: 2,
title: 'Reduce Evening Screen Time',
impact: 'MEDIUM',
expectedGain: '+8% HRV',
icon: '📵',
timeCommitment: 'Screen off by 10 PM',
description: 'Blue light suppresses melatonin and activates stress response. Cutting screens 90 min before bed improves HRV.',
howTo: [
'Set phone to Do Not Disturb at 10 PM',
'Use blue light filters after sunset',
'Read physical books instead',
'Charge phone outside bedroom'
],
successRate: 68
},
{
id: 3,
title: 'Magnesium Supplementation',
impact: 'MEDIUM',
expectedGain: '+6% HRV',
icon: '💊',
timeCommitment: 'Daily supplement',
description: 'Magnesium supports parasympathetic activity. 200-400mg before bed can improve HRV and sleep quality.',
howTo: [
'Take magnesium glycinate (best absorption)',
'200-400mg dose 1 hour before bed',
'Consult doctor if on medications',
'Track HRV changes after 2 weeks'
],
successRate: 82
},
{
id: 4,
title: 'Morning Sunlight Exposure',
impact: 'MEDIUM',
expectedGain: '+7% HRV',
icon: '☀️',
timeCommitment: '10 min/morning',
description: 'Morning sunlight resets circadian rhythm, improving HRV by optimizing cortisol patterns throughout the day.',
howTo: [
'Get outside within 30 min of waking',
'10-15 minutes of natural light',
'No sunglasses (safe morning light)',
'Even cloudy days help'
],
successRate: 71
}
];

const impactColors: Record<string, string> = {
HIGH: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
MEDIUM: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
LOW: 'bg-muted/30 text-muted-foreground border-border/20'
};

return (
<div className="min-h-screen bg-background text-foreground p-6 pb-28">
<div className="max-w-2xl mx-auto">

    {/* Header */}
    <button
      onClick={() => router.back()}
      className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
    >
      <span className="mr-2">←</span> Back
    </button>
    
    <h1 className="text-2xl font-bold mb-2">HRV Tips</h1>
    <p className="text-muted-foreground text-sm mb-6">
      Improve your heart rate variability and recovery
    </p>

    {/* Current HRV */}
    <div className="bg-card/50 border border-border/20 rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Your Current HRV</p>
          <p className="text-3xl font-bold text-white">{userHRV} <span className="text-lg text-muted-foreground">ms</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Potential</p>
          <p className="text-2xl font-bold text-accent">
            {userHRV + 12} <span className="text-sm text-muted-foreground">ms</span>
          </p>
          <p className="text-xs text-accent">+12 ms if all tips applied</p>
        </div>
      </div>
    </div>

    {/* Tips List */}
    <div className="space-y-4">
      {tips.map((tip) => (
        <div
          key={tip.id}
          className="bg-card/50 border border-border/20 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
            className="w-full p-5 text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start flex-1">
                <span className="text-3xl mr-3">{tip.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">{tip.title}</p>
                  <p className="text-xs text-muted-foreground">{tip.description}</p>
                </div>
              </div>
              <span className="text-muted-foreground text-xl ml-2">
                {expandedTip === tip.id ? '▲' : '▼'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full border ${impactColors[tip.impact]}`}>
                  {tip.impact} IMPACT
                </span>
                <span className="text-xs text-muted-foreground">{tip.timeCommitment}</span>
              </div>
              <span className="text-sm font-semibold text-accent">{tip.expectedGain}</span>
            </div>
          </button>
          
          {expandedTip === tip.id && (
            <div className="px-5 pb-5 space-y-4 animate-in fade-in duration-300">
              <div className="border-t border-border/50 pt-4">
                <p className="text-sm font-semibold text-white mb-2">How to Do It:</p>
                <ul className="space-y-2">
                  {tip.howTo.map((step, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-accent mr-2">- </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Success Rate</span>
                  <span className="text-xs font-semibold text-accent">{tip.successRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${tip.successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Learn More */}
    <div className="mt-6 bg-accent/10 border border-accent/20 rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <span className="mr-2">📚</span>
        What is HRV?
      </h3>
      <p className="text-xs text-muted-foreground mb-3">
        Heart Rate Variability measures the variation in time between heartbeats. Higher HRV indicates better cardiovascular fitness and stress resilience.
      </p>
      <p className="text-xs text-muted-foreground">
        <strong>Normal range:</strong> 50-100ms (varies by age and fitness)
      </p>
    </div>

  </div>
</div>
);
}