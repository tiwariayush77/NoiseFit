'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const PLATFORM_CONFIG: Record<string, any> = {
  'apple-health': {
    name: 'Apple Health',
    logo: 'https://www.apple.com/v/health/d/images/overview/health-app/icon_health_app__fbkc4e69zdaq_large_2x.jpg',
    provider: 'Apple',
    gradient: 'from-pink-500 to-red-500',
    dataTypes: ['Steps & activity data', 'Heart rate data', 'Sleep tracking', 'Workout history']
  },
  'google-fit': {
    name: 'Google Fit',
    logo: 'https://lh3.googleusercontent.com/ir2-W48gf2uIorNfXw4UDmK1mbq0g79vqe-3JVz9urSlhKQjBT58o57ENqtZ71MovujW10qrVe-mhpiic_Dsrg=w560-rw',
    provider: 'Google',
    gradient: 'from-green-500 to-blue-500',
    dataTypes: ['Steps & activity data', 'Heart rate data', 'Sleep tracking', 'Workout history']
  },
  'fitbit': {
    name: 'Fitbit',
    logo: 'https://cdn.brandfetch.io/idIrdiIB8m/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    provider: 'Fitbit',
    gradient: 'from-teal-500 to-cyan-500',
    dataTypes: ['Steps & activity data', 'Heart rate data', 'Sleep tracking', 'Workout history']
  },
  'garmin': {
    name: 'Garmin',
    logo: 'https://cdn.brandfetch.io/iduRj5zc0_/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    provider: 'Garmin',
    gradient: 'from-blue-600 to-cyan-600',
    dataTypes: ['Steps & activity data', 'Heart rate data', 'Sleep tracking', 'Workout history']
  }
};

export default function HealthAppConnectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'google-fit';
  const source = searchParams.get('source');
  const config = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG['google-fit'];

  const handleConnect = () => {
    router.push(`/data-sync?platform=${platform}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Connect {source ? source.charAt(0).toUpperCase() + source.slice(1) : config.name}</h1>
           {source ? (
            <p className="text-muted-foreground">
              {source.charAt(0).toUpperCase() + source.slice(1)} syncs through {config.name}
            </p>
          ) : (
            <p className="text-muted-foreground">We'll access your health data securely</p>
          )}
        </div>
        
        {source && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="mr-2">ℹ️</span>
              How It Works
            </h3>
            <p className="text-sm text-muted-foreground">
              {source.charAt(0).toUpperCase() + source.slice(1)} automatically syncs your data to {config.name}. 
              By connecting {config.name}, we'll access your {source} data.
            </p>
          </div>
        )}

        {/* Platform Logo */}
        <div className="text-center mb-8">
          <div className={`
            w-32 h-32 mx-auto mb-4 rounded-3xl flex items-center justify-center
            bg-gradient-to-br ${config.gradient}
            p-4
          `}>
            <img
              src={config.logo}
              alt={config.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = "text-white font-bold text-5xl";
                    fallback.innerText = config.name.charAt(0);
                    parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <h2 className="text-xl font-semibold">{config.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">by {config.provider}</p>
        </div>

        {/* What We'll Access */}
        <div className="bg-card/50 border border-border rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">We'll access:</h3>
          <div className="space-y-3">
            {config.dataTypes.map((type: string, idx: number) => (
              <div key={idx} className="flex items-start">
                <span className="text-primary mr-3 text-lg">✓</span>
                <span className="text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
          <h3 className="font-semibold mb-2 flex items-center">
            <span className="mr-2">🔒</span>
            Your Data Security
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>-  Data stays encrypted</li>
            <li>-  We only access what you permit</li>
            <li>-  Never shared with third parties</li>
            <li>-  You can revoke access anytime</li>
          </ul>
        </div>

        {/* Connect Button */}
        <button
          onClick={handleConnect}
          className={`
            w-full font-semibold py-4 rounded-xl transition-all mb-4
            bg-gradient-to-r ${config.gradient} hover:opacity-90
            text-white
          `}
        >
          Connect {config.name}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Choose Different Platform
        </button>
      </div>
    </div>
  );
}
