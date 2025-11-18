'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeviceSearchPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);

  const handleSmartDetection = () => {
    setScanning(true);

    // Simulate device scan (2 seconds)
    setTimeout(() => {
      setScanning(false);
      
      // INTELLIGENT DETECTION: Randomly detect different scenarios
      const scenarios = ['noise', 'other', 'both', 'none'];
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      // For demo purposes, let's favor 'both' scenario to show mixed devices
      const scenario = Math.random() > 0.3 ? 'both' : randomScenario;
      
      router.push(`/device-connect?scenario=${scenario}`);
    }, 2000);
  };

  const handleManualSearch = () => {
    router.push('/fitness-platform-select');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Find Your Devices</h1>
          <p className="text-muted-foreground">We'll scan for all compatible devices</p>
        </div>

        {/* Smart Detection */}
        <button
          onClick={handleSmartDetection}
          disabled={scanning}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:from-muted disabled:to-muted text-white font-semibold py-4 rounded-xl mb-4 transition-all"
        >
          {scanning ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⏳</span>
              Scanning for devices...
            </span>
          ) : (
            '🔍 Scan for All Devices'
          )}
        </button>

        {/* Manual Selection */}
        <button
          onClick={handleManualSearch}
          className="w-full bg-card/50 hover:bg-muted border border-border text-foreground font-medium py-4 rounded-xl transition-colors"
        >
          📱 Choose Health App Manually
        </button>

        {/* Info */}
        <div className="mt-8 bg-primary/10 border border-primary/20 rounded-xl p-4">
          <p className="text-sm text-foreground mb-2">
            <strong>Smart Detection finds:</strong>
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>-  Noise smartwatches & fitness bands</li>
            <li>-  Apple Watch & Apple Health data</li>
            <li>-  Fitbit devices & trackers</li>
            <li>-  Garmin watches</li>
            <li>-  Google Fit data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
    