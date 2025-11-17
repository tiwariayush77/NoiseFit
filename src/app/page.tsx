import Header from '@/components/header';
import WorkoutGenerator from '@/components/workout-generator';
import {
  ActivityCard,
  GoalsCard,
  SleepCard,
} from '@/components/dashboard-cards';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <WorkoutGenerator />
          </div>
          <div className="space-y-8">
            <ActivityCard />
            <SleepCard />
            <GoalsCard />
          </div>
        </div>
      </main>
    </div>
  );
}
