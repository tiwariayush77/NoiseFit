'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const PLATFORM_CONFIG: Record<string, any> = {
  'apple-health': {
    name: 'Apple Health',
    logo: 'https://www.apple.com/v/health/d/images/overview/health-app/icon_health_app__fbkc4e69zdaq_large_2x.jpg',
    provider: 'Apple',
  },
  'google-fit': {
    name: 'Google Fit',
    logo: 'https://lh3.googleusercontent.com/ir2-W48gf2uIorNfXw4UDmK1mbq0g79vqe-3JVz9urSlhKQjBT58o57ENqtZ71MovujW10qrVe-mhpiic_Dsrg=w560-rw',
    provider: 'Google',
  },
};

export default function HealthAppConnectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'google-fit';
  const source = searchParams.get('source');
  
  // Determine which health app is connected based on initial platform
  const [googleFitConnected, setGoogleFitConnected] = useState(platform === 'google-fit');
  const [appleHealthConnected, setAppleHealthConnected] = useState(platform === 'apple-health');
  
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);

  const handleContinue = () => {
    router.push(`/data-sync?platform=${platform}${calendarConnected ? '&calendar=true' : ''}`);
  };

  const handleCalendarConnect = (calendarProvider: 'google' | 'apple') => {
    // Simulate OAuth flow
    setCalendarConnected(true);
    setCalendarExpanded(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Connect Your Data</h1>
          <p className="text-muted-foreground">The more we know, the smarter your insights.</p>
        </div>

        {/* Permissions Section */}
        <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold">Connect Health Data</h2>
            
            {/* Google Fit / Apple Health */}
            <div className="bg-card/50 border border-border/20 rounded-xl p-5">
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-3xl mr-3">📊</span>
                    <div>
                    <p className="font-semibold text-white">{platform === 'google-fit' ? 'Google Fit' : 'Apple Health'}</p>
                    <p className="text-xs text-muted-foreground">Steps, workouts, sleep data</p>
                    </div>
                </div>
                <span className="text-green-400 text-sm flex items-center gap-1">✓ Connected</span>
                </div>
            </div>
            
            {/* Calendar Integration - NEW */}
            <div className="bg-card/50 border border-border/20 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <span className="text-3xl mr-3">📅</span>
                    <div>
                    <p className="font-semibold text-white">Calendar Sync</p>
                    <p className="text-xs text-muted-foreground">Optimize insights around your schedule</p>
                    </div>
                </div>
                <button
                    onClick={() => setCalendarExpanded(!calendarExpanded)}
                    className="text-teal-400 text-sm hover:text-teal-300"
                >
                    {calendarConnected ? '✓ Connected' : 'Connect'}
                </button>
                </div>
                
                {calendarExpanded && (
                <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                    <p className="text-sm text-muted-foreground mb-3">
                    We'll use your calendar to:
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start">
                        <span className="text-teal-400 mr-2">✓</span>
                        Avoid stress alerts during meetings
                    </li>
                    <li className="flex items-start">
                        <span className="text-teal-400 mr-2">✓</span>
                        Suggest optimal focus times between events
                    </li>
                    <li className="flex items-start">
                        <span className="text-teal-400 mr-2">✓</span>
                        Pre-meeting breathing reminders (if HR elevated)
                    </li>
                    <li className="flex items-start">
                        <span className="text-teal-400 mr-2">✓</span>
                        Detect travel days for battery optimization
                    </li>
                    </ul>
                    
                    {/* Calendar Providers */}
                    <div className="space-y-2 mt-4">
                    <button
                        onClick={() => handleCalendarConnect('google')}
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
                    >
                        <span className="mr-2">📅</span>
                        Connect Google Calendar
                    </button>
                    <button
                        onClick={() => handleCalendarConnect('apple')}
                        className="w-full py-3 bg-muted hover:bg-muted/80 rounded-lg font-medium text-sm transition-colors flex items-center justify-center"
                    >
                        <span className="mr-2">📅</span>
                        Connect Apple Calendar
                    </button>
                    </div>
                    
                    {/* Privacy Notice */}
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-start">
                        <span className="mr-2">🔒</span>
                        <span>
                        <strong className="text-foreground/80">Privacy First:</strong> We only read event times and duration, never titles or descriptions.
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
          className="w-full py-3 bg-accent hover:bg-accent/90 rounded-lg font-semibold transition-colors text-accent-foreground"
          disabled={!googleFitConnected && !appleHealthConnected}
        >
          Continue to Data Sync
        </button>

        {/* Skip Option */}
        <button
          onClick={() => router.push(`/data-sync?platform=${platform}`)}
          className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Skip calendar sync for now
        </button>
      </div>
    </div>
  );
}
