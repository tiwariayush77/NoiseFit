'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Dumbbell,
  Repeat,
  Bike,
  Waves,
  PersonStanding,
  Footprints,
  Plus,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const workoutTypes = [
  { id: 'running', name: 'Running', icon: <Footprints className="w-8 h-8" /> },
  { id: 'strength', name: 'Strength', icon: <Dumbbell className="w-8 h-8" /> },
  { id: 'cycling', name: 'Cycling', icon: <Bike className="w-8 h-8" /> },
  { id: 'yoga', name: 'Yoga', icon: <PersonStanding className="w-8 h-8" /> },
  { id: 'swimming', name: 'Swimming', icon: <Waves className="w-8 h-8" /> },
  { id: 'walking', name: 'Walking', icon: <Footprints className="w-8 h-8" /> },
  { id: 'other', name: 'Other', icon: <Plus className="w-8 h-8" /> },
];

const recentWorkouts = [
  {
    id: 'rec1',
    activity: 'Running',
    icon: <Footprints className="w-5 h-5 text-accent" />,
    details: 'Yesterday · 32 min · 142 avg HR',
  },
  {
    id: 'rec2',
    activity: 'Full Body Strength',
    icon: <Dumbbell className="w-5 h-5 text-primary" />,
    details: '2 days ago · 45 min · 112 avg HR',
  },
];

export default function LogWorkoutPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>('running');

  const handleStartWorkout = (custom: boolean = false) => {
    // In a real app, you'd pass props or use state management
    router.push('/workouts/tracking');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Log Workout</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        {/* Workout Type Selection */}
        <section>
          <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">
            What are you doing?
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {workoutTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'bg-card/50 border rounded-xl p-3 flex flex-col items-center justify-center aspect-square text-center transition-all duration-200',
                  selectedType === type.id
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border/20 hover:border-accent/50'
                )}
              >
                <div className="mb-2">{type.icon}</div>
                <p className="text-xs font-semibold">{type.name}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Quick Start Section */}
        {selectedType && (
          <section className="animate-in fade-in-5 slide-in-from-bottom-5">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"
                  onClick={() => handleStartWorkout()}
                >
                  Start{' '}
                  {workoutTypes.find((t) => t.id === selectedType)?.name} Now
                  &rarr;
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Or customize:
                </p>
                <div className="space-y-3">
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Duration goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue placeholder="Intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="vigorous">Vigorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleStartWorkout(true)}
                >
                  Start Custom Workout
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Recent Workouts */}
        <section>
          <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">
            Recent Workouts
          </h2>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <Card
                key={workout.id}
                className="bg-card/50 border-border/20"
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {workout.icon}
                    <div>
                      <p className="font-semibold">{workout.activity}</p>
                      <p className="text-xs text-muted-foreground">
                        {workout.details}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStartWorkout(true)}
                  >
                    <Repeat className="w-4 h-4 mr-2" /> Repeat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
