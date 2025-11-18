'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  ChevronRight,
  Eye,
  Users,
  Fingerprint,
  Download,
  Trash2,
  Share2,
  HeartPulse,
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

const initialSettings = {
  profileVisibility: 'friends',
  feedVisibility: 'friends',
  allowFriendRequests: true,
  showOnlineStatus: false,
  shareWithCompany: true,
  shareWithFriends: false,
  researchParticipation: false,
  biometricLock: true,
  autoLockTime: '5', // in minutes
};

const connectedApps = [
    { name: 'Google Fit', access: 'Steps, Sleep, Workouts', link: '/settings/apps' },
    { name: 'Strava', access: 'Workouts only', link: '/settings/apps' },
]

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (key: keyof typeof initialSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key: keyof typeof initialSettings, value: string) => {
     setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4 -mb-2">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Privacy & Data Sharing</h1>
      </header>

      <Card className="bg-primary/10 border-primary/20 text-primary">
          <CardHeader className="flex-row items-center gap-4">
            <Lock className="w-6 h-6" />
            <CardTitle>Your Privacy Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">You are in complete control of who sees your data. Your individual health details are never shared without your explicit permission.</p>
          </CardContent>
      </Card>
      
      <SettingsSection title="Social Visibility" icon={<Users />}>
        <SelectItemRow
            label="Profile Visibility"
            value={settings.profileVisibility}
            onValueChange={(val) => handleSelect('profileVisibility', val)}
            options={[
                { value: 'public', label: 'Public'},
                { value: 'friends', label: 'Friends Only'},
                { value: 'private', label: 'Private (Just Me)'},
            ]}
        />
         <SelectItemRow
            label="Activity Feed Visibility"
            value={settings.feedVisibility}
            onValueChange={(val) => handleSelect('feedVisibility', val)}
            options={[
                { value: 'friends', label: 'Friends Only'},
                { value: 'private', label: 'Private (Just Me)'},
            ]}
        />
        <SwitchItem
            label="Allow Friend Requests"
            checked={settings.allowFriendRequests}
            onToggle={() => handleToggle('allowFriendRequests')}
        />
        <SwitchItem
            label="Show Online Status"
            checked={settings.showOnlineStatus}
            onToggle={() => handleToggle('showOnlineStatus')}
        />
      </SettingsSection>
      
      <SettingsSection title="Health Data Controls" icon={<HeartPulse />}>
        <SwitchItem
            label="Share with Company Wellness"
            description="Anonymous, aggregated stats only"
            checked={settings.shareWithCompany}
            onToggle={() => handleToggle('shareWithCompany')}
        />
         <SwitchItem
            label="Share with Friends"
            description="Let select friends see your progress"
            checked={settings.shareWithFriends}
            onToggle={() => handleToggle('shareWithFriends')}
        />
         <SwitchItem
            label="Research Participation"
            description="Help improve health insights anonymously"
            checked={settings.researchParticipation}
            onToggle={() => handleToggle('researchParticipation')}
        />
      </SettingsSection>
      
      <SettingsSection title="App Security" icon={<Fingerprint />}>
         <SwitchItem
            label="Require Face ID/Touch ID"
            description="Lock app when inactive"
            checked={settings.biometricLock}
            onToggle={() => handleToggle('biometricLock')}
        />
        <SelectItemRow
            label="Auto-lock after"
            value={settings.autoLockTime}
            onValueChange={(val) => handleSelect('autoLockTime', val)}
            options={[
                { value: '0', label: 'Immediately'},
                { value: '1', label: '1 minute'},
                { value: '5', label: '5 minutes'},
                { value: '15', label: '15 minutes'},
            ]}
        />
      </SettingsSection>
      
       <SettingsSection title="Connected Apps" icon={<Share2 />}>
            <div className="divide-y divide-border/50">
            {connectedApps.map(app => (
                <Link key={app.name} href={app.link} className="block hover:bg-muted/30">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{app.name}</p>
                            <p className="text-xs text-muted-foreground">Access: {app.access}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                </Link>
            ))}
            </div>
             <div className="p-4">
                <Link href="/settings/apps">
                    <Button variant="outline" className="w-full">Manage All Connected Apps</Button>
                </Link>
            </div>
      </SettingsSection>

      <SettingsSection title="Your Data" icon={<Download />}>
         <div className="divide-y divide-border/50">
            <ActionItem 
                label="Download All Data" 
                description="Export your complete health archive" 
            />
             <ActionItem 
                label="Delete Activity History" 
                description="Remove past 30/90/All days" 
                isDestructive
            />
        </div>
      </SettingsSection>

      <div className="text-center text-xs text-muted-foreground pt-4">
        <Link href="/privacy-policy" className="underline">Read our full Privacy Policy</Link>
      </div>

    </div>
  );
}

function SettingsSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <Card className="bg-card/50">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
                {icon}
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {children}
            </CardContent>
        </Card>
    )
}

function SwitchItem({ label, description, checked, onToggle }: { label: string; description?: string; checked: boolean; onToggle: () => void; }) {
    return (
        <div className="p-4 flex items-center justify-between border-t border-border/50">
            <div>
                <label htmlFor={label} className="font-medium cursor-pointer">{label}</label>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <Switch id={label} checked={checked} onCheckedChange={onToggle} />
        </div>
    )
}

function SelectItemRow({ label, value, onValueChange, options }: { label: string, value: string, onValueChange: (val: string) => void, options: {value: string, label: string}[] }) {
     return (
        <div className="p-4 flex items-center justify-between border-t border-border/50">
            <label className="font-medium">{label}</label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

function ActionItem({ label, description, isDestructive = false }: { label: string, description: string, isDestructive?: boolean}) {
    return (
         <div className="p-4 flex items-center justify-between">
            <div>
                <p className={`font-medium ${isDestructive ? 'text-destructive' : ''}`}>{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button variant={isDestructive ? "destructive" : "secondary"} size="sm">
                {isDestructive ? 'Delete' : 'Download'}
            </Button>
        </div>
    )
}
