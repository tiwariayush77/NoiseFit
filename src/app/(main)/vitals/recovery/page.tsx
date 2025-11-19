'use client';

import {
  ArrowLeft,
  Calendar,
  Heart,
  TrendingUp,
  Bed,
  Thermometer,
  Zap,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const recoveryData = {
  readiness: {
    score: 85,
    status: 'Ready for training! 💪',
    comment: 'Your body recovered well overnight.',
  },
  metrics: [
    {
      id: 'hrv',
      label: 'HRV',
      value: '58ms',
      progress: 90,
      status: 'Excellent (90th percentile)',
      color: 'text-purple-400',
      indicatorColor: 'bg-purple-400',
    },
    {
      id: 'sleep',
      label: 'Sleep Quality',
      value: '85%',
      progress: 85,
      status: 'Good recovery',
      color: 'text-blue-400',
      indicatorColor: 'bg-blue-400',
    },
    {
      id: 'rhr',
      label: 'Resting HR',
      value: '58 bpm',
      progress: 80,
      status: 'Normal baseline',
      color: 'text-red-400',
      indicatorColor: 'bg-red-400',
    },
    {
      id: 'body-battery',
      label: 'Body Battery',
      value: '87%',
      progress: 87,
      status: 'Fully recharged',
      color: 'text-green-400',
      indicatorColor: 'bg-green-400',
    },
  ],
  hrvTrend: {
    average: 56,
    trend: 'improving',
    change: 4,
    data: Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      hrv: 52 + Math.floor(i / 7) + Math.random() * 2,
    })),
  },
  trainingLoad: {
    status: 'Well balanced',
    load: 'Moderate',
    recovery: 'Good',
  },
  tips: [
    'Great HRV - ready for a hard workout',
    'Maintain 7.5h+ sleep for optimal recovery',
    'Stay hydrated (2L+ water)',
    'Consider a rest day after 2 consecutive hard workouts',
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
        <p className="text-sm font-bold">{label}</p>
        <p className="text-accent">{`HRV: ${payload[0].value.toFixed(1)}ms`}</p>
      </div>
    );
  }
  return null;
};

export default function RecoveryPage() {
  const { readiness, metrics, hrvTrend, trainingLoad, tips } = recoveryData;
  const circumference = 2 * Math.PI * 45;
  const scoreColor =
    readiness.score >= 80
      ? 'text-green-400'
      : readiness.score >= 60
      ? 'text-yellow-400'
      : 'text-red-400';
  const ringColor =
    readiness.score >= 80
      ? 'stroke-green-400'
      : readiness.score >= 60
      ? 'stroke-yellow-400'
      : 'stroke-red-400';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/energy-detail">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Recovery</h1>
        <Button variant="ghost" size="icon">
          <Calendar />
          <span className="sr-only">Select Date</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">
              Today's Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-[120px] h-[120px] mx-auto mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-muted/20"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className={ringColor}
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (readiness.score / 100) * circumference
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${scoreColor}`}>
                  {readiness.score}
                </span>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
            </div>
            <p className={`text-lg mb-1 font-semibold ${scoreColor}`}>{readiness.status}</p>
            <p className="text-sm text-muted-foreground">{readiness.comment}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Recovery Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-semibold flex items-center gap-2 ${metric.color}`}>
                    {metric.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.value}
                  </span>
                </div>
                <Progress
                  value={metric.progress}
                  indicatorClassName={metric.indicatorColor}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {metric.status}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>HRV Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hrvTrend.data}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border) / 0.5)"
                  />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    interval={6}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    unit="ms"
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="hrv"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground text-center mt-4 flex justify-around">
              <span>
                Average: <span className="font-bold text-foreground">{hrvTrend.average} ms</span>
              </span>
              <span className="flex items-center gap-1 text-green-400 font-semibold">
                <TrendingUp className="w-4 h-4" /> +{hrvTrend.change} ms
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
          <CardHeader>
              <CardTitle>Training vs Recovery</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="text-center bg-muted/30 p-4 rounded-lg">
                <p className="text-lg font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {trainingLoad.status}
                </p>
                <div className="flex justify-around text-sm text-muted-foreground mt-2">
                    <span>Load: {trainingLoad.load}</span>
                    <span>Recovery: {trainingLoad.recovery}</span>
                </div>
              </div>
               <Button variant="link" className="w-full mt-2">View Training History →</Button>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">💡 Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="space-y-3 pt-4">
            <Button variant="secondary" className="w-full">Log Recovery Activity</Button>
            <Button variant="secondary" className="w-full">Export Recovery Data</Button>
        </div>
      </main>
    </div>
  );
}
