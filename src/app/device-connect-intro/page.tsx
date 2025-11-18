'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Lock, Watch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function DeviceConnectIntroContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceName = searchParams.get('device') || 'ColorFit Pro 6 Max';
  const deviceIds = searchParams.get('devices') || '';

  const benefits = [
    'Real-time health tracking',
    'Accurate sensor data',
    'All-day battery monitoring',
    'Instant sync to app',
  ];

  const handlePair = () => {
    router.push(`/device-connect?devices=${deviceIds}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center p-4 border-b border-border/20 bg-background">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold mx-auto">Connect Your Device</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center p-6 text-center">
        <div className="w-full max-w-md">
          {/* Device Preview */}
          <div className="text-center mb-8 animate-in fade-in-5 slide-in-from-bottom-5">
            <div className="w-48 h-48 mx-auto mb-4 bg-muted/30 rounded-2xl flex items-center justify-center border border-border/20">
              <Watch className="w-24 h-24 text-primary" />
            </div>
            <p className="text-lg font-medium text-muted-foreground">{deviceName}</p>
          </div>

          {/* Main Message */}
          <div className="text-center mb-8 animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:100ms]">
            <h2 className="text-2xl font-bold mb-2">Ready to pair your watch?</h2>
            <p className="text-muted-foreground">
              We'll connect via Bluetooth to start tracking
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-8 text-left animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:200ms]">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-teal-400" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:300ms]">
            <Button
              onClick={handlePair}
              className="w-full h-14 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl transition-all"
            >
              Turn On Bluetooth & Pair
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-8 animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:400ms]">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">OR</span>
          </div>
          

          {/* Secondary Option (Subtle) */}
          <div className="text-center animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:500ms]">
            <p className="text-sm text-muted-foreground mb-2">
              Already tracking with another app?
            </p>
            <Link href={`/fitness-platform-select?devices=${deviceIds}`} passHref>
                <Button variant="link" className="text-teal-400">
                    Sync from Google Fit or Apple Health →
                </Button>
            </Link>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center mt-8 flex items-center justify-center gap-2 animate-in fade-in-5 slide-in-from-bottom-5 [animation-delay:600ms]">
            <Lock className="w-3 h-3" /> Your data stays secure and private
          </p>
        </div>
      </main>
    </div>
  );
}


export default function DeviceConnectIntroPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DeviceConnectIntroContent />
        </Suspense>
    )
}
