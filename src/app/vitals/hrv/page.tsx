'use client';

import {
  ArrowLeft,
  Calendar,
  Heart,
  TrendingUp,
  TrendingDown,
  Brain,
  Flame,
  CheckCircle,
  AlertTriangle,
  Zap,
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const heartRateDetailData = {
  current: {
    bpm: 72,
    status: 'Normal Range',
    restingHR: 58,
    maxToday: 142,
  },
  zones: [
    { name: 'Peak', icon: '❤️', range: '171-190 bpm', duration: 0, color: '#EF4444', description: 'Max effort' },
    { name: 'Cardio', icon: '🧡', range: '152-170 bpm', duration: 12, color: '#F97316', description: 'Cardiovascular fitness' },
    { name: 'Fat Burn', icon: '💛', range: '133-151 bpm', duration: 28, color: '#F59E0B', description: 'Optimal fat burning' },
    { name: 'Light', icon: '💚', range: '114-132 bpm', duration: 45, color: '#10B981', description: 'Warm-up, recovery' },
    { name: 'Resting', icon: '🩵', range: '<113 bpm', duration: 1355, color: '#06B6D4', description: 'Baseline' },
  ],
  todayPattern: Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = i / 4;
    let bpm;
    if (hour >= 0 && hour < 6) { // Sleep
      bpm = 55 + Math.random() * 5;
    } else if (hour >= 10.5 && hour < 11) { // Workout
      bpm = 100 + Math.random() * 42;
    } else {
      bpm = 65 + Math.random() * 15;
    }
    return { time: `${Math.floor(hour)}:${(i%4)*15 < 10 ? '0' : ''}${(i%4)*15}`, bpm: Math.round(bpm) };
  }),
  restingHRTrend: {
    current: 58,
    average30Day: 59,
    trend: 'improving',
    change: -3,
    data: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, bpm: 62 - Math.floor(i/5) + Math.random()*2 -1 })),
  },
  hrv: {
    current: 78,
    status: 'Excellent',
    average7Day: 75,
    trend: 'improving',
    change: 4,
  },
  weeklyIntensity: {
    totalActiveTime: 285,
    breakdown: [
      { zone: 'Peak', minutes: 0, percentage: 0, color: '#EF4444' },
      { zone: 'Cardio', minutes: 68, percentage: 24, color: '#F97316' },
      { zone: 'Fat Burn', minutes: 127, percentage: 45, color: '#F59E0B' },
      { zone: 'Light', minutes: 90, percentage: 31, color: '#10B981' },
    ],
    recommendation: 'Add 20 min cardio zone this week for improved fitness',
  },
  insights: [
    { type: 'positive', text: 'Resting HR dropped 3 bpm this month - sign of improved cardiovascular fitness!' },
    { type: 'positive', text: 'HR recovery after workouts is excellent (drops 45 bpm in 2 min). Strong cardiovascular health.' },
    { type: 'warning', text: 'Elevated HR detected at 11:30 PM on Nov 14. Late-night stress or caffeine? Try to relax before bed.' },
    { type: 'positive', text: 'Your heart rate dips perfectly during sleep (avg 55 bpm). Quality rest indicator.' },
  ],
  healthScore: {
    score: 92,
    status: 'Excellent',
    factors: [
      { name: 'Resting HR', value: '58 bpm', status: 'Excellent' },
      { name: 'HRV', value: '78 ms', status: 'Excellent' },
      { name: 'Recovery', value: 'Fast', status: 'Excellent' },
      { name: 'Exercise intensity', value: 'Moderate', status: 'Good' },
    ],
  },
};

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <p className="text-sm font-bold">{`${label}`}</p>
          <p className="text-accent">{`BPM: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export default function HeartRateDetail() {
  const router = useRouter();
  const { current, zones, todayPattern, restingHRTrend, hrv, weeklyIntensity, insights, healthScore } = heartRateDetailData;
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Button variant="ghost" size="icon" onClick={() => router.push('/energy-breakdown')}>
          <ArrowLeft />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-lg font-semibold">Heart Rate Analysis</h1>
        <Button variant="ghost" size="icon">
          <Calendar />
          <span className="sr-only">Select Date</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Current Status */}
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Right Now</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-bold text-red-400 animate-pulse">{current.bpm} <span className="text-3xl text-muted-foreground">bpm</span></p>
            <p className="text-lg mb-2">{current.status}</p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>Resting: {current.restingHR} bpm (Excellent ✓)</span>
              <span>Max Today: {current.maxToday} bpm</span>
            </div>
          </CardContent>
        </Card>

        {/* Today's Heart Rate Zones */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Today's Activity by Zone</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {zones.map(zone => (
              <div key={zone.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold flex items-center gap-2" style={{ color: zone.color }}>{zone.icon} {zone.name} <span className="text-xs text-muted-foreground">({zone.range})</span></span>
                  <span className="text-sm text-muted-foreground">{Math.floor(zone.duration / 60)}h {zone.duration % 60}min</span>
                </div>
                <Progress value={(zone.duration / (24*60)) * 100} indicatorClassName="bg-[var(--zone-color)]" style={{'--zone-color': zone.color} as React.CSSProperties}/>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{zone.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 24-Hour Heart Rate Chart */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Today's Pattern</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={todayPattern} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} interval={15} tickFormatter={(val) => val.endsWith(':00') ? `${val.split(':')[0]}h` : ''} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="bpm" domain={[40, 200]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--accent))', strokeWidth: 1 }} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="bpm" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-4 space-x-4">
                <span>🏃 Workout: 10:30 AM (142 max)</span>
                <span>😴 Sleep: 12 AM - 6 AM (avg 55)</span>
            </div>
          </CardContent>
        </Card>

        {/* Resting Heart Rate Trend */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Resting HR Trend (30 Days)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={restingHRTrend.data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} interval={6} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="bpm" domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="bpm" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground text-center mt-4 flex justify-around">
                <span>Current: <span className="font-bold text-foreground">{restingHRTrend.current} bpm</span></span>
                <span>30-day Avg: <span className="font-bold text-foreground">{restingHRTrend.average30Day} bpm</span></span>
                <span className="flex items-center gap-1 text-green-400 font-semibold"><TrendingDown className="w-4 h-4" /> {restingHRTrend.change} bpm</span>
            </div>
          </CardContent>
        </Card>
        
        {/* HRV */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle className="flex items-center gap-2"><Brain className="text-purple-400" /> Heart Rate Variability (HRV)</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-purple-400">{hrv.current} <span className="text-2xl text-muted-foreground">ms</span></p>
            <p className="text-lg text-green-400 mb-2">{hrv.status}</p>
            <p className="text-sm text-muted-foreground">Higher HRV often indicates better recovery and fitness.</p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground mt-4">
              <span>7-day Avg: {hrv.average7Day} ms</span>
              <span className="flex items-center gap-1 text-green-400"><TrendingUp className="w-4 h-4"/> {hrv.change > 0 ? `+${hrv.change}`: hrv.change} ms</span>
            </div>
            <Button variant="link" className="mt-2">Learn About HRV →</Button>
          </CardContent>
        </Card>
        
        {/* Workout Intensity */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Workout Intensity (This Week)</CardTitle></CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Total active time: {weeklyIntensity.totalActiveTime} min</p>
                <div className="space-y-3">
                    {weeklyIntensity.breakdown.map(item => (
                        <div key={item.zone}>
                            <div className="flex justify-between text-sm mb-1">
                                <span style={{color: item.color}}>{item.zone} Zone</span>
                                <span>{item.minutes} min ({item.percentage}%)</span>
                            </div>
                            <Progress value={item.percentage} indicatorClassName="bg-[var(--zone-color)]" style={{'--zone-color': item.color} as React.CSSProperties}/>
                        </div>
                    ))}
                </div>
                 <div className="bg-primary/10 p-3 rounded-lg mt-4 text-sm text-primary">
                    <p className="font-semibold mb-1">💡 Recommendation:</p>
                    <p>{weeklyIntensity.recommendation}</p>
                </div>
                <Button variant="outline" className="w-full mt-4">Start HIIT Workout →</Button>
            </CardContent>
        </Card>


        {/* AI Insights */}
        <Card className="bg-card/50">
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <Zap className="w-6 h-6 text-primary mt-1" />
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Patterns from your heart data.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                {insight.type === 'positive' ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                <p className="text-sm text-muted-foreground">{insight.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Cardiovascular Health Score */}
        <Card className="bg-card/50 text-center">
            <CardHeader>
                <CardTitle>Cardiovascular Health</CardTitle>
                <CardDescription>An overall score based on key metrics.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-6xl font-bold text-green-400">{healthScore.score}<span className="text-3xl text-muted-foreground">/100</span></p>
                <p className="text-xl font-semibold text-green-400 mb-4">{healthScore.status}</p>
                <div className="text-left text-sm text-muted-foreground space-y-2 bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-foreground font-semibold mb-2">FACTORS:</p>
                    {healthScore.factors.map(factor => (
                        <div key={factor.name} className="flex justify-between">
                            <span>{factor.name}: {factor.value}</span>
                            <span className="font-semibold text-green-400">{factor.status}</span>
                        </div>
                    ))}
                </div>
                 <p className="text-sm text-muted-foreground mt-4">Keep up the great work! 💪</p>
            </CardContent>
        </Card>


        {/* Bottom Actions */}
        <div className='space-y-3 pt-4'>
             <Button variant="secondary" className="w-full">Log Manual Heart Rate</Button>
             <Button variant="secondary" className="w-full">Export HR Report</Button>
             <Button variant="secondary" className="w-full">Set HR Alerts</Button>
        </div>
      </main>
    </div>
  );
}
