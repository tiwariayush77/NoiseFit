'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const PLATFORM_LOGOS: Record<string, any> = {
  'apple-health': {
    name: 'Apple Health',
    logo: 'https://www.apple.com/v/health/d/images/overview/health-app/icon_health_app__fbkc4e69zdaq_large_2x.jpg',
    gradient: 'from-pink-500 to-red-500'
  },
  'google-fit': {
    name: 'Google Fit',
    logo: 'https://lh3.googleusercontent.com/ir2-W48gf2uIorNfXw4UDmK1mbq0g79vqe-3JVz9urSlhKQjBT58o57ENqtZ71MovujW10qrVe-mhpiic_Dsrg=w560-rw',
    gradient: 'from-green-500 to-blue-500'
  },
  'fitbit': {
    name: 'Fitbit',
    logo: 'https://cdn.brandfetch.io/idIrdiIB8m/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    gradient: 'from-teal-500 to-cyan-500'
  },
  'garmin': {
    name: 'Garmin',
    logo: 'https://cdn.brandfetch.io/iduRj5zc0_/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    gradient: 'from-blue-600 to-cyan-600'
  },
  'bluetooth': {
    name: 'Your Device',
    logo: null, // Use emoji fallback
    gradient: 'from-primary to-purple-600'
  }
};

const NOISE_LOGO = {
  name: 'Noise Intelligence',
  logo: 'https://cdn.brandfetch.io/idZViZh4Xg/w/820/h/820/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B',
  gradient: 'from-primary to-accent'
};

export default function DataSyncPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'bluetooth';
  const [syncProgress, setSyncProgress] = useState(0);

  const sourceConfig = PLATFORM_LOGOS[platform] || PLATFORM_LOGOS['bluetooth'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          localStorage.setItem('onboardingComplete', 'true');
          // CORRECTED: Route to the next step in onboarding, not directly to dashboard
          setTimeout(() => router.push('/instant-value'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router, platform]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Source Logo */}
        <div className="mb-8">
          <div className={`
            w-24 h-24 mx-auto mb-4 rounded-3xl flex items-center justify-center p-4
            bg-gradient-to-br ${sourceConfig.gradient}
          `}>
            {sourceConfig.logo ? (
              <img
                src={sourceConfig.logo}
                alt={sourceConfig.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.className = "text-white font-bold text-4xl";
                        fallback.innerText = sourceConfig.name.charAt(0);
                        parent.appendChild(fallback);
                    }
                }}
              />
            ) : (
              <span className="text-white text-4xl">⌚</span>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{sourceConfig.name}</p>
        </div>

        {/* Sync Animation */}
        <div className="mb-8">
          <div className="text-4xl mb-4 animate-bounce">↓</div>
          <div className="relative mx-auto w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.2s' }}>↓</div>
        </div>

        {/* Noise Logo */}
        <div className="mb-8">
          <div className={`
            w-24 h-24 mx-auto mb-4 rounded-3xl flex items-center justify-center p-4
            bg-gradient-to-br ${NOISE_LOGO.gradient}
          `}>
            <img
              src={NOISE_LOGO.logo}
              alt={NOISE_LOGO.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = "text-white font-bold text-4xl";
                    fallback.innerText = 'N';
                    parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <p className="text-muted-foreground text-sm">{NOISE_LOGO.name}</p>
        </div>

        {/* Status Message */}
        <h1 className="text-2xl font-bold mb-2">
          Syncing from {sourceConfig.name}
        </h1>

        {/* Progress Bar */}
        <div className="w-full bg-card rounded-full h-3 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${syncProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          {syncProgress < 100 ? `${Math.round(syncProgress)}% Complete` : 'Sync Complete!'}
        </p>

        {/* Security Note */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-primary">
            🔒 Your data is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}
