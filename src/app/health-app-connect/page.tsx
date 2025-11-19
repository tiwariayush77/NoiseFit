'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function HealthAppConnectPage() {
const router = useRouter();
const searchParams = useSearchParams();
const platform = searchParams.get('platform') || 'google-fit';

const [healthConnected, setHealthConnected] = useState(false);
const [calendarExpanded, setCalendarExpanded] = useState(false);
const [calendarConnected, setCalendarConnected] = useState(false);
const [calendarProvider, setCalendarProvider] = useState<string | null>(null);

useEffect(() => {
// Load saved states
const healthState = localStorage.getItem('healthAppConnected') === 'true';
const calendarState = localStorage.getItem('calendarConnected') === 'true';
const provider = localStorage.getItem('calendarProvider');
setHealthConnected(healthState);
setCalendarConnected(calendarState);
setCalendarProvider(provider);
}, []);

const handleHealthConnect = () => {
// Simulate connection
localStorage.setItem('healthAppConnected', 'true');
localStorage.setItem('healthPlatform', platform);
setHealthConnected(true);
};

const handleCalendarConnect = (provider: 'google' | 'apple') => {
// Simulate calendar connection
localStorage.setItem('calendarConnected', 'true');
localStorage.setItem('calendarProvider', provider);
setCalendarConnected(true);
setCalendarProvider(provider);
setCalendarExpanded(false);
};

const handleContinue = () => {
if (!healthConnected) {
alert('Please connect your health data first');
return;
}
router.push('/data-sync?platform=' + platform);
};

const platformInfo: Record<string, {name: string, icon: string, description: string}> = {
'google-fit': {
name: 'Google Fit',
icon: '📊',
description: 'Steps, workouts, sleep data'
},
'apple-health': {
name: 'Apple Health',
icon: '❤️',
description: 'Activity, heart rate, sleep'
},
'fitbit': {
name: 'Fitbit',
icon: '⌚',
description: 'Steps, heart rate, sleep stages'
}
};

const currentPlatform = platformInfo[platform] || platformInfo['google-fit'];

return (
<div className="min-h-screen bg-background text-foreground p-6 pb-28">
<div className="max-w-2xl mx-auto">
    {/* Header */}
    <button
      onClick={() => router.back()}
      className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
    >
      <span className="mr-2">←</span> Back
    </button>

    <h1 className="text-2xl font-bold mb-2">Connect Your Data</h1>
    <p className="text-muted-foreground text-sm mb-8">
      Sync your health and calendar data for personalized insights
    </p>

    {/* Health App Connection */}
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-semibold">Health Data</h2>
      
      <div className="bg-card/50 border border-border/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center flex-1">
            <span className="text-4xl mr-4">{currentPlatform.icon}</span>
            <div>
              <p className="font-semibold text-white text-lg">{currentPlatform.name}</p>
              <p className="text-sm text-muted-foreground">{currentPlatform.description}</p>
            </div>
          </div>
          {healthConnected && (
            <span className="text-green-400 text-sm font-semibold flex items-center">
              <span className="mr-1">✓</span> Connected
            </span>
          )}
        </div>
        
        {!healthConnected && (
          <button
            onClick={handleHealthConnect}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Connect {currentPlatform.name}
          </button>
        )}
      </div>
    </div>

    {/* Calendar Integration - NEW */}
    <div className="space-y-4 mb-8">
      <h2 className="text-lg font-semibold">Calendar Sync (Optional)</h2>
      
      <div className="bg-card/50 border border-border/20 rounded-xl overflow-hidden">
        {/* Calendar Header */}
        <button
          onClick={() => setCalendarExpanded(!calendarExpanded)}
          className="w-full p-5 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <span className="text-4xl mr-4">📅</span>
              <div>
                <p className="font-semibold text-white text-lg">Calendar Sync</p>
                <p className="text-sm text-muted-foreground">
                  {calendarConnected 
                    ? `Connected via ${calendarProvider === 'google' ? 'Google' : 'Apple'} Calendar`
                    : 'Optimize insights around your schedule'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {calendarConnected && (
                <span className="text-green-400 text-sm font-semibold flex items-center">
                  <span className="mr-1">✓</span> Connected
                </span>
              )}
              <svg
                className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${
                  calendarExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
        
        {/* Expanded Calendar Options */}
        {calendarExpanded && (
          <div className="px-5 pb-5 border-t border-border/50 pt-5 animate-fadeIn">
            <p className="text-sm text-muted-foreground mb-4">
              We'll use your calendar to provide smarter health insights:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start text-sm">
                <span className="text-accent mr-3 text-lg flex-shrink-0">✓</span>
                <div>
                  <p className="text-white font-medium">Avoid stress alerts during meetings</p>
                  <p className="text-xs text-muted-foreground">We won't interrupt important events</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <span className="text-accent mr-3 text-lg flex-shrink-0">✓</span>
                <div>
                  <p className="text-white font-medium">Suggest optimal focus times</p>
                  <p className="text-xs text-muted-foreground">Find gaps between meetings for deep work</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <span className="text-accent mr-3 text-lg flex-shrink-0">✓</span>
                <div>
                  <p className="text-white font-medium">Pre-meeting breathing reminders</p>
                  <p className="text-xs text-muted-foreground">If heart rate elevated before events</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <span className="text-accent mr-3 text-lg flex-shrink-0">✓</span>
                <div>
                  <p className="text-white font-medium">Detect travel days</p>
                  <p className="text-xs text-muted-foreground">Optimize battery for multi-day trips</p>
                </div>
              </li>
            </ul>
            
            {!calendarConnected && (
              <div className="space-y-3 mb-4">
                <button
                  onClick={() => handleCalendarConnect('google')}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center"
                >
                  <span className="text-xl mr-2">📅</span>
                  Connect Google Calendar
                </button>
                <button
                  onClick={() => handleCalendarConnect('apple')}
                  className="w-full py-3 bg-muted hover:bg-muted/80 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center"
                >
                  <span className="text-xl mr-2">📅</span>
                  Connect Apple Calendar
                </button>
              </div>
            )}
            
            {/* Privacy Notice */}
            <div className="bg-muted/50 border border-border/20 rounded-lg p-4">
              <p className="text-xs text-muted-foreground flex items-start">
                <span className="text-lg mr-2 flex-shrink-0">🔒</span>
                <span>
                  <strong className="text-white">Privacy First:</strong> We only read event times and duration, never titles, descriptions, or attendees. All data stays on your device.
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Continue Button */}
    <button
      onClick={handleContinue}
      disabled={!healthConnected}
      className={`
        w-full py-4 rounded-lg font-semibold text-lg transition-colors mb-3
        ${healthConnected
          ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
          : 'bg-muted text-muted-foreground cursor-not-allowed'
        }
      `}
    >
      Continue to Data Sync
    </button>

    {/* Skip Calendar */}
    {!calendarConnected && healthConnected && (
      <button
        onClick={() => router.push('/data-sync?platform=' + platform)}
        className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        Skip calendar sync for now
      </button>
    )}

  </div>
</div>
);
}