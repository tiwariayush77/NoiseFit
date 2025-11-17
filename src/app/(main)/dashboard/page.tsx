'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EnergyScoreCard from '@/components/energy-score-card';
import TodayVitalsCard from '@/components/today-vitals-card';
import SmartTimelineCard from '@/components/smart-timeline-card';
import TopOpportunitiesCard from '@/components/top-opportunities-card';
import QuickActionsCard from '@/components/quick-actions-card';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
        <EnergyScoreCard />
        <TodayVitalsCard />
        <SmartTimelineCard />
        <TopOpportunitiesCard />
        <QuickActionsCard />
    </div>
  );
}
