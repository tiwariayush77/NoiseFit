'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  X,
  Award,
  Share2,
  Download,
  Footprints,
  Clock,
  Heart,
  Flame,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

const summaryData = {
  activity: 'Running',
  duration: 1938, // 32m 18s
  distance: 5.2,
  avgHR: 142,
  maxHR: 168,
  calories: 352,
  avgPace: '6:12',
  date: new Date(),
  zones: [
    { name: 'Peak', minutes: 2, percentage: 6, color: '#EF4444' },
    { name: 'Cardio', minutes: 18, percentage: 56, color: '#F97316' },
    { name: 'Fat Burn', minutes: 8, percentage: 25, color: '#F59E0B' },
    { name: 'Light', minutes: 4, percentage: 13, color: '#10B981' },
  ],
  achievements: [
    {
      id: 'pb',
      name: 'Personal Best',
      description: 'Fastest 5K this month!',
    },
    {
      id: 'streak',
      name: '3-Day Streak',
      description: '3 workouts in a row',
    },
  ],
  creditsEarned: 25,
  hrData: Array.from({ length: 32 }, (_, i) => ({
    time: i,
    hr: 120 + Math.sin(i / 3) * 20 + Math.random() * 10,
  })),
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function WorkoutSummaryPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <CheckCircle2 className="w-7 h-7 text-green-500" />
        <h1 className="text-lg font-semibold">Workout Complete!</h1>
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <X />
          </Button>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">🏆 Great Workout!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              You burned <span className="font-bold">{summaryData.calories}</span>{' '}
              calories in{' '}
              <span className="font-bold">
                {formatDuration(summaryData.duration)}
              </span>
              .
            </p>
            <p className="text-accent font-semibold mt-2">
              + {summaryData.creditsEarned} wellness credits earned! 💰
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Workout Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-4 gap-y-6">
            <StatItem
              icon={<Footprints />}
              label="Activity"
              value={summaryData.activity}
            />
            <StatItem
              icon={<Clock />}
              label="Duration"
              value={formatDuration(summaryData.duration)}
            />
            <StatItem
              icon={<Zap />}
              label="Distance"
              value={`${summaryData.distance} km`}
            />
            <StatItem
              icon={<Flame />}
              label="Calories"
              value={`${summaryData.calories} kcal`}
            />
            <div className="col-span-2">
              <StatItem
                icon={<Heart />}
                label="Heart Rate"
                value={`Avg: ${summaryData.avgHR} bpm · Max: ${summaryData.maxHR} bpm`}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Time in Zones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {summaryData.zones.map((zone) => (
              <div key={zone.name}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span
                    className="font-semibold"
                    style={{ color: zone.color }}
                  >
                    {zone.name}
                  </span>
                  <span>
                    {zone.minutes} min ({zone.percentage}%)
                  </span>
                </div>
                <Progress
                  value={zone.percentage}
                  indicatorClassName="bg-[var(--zone-color)]"
                  style={{ '--zone-color': zone.color } as React.CSSProperties}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50">
            <CardHeader><CardTitle>Heart Rate Chart</CardTitle></CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={summaryData.hrData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} unit="m" />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[100, 180]} unit="bpm"/>
                        <Tooltip content={<CustomTooltip />} />
                        <defs>
                            <linearGradient id="hrColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="hr" stroke="hsl(var(--primary))" fill="url(#hrColor)" />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Achievements Unlocked</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {summaryData.achievements.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg"
              >
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="font-semibold">{ach.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Save Image
          </Button>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-background border-t p-4 grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => router.push('/dashboard')}
        >
          Discard
        </Button>
        <Button size="lg" onClick={() => router.push('/dashboard')}>
          Save Workout
        </Button>
      </footer>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-accent mt-1">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-2 rounded-lg border border-border/50">
          <p className="text-sm">{`Time: ${label} min`}</p>
          <p className="text-accent text-sm">{`HR: ${Math.round(payload[0].value)} bpm`}</p>
        </div>
      );
    }
    return null;
};
