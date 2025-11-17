'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pause,
  Play,
  X,
  Heart,
  Music,
  Zap,
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

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function WorkoutTrackingPage() {
  const router = useRouter();
  const [duration, setDuration] = useState(0); // seconds
  const [isPaused, setIsPaused] = useState(false);
  const [currentHR, setCurrentHR] = useState(142);
  const [distance, setDistance] = useState(0); // km
  const [calories, setCalories] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isPaused || !isClient) return;

    const interval = setInterval(() => {
      setDuration(prev => prev + 1);

      // Simulate HR changes (remove in production, use real device data)
      setCurrentHR(prev => {
        const change = Math.random() * 4 - 2; // Random change between -2 and +2
        return Math.max(60, Math.min(200, prev + change));
      });

      // Update other metrics
      setDistance(prev => parseFloat((prev + 0.002).toFixed(2))); // ~7 km/h pace
      setCalories(prev => prev + 0.18); // ~10 cal/min
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isClient]);


  const handleEndWorkout = () => {
    router.push('/workouts/summary');
  };
  
  // Helper to calculate current zone based on HR
  const getCurrentZone = (hr: number) => {
    if (hr < 114) return 'Resting';
    if (hr < 133) return 'Light';
    if (hr < 152) return 'Fat Burn';
    if (hr < 171) return 'Cardio';
    return 'Peak';
  };

  // Helper to get time in current zone
  const getZoneTime = () => {
    const zone = getCurrentZone(currentHR);
    // Return mock time for now, replace with actual zone tracking logic
    if (zone === 'Cardio') return 12;
    if (zone === 'Fat Burn') return 5;
    return 0;
  };

  // Set current zone
  const currentZone = getCurrentZone(currentHR);


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
        <p className="text-xl font-mono tracking-wider">{formatTime(duration)}</p>
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
            <p className="text-8xl font-bold">{Math.round(currentHR)}</p>
          </div>
          <p className="text-2xl text-muted-foreground">{currentZone} Zone</p>
        </div>

        <div className="w-full max-w-xs space-y-6">
          <div className="text-center">
            <p className="text-5xl font-mono tracking-tighter">{formatTime(duration)}</p>
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
        
        {/* Heart Rate Zone Indicator (Simplified - No Slider) */}
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                {/* Zone background colors */}
                <div className="absolute inset-0 flex">
                    <div className="flex-1 bg-blue-400/50"></div>
                    <div className="flex-1 bg-green-400/50"></div>
                    <div className="flex-1 bg-yellow-400/50"></div>
                    <div className="flex-1 bg-orange-400/50"></div>
                    <div className="flex-1 bg-red-400/50"></div>
                </div>
                {/* Current position indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white transition-all duration-300"
                  style={{
                    left: `${((currentHR - 60) / (200 - 60)) * 100}%`
                  }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-4 bg-white rounded-sm shadow-lg"></div>
                </div>
            </div>
             <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Rest</span>
                <span>Light</span>
                <span>Fat Burn</span>
                <span>Cardio</span>
                <span>Peak</span>
            </div>
            <p className='text-sm mt-2 text-accent'>
                {getZoneTime()} min in {currentZone} Zone
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
