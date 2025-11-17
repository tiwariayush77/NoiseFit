'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pause,
  Play,
  X,
  Heart,
  Footprints,
  Flame,
  Zap,
  Music,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const getZone = (hr: number) => {
  if (hr > 170) return { name: 'Peak', color: 'bg-red-500' };
  if (hr > 151) return { name: 'Cardio', color: 'bg-orange-500' };
  if (hr > 132) return { name: 'Fat Burn', color: 'bg-yellow-500' };
  if (hr > 113) return { name: 'Light', color: 'bg-green-500' };
  return { name: 'Resting', color: 'bg-blue-500' };
};

export default function WorkoutTrackingPage() {
  const router = useRouter();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentHR, setCurrentHR] = useState(135);
  const [avgHR, setAvgHR] = useState(135);
  const [totalHR, setTotalHR] = useState(135);
  const [hrSamples, setHrSamples] = useState(1);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [zoneTimes, setZoneTimes] = useState({
    Peak: 0, Cardio: 0, 'Fat Burn': 0, Light: 0, Resting: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isPaused || !isClient) return;

    const timerInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    const hrInterval = setInterval(() => {
      // Simulate HR fluctuation
      const hrFluctuation = Math.random() * 10 - 5;
      setCurrentHR((prev) => Math.max(80, Math.min(180, Math.round(prev + hrFluctuation))));
    }, 2000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(hrInterval);
    };
  }, [isPaused, isClient]);

  useEffect(() => {
    if (isPaused || !isClient) return;

    setTotalHR((prev) => prev + currentHR);
    setHrSamples((prev) => prev + 1);
    setAvgHR(Math.round(totalHR / hrSamples));

    const currentZone = getZone(currentHR).name;
    setZoneTimes(prev => ({ ...prev, [currentZone]: prev[currentZone as keyof typeof prev] + 1 }));

    // Simulate distance and calories
    setDistance(prev => parseFloat((prev + 0.003).toFixed(2))); // Approx 10.8 km/h
    setCalories(prev => prev + 0.15); // Approx 540 kcal/h

  }, [elapsedTime, isPaused, currentHR, totalHR, hrSamples, isClient]);

  const handleEndWorkout = () => {
    router.push('/workouts/summary');
  };

  const currentZone = getZone(currentHR);
  const zonePercentage = ((currentHR - 50) / (180 - 50)) * 100;

  return (
    <div className="fixed inset-0 bg-background text-foreground flex flex-col p-4 pt-12">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
        <p className="text-xl font-mono tracking-wider">{formatTime(elapsedTime)}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <X />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Workout?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to end this workout? Your progress will be
                saved.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleEndWorkout}>
                End Workout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        {/* Main Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 animate-pulse">
            <Heart className="w-10 h-10 text-red-500" />
            <p className="text-8xl font-bold">{currentHR}</p>
          </div>
          <p className="text-2xl text-muted-foreground">{currentZone.name} Zone</p>
        </div>

        <div className="w-full max-w-xs space-y-6">
          <div className="text-center">
            <p className="text-5xl font-mono tracking-tighter">{formatTime(elapsedTime)}</p>
            <p className="text-sm text-muted-foreground uppercase">Duration</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">{distance}</p>
              <p className="text-sm text-muted-foreground uppercase">km</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{Math.round(calories)}</p>
              <p className="text-sm text-muted-foreground uppercase">Calories</p>
            </div>
          </div>
        </div>

        {/* HR Zone Indicator */}
        <div className="w-full max-w-sm pt-4">
            <Slider
                value={[zonePercentage]}
                max={100}
                step={1}
                className="[&_span]:bg-transparent"
                disabled
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Rest</span>
                <span>Light</span>
                <span>Fat Burn</span>
                <span>Cardio</span>
                <span>Peak</span>
            </div>
            <p className='text-sm mt-2 text-accent'>
                {Math.floor(zoneTimes[currentZone.name as keyof typeof zoneTimes] / 60)} min in {currentZone.name} Zone
            </p>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="flex justify-around items-center p-4">
        <Button variant="outline" size="lg" className="rounded-full h-16 w-16">
          <Zap className="w-6 h-6" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full h-20 w-20 text-3xl"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
        <Button variant="outline" size="lg" className="rounded-full h-16 w-16">
          <Music className="w-6 h-6" />
        </Button>
      </footer>
    </div>
  );
}
