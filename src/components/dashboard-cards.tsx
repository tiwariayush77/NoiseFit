'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Flame, Footprints, Route } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const activityData = [
  {
    icon: <Footprints className="w-6 h-6 text-accent" />,
    value: '8,452',
    label: 'Steps',
  },
  {
    icon: <Flame className="w-6 h-6 text-accent" />,
    value: '420',
    label: 'Calories',
  },
  {
    icon: <Route className="w-6 h-6 text-accent" />,
    value: '6.2 km',
    label: 'Distance',
  },
];

export function ActivityCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle>Daily Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          {activityData.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              {item.icon}
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const sleepData = [
  { stage: 'Awake', hours: 0.5, fill: 'var(--color-accent)' },
  { stage: 'REM', hours: 1.5, fill: 'var(--color-primary)' },
  { stage: 'Light', hours: 4, fill: 'var(--color-primary)' },
  { stage: 'Deep', hours: 2, fill: 'var(--color-primary)' },
];

const chartConfig = {
  hours: {
    label: 'Hours',
  },
  accent: {
    label: 'Accent',
    color: 'hsl(var(--accent))',
  },
  primary: {
    label: 'Primary',
    color: 'hsl(var(--primary))',
  },
};

export function SleepCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle>Sleep Analysis</CardTitle>
        <CardDescription>Last Night: 8h 0m</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sleepData}
              layout="vertical"
              margin={{ left: -10 }}
              accessibilityLayer
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="stage"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Bar
                dataKey="hours"
                radius={[4, 4, 4, 4]}
                background={{ fill: 'hsl(var(--primary) / 0.1)', radius: 4 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const goalsData = [
  {
    title: 'Weekly Running Distance',
    progress: 75,
    target: '20km',
    current: '15km',
  },
  {
    title: 'Workout Sessions',
    progress: 60,
    target: '5 sessions',
    current: '3 sessions',
  },
  {
    title: 'Daily Steps',
    progress: 100,
    target: '10,000 steps',
    current: '10,240 steps',
  },
];

export function GoalsCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle>Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goalsData.map((goal) => (
          <div key={goal.title}>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-sm">{goal.title}</p>
              {goal.progress === 100 ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <p className="text-sm text-muted-foreground">{`${goal.current} / ${goal.target}`}</p>
              )}
            </div>
            <Progress
              value={goal.progress}
              className="h-2"
              indicatorClassName={
                goal.progress === 100 ? 'bg-accent' : 'bg-primary'
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
