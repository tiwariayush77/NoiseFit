'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Footprints,
  HeartPulse,
  BedDouble,
  Dumbbell,
  Ruler,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const scopes = {
  activity: [
    { id: 'steps', label: 'Steps', recommended: true },
    { id: 'distance', label: 'Distance', recommended: true },
    { id: 'activeEnergy', label: 'Active Energy', recommended: true },
    { id: 'flightsClimbed', label: 'Flights Climbed' },
  ],
  heart: [
    { id: 'heartRate', label: 'Heart Rate', recommended: true },
    { id: 'restingHR', label: 'Resting Heart Rate', recommended: true },
    { id: 'hrv', label: 'HRV (Heart Rate Variability)', recommended: true },
    { id: 'bloodOxygen', label: 'Blood Oxygen (SpO2)' },
    { id: 'bloodPressure', label: 'Blood Pressure' },
  ],
  sleep: [
    { id: 'sleepAnalysis', label: 'Sleep Analysis', recommended: true },
    { id: 'sleepStages', label: 'Sleep Stages (REM, Deep, Light)', recommended: true },
    { id: 'respiratoryRate', label: 'Respiratory Rate' },
  ],
  workouts: [
    { id: 'workouts', label: 'Workout Sessions', recommended: true },
    { id: 'workoutRoutes', label: 'Workout Routes (GPS)', recommended: true },
    { id: 'workoutHR', label: 'Workout Heart Rate' },
  ],
  body: [
    { id: 'weight', label: 'Weight' },
    { id: 'bodyFat', label: 'Body Fat %' },
    { id: 'bmi', label: 'BMI' },
  ],
};

type ScopeCategory = keyof typeof scopes;
type ScopeId = keyof HealthAppDataScopePageProps['selectedScopes'];

interface HealthAppDataScopePageProps {
  selectedScopes: {
    steps: boolean;
    distance: boolean;
    activeEnergy: boolean;
    flightsClimbed: boolean;
    heartRate: boolean;
    restingHR: boolean;
    hrv: boolean;
    bloodOxygen: boolean;
    bloodPressure: boolean;
    sleepAnalysis: boolean;
    sleepStages: boolean;
    respiratoryRate: boolean;
    workouts: boolean;
    workoutRoutes: boolean;
    workoutHR: boolean;
    weight: boolean;
    bodyFat: boolean;
    bmi: boolean;
  };
}

function HealthAppDataScopeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'google-fit';

  const [selectedScopes, setSelectedScopes] = useState(() => {
    const initialState: any = {};
    Object.values(scopes).flat().forEach(scope => {
      initialState[scope.id] = !!scope.recommended;
    });
    return initialState;
  });

  const toggleScope = (key: ScopeId) => {
    setSelectedScopes((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    setSelectedScopes(Object.fromEntries(Object.keys(selectedScopes).map(k => [k, true])));
  };

  const deselectAll = () => {
    setSelectedScopes(Object.fromEntries(Object.keys(selectedScopes).map(k => [k, false])));
  };

  const selectedCount = Object.values(selectedScopes).filter(Boolean).length;

  const handleContinue = () => {
    router.push(`/data-sync?platform=${platform}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 flex items-center p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            <div className='flex-1 text-center'>
                 <h1 className="text-lg font-semibold">Choose Data to Share</h1>
            </div>
            <div className="w-10"></div>
        </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-48">
        <div className="max-w-md mx-auto">
          <div className="flex items-center text-sm text-green-400 mb-6">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Connected to {platform === 'apple-health' ? 'Apple Health' : 'Google Fit'}</span>
          </div>

          <Card className="bg-primary/10 border-primary/20 text-primary mb-6">
            <CardHeader className="flex-row items-center gap-3">
              <Info className="w-5 h-5" />
              <CardTitle className="text-base">More data = Better insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Select the data types you want to sync for AI analysis.</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <ScopeSection icon={<Footprints/>} title="Activity & Movement" scopeKey="activity" selectedScopes={selectedScopes} onToggle={toggleScope} />
            <ScopeSection icon={<HeartPulse/>} title="Heart & Vitals" scopeKey="heart" selectedScopes={selectedScopes} onToggle={toggleScope} />
            <ScopeSection icon={<BedDouble/>} title="Sleep & Recovery" scopeKey="sleep" selectedScopes={selectedScopes} onToggle={toggleScope} />
            <ScopeSection icon={<Dumbbell/>} title="Workouts" scopeKey="workouts" selectedScopes={selectedScopes} onToggle={toggleScope} />
            <ScopeSection icon={<Ruler/>} title="Body Measurements" scopeKey="body" selectedScopes={selectedScopes} onToggle={toggleScope} />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-card/90 backdrop-blur-lg border-t border-border/20">
        <div className="max-w-md mx-auto text-center space-y-3">
            <div className="flex space-x-3 mb-3">
                <Button onClick={selectAll} variant="secondary" className="flex-1">Select All</Button>
                <Button onClick={deselectAll} variant="secondary" className="flex-1">Deselect All</Button>
            </div>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white disabled:bg-muted disabled:from-muted disabled:to-muted"
            disabled={selectedCount === 0}
            onClick={handleContinue}
          >
            Sync {selectedCount > 0 ? `${selectedCount} type${selectedCount > 1 ? 's' : ''}` : '...'}
          </Button>
          <p className="text-xs text-muted-foreground pt-2">
            You can change these selections anytime in Settings
          </p>
        </div>
      </footer>
    </div>
  );
}

function ScopeSection({ icon, title, scopeKey, selectedScopes, onToggle }: { icon: React.ReactNode; title: string; scopeKey: ScopeCategory; selectedScopes: any; onToggle: (id: ScopeId) => void; }) {
  return (
    <Card className="bg-card/50">
      <CardHeader className="flex-row items-center gap-3">
        <div className="text-accent">{icon}</div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {scopes[scopeKey].map(scope => (
          <ScopeCheckbox
            key={scope.id}
            id={scope.id}
            label={scope.label}
            checked={selectedScopes[scope.id]}
            onChange={() => onToggle(scope.id as ScopeId)}
            recommended={scope.recommended}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function ScopeCheckbox({ id, label, checked, onChange, recommended = false }: { id:string, label: string, checked: boolean, onChange: () => void, recommended?: boolean }) {
  return (
    <Label
      htmlFor={id}
      className="flex items-center justify-between bg-muted/30 rounded-lg p-3 cursor-pointer hover:bg-muted/50"
    >
      <div className="flex items-center">
        <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
        <span className="ml-3 text-sm">{label}</span>
      </div>
      {recommended && (
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
          Recommended
        </span>
      )}
    </Label>
  );
}

export default function HealthAppDataScopePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HealthAppDataScopeContent />
        </Suspense>
    )
}
