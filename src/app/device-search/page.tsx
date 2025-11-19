'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeviceSearchPage() {
const router = useRouter();
const [scanning, setScanning] = useState(false);

const handleSmartDetection = () => {
setScanning(true);
setTimeout(() => {
setScanning(false);
const scenario = Math.random() > 0.3 ? 'both' : 'other';
router.push(`/device-connect?scenario=${scenario}`);
}, 2000);
};

return (
<div className="min-h-screen bg-background text-foreground flex flex-col">
{/* Header */}
<div className="p-6">
<button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground text-sm">
← Back
</button>
</div>

  {/* Main Content - Centered */}
  <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
    {/* Icon */}
    <div className="mb-8">
      <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-6xl animate-pulse">
        {scanning ? '⏳' : '🔍'}
      </div>
    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold text-center mb-3">
      {scanning ? 'Scanning...' : 'Find Your Devices'}
    </h1>

    {/* Subtitle */}
    <p className="text-muted-foreground text-center mb-12 max-w-sm">
      {scanning 
        ? 'Looking for compatible devices nearby' 
        : 'Connect your wearables in seconds'
      }
    </p>

    {/* Large Primary Button */}
    <button
      onClick={handleSmartDetection}
      disabled={scanning}
      className="w-full max-w-sm bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:from-muted disabled:to-muted text-white text-lg font-semibold py-6 rounded-2xl mb-4 transition-all shadow-2xl active:scale-95"
    >
      {scanning ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin mr-3 text-2xl">⏳</span>
          Scanning Nearby...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <span className="mr-3 text-2xl">🔍</span>
          Scan for Devices
        </span>
      )}
    </button>

    {/* Secondary Button */}
    <button
      onClick={() => router.push('/device-search-manual')}
      className="w-full max-w-sm py-4 bg-card/50 hover:bg-muted border border-border/20 rounded-xl font-semibold transition-colors text-left px-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <svg className="w-6 h-6 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <div>
            <p className="font-semibold text-foreground">Choose App Manually</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Already have Google Fit, Apple Health, or Fitbit installed
            </p>
          </div>
        </div>
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  </div>
</div>
);
}
