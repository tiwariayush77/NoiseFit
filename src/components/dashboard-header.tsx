
'use client';

import { useState, useEffect } from 'react';
import { Settings, Sun, Cloud, Sunset, Moon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function DashboardHeader() {
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState({ text: '', icon: <Sun /> });

  useEffect(() => {
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

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-[#1E1E1E]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <span className="text-sm text-muted-foreground w-20 text-left">{time}</span>
        <div className="flex items-center gap-2 text-base font-medium">
          {greeting.icon}
          <span>{greeting.text}</span>
        </div>
        <div className="w-20 text-right">
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
