'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  Watch,
  ToyBrick,
  Smartphone,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type DeviceType = 'watch' | 'ring' | 'app';

type Device = {
  id: string;
  name: string;
  brand: 'noise' | 'apple' | 'garmin' | 'boat' | 'other' | 'google';
  type: DeviceType;
  description: string;
  connectionMethod: 'bluetooth' | 'google-fit' | 'apple-health';
};

const ALL_DEVICES: Device[] = [
  { id: 'noise-pro-6', name: 'ColorFit Pro 6 Max', brand: 'noise', type: 'watch', description: 'Most popular choice', connectionMethod: 'bluetooth' },
  { id: 'noise-luna-2', name: 'Luna Ring 2.0', brand: 'noise', type: 'ring', description: 'Advanced sleep tracking', connectionMethod: 'bluetooth' },
  { id: 'apple-watch-9', name: 'Apple Watch Series 9', brand: 'apple', type: 'watch', description: 'Via Apple Health', connectionMethod: 'apple-health' },
  { id: 'boat-storm', name: 'boAt Storm', brand: 'boat', type: 'watch', description: 'Via Google Fit', connectionMethod: 'google-fit' },
  { id: 'fire-boltt-ninja', name: 'Fire-Boltt Ninja', brand: 'other', type: 'watch', description: 'Via Google Fit', connectionMethod: 'google-fit' },
  { id: 'garmin-forerunner', name: 'Garmin Forerunner', brand: 'garmin', type: 'watch', description: 'Direct connect', connectionMethod: 'bluetooth' },
  { id: 'google-fit', name: 'Google Fit', brand: 'google', type: 'app', description: 'Sync fitness data', connectionMethod: 'google-fit' },
  { id: 'apple-health', name: 'Apple Health', brand: 'apple', type: 'app', description: 'Sync health data', connectionMethod: 'apple-health' },
  { id: 'samsung-galaxy-watch', name: 'Samsung Galaxy Watch', brand: 'other', type: 'watch', description: 'Via Google Fit', connectionMethod: 'google-fit' },
  { id: 'oura-ring', name: 'Oura Ring Gen3', brand: 'other', type: 'ring', description: 'Advanced health metrics', connectionMethod: 'bluetooth' },
  { id: 'fitbit-charge', name: 'Fitbit Charge 6', brand: 'google', type: 'watch', description: 'Via Google Fit', connectionMethod: 'google-fit' },
  { id: 'amazfit-gts', name: 'Amazfit GTS 4', brand: 'other', type: 'watch', description: 'Via Google Fit', connectionMethod: 'google-fit' },
  { id: 'noise-icon-buzz', name: 'Noise Icon Buzz', brand: 'noise', type: 'watch', description: 'Affordable and stylish', connectionMethod: 'bluetooth' },
  { id: 'strava', name: 'Strava', brand: 'other', type: 'app', description: 'Track runs and rides', connectionMethod: 'google-fit' },
  { id: 'whoop-4', name: 'WHOOP 4.0', brand: 'other', type: 'watch', description: '24/7 health monitoring', connectionMethod: 'bluetooth' },
];

const MAX_DEVICES = 3;

export default function DeviceSearchPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<DeviceType[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const filteredDevices = useMemo(() => {
    return ALL_DEVICES.filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || device.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilters.length === 0 || activeFilters.includes(device.type);
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilters]);

  const toggleFilter = (filter: DeviceType) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const toggleDeviceSelection = (device: Device) => {
    const isSelected = selectedDevices.some(d => d.id === device.id);
    if (isSelected) {
      setSelectedDevices(prev => prev.filter(d => d.id !== device.id));
    } else {
      if (selectedDevices.length >= MAX_DEVICES) {
        toast({
          variant: 'destructive',
          title: 'Maximum devices reached',
          description: `You can select up to ${MAX_DEVICES} devices.`,
        });
        return;
      }
      setSelectedDevices(prev => [...prev, device]);
    }
  };
  
  const handleContinue = () => {
    if (selectedDevices.length > 0) {
      const deviceIds = selectedDevices.map(d => d.id).join(',');
      const primaryDeviceName = selectedDevices[0].name;
      router.push(`/device-connect-intro?devices=${deviceIds}&device=${encodeURIComponent(primaryDeviceName)}`);
    }
  };

  const noiseEcosystemDevices = filteredDevices.filter(d => d.brand === 'noise');
  const otherBrandsDevices = filteredDevices.filter(d => d.brand !== 'noise');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/device-selection">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Find your devices</h1>
        <div className="w-10"></div>
      </header>
      
      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-lg pt-4 px-4 pb-2">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          {(['watch', 'ring', 'app'] as const).map(filter => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleFilter(filter)}
              className="capitalize"
            >
              {filter === 'watch' && <Watch className="mr-2 h-4 w-4" />}
              {filter === 'ring' && <ToyBrick className="mr-2 h-4 w-4" />}
              {filter === 'app' && <Smartphone className="mr-2 h-4 w-4" />}
              {filter}s
            </Button>
          ))}
        </div>
      </div>
      
      <main className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="space-y-8">
          {noiseEcosystemDevices.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-2">NOISE ECOSYSTEM</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {noiseEcosystemDevices.map(device => (
                  <DeviceCard key={device.id} device={device} onSelect={toggleDeviceSelection} isSelected={selectedDevices.some(d => d.id === device.id)} />
                ))}
              </div>
            </section>
          )}

          {otherBrandsDevices.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-2">OTHER BRANDS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {otherBrandsDevices.map(device => (
                  <DeviceCard key={device.id} device={device} onSelect={toggleDeviceSelection} isSelected={selectedDevices.some(d => d.id === device.id)} />
                ))}
              </div>
               <p className="text-center text-muted-foreground text-sm mt-6">...and 20+ more brands</p>
            </section>
          )}

          {filteredDevices.length === 0 && (
             <div className="text-center py-16">
                <p className="text-lg font-medium">No devices found</p>
                <p className="text-muted-foreground">Try a different search term or filter.</p>
             </div>
          )}
        </div>
      </main>

      <footer className={cn(
        "fixed bottom-0 left-0 right-0 z-20 p-4 bg-card/80 backdrop-blur-lg border-t border-border/20 transition-transform duration-300",
        selectedDevices.length === 0 ? "translate-y-full" : "translate-y-0"
      )}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
             <Check className="inline-block mr-2 h-5 w-5 text-accent" />
            {selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''} selected
          </p>
          <Button
            onClick={handleContinue}
            disabled={selectedDevices.length === 0}
          >
            Continue ({selectedDevices.length} selected)
          </Button>
        </div>
      </footer>
    </div>
  );
}

function DeviceCard({ device, onSelect, isSelected }: { device: Device, onSelect: (device: Device) => void, isSelected: boolean }) {
  const Icon = device.type === 'watch' ? Watch : device.type === 'ring' ? ToyBrick : Smartphone;

  return (
    <Card className={cn(
        "bg-card/50 backdrop-blur-sm border-border/20 shadow",
        isSelected && "border-primary"
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-base">{device.name}</CardTitle>
            <CardDescription>{device.description}</CardDescription>
          </div>
        </div>
        <Button variant={isSelected ? "default" : "outline"} size="icon" onClick={() => onSelect(device)} className="flex-shrink-0">
          {isSelected ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span className="sr-only">{isSelected ? 'Remove' : 'Add'} device</span>
        </Button>
      </CardHeader>
    </Card>
  );
}
