'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Loader,
  Smartphone,
  Watch,
  Lock,
  HeartPulse,
  Footprints,
  BedDouble,
  Dumbbell,
  Pause,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type ImportStatus = 'pending' | 'importing' | 'complete';

type DataCategory = {
  id: string;
  name: string;
  recordCount: number;
  status: ImportStatus;
  icon: React.ReactNode;
};

const platformConfig: { [key: string]: any } = {
  'google-fit': {
    name: 'Google Fit',
    icon: 'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png',
  },
  'apple-health': {
    name: 'Apple Health',
    icon: 'https://developer.apple.com/assets/elements/icons/health-app/health-app-96x96_2x.png',
  },
  fitbit: {
    name: 'Fitbit',
    icon: 'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/charge6/hero-static/porcelain/charge6-porcelain-device-1.png',
  },
  garmin: {
    name: 'Garmin',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Garmin_logo_2020.svg/1024px-Garmin_logo_2020.svg.png',
  },
  other: {
    name: 'Health App',
    icon: null,
  },
};

const StatusIcon = ({ status }: { status: ImportStatus }) => {
  if (status === 'complete') {
    return <CheckCircle className="w-5 h-5 text-green-400" />;
  }
  if (status === 'importing') {
    return <Loader className="w-5 h-5 text-yellow-400 animate-spin" />;
  }
  return <Pause className="w-5 h-5 text-muted-foreground/50" />;
};


function DataSyncContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'google-fit';
  const range = searchParams.get('range') || '30d';

  const config = platformConfig[platform] || platformConfig['other'];

  const timeEstimates: { [key: string]: number } = {
    '7d': 5,
    '30d': 10,
    '90d': 20,
    all: 30,
    none: 1,
  };
  const totalDuration = timeEstimates[range] || 10;

  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(totalDuration);
  const [categories, setCategories] = useState<DataCategory[]>([
    { id: 'activity', name: 'Activity', recordCount: 2847, status: 'pending', icon: <Footprints /> },
    { id: 'heart', name: 'Heart Rate', recordCount: 1923, status: 'pending', icon: <HeartPulse /> },
    { id: 'sleep', name: 'Sleep', recordCount: 892, status: 'pending', icon: <BedDouble /> },
    { id: 'workouts', name: 'Workouts', recordCount: 145, status: 'pending', icon: <Dumbbell /> },
  ]);

  useEffect(() => {
    const intervalDuration = 100;
    const totalSteps = (totalDuration * 1000) / intervalDuration;
    const progressIncrement = 100 / totalSteps;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + progressIncrement, 100);
        
        setTimeRemaining(Math.max(0, Math.round(((100 - newProgress) / 100) * totalDuration)));

        setCategories(prevCats => prevCats.map((cat, index) => {
            const startThreshold = (index / prevCats.length) * 100;
            const endThreshold = ((index + 1) / prevCats.length) * 100;
            if (newProgress >= endThreshold) return {...cat, status: 'complete'};
            if (newProgress >= startThreshold) return {...cat, status: 'importing'};
            return cat;
        }));

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push(`/instant-value?platform=${platform}&range=${range}`);
          }, 1000);
        }

        return newProgress;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [range, platform, router, totalDuration]);


  const handleCancel = () => {
    // In a real app, this would need to stop the import process
    if (confirm('Are you sure you want to cancel the import? In-progress data will be lost.')) {
        router.push('/device-search');
    }
  }


  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-4 text-center">
      <Button variant="ghost" size="icon" onClick={handleCancel} className="absolute top-4 right-4 z-10">
        <X/>
      </Button>

      <div className="w-full max-w-md">
        
        <div className="flex flex-col items-center space-y-4 mb-8">
            {config.icon && <Image src={config.icon} alt={config.name} width={64} height={64} className="p-2 bg-white rounded-2xl" />}
            <div className="text-3xl animate-bounce">↓</div>
             <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <Watch className="w-8 h-8 text-primary"/>
            </div>
             <div className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>↓</div>
             <Image src="/logo.svg" alt="Noise Logo" width={64} height={64} className="p-2 bg-card rounded-2xl" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Importing Your Health Data...</h1>
        <p className="text-muted-foreground mb-6">From {config.name}</p>

        <div className="w-full mb-8">
            <Progress value={progress} className="h-2 w-full mb-2" />
            <p className="text-center font-semibold text-lg">{Math.round(progress)}% Complete</p>
        </div>

        <div className="bg-card/50 rounded-lg p-4 mb-6 text-left">
             <p className="text-sm font-semibold text-muted-foreground mb-3">IMPORTING:</p>
            <div className="space-y-4">
                {categories.map(cat => (
                    <div key={cat.id} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="text-accent">{cat.icon}</div>
                             <div>
                                <p className="font-medium text-sm">{cat.name}</p>
                                <p className="text-xs text-muted-foreground">{cat.recordCount.toLocaleString()} records</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <StatusIcon status={cat.status} />
                            <span className="w-20 text-left">{cat.status.charAt(0).toUpperCase() + cat.status.slice(1)}</span>
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {timeRemaining > 0 && <p className="text-sm text-muted-foreground mb-6">
            Estimated time remaining: {timeRemaining} seconds
        </p>}
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm text-primary/80 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Your data is being encrypted and securely transferred
        </div>

        <Button variant="link" onClick={handleCancel} className="mt-6 text-muted-foreground">
            Cancel Import
        </Button>
      </div>
    </div>
  );
}

export default function DataSyncPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DataSyncContent />
        </Suspense>
    )
}
