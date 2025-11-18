'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PLATFORMS = [
  {
    id: 'google-fit',
    name: 'Google Fit',
    description: 'Sync from Google Fit',
    logo: 'https://lh3.googleusercontent.com/ir2-W48gf2uIorNfXw4UDmK1mbq0g79vqe-3JVz9urSlhKQjBT58o57ENqtZ71MovujW10qrVe-mhpiic_Dsrg=w560-rw',
    gradient: 'from-green-500 to-blue-500'
  },
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Sync from Apple Health',
    logo: 'https://www.apple.com/v/health/d/images/overview/health-app/icon_health_app__fbkc4e69zdaq_large_2x.jpg',
    gradient: 'from-pink-500 to-red-500'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Connect your Fitbit',
    logo: 'https://cdn.brandfetch.io/idIrdiIB8m/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    description: 'Connect your Garmin',
    logo: 'https://cdn.brandfetch.io/iduRj5zc0_/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B',
    gradient: 'from-blue-600 to-cyan-600'
  }
];

export default function FitnessPlatformSelectPage() {
  const router = useRouter();

  const handlePlatformSelect = (platformId: string) => {
    router.push(`/health-app-connect?platform=${platformId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-2">Choose Your Platform</h1>
          <p className="text-muted-foreground">Select your fitness tracking app</p>
        </div>

        {/* Platform Cards */}
        <div className="space-y-4">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformSelect(platform.id)}
              className="w-full bg-card/50 hover:bg-muted border border-border rounded-2xl p-6 text-left transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center">
                {/* Logo Image */}
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0
                  bg-gradient-to-br ${platform.gradient}
                  overflow-hidden
                `}>
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.className = "text-white font-bold text-2xl";
                        fallback.innerText = platform.name.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                
                {/* Platform Info */}
                <div className="flex-1">
                  <p className="font-semibold text-lg mb-1">{platform.name}</p>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </div>
                
                {/* Arrow */}
                <span className="text-muted-foreground text-xl">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}