'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Watch,
  ToyBrick,
  Smartphone,
  Bluetooth,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// This data should ideally be shared from a single source
type DeviceType = 'watch' | 'ring' | 'app';
type Device = {
  id: string;
  name: string;
  brand: string;
  type: DeviceType;
};
const ALL_DEVICES: Device[] = [
  { id: 'noise-pro-6', name: 'ColorFit Pro 6 Max', brand: 'noise', type: 'watch' },
  { id: 'noise-luna-2', name: 'Luna Ring 2.0', brand: 'noise', type: 'ring' },
  { id: 'apple-watch-9', name: 'Apple Watch Series 9', brand: 'apple', type: 'watch' },
  { id: 'boat-storm', name: 'boAt Storm', brand: 'boat', type: 'watch' },
  { id: 'fire-boltt-ninja', name: 'Fire-Boltt Ninja', brand: 'other', type: 'watch' },
  { id: 'garmin-forerunner', name: 'Garmin Forerunner', brand: 'garmin', type: 'watch' },
  { id: 'google-fit', name: 'Google Fit', brand: 'google', type: 'app' },
  { id: 'apple-health', name: 'Apple Health', brand: 'apple', type: 'app' },
  { id: 'samsung-galaxy-watch', name: 'Samsung Galaxy Watch', brand: 'other', type: 'watch' },
  { id: 'oura-ring', name: 'Oura Ring Gen3', brand: 'other', type: 'ring' },
  { id: 'fitbit-charge', name: 'Fitbit Charge 6', brand: 'google', type: 'watch' },
  { id: 'amazfit-gts', name: 'Amazfit GTS 4', brand: 'other', type: 'watch' },
  { id: 'noise-icon-buzz', name: 'Noise Icon Buzz', brand: 'noise', type: 'watch' },
  { id: 'strava', name: 'Strava', brand: 'other', type: 'app' },
  { id: 'whoop-4', name: 'WHOOP 4.0', brand: 'other', type: 'watch' },
];

function ConnectionMethodContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceIds = useMemo(() => searchParams.get('devices')?.split(',') || [], [searchParams]);

  const selectedDevices = useMemo(() =>
    ALL_DEVICES.filter(d => deviceIds.includes(d.id)),
    [deviceIds]
  );
  
  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'watch': return <Watch className="w-5 h-5 text-muted-foreground" />;
      case 'ring': return <ToyBrick className="w-5 h-5 text-muted-foreground" />;
      case 'app': return <Smartphone className="w-5 h-5 text-muted-foreground" />;
      default: return null;
    }
  };

  const handleSelect = (path: string) => {
    router.push(`${path}?devices=${deviceIds.join(',')}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/device-search">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">How to connect?</h1>
        <div className="w-10"></div>
      </header>
      <main className="flex-1 flex flex-col items-center p-4 md:p-6 animate-in fade-in-5">
        <div className="w-full max-w-md space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">YOUR DEVICES</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedDevices.map(device => (
                  <li key={device.id} className="flex items-center gap-3">
                    {getDeviceIcon(device.type)}
                    <span className="font-medium">{device.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <MethodCard
              icon={<Bluetooth className="w-8 h-8 text-blue-400" />}
              title="Bluetooth Pairing"
              description="Connect directly to your Noise devices"
              features={[
                { text: 'Real-time sync', supported: true },
                { text: 'All health metrics', supported: true },
                { text: 'Most accurate data', supported: true },
              ]}
              recommended
              onClick={() => handleSelect('/device-connect')}
              buttonText="Select Bluetooth"
            />

            <MethodCard
              icon={<Smartphone className="w-8 h-8 text-green-400" />}
              title="Via Health Apps"
              description="Connect through Google Fit or Apple Health"
              features={[
                { text: 'Delayed sync', supported: false },
                { text: 'Limited metrics', supported: false },
                { text: 'Works with any brand', supported: true },
              ]}
              onClick={() => {
                // Placeholder for next step. We can create this page next.
                // For now, let's just log it or navigate to a temp page.
                // router.push(`/health-app-connect?devices=${deviceIds.join(',')}`);
                console.log("Navigate to health-app-connect");
              }}
              buttonText="Select Health Apps"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            💡 You can always change this in settings later
          </p>
        </div>
      </main>
    </div>
  );
}

function MethodCard({
  icon,
  title,
  description,
  features,
  recommended,
  onClick,
  buttonText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: { text: string; supported: boolean }[];
  recommended?: boolean;
  onClick: () => void;
  buttonText: string;
}) {
  return (
    <Card
      className="bg-card/30 border-border/20 hover:border-accent transition-colors duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              {feature.supported ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>
        {recommended && <Badge variant="outline" className="text-accent border-accent">✓ Recommended</Badge>}
        <Button className="w-full mt-4">{buttonText}</Button>
      </CardContent>
    </Card>
  );
}


export default function ConnectionMethodPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConnectionMethodContent />
        </Suspense>
    )
}
