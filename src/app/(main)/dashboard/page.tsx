import { ActivityCard, GoalsCard, SleepCard } from '@/components/dashboard-cards';
import WorkoutGenerator from '@/components/workout-generator';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WorkoutGenerator />
      <ActivityCard />
      <SleepCard />
      <GoalsCard />
    </div>
  );
}
