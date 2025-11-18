'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Watch,
  ToyBrick,
  Smartphone,
  Signal,
  BatteryFull,
  Check,
  Loader2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Mock device data
type Device = {
  id: string;
  name: string;
  type: 'noise' | 'other';
  brand?: string;
  battery?: number;
  distance?: string;
  suggestedPlatform?: 'apple-health' | 'google-fit';
};

const ALL_DEVICES: Device[] = [
  { id: 'noise-pro-6', name: 'ColorFit Pro 6 Max', type: 'noise', battery: 87, distance: '2m away' },
  { id: 'apple-watch-9', name: 'Apple Watch Series 9', type: 'other', brand: 'Apple', suggestedPlatform: 'apple-health' },
  { id: 'fitbit-charge-5', name: 'Fitbit Charge 5', type: 'other', brand: 'Fitbit', suggestedPlatform: 'google-fit' },
];


function DeviceConnectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  // CRITICAL FIX: Divert to health app flow if platform is specified
  useEffect(() => {
    const platform = searchParams.get('platform');
    if (platform && platform !== 'bluetooth') {
      router.replace(`/health-app-connect?platform=${platform}`);
      return; // Stop further execution in this component
    }

    // Simulate device detection based on query param for demo
    const scanTimeout = setTimeout(() => {
        const scenario = searchParams.get('scenario');
        let detected: Device[] = [];
        if (scenario === 'noise') {
            detected = [ALL_DEVICES[0]];
        } else if (scenario === 'other') {
            detected = [ALL_DEVICES[1]];
        } else if (scenario === 'both') {
            detected = [ALL_DEVICES[0], ALL_DEVICES[2]];
        }
        setDevices(detected);
        setIsScanning(false);
    }, 2000);

    return () => clearTimeout(scanTimeout);
  }, [searchParams, router]);

  const noiseDevices = devices.filter(d => d.type === 'noise');
  const otherDevices = devices.filter(d => d.type === 'other');

  const handleContinue = () => {
    if (noiseDevices.length > 0 && otherDevices.length === 0) {
      // Only Noise device(s) found
      const deviceIds = noiseDevices.map(d => d.id).join(',');
      const primaryDeviceName = noiseDevices[0].name;
      router.push(`/device-connect-intro?devices=${deviceIds}&device=${encodeURIComponent(primaryDeviceName)}`);
    } else if (otherDevices.length > 0 && noiseDevices.length === 0) {
      // Only other wearable(s) found
      const platform = otherDevices[0].suggestedPlatform || 'google-fit';
      router.push(`/health-app-connect?platform=${platform}`);
    }
    // If both are found, this button is hidden, so no action is needed.
  };

  const handleManualConnect = () => {
      router.push('/device-search');
  }

  if (isScanning) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
            <div className="relative w-48 h-48 flex items-center justify-center my-8">
                <div className="absolute w-full h-full rounded-full bg-primary/10 animate-pulse"></div>
                <div className="absolute w-2/3 h-2/3 rounded-full bg-primary/20 animate-pulse [animation-delay:0.5s]"></div>
                <Signal className="w-16 h-16 text-primary animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold">Scanning for devices...</h1>
            <p className="text-muted-foreground mt-2">Keep your devices nearby and powered on.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20">
        <Link href="/device-search">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Found Devices</h1>
        <Link href="/device-search">
            <Button variant="ghost" size="icon">
                <X />
            </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col p-6 space-y-6">

        {/* Both Devices Found Scenario */}
        {noiseDevices.length > 0 && otherDevices.length > 0 && (
          <div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">🎯</div>
                <h2 className="text-2xl font-bold mb-2">Multi-Device Insights</h2>
                <p className="text-sm text-muted-foreground">
                  Combine data from both devices for the best results
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start bg-purple-500/10 rounded-lg p-3">
                  <span className="text-purple-400 text-xl mr-3">✓</span>
                  <div>
                    <p className="font-medium">24/7 Coverage</p>
                    <p className="text-xs text-muted-foreground">Complete data throughout the day</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-500/10 rounded-lg p-3">
                  <span className="text-purple-400 text-xl mr-3">✓</span>
                  <div>
                    <p className="font-medium">Cross-Device Validation</p>
                    <p className="text-xs text-muted-foreground">More accurate measurements</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-500/10 rounded-lg p-3">
                  <span className="text-purple-400 text-xl mr-3">✓</span>
                  <div>
                    <p className="font-medium">Better Pattern Detection</p>
                    <p className="text-xs text-muted-foreground">AI learns from multiple sources</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Noise Devices */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                NOISE DEVICES ({noiseDevices.length})
              </h3>
              {noiseDevices.map(device => (
                <div key={device.id} className="bg-card/50 rounded-xl p-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">{device.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Battery: {device.battery}% · {device.distance}
                      </p>
                    </div>
                    <Watch className="w-8 h-8 text-primary"/>
                  </div>
                  <Button
                    onClick={() => router.push(`/device-connect-intro?devices=${device.id}&device=${encodeURIComponent(device.name)}`)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Pair via Bluetooth
                  </Button>
                </div>
              ))}
            </div>

            {/* Non-Noise Devices */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                OTHER WEARABLES ({otherDevices.length})
              </h3>
              {otherDevices.map(device => (
                <div key={device.id} className="bg-card/50 rounded-xl p-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">{device.name}</p>
                      <p className="text-sm text-muted-foreground">
                        via {device.brand}
                      </p>
                    </div>
                    <Smartphone className="w-8 h-8 text-accent"/>
                  </div>
                  <Button
                    onClick={() => router.push(`/health-app-connect?platform=${device.suggestedPlatform}`)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2 rounded-lg transition-colors"
                  >
                    Connect via {device.brand === 'Apple' ? 'Apple Health' : 'Google Fit'}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-6">
                <Button onClick={() => router.push('/dashboard')} variant="link" className="w-full">
                    Setup Later
                </Button>
            </div>
          </div>
        )}

        {/* Only Noise or Other, not both */}
        {!(noiseDevices.length > 0 && otherDevices.length > 0) && (
            <>
                {/* Noise Devices */}
                <div>
                    <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-2">NOISE DEVICES ({noiseDevices.length})</h2>
                    {noiseDevices.length > 0 ? (
                        noiseDevices.map(device => (
                            <Card key={device.id} className="bg-card/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Watch className="w-8 h-8 text-primary"/>
                                        <div>
                                            <p className="font-semibold">{device.name}</p>
                                            <p className="text-xs text-muted-foreground">Battery: {device.battery}% · {device.distance}</p>
                                        </div>
                                    </div>
                                    <Check className="w-5 h-5 text-green-500" />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm px-2">No Noise devices nearby</p>
                    )}
                </div>
                
                {/* Other Wearables */}
                 <div>
                    <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-2">OTHER WEARABLES ({otherDevices.length})</h2>
                    {otherDevices.length > 0 ? (
                        otherDevices.map(device => (
                            <Card key={device.id} className="bg-card/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Smartphone className="w-8 h-8 text-primary"/>
                                        <div>
                                            <p className="font-semibold">{device.name}</p>
                                            <p className="text-xs text-muted-foreground">via {device.suggestedPlatform === 'apple-health' ? 'Apple Health' : 'Google Fit'}</p>
                                        </div>
                                    </div>
                                    <Check className="w-5 h-5 text-green-500" />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                         <p className="text-muted-foreground text-sm px-2">No other wearables or apps detected</p>
                    )}
                </div>
            </>
        )}
        

        {/* No devices found */}
        {devices.length === 0 && (
             <div className="text-center py-10">
                <p className="text-lg font-medium">No devices found</p>
                <p className="text-muted-foreground mt-1 mb-6">Make sure your device is powered on and Bluetooth is enabled.</p>
                <div className="space-y-3">
                    <Button onClick={() => window.location.reload()} className="w-full">Rescan</Button>
                    <Button onClick={handleManualConnect} variant="outline" className="w-full">Enter Manually</Button>
                </div>
                 <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">OR</span></div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">Connect a health app instead:</p>
                <div className="flex justify-center gap-4">
                    <Button variant="secondary" onClick={() => router.push('/health-app-connect?platform=google-fit')}>Google Fit</Button>
                    <Button variant="secondary" onClick={() => router.push('/health-app-connect?platform=apple-health')}>Apple Health</Button>
                </div>
             </div>
        )}

        {/* Primary CTA for single device type scenarios */}
        {devices.length > 0 && !(noiseDevices.length > 0 && otherDevices.length > 0) && (
            <div className="mt-auto pt-6">
                <Button onClick={handleContinue} className="w-full" size="lg">Continue</Button>
            </div>
        )}

      </main>
    </div>
  );
}


export default function DeviceConnectPage() {
  return (
    <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary"/>
        </div>
    }>
      <DeviceConnectContent />
    </Suspense>
  )
}

    