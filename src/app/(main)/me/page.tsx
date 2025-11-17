'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Bell,
  ChevronRight,
  Contact,
  CreditCard,
  Edit,
  FileText,
  HeartPulse,
  HelpCircle,
  KeyRound,
  Languages,
  LogOut,
  Moon,
  Plus,
  Scale,
  Settings,
  Shield,
  Smartphone,
  ToyBrick,
  Trash2,
  User as UserIcon,
  Watch,
} from 'lucide-react';
import Link from 'next/link';

const accountDetails = {
  name: 'Rahul Kumar',
  joinDate: 'Nov 2024',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMzODMwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

const healthSummary = [
    { label: 'Sleep', value: '7.5h' },
    { label: 'Steps', value: '8,234' },
    { label: 'BPM', value: '58' },
];

const connectedDevices = [
    { name: 'ColorFit Pro 6 Max', type: 'watch', battery: 87, lastSync: '2 min ago' },
    { name: 'Luna Ring 2.0', type: 'ring', battery: 72, lastSync: '5 min ago' },
];

const settingsMenu = {
    preferences: [
        { icon: <Bell />, label: 'Notifications & Alerts', href: '/settings/notifications' },
        { icon: <Scale />, label: 'Units (Metric / Imperial)', href: '/settings/units' },
        { icon: <Languages />, label: 'Language (English)', href: '/settings/language' },
        { icon: <Moon />, label: 'Dark Mode (Auto)', href: '/settings/dark-mode' },
    ],
    health: [
        { icon: <Shield />, label: 'Data Sharing & Privacy', href: '/settings/privacy' },
        { icon: <FileText />, label: 'Export Health Data', href: '/settings/export' },
        { icon: <Smartphone />, label: 'Connected Apps', href: '/settings/apps' },
    ],
    account: [
        { icon: <UserIcon />, label: 'Personal Information', href: '/settings/personal-info' },
        { icon: <KeyRound />, label: 'Email & Password', href: '/settings/auth' },
        { icon: <CreditCard />, label: 'Subscription (Free Plan)', href: '/settings/subscription' },
        { icon: <LogOut />, label: 'Sign Out', href: '/logout', isDestructive: true },
    ],
    support: [
        { icon: <HelpCircle />, label: 'Help Center', href: '/support' },
        { icon: <Contact />, label: 'Contact Support', href: '/support/contact' },
    ]
}

export default function ProfilePage() {
  const [accountType, setAccountType] = useState('enterprise');
  const [isCompanyLinked, setIsCompanyLinked] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Custom Header Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={accountDetails.avatarUrl} alt={accountDetails.name} />
          <AvatarFallback>{accountDetails.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h1 className="text-xl font-bold">{accountDetails.name}</h1>
          <p className="text-sm text-muted-foreground">
            Member since {accountDetails.joinDate}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Edit className="w-5 h-5" />
          <span className="sr-only">Edit Profile</span>
        </Button>
      </div>

      {/* Account Type Section */}
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Account Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={accountType} onValueChange={setAccountType}>
            <LabelledRadioItem
              value="personal"
              label="Personal Account"
              description="Track your personal health"
            />
            <LabelledRadioItem
              value="enterprise"
              label="Enterprise Account"
              description="+ Company wellness benefits"
            />
          </RadioGroup>
          <Separator className="my-4 bg-border/50" />
          <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-2">
            <p className="font-semibold text-accent">💡 Enterprise members get:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2 text-xs">
              <li>Wellness credits (₹2,400/yr)</li>
              <li>Team challenges</li>
              <li>Extra PTO days</li>
            </ul>
          </div>
          {accountType === 'personal' && !isCompanyLinked && (
            <Link href="/company-wellness" className='block mt-4'>
                <Button variant="outline" className="w-full">Link Company Account →</Button>
            </Link>
          )}
           {accountType === 'enterprise' && !isCompanyLinked && (
            <Link href="/company-wellness" className='block mt-4'>
                <Button variant="outline" className="w-full">Link Company Account →</Button>
            </Link>
          )}
           {accountType === 'enterprise' && isCompanyLinked && (
            <Link href="/enterprise" className='block mt-4'>
                <Button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">View Company Dashboard</Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Health Summary Card */}
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Your Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='grid grid-cols-3 gap-4 text-center mb-4'>
                {healthSummary.map(item => (
                    <div key={item.label} className="bg-muted/30 p-3 rounded-lg">
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <Button variant="link" size="sm" className="text-muted-foreground">90-day average • View Details</Button>
            </div>
        </CardContent>
      </Card>
      
      {/* Connected Devices Section */}
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
        <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Connected Devices</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
            {connectedDevices.map(device => (
                <div key={device.name} className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {device.type === 'watch' ? <Watch className='w-6 h-6 text-primary' /> : <ToyBrick className='w-6 h-6 text-primary' />}
                            <div>
                                <p className="font-semibold">{device.name}</p>
                                <p className="text-xs text-muted-foreground">Connected • {device.battery}% battery</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{device.lastSync}</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                        <Button variant="ghost" size="sm">Manage</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">Disconnect</Button>
                    </div>
                </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" /> Add Another Device
            </Button>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      {Object.entries(settingsMenu).map(([key, items]) => (
        <Card key={key} className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{key}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {items.map(item => (
                <Link key={item.label} href={item.href} className={cn(
                  "flex items-center justify-between p-4 transition-colors hover:bg-muted/30",
                  item.isDestructive && 'text-destructive'
                )}>
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {!item.isDestructive && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                </Link>
              ))}
            </div>
             {key === 'support' && (
                <p className="text-xs text-muted-foreground text-center p-4">App Version 1.0.2</p>
             )}
          </CardContent>
        </Card>
      ))}

      {/* Profile Actions */}
      <div className="space-y-2">
        <Button variant="secondary" className="w-full">View Activity History</Button>
        <Button variant="secondary" className="w-full">Download Health Report</Button>
        <Button variant="destructive" className="w-full flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Delete Account
        </Button>
      </div>

    </div>
  );
}


function LabelledRadioItem({ value, label, description }: { value: string, label: string, description: string }) {
    return (
        <div className="flex items-center space-x-3 space-y-0">
            <RadioGroupItem value={value} id={value} />
            <label htmlFor={value} className="font-medium">
                <span className="block">{label}</span>
                <span className="block text-sm text-muted-foreground font-normal">{description}</span>
            </label>
        </div>
    )
}

    
