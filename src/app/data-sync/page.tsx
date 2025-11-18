'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Watch, Smartphone, Cloud, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const discoveries = [
  { progress: 10, text: 'Found 90 days of step data' },
  { progress: 20, text: 'Imported 24 workouts' },
  { progress: 40, text: 'Analyzing 90 nights of sleep' },
  { progress: 60, text: 'Reading heart patterns' },
  { progress: 80, text: 'Generating AI insights...' },
];

export default function DataSync() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('Importing your activity data...');
  const [visibleDiscoveries, setVisibleDiscoveries] = useState<string[]>([]);

  useEffect(() => {
    if (progress >= 100) {
      // Navigate after a short delay once progress is 100
      const timer = setTimeout(() => router.push('/company-wellness'), 500);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress > 100) {
            return 100;
        }

        if (newProgress > 33 && newProgress < 66) {
          setPhase('Discovering your sleep patterns...');
        } else if (newProgress >= 66) {
          setPhase('Your AI coach is learning about YOU...');
        }

        const newDiscovery = discoveries.find(d => d.progress === newProgress);
        if (newDiscovery) {
          setVisibleDiscoveries(prevDisc => [...prevDisc, newDiscovery.text]);
        }

        return newProgress;
      });
    }, 60); // 100 steps * 60ms = ~6 seconds

    return () => clearInterval(interval);
  }, [progress, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 animate-fade-in-up">
          YOUR HEALTH STORY <br />
          IS COMING TO LIFE
        </h1>

        <div className="relative w-full h-24 flex items-center justify-center my-12">
          <div className="flex items-center justify-between w-full max-w-sm">
            <Watch className="w-10 h-10 text-primary z-10" />
            <Smartphone className="w-10 h-10 text-primary z-10" />
            <Cloud className="w-10 h-10 text-primary z-10" />
          </div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
           <div
              className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
            ></div>
        </div>

        <div className="text-center mb-8">
          <p className="text-muted-foreground mb-4">{phase}</p>
          <Progress value={progress} className="w-full h-2" />
        </div>

        <div className="space-y-3 text-left w-full animate-in fade-in-5 slide-in-from-bottom-5 duration-1000">
          {visibleDiscoveries.map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground animate-in fade-in-5 slide-in-from-bottom-5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Check className="w-4 h-4 text-green-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>
         {progress > 5 && <p className="text-xs text-muted-foreground mt-8 animate-pulse">
            Found 90 days of data on your devices
        </p>}
      </div>
    </div>
  );
}
