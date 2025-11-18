'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const vitalsData = [
  {
    id: 'heart',
    icon: '❤️',
    label: 'Heart Rate',
    value: '72 bpm',
    subtitle: 'Resting: 58 bpm',
    color: '#EF4444', // Red
    link: '/vitals/heart'
  },
  {
    id: 'activity',
    icon: '👟',
    label: 'Steps',
    value: '8,234',
    subtitle: 'Goal: 10,000',
    progress: 82,
    color: '#10B981', // Green
    link: '/vitals/activity'
  },
  {
    id: 'sleep',
    icon: '😴',
    label: 'Sleep',
    value: '7h 32m',
    subtitle: 'Quality: 85%',
    color: '#8B5CF6', // Purple
    link: '/vitals/sleep'
  },
  {
    id: 'stress',
    icon: '🧘',
    label: 'Stress',
    value: 'Low',
    subtitle: 'HRV: 58ms',
    status: 'Relaxed',
    statusColor: '#10B981', // Green
    link: '/vitals/stress'
  }
];

export default function TodayVitalsCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Today's Vitals</CardTitle>
            <p className="text-xs text-muted-foreground">Updated 2 min ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {vitalsData.map((vital) => (
            <Link key={vital.id} href={vital.link} className="block">
              <div 
                className="bg-muted/30 p-4 rounded-lg border border-transparent hover:border-accent transition-all duration-300 transform hover:scale-102 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{vital.icon}</span>
                    <p className="text-xs uppercase text-muted-foreground">{vital.label}</p>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                    <p className="text-2xl font-bold">{vital.value}</p>
                    <p className="text-xs text-muted-foreground">{vital.subtitle}</p>

                    {vital.progress !== undefined && (
                        <div className="mt-3">
                            <Progress value={vital.progress} className="h-1" indicatorClassName="bg-green-500" />
                        </div>
                    )}
                    {vital.status !== undefined && (
                         <div className="mt-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: vital.statusColor }}></span>
                            <p className="text-xs" style={{ color: vital.statusColor }}>{vital.status}</p>
                        </div>
                    )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
