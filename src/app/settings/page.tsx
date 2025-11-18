'use client';

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
import { cn } from '@/lib/utils';
import {
  Bell,
  ChevronRight,
  Contact,
  CreditCard,
  Edit,
  FileText,
  Goal,
  HeartPulse,
  HelpCircle,
  History,
  KeyRound,
  Languages,
  LogOut,
  Moon,
  Scale,
  Settings2,
  Shield,
  Smartphone,
  Trash2,
  User as UserIcon,
  Users,
  Fingerprint,
} from 'lucide-react';
import Link from 'next/link';

const accountDetails = {
  name: 'Rahul Kumar',
  email: 'rahul.kumar@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMzODMwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

const settingsMenu = {
  'Account & Profile': [
    { icon: <UserIcon />, label: 'Personal Information', href: '/settings/personal-info' },
    { icon: <KeyRound />, label: 'Email & Password', href: '/settings/auth' },
    { icon: <CreditCard />, label: 'Subscription (Free Plan)', href: '/settings/subscription' },
    { icon: <UserIcon />, label: 'Account Type (Personal)', href: '/me' },
  ],
  'Devices & Data': [
    { icon: <Smartphone />, label: 'Connected Devices (2)', href: '/devices' },
    { icon: <Settings2 />, label: 'Data Sync Settings', href: '/devices' },
    { icon: <HeartPulse />, label: 'Connected Apps', href: '/settings/apps' },
    { icon: <FileText />, label: 'Export Health Data', href: '/settings/export' },
  ],
  'Preferences': [
    { icon: <Bell />, label: 'Notifications & Alerts', href: '/settings/notifications' },
    { icon: <Scale />, label: 'Units & Measurements', href: '/settings/units' },
    { icon: <Languages />, label: 'Language (English)', href: '/settings/language' },
    { icon: <Moon />, label: 'Theme (Auto)', href: '/settings/dark-mode' },
  ],
  'Privacy & Security': [
      { icon: <Shield />, label: 'Privacy Settings', href: '/settings/privacy' },
      { icon: <Users />, label: 'Data Sharing Preferences', href: '/settings/data-sharing' },
      { icon: <Fingerprint />, label: 'Biometric Lock', href: '/settings/biometric' },
      { icon: <History />, label: 'Activity History', href: '/settings/history' },
  ],
   'Goals & Targets': [
      { icon: <Goal />, label: 'Daily Goals', href: '/settings/goals' },
      { icon: <HeartPulse />, label: 'Health Targets', href: '/settings/targets' },
      { icon: <Bell />, label: 'Reminder Settings', href: '/settings/reminders' },
  ],
  'Support & About': [
    { icon: <HelpCircle />, label: 'Help Center', href: '/support' },
    { icon: <Contact />, label: 'Contact Support', href: '/support/contact' },
    { icon: <FileText />, label: 'Terms of Service', href: '/terms' },
    { icon: <Shield />, label: 'Privacy Policy', href: '/privacy' },
    { icon: <FileText />, label: 'App Version (1.0.2)', href: '#', isStatic: true },
  ],
};


export default function SettingsPage() {
  return (
    <div className="space-y-6">
      
      {/* Custom Header Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={accountDetails.avatarUrl} alt={accountDetails.name} />
          <AvatarFallback>{accountDetails.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h1 className="text-xl font-bold">{accountDetails.name}</h1>
          <p className="text-sm text-muted-foreground">
            {accountDetails.email}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Edit className="w-5 h-5" />
          <span className="sr-only">Edit Profile</span>
        </Button>
      </div>

      {/* Settings Sections */}
      {Object.entries(settingsMenu).map(([key, items]) => (
        <Card key={key} className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{key}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {items.map(item => (
                 <ConditionalLink key={item.label} href={item.href} isStatic={item.isStatic} className={cn(
                    "flex items-center justify-between p-4 transition-colors",
                    !item.isStatic && "hover:bg-muted/30"
                 )}>
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {!item.isStatic && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                </ConditionalLink>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Danger Zone */}
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
                <Link href="/logout" className="flex items-center justify-between p-4 transition-colors text-destructive hover:bg-destructive/10">
                  <div className="flex items-center gap-4">
                    <LogOut />
                    <span className="font-medium">Sign Out</span>
                  </div>
                </Link>
                <Link href="/delete-account" className="flex items-center justify-between p-4 transition-colors text-destructive hover:bg-destructive/10">
                  <div className="flex items-center gap-4">
                    <Trash2 />
                    <span className="font-medium">Delete Account</span>
                  </div>
                </Link>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

function ConditionalLink({ children, isStatic, ...props }: { children: React.ReactNode, isStatic?: boolean, href: string, className: string }) {
    if (isStatic) {
        return <div className={props.className}>{children}</div>
    }
    return <Link {...props}>{children}</Link>
}
