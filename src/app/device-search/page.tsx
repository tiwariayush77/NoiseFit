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
      onClick={() => router.push('/fitness-platform-select')}
      disabled={scanning}
      className="w-full max-w-sm bg-transparent border-2 border-border hover:border-muted-foreground text-foreground text-base font-medium py-4 rounded-xl transition-all active:scale-95"
    >
      <span className="flex items-center justify-center">
        <span className="mr-2">📱</span>
        Choose App Manually
      </span>
    </button>
  </div>

  {/* Info Cards - Bottom */}
  <div className="px-6 pb-8">
    <div className="bg-card/50 border border-border/20 rounded-2xl p-5">
      <p className="text-sm font-semibold mb-3 text-muted-foreground">We'll find:</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center">
          <span className="text-2xl mr-2">⌚</span>
          <span className="text-xs text-muted-foreground">Noise Watches</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">🍎</span>
          <span className="text-xs text-muted-foreground">Apple Health</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">🏃</span>
          <span className="text-xs text-muted-foreground">Google Fit</span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">💪</span>
          <span className="text-xs text-muted-foreground">Fitbit & More</span>
        </div>
      </div>
    </div>
  </div>
</div>
);
}
