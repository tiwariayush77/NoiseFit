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
import { useRouter } from 'next/navigation';

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
      { icon: <Users />, label: 'Data Sharing Preferences', href: '/settings/privacy' },
      { icon: <Fingerprint />, label: 'Biometric Lock', href: '/settings/privacy' },
      { icon: <History />, label: 'Activity History', href: '/settings/history' },
  ],
   'Goals & Targets': [
      { icon: <Goal />, label: 'Daily Goals', href: '/settings/goals' },
      { icon: <HeartPulse />, label: 'Health Targets', href: '/settings/targets' },
      { icon: <Bell />, label: 'Reminder Settings', href: '/settings/reminders' },
  ],
  'Support & About': [
    { icon: <HelpCircle />, label: 'Help Center', href: '/help' },
    { icon: <Contact />, label: 'Contact Support', href: '/support/contact' },
    { icon: <FileText />, label: 'Terms of Service', href: '/terms' },
    { icon: <Shield />, label: 'Privacy Policy', href: '/privacy' },
    { icon: <FileText />, label: 'App Version (1.0.2)', href: '#', isStatic: true },
  ],
};


export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = () => {
    // Confirm before signing out
    if (confirm('Are you sure you want to sign out?')) {
      // Clear localStorage
      localStorage.clear();
      
      // Redirect to welcome page
      router.push('/');
    }
  };

  const handleDeleteAccount = () => {
    // Strong confirmation
    const confirmText = prompt(
      'This action is PERMANENT and cannot be undone.\n\n' +
      'Type "DELETE" to confirm account deletion:'
    );
    
    if (confirmText === 'DELETE') {
      // Clear all data
      localStorage.clear();
      
      // Show confirmation
      alert('Your account has been deleted. All data has been removed.');
      
      // Redirect to welcome
      router.push('/');
    } else if (confirmText !== null) {
      alert('Account deletion cancelled. Text did not match "DELETE".');
    }
  };

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

      {/* DANGER ZONE - ENHANCED VISIBILITY */}
      <div className="px-6 mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Danger Zone
        </h2>
        
        <div className="space-y-3">
          
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full bg-gray-800 hover:bg-gray-750 border-2 border-gray-700 hover:border-orange-500/50 rounded-xl p-5 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-1">Sign Out</p>
                  <p className="text-xs text-gray-400">Log out of your account</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-gray-800 hover:bg-red-900/20 border-2 border-gray-700 hover:border-red-500/50 rounded-xl p-5 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-1">Delete Account</p>
                  <p className="text-xs text-gray-400">Permanently delete your account and data</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
          
        </div>

        {/* Warning Notice */}
        <div className="mt-4 bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-red-400 font-semibold">Warning:</span> Deleting your account is permanent and cannot be undone. All your data will be permanently removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConditionalLink({ children, isStatic, ...props }: { children: React.ReactNode, isStatic?: boolean, href: string, className: string }) {
    if (isStatic) {
        return <div className={props.className}>{children}</div>
    }
    return <Link {...props}>{children}</Link>
}
