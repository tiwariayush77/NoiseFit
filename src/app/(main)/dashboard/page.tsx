import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WorkoutGenerator from '@/components/workout-generator';
import { ActivityCard, GoalsCard, SleepCard } from '@/components/dashboard-cards';


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
