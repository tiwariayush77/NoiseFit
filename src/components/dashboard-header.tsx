
'use client';

import { useState, useEffect } from 'react';
import { Settings, Sun, Cloud, Sunset, Moon, User, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';


export default function DashboardHeader() {
  const router = useRouter();
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState({ text: '', icon: <Sun /> });
  const [corporateEnabled, setCorporateEnabled] = useState(false);

  useEffect(() => {
    // Set corporate enabled state from localStorage
    const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
    setCorporateEnabled(isEnabled);

    const updateHeader = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Format time
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${formattedHours}:${formattedMinutes} ${ampm}`);

      // Determine greeting
      if (hours >= 5 && hours < 12) {
        setGreeting({ text: 'Good morning, Rahul', icon: <Sun className="w-5 h-5 text-yellow-400" /> });
      } else if (hours >= 12 && hours < 17) {
        setGreeting({ text: 'Good afternoon, Rahul', icon: <Cloud className="w-5 h-5 text-sky-400" /> });
      } else if (hours >= 17 && hours < 21) {
        setGreeting({ text: 'Good evening, Rahul', icon: <Sunset className="w-5 h-5 text-orange-400" /> });
      } else {
        setGreeting({ text: 'Good night, Rahul', icon: <Moon className="w-5 h-5 text-slate-400" /> });
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
    <header className="sticky top-0 z-40 h-16 w-full bg-[#1E1E1E]/80 backdrop-blur-lg border-b border-white/10">
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
          {greeting.icon}
          <span>{greeting.text.split(',')[0]}</span>
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
