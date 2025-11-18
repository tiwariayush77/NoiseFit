'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  HeartPulse,
  Lock,
  Loader2,
  Dumbbell,
  Footprints,
  BedDouble,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const platformConfig: { [key: string]: any } = {
  'google-fit': {
    name: 'Google Fit',
    icon: 'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png',
    color: 'from-green-500/30 to-blue-500/30'
  },
  'apple-health': {
    name: 'Apple Health',
    icon: 'https://developer.apple.com/assets/elements/icons/health-app/health-app-96x96_2x.png',
    color: 'from-pink-500/30 to-red-500/30'
  },
  'fitbit': {
    name: 'Fitbit',
    icon: 'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/charge6/hero-static/porcelain/charge6-porcelain-device-1.png',
    color: 'from-teal-500/30 to-cyan-500/30'
  },
  'garmin': {
    name: 'Garmin',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Garmin_logo_2020.svg/1024px-Garmin_logo_2020.svg.png',
    color: 'from-blue-500/30 to-indigo-500/30'
  },
  'other': {
    name: 'Health App',
    icon: null,
    color: 'from-gray-500/30 to-gray-700/30'
  }
};


function HealthAppConnectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'google-fit';
  const [isConnecting, setIsConnecting] = useState(false);

  const config = platformConfig[platform] || platformConfig['other'];

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      router.push('/data-sync');
    }, 2000);
  };

  const permissions = [
    { icon: <Footprints className="w-5 h-5 text-teal-400" />, text: 'Steps & activity data' },
    { icon: <HeartPulse className="w-5 h-5 text-teal-400" />, text: 'Heart rate data' },
    { icon: <BedDouble className="w-5 h-5 text-teal-400" />, text: 'Sleep tracking' },
    { icon: <Dumbbell className="w-5 h-5 text-teal-400" />, text: 'Workout history' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 flex items-center p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft />
              <span className="sr-only">Back</span>
            </Button>
             <h1 className="text-lg font-semibold mx-auto">Connect {config.name}</h1>
            <div className="w-10"></div>
        </header>

        <main className="flex-1 flex flex-col items-center p-6 text-center">
            <div className="w-full max-w-md">

                <div className="text-center mb-8 animate-in fade-in-5 slide-in-from-bottom-5">
                    {config.icon ? (
                         <Image src={config.icon} alt={config.name} width={120} height={120} className={`mx-auto mb-4 rounded-3xl p-4 bg-gradient-to-br ${config.color}`} />
                    ) : (
                        <div className={`w-32 h-32 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${config.color} flex items-center justify-center text-6xl`}>
                            <HeartPulse />
                        </div>
                    )}
                    <p className="text-xl font-semibold">{config.name}</p>
                </div>

                <div className="mb-6 text-left animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:100ms]">
                    <p className="text-lg font-medium mb-4">We'll access:</p>
                    <div className="space-y-3">
                        {permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-3">
                            {permission.icon}
                            <span>{permission.text}</span>
                        </div>
                        ))}
                    </div>
                </div>

                <Card className="bg-card/50 border-border/20 my-8 text-left animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:200ms]">
                    <CardHeader className="flex-row items-center gap-3">
                        <Lock className="w-5 h-5 text-primary" />
                        <CardTitle>Your Data Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Data stays encrypted</li>
                            <li>• We only access what you permit</li>
                            <li>• Never shared with third parties</li>
                            <li>• You can revoke access anytime</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:300ms]">
                    <Button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        size="lg"
                        className={`w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600`}
                    >
                        {isConnecting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            `Connect to ${config.name}`
                        )}
                    </Button>
                </div>

                <div className="space-y-2 text-center mt-8 animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:400ms]">
                    <Button variant="link" className="text-teal-400">
                        Learn about data privacy →
                    </Button>
                    <Button variant="link" className="text-teal-400">
                        How we use your data →
                    </Button>
                </div>
            </div>
        </main>
    </div>
  );
}


export default function HealthAppConnectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HealthAppConnectContent />
        </Suspense>
    )
}
