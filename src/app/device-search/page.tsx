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
<div className="min-h-screen bg-background text-foreground p-6 pb-28">
  <div className="max-w-2xl mx-auto">
    
    <button onClick={() => router.back()} className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
      <span className="mr-2">←</span> Back
    </button>
    <h1 className="text-2xl font-bold mb-2">Find Your Devices</h1>
    <p className="text-muted-foreground text-sm mb-8">
      Connect your wearables in seconds
    </p>

    <div className="flex justify-center mb-8">
      <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-2 border-primary/30">
        <svg className="w-20 h-20 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <button
      onClick={handleSmartDetection}
      disabled={scanning}
      className="w-full py-5 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-3 mb-4"
    >
      {scanning ? (
          <>
            <svg className="w-7 h-7 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4.5v3m0 9v3m7.5-7.5h-3m-9 0h-3m12.364-6.364l-2.122 2.122m-9.056 9.056l-2.122 2.122m13.298-2.122l-2.122-2.122m-9.056-9.056l-2.122-2.122" /></svg>
            Scanning...
          </>
      ) : (
          <>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Scan for Devices
          </>
      )}
    </button>

    <button
      onClick={() => router.push('/device-search-manual')}
      className="w-full py-4 bg-card/50 hover:bg-muted border border-border/20 rounded-xl font-semibold transition-colors text-left px-5"
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
