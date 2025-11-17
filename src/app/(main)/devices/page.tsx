'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Plus,
  Watch,
  ToyBrick,
  CheckCircle,
  AlertTriangle,
  Wifi,
  MoreVertical,
  ChevronRight,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  History,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const devicesData = {
  connected: [
    {
      id: 1,
      name: 'ColorFit Pro 6 Max',
      type: 'watch' as const,
      model: 'CFP6M',
      isPrimary: true,
      battery: 87,
      lastSync: '2 min ago',
      firmware: '2.4.1',
      isLatestFirmware: true,
      status: 'connected',
      image: 'https://picsum.photos/seed/smartwatch-device/400/400',
      imageHint: 'smartwatch',
    },
    {
      id: 2,
      name: 'Luna Ring 2.0',
      type: 'ring' as const,
      model: 'LR2',
      isPrimary: false,
      battery: 72,
      lastSync: '5 min ago',
      firmware: '1.8.2',
      isLatestFirmware: false,
      updateAvailable: '1.8.3',
      status: 'connected',
      image: 'https://picsum.photos/seed/smart-ring-device/400/400',
      imageHint: 'smart ring',
    },
     {
      id: 3,
      name: 'Old Watch',
      type: 'watch' as const,
      model: 'OW1',
      isPrimary: false,
      battery: 12,
      lastSync: '4 hours ago',
      firmware: '1.2.0',
      isLatestFirmware: true,
      status: 'disconnected',
      image: 'https://picsum.photos/seed/old-watch/400/400',
      imageHint: 'smartwatch product',
    }
  ],
  syncSettings: {
    autoSync: true,
    wifiOnly: false,
    frequency: 30, // minutes
  },
};


export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Devices</h1>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Add Device
        </Button>
      </header>

      {/* Connected Devices */}
      <div className="space-y-4">
        {devicesData.connected.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
      
      {/* Sync Status */}
      <Card className="bg-card/50">
        <CardHeader>
            <CardTitle className='flex items-center gap-2 text-sm uppercase text-muted-foreground tracking-wider'><History className='w-5 h-5'/> Sync Status</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='flex items-center gap-2 text-green-400 font-semibold'>
                <CheckCircle className='w-5 h-5'/>
                <p>All devices synced</p>
            </div>
            <p className='text-sm text-muted-foreground mt-1'>Next auto-sync in 23 minutes</p>
            <Button variant="secondary" className='w-full mt-4'>Sync All Devices Now</Button>
        </CardContent>
      </Card>
      
      {/* Sync Settings */}
      <Card className="bg-card/50">
        <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className='flex items-center justify-between'>
                    <label htmlFor="auto-sync">Auto-sync</label>
                    <Switch id="auto-sync" checked={devicesData.syncSettings.autoSync} />
                </div>
                 <div className='flex items-center justify-between'>
                    <label htmlFor="wifi-only">Sync over Wi-Fi only</label>
                    <Switch id="wifi-only" checked={devicesData.syncSettings.wifiOnly} />
                </div>
                <div className='flex items-center justify-between'>
                    <label>Sync frequency</label>
                    <Select defaultValue={`${devicesData.syncSettings.frequency}`}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">Every 15 min</SelectItem>
                            <SelectItem value="30">Every 30 min</SelectItem>
                            <SelectItem value="60">Every hour</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* Firmware Updates */}
       <Card className="bg-card/50">
        <CardHeader>
            <CardTitle>Firmware Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {devicesData.connected.map(device => (
                <div key={device.id} className="bg-muted/30 p-4 rounded-lg">
                    <div className='flex items-center justify-between'>
                        <div>
                             <p className='font-semibold'>{device.name}</p>
                             <p className='text-sm text-muted-foreground'>Version {device.firmware}</p>
                        </div>
                        {device.isLatestFirmware ? (
                            <span className='text-sm text-green-400 font-semibold'>✓ Latest</span>
                        ) : (
                            <Button size="sm">Update to {device.updateAvailable}</Button>
                        )}
                    </div>
                </div>
            ))}
        </CardContent>
      </Card>
      
      {/* Troubleshooting */}
      <Card className="bg-card/50">
        <CardHeader>
            <CardTitle>Having Issues?</CardTitle>
            <CardDescription>Common solutions for device problems</CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
            <div className="divide-y divide-border/50">
                <TroubleshootingItem text="Device not syncing" />
                <TroubleshootingItem text="Battery draining too fast" />
                <TroubleshootingItem text="Heart rate is inaccurate" />
                <TroubleshootingItem text="Steps not counting" />
            </div>
            <div className="p-4">
                <Button variant="link" className="p-0 h-auto">View all troubleshooting tips →</Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}

function TroubleshootingItem({text}: {text: string}) {
    return (
        <a href="#" className="flex items-center justify-between p-4 hover:bg-muted/30">
            <span className="text-sm">{text}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </a>
    )
}

function DeviceCard({ device }: { device: (typeof devicesData.connected)[0] }) {
    const BatteryIcon = device.battery > 50 ? BatteryFull : device.battery > 20 ? BatteryMedium : BatteryLow;
    const batteryColor = device.battery > 50 ? 'text-green-500' : device.battery > 20 ? 'text-yellow-500' : 'text-red-500';

    return (
        <Card className="bg-card/50 overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
                <div className='flex items-center gap-4'>
                     <Image src={device.image} alt={device.name} width={64} height={64} className="rounded-lg bg-muted aspect-square object-cover" data-ai-hint={device.imageHint} />
                     <div>
                        {device.isPrimary && <p className='text-xs font-semibold text-accent'>PRIMARY DEVICE</p>}
                        <CardTitle className="text-lg">{device.name}</CardTitle>
                        {device.status === 'connected' ? (
                            <p className="text-sm text-green-400 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Connected</p>
                        ) : (
                             <p className="text-sm text-red-400 flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Disconnected</p>
                        )}
                     </div>
                </div>
                <Button variant="ghost" size="icon" className='-mr-2 -mt-2'>
                    <MoreVertical className='w-5 h-5' />
                </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className='space-y-3'>
                    <div>
                        <div className='flex justify-between items-center text-sm text-muted-foreground mb-1'>
                             <span className='flex items-center gap-1'><BatteryIcon className={`w-5 h-5 ${batteryColor}`} /> Battery</span>
                             <span className={batteryColor}>{device.battery}%</span>
                        </div>
                        <Progress value={device.battery} className='h-2' indicatorClassName={
                            device.battery > 50 ? 'bg-green-500' : device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        } />
                    </div>
                     <div>
                        <p className='text-sm text-muted-foreground'>Last synced: {device.lastSync}</p>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary">Sync Now</Button>
                    <Button variant="secondary">Settings</Button>
                </div>
                 <Button variant="link" className="w-full mt-2">View Details →</Button>
            </CardContent>
        </Card>
    );
}
