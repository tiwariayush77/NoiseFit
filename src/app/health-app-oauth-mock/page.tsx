'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function HealthAppOAuthMockContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'google-fit';
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Auto-proceed after simulated auth
  useEffect(() => {
    if (isAuthenticating) {
      setTimeout(() => {
        router.push(`/data-sync?platform=${platform}`);
      }, 2000);
    }
  }, [isAuthenticating, platform, router]);

  const handleAllow = () => {
    setIsAuthenticating(true);
  };

  const handleCancel = () => {
    router.back();
  };

  if (platform === 'apple-health') {
    return <AppleHealthMockup onAllow={handleAllow} onCancel={handleCancel} isAuthenticating={isAuthenticating} />;
  } else {
    return <GoogleFitMockup onAllow={handleAllow} onCancel={handleCancel} isAuthenticating={isAuthenticating} />;
  }
}

// Apple Health Mockup Component
function AppleHealthMockup({ onAllow, onCancel, isAuthenticating }: { onAllow: () => void; onCancel: () => void; isAuthenticating: boolean; }) {
  const [toggles, setToggles] = useState({
    steps: true,
    distance: true,
    activeEnergy: true,
    flightsClimbed: false,
    heartRate: true,
    restingHR: true,
    hrv: true,
    bloodOxygen: false,
    sleepAnalysis: true,
    timeInBed: true,
    workouts: true
  });

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-white flex items-end">
      {/* Modal Sheet */}
      <div className="w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-2xl" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        {/* Drag Indicator */}
        <div className="flex justify-center pt-2 pb-4">
          <div className="w-9 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 pb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-4xl">
            ❤️
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Noise Intelligence</h1>
          <p className="text-gray-500 text-sm mt-1">would like to access your Health data</p>
        </div>

        {/* Turn All On */}
        <div className="px-6 pb-4">
          <button onClick={() => setToggles(Object.fromEntries(Object.keys(toggles).map(k => [k, true])))} className="text-blue-500 text-sm font-medium">
            Turn All Categories On
          </button>
        </div>

        {/* Activity Section */}
        <div className="px-6 py-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">ACTIVITY</p>
          <DataTypeRow label="Active Energy Burned" isOn={toggles.activeEnergy} onToggle={() => toggleSwitch('activeEnergy')} />
          <DataTypeRow label="Steps" isOn={toggles.steps} onToggle={() => toggleSwitch('steps')} />
          <DataTypeRow label="Walking + Running Distance" isOn={toggles.distance} onToggle={() => toggleSwitch('distance')} />
          <DataTypeRow label="Flights Climbed" isOn={toggles.flightsClimbed} onToggle={() => toggleSwitch('flightsClimbed')} />
        </div>

        {/* Heart Section */}
        <div className="px-6 py-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">HEART</p>
          <DataTypeRow label="Heart Rate" isOn={toggles.heartRate} onToggle={() => toggleSwitch('heartRate')} />
          <DataTypeRow label="Resting Heart Rate" isOn={toggles.restingHR} onToggle={() => toggleSwitch('restingHR')} />
          <DataTypeRow label="Heart Rate Variability" isOn={toggles.hrv} onToggle={() => toggleSwitch('hrv')} />
          <DataTypeRow label="Blood Oxygen" isOn={toggles.bloodOxygen} onToggle={() => toggleSwitch('bloodOxygen')} />
        </div>

        {/* Sleep Section */}
        <div className="px-6 py-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">SLEEP</p>
          <DataTypeRow label="Sleep Analysis" isOn={toggles.sleepAnalysis} onToggle={() => toggleSwitch('sleepAnalysis')} />
          <DataTypeRow label="Time in Bed" isOn={toggles.timeInBed} onToggle={() => toggleSwitch('timeInBed')} />
        </div>

        {/* Workouts Section */}
        <div className="px-6 py-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">WORKOUTS</p>
          <DataTypeRow label="Workouts" isOn={toggles.workouts} onToggle={() => toggleSwitch('workouts')} />
        </div>

        {/* Turn All Off */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button onClick={() => setToggles(Object.fromEntries(Object.keys(toggles).map(k => [k, false])))} className="text-gray-500 text-sm font-medium">
            Turn All Categories Off
          </button>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6">
          <button
            onClick={onAllow}
            disabled={isAuthenticating}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl mb-3 transition-colors"
          >
            {isAuthenticating ? 'Authorizing...' : 'Allow'}
          </button>
          <button onClick={onCancel} className="w-full text-blue-500 text-center font-medium">
            Don't Allow
          </button>
        </div>
      </div>
    </div>
  );
}

// iOS Toggle Component
function DataTypeRow({ label, isOn, onToggle }: { label: string; isOn: boolean; onToggle: () => void; }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-gray-900 text-base">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-8 w-[3.25rem] items-center rounded-full transition-colors ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0.5'}`}
        />
      </button>
    </div>
  );
}

// Google Fit Mockup Component
function GoogleFitMockup({ onAllow, onCancel, isAuthenticating }: { onAllow: () => void; onCancel: () => void; isAuthenticating: boolean; }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-12">
        {/* Google Logo */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">G</div>
          <h1 className="text-2xl font-normal text-gray-800 mb-2">Sign in with Google</h1>
          <p className="text-sm text-gray-600">to continue to Noise Intelligence</p>
        </div>
        {/* User Account */}
        <div className="bg-gray-100 rounded-lg p-3 mb-6 flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
            U
          </div>
          <span className="text-sm text-gray-800">user@gmail.com</span>
        </div>

        {/* Permission Request */}
        <div className="mb-6">
          <p className="text-base font-medium text-gray-800 mb-3">
            Noise Intelligence wants to access your Google Account
          </p>
          <p className="text-sm text-gray-600 mb-4">This will allow Noise Intelligence to:</p>
          <div className="space-y-2 text-sm text-gray-800">
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>View and store your fitness activity information</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>See info about your daily activity</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>See your heart rate data</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>See your sleep data</span>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-6 text-xs text-gray-600">
          <p className="font-medium mb-1">Make sure you trust Noise Intelligence</p>
          <p>You may be sharing sensitive info with this site or app. Learn about how Noise Intelligence will handle your data by reviewing its privacy policy.</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onAllow}
            disabled={isAuthenticating}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded text-sm font-medium text-white"
          >
            {isAuthenticating ? 'Authorizing...' : 'Allow'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HealthAppOAuthMockPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HealthAppOAuthMockContent />
        </Suspense>
    )
}
