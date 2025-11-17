'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WorkoutGenerator from '@/components/workout-generator';
import {
  ActivityCard,
  GoalsCard,
  SleepCard,
} from '@/components/dashboard-cards';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DataSync from '@/components/data-sync';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showSync = searchParams.get('sync') === 'true';

  useEffect(() => {
    if (showSync) {
      const timer = setTimeout(() => {
        // After syncing, we are on the dashboard. Let's remove the query param.
        router.replace('/dashboard');
      }, 7000); // 6s for sync + 1s buffer
      return () => clearTimeout(timer);
    }
  }, [showSync, router]);

  if (showSync) {
    return <DataSync />;
  }

  return (
    <div className="space-y-6">
      <WorkoutGenerator />
      <ActivityCard />
      <SleepCard />
      <GoalsCard />
    </div>
  );
}
