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

export function GoalsCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle>Today's Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Steps Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Steps</span>
            <span className="text-sm font-bold">8,540 / 10,000</span>
          </div>
          <Progress value={85.4} className="h-2" indicatorClassName="bg-teal-500" />
        </div>

        {/* Sleep Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Sleep Quality</span>
            <span className="text-sm font-bold">85%</span>
          </div>
          <Progress value={85} className="h-2" indicatorClassName="bg-blue-500" />
        </div>

        {/* Active Minutes Goal */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Active Minutes</span>
            <span className="text-sm font-bold">23 / 30</span>
          </div>
          <Progress value={77} className="h-2" indicatorClassName="bg-orange-500" />
        </div>
      </CardContent>
    </Card>
  );
}
