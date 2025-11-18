
'use client';

import { useState, useEffect } from 'react';
import { Settings, User, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';


export default function DashboardHeader() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [corporateEnabled, setCorporateEnabled] = useState(false);

  useEffect(() => {
    // Set corporate enabled state from localStorage
    const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
    setCorporateEnabled(isEnabled);

    const updateHeader = () => {
      const now = new Date();
      const hours = now.getHours();

      // Determine greeting
      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning, Rahul');
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good afternoon, Rahul');
      } else if (hours >= 17 && hours < 21) {
        setGreeting('Good evening, Rahul');
      } else {
        setGreeting('Good night, Rahul');
      }
    };

    updateHeader();
    const interval = setInterval(updateHeader, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCorporateToggleClick = () => {
    if (corporateEnabled) {
      router.push('/corporate-manage');
    } else {
      router.push('/corporate-setup');
    }
  };


  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <Link href="/me">
                 <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                </Button>
            </Link>
             <button
                onClick={handleCorporateToggleClick}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors h-10',
                  corporateEnabled
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                    : 'bg-card/50 text-muted-foreground border-border hover:border-muted-foreground/50'
                )}
                title={corporateEnabled ? 'Manage Corporate' : 'Enable Corporate'}
              >
                <Briefcase className="w-5 h-5" />
                {corporateEnabled && <span className="text-xs font-medium">ON</span>}
              </button>
        </div>

        <div className="flex items-center gap-2 text-base font-medium">
          <span>{greeting.split(',')[0]}</span>
        </div>
        
        <div className="w-auto flex justify-end">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-6 w-6" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
