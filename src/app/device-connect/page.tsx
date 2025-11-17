'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Watch,
  ToyBrick,
  Smartphone,
  Signal,
  BatteryFull,
  SignalMedium,
  SignalLow,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

// Mock device data - same as in device-search
type DeviceType = 'watch' | 'ring' | 'app';
type Device = {
  id: string;
  name: string;
  brand: string;
  type: DeviceType;
  description: string;
};
const ALL_DEVICES: Device[] = [
  { id: 'noise-pro-6', name: 'ColorFit Pro 6 Max', brand: 'noise', type: 'watch', description: 'Most popular choice' },
  { id: 'noise-luna-2', name: 'Luna Ring 2.0', brand: 'noise', type: 'ring', description: 'Advanced sleep tracking' },
  { id: 'apple-watch-9', name: 'Apple Watch Series 9', brand: 'apple', type: 'watch', description: 'Via Apple Health' },
  { id: 'boat-storm', name: 'boAt Storm', brand: 'boat', type: 'watch', description: 'Via Google Fit' },
];

function ConnectingOverlay({ device, onDone }: { device: Device; onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Connecting to your device...');
  const Icon = device.type === 'watch' ? Watch : ToyBrick;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onDone, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // Animate over 2.5s

    const statusTimer1 = setTimeout(() => setStatus('Pairing devices...'), 1000);
    const statusTimer2 = setTimeout(() => setStatus('Connected! ✓'), 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(statusTimer1);
      clearTimeout(statusTimer2);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in">
      <div className="flex flex-col items-center text-center p-8">
        <div className="relative mb-8">
          <Icon className="w-24 h-24 text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Connecting to {device.name}</h2>
        <p className="text-muted-foreground mb-8">{status}</p>
        <Progress value={progress} className="w-64 h-2 mb-8" />
        <p className="text-sm text-muted-foreground">💡 Keep your {device.type} close to your phone.</p>
      </div>
    </div>
  );
}

function DeviceConnectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceIds = useMemo(() => searchParams.get('devices')?.split(',') || [], [searchParams]);

  const [foundDevices, setFoundDevices] = useState<Device[]>([]);
  const [connectingDevice, setConnectingDevice] = useState<Device | null>(null);

  const selectedDevices = useMemo(() => 
    ALL_DEVICES.filter(d => deviceIds.includes(d.id)),
    [deviceIds]
  );
  
  useEffect(() => {
    setFoundDevices([]); // Reset on deviceIds change
    const timers: NodeJS.Timeout[] = [];
    if (selectedDevices.length > 0) {
      selectedDevices.forEach((device, index) => {
        const timer = setTimeout(() => {
          setFoundDevices(prev => [...prev, device]);
        }, (index + 1) * 2000); // Stagger appearance
        timers.push(timer);
      });
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [selectedDevices]);

  const handleConnect = (device: Device) => {
    setConnectingDevice(device);
  };

  const handleConnectionDone = () => {
    router.push('/dashboard?sync=true');
  };

  if (connectingDevice) {
    return <ConnectingOverlay device={connectingDevice} onDone={handleConnectionDone} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20">
        <Link href="/device-search">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Finding your devices</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center p-6 text-center">
        <div className="relative w-48 h-48 flex items-center justify-center my-8">
          <div className="absolute w-full h-full rounded-full bg-primary/10 animate-pulse"></div>
          <div className="absolute w-2/3 h-2/3 rounded-full bg-primary/20 animate-pulse [animation-delay:0.5s]"></div>
          <div className="absolute w-1/3 h-1/3 rounded-full bg-primary/30 animate-pulse [animation-delay:1s]"></div>
          <Signal className="w-16 h-16 text-primary" />
        </div>

        <div className="w-full max-w-md text-left bg-card/30 p-6 rounded-lg border border-border/20 mb-8">
          <p className="font-semibold mb-3">Make sure your devices are:</p>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="flex items-center gap-3">✓ <span className="flex-1">Powered on and charged</span></li>
            <li className="flex items-center gap-3">✓ <span className="flex-1">Within arm's reach</span></li>
            <li className="flex items-center gap-3">✓ <span className="flex-1">Ready to pair (check manual if needed)</span></li>
          </ul>
        </div>
        
        {foundDevices.length > 0 && (
          <div className="w-full max-w-md space-y-4 animate-in fade-in-5 slide-in-from-bottom-5">
            <h2 className="text-sm font-semibold text-muted-foreground text-left px-2">FOUND DEVICES</h2>
            {foundDevices.map(device => (
              <DeviceConnectCard key={device.id} device={device} onConnect={handleConnect} />
            ))}
          </div>
        )}

        <div className="mt-8">
          <Button variant="link">Device not found? Troubleshooting tips</Button>
        </div>
      </main>
    </div>
  );
}

function DeviceConnectCard({ device, onConnect }: { device: Device, onConnect: (device: Device) => void }) {
  const Icon = device.type === 'watch' ? Watch : device.type === 'ring' ? ToyBrick : Smartphone;
  const [signalStrength] = useState(Math.floor(Math.random() * 3)); // 0: low, 1: med, 2: high
  const [battery] = useState(Math.floor(Math.random() * 30) + 70); // 70-99%

  const SignalIcon = () => {
    if (signalStrength === 2) return <Signal className="w-4 h-4 text-green-500" />;
    if (signalStrength === 1) return <SignalMedium className="w-4 h-4 text-yellow-500" />;
    return <SignalLow className="w-4 h-4 text-red-500" />;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/20 shadow-md text-left animate-in fade-in-5 slide-in-from-bottom-5">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold">{device.name}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><SignalIcon /> {['Weak', 'Moderate', 'Strong'][signalStrength]}</span>
              <span className="flex items-center gap-1"><BatteryFull className="w-4 h-4 text-green-500" /> {battery}%</span>
            </div>
          </div>
        </div>
        <Button onClick={() => onConnect(device)}>Connect</Button>
      </CardContent>
    </Card>
  );
}


export default function DeviceConnectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeviceConnectContent />
    </Suspense>
  )
}
