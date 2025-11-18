'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  PlusCircle,
  RefreshCw,
  Settings,
  Shield,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const connectedAppsData = [
    {
        id: 'google-fit',
        name: 'Google Fit',
        logo: 'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png',
        status: 'connected',
        lastSync: '2 min ago',
        permissions: [
            { type: 'Steps', access: 'read_write' },
            { type: 'Sleep', access: 'read' },
            { type: 'Workouts', access: 'read_write' },
        ],
        totalSynced: '42 days'
    },
    {
        id: 'strava',
        name: 'Strava',
        logo: 'https://d3nn82uaxijpm6.cloudfront.net/website/brand-guidelines/strava-logo-positive.svg',
        status: 'connected',
        lastSync: '1h ago',
        permissions: [
            { type: 'Workouts', access: 'write' }
        ],
        description: 'Auto-upload runs & cycles to Strava'
    }
];

const availableAppsData = [
    { id: 'apple-health', name: 'Apple Health', description: 'Sync all health metrics', logo: 'https://developer.apple.com/assets/elements/icons/health-app/health-app-96x96_2x.png' },
    { id: 'myfitnesspal', name: 'MyFitnessPal', description: 'Track nutrition and calories', logo: 'https://www.myfitnesspal.com/img/brand/mfp-icon.png' },
    { id: 'fitbit', name: 'Fitbit', description: 'Import Fitbit activity data', logo: 'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/charge6/hero-static/porcelain/charge6-porcelain-device-1.png' }
];

export default function ConnectedAppsPage() {
    const [syncSettings, setSyncSettings] = useState({
        autoSync: true,
        frequency: 'realtime',
        wifiOnly: false,
    });
    
    return (
        <div className="space-y-6">
            <header className="flex items-center gap-4 -mb-2">
                <Link href="/settings">
                <Button variant="ghost" size="icon">
                    <ArrowLeft />
                </Button>
                </Link>
                <h1 className="text-xl font-bold">Connected Apps</h1>
            </header>

            <Card className="bg-card/50">
                <CardContent className="p-4 text-center text-muted-foreground">
                    <p>Sync with your favorite health apps to keep all your data in one place.</p>
                </CardContent>
            </Card>

            <SettingsSection title="Connected">
                <div className="space-y-4">
                    {connectedAppsData.map(app => (
                        <ConnectedAppCard key={app.id} app={app} />
                    ))}
                </div>
            </SettingsSection>
            
            <SettingsSection title="Available Integrations">
                 <div className="space-y-4">
                    {availableAppsData.map(app => (
                        <AvailableAppCard key={app.id} app={app} />
                    ))}
                </div>
            </SettingsSection>
            
            <SettingsSection title="Sync Preferences">
                <div className='p-4 space-y-4'>
                    <div className='flex items-center justify-between'>
                        <label htmlFor="auto-sync">Auto-sync</label>
                        <Switch id="auto-sync" checked={syncSettings.autoSync} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <label>Sync frequency</label>
                         <Select defaultValue={syncSettings.frequency}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="15">Every 15 min</SelectItem>
                                <SelectItem value="60">Every hour</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex items-center justify-between'>
                        <label htmlFor="wifi-only">Sync over Wi-Fi only</label>
                        <Switch id="wifi-only" checked={syncSettings.wifiOnly} />
                    </div>
                    <Separator className="my-4" />
                    <Button variant="secondary" className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" /> Sync All Apps Now
                    </Button>
                </div>
            </SettingsSection>

             <Card className="bg-muted/30">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-base">Permissions Explained</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        <li><span className="font-semibold text-foreground">Read:</span> App can view your NoiseFit data.</li>
                        <li><span className="font-semibold text-foreground">Write:</span> App can add data to your NoiseFit profile.</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">You can revoke access for any app at any time.</p>
                </CardContent>
            </Card>

        </div>
    )
}

function SettingsSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-3 px-1">{title}</h2>
            {children}
        </div>
    )
}

function ConnectedAppCard({ app }: { app: typeof connectedAppsData[0] }) {
    return (
        <Card className="bg-card/50">
            <CardHeader className="flex-row items-start gap-4">
                 <img src={app.logo} alt={app.name} className="w-12 h-12 p-1 bg-white rounded-lg" />
                 <div>
                    <CardTitle>{app.name}</CardTitle>
                    <p className="text-sm text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Connected</p>
                 </div>
            </CardHeader>
            <CardContent>
                <div className="bg-muted/30 p-3 rounded-lg mb-4">
                    <p className="text-xs font-semibold mb-2">DATA SHARED:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        {app.permissions.map(p => (
                            <li key={p.type} className="flex justify-between">
                                <span>{p.type}</span>
                                <div className="flex gap-1">
                                    {p.access.includes('read') && <span className="bg-blue-500/20 text-blue-300 px-2 rounded-full">Read</span>}
                                    {p.access.includes('write') && <span className="bg-green-500/20 text-green-300 px-2 rounded-full">Write</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                 {app.description && <p className="text-xs text-muted-foreground mb-4">{app.description}</p>}
                <p className="text-xs text-muted-foreground mb-4">Last sync: {app.lastSync} • {app.totalSynced} of data</p>
                <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                    <Button variant="destructive" className="flex-1">Disconnect</Button>
                </div>
            </CardContent>
        </Card>
    )
}

function AvailableAppCard({ app }: { app: typeof availableAppsData[0] }) {
    return (
        <Card className="bg-card/50">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={app.logo} alt={app.name} className="w-10 h-10 p-1 bg-white rounded-lg" />
                    <div>
                        <p className="font-semibold">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.description}</p>
                    </div>
                </div>
                <Button variant="outline"><PlusCircle className="w-4 h-4 mr-2" /> Connect</Button>
            </CardContent>
        </Card>
    )
}
