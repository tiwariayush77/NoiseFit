
'use client';

import { useState, useEffect } from 'react';
import { Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';


export default function DashboardHeader() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const updateHeader = () => {
      const now = new Date();
      const hours = now.getHours();

      // Determine greeting
      if (hours >= 5 && hours < 12) {
        setGreeting('Good morning');
      } else if (hours >= 12 && hours < 17) {
        setGreeting('Good afternoon');
      } else if (hours >= 17 && hours < 21) {
        setGreeting('Good evening');
      } else {
        setGreeting('Good night');
      }
    };

    updateHeader();
    const interval = setInterval(updateHeader, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <Link href="/me">
                 <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                </Button>
            </Link>
        </div>

        <div className="flex items-center gap-2 text-base font-medium">
          <span>{greeting}</span>
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
