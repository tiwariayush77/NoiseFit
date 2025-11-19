'use client';

import {
  ArrowLeft,
  Calendar,
  Footprints,
  TrendingUp,
  TrendingDown,
  Zap,
  CheckCircle,
  AlertTriangle,
  Flame,
  Clock,
  Trophy,
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
  CartesianGrid,
  Cell,
} from 'recharts';

const activityDetailData = {
  today: {
    steps: 8234,
    goal: 10000,
  },
  hourlyData: [
    { hour: '12a', steps: 0 },
    { hour: '1a', steps: 0 },
    { hour: '2a', steps: 0 },
    { hour: '3a', steps: 0 },
    { hour: '4a', steps: 0 },
    { hour: '5a', steps: 0 },
    { hour: '6a', steps: 250 },
    { hour: '7a', steps: 800 },
    { hour: '8a', steps: 1100 },
    { hour: '9a', steps: 950 },
    { hour: '10a', steps: 1240 },
    { hour: '11a', steps: 600 },
    { hour: '12p', steps: 750 },
    { hour: '1p', steps: 850 },
    { hour: '2p', steps: 180 },
    { hour: '3p', steps: 300 },
    { hour: '4p', steps: 450 },
    { hour: '5p', steps: 764 },
    { hour: '6p', steps: 0 },
    { hour: '7p', steps: 0 },
    { hour: '8p', steps: 0 },
    { hour: '9p', steps: 0 },
    { hour: '10p', steps: 0 },
    { hour: '11p', steps: 0 },
  ],
  activeTime: {
    totalMinutes: 85,
    weeklyGoal: 150,
    breakdown: {
      very: 12,
      moderate: 28,
      light: 45,
    },
  },
  weeklyTrend: [
    { day: 'Mon', steps: 8234 },
    { day: 'Tue', steps: 9102 },
    { day: 'Wed', steps: 7560 },
    { day: 'Thu', steps: 10234 },
    { day: 'Fri', steps: 8900 },
    { day: 'Sat', steps: 12340 },
    { day: 'Sun', steps: 6780 },
  ],
  milestones: [
    { id: 'goal', icon: <Footprints className="w-5 h-5 text-green-400" />, text: 'Hit 10K steps: 4 days' },
    { id: 'best', icon: <Trophy className="w-5 h-5 text-yellow-400" />, text: 'Personal best: 12,340 (Sat)' },
    { id: 'streak', icon: <Flame className="w-5 h-5 text-orange-400" />, text: '5-day streak active' },
  ],
  insights: [
    { type: 'positive', text: "You're most active between 9-11 AM." },
    { type: 'positive', text: 'Weekend steps 40% higher than weekdays.' },
    { type: 'warning', text: 'Sedentary time increased between 2-4 PM.' },
  ],
};

const CustomTooltip = ({ active, payload, label, unit = '' }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <p className="text-sm font-bold">{label}</p>
          <p className="text-accent">{`${payload[0].value.toLocaleString()} ${unit}`}</p>
        </div>
      );
    }
    return null;
};

export default function ActivityDetail() {
    const { today, hourlyData, activeTime, weeklyTrend, milestones, insights } = activityDetailData;
    const progress = (today.steps / today.goal) * 100;
    const stepsToGo = today.goal - today.steps;
    const peakHour = hourlyData.reduce((max, hour) => hour.steps > max.steps ? hour : max);
    const leastActiveHour = hourlyData.filter(h => h.steps > 0).reduce((min, hour) => hour.steps < min.steps ? hour : min);
    const weeklyAverage = Math.round(weeklyTrend.reduce((sum, day) => sum + day.steps, 0) / weeklyTrend.length);
    const bestDay = weeklyTrend.reduce((max, day) => day.steps > max.steps ? day : max);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/energy-breakdown">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Activity</h1>
        <Button variant="ghost" size="icon">
          <Calendar />
          <span className="sr-only">Select Date</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Today's Summary */}
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg text-center">
            <CardHeader>
                <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Today</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold text-green-400">{today.steps.toLocaleString()}</p>
                <p className="text-lg text-muted-foreground mb-4">steps</p>
                <Progress value={progress} className="h-2" indicatorClassName="bg-green-400" />
                <p className="text-sm text-muted-foreground mt-2">Goal: {today.goal.toLocaleString()} ({Math.round(progress)}%)</p>
                {stepsToGo > 0 ? (
                    <div className="mt-4 bg-green-500/10 p-3 rounded-lg text-green-400">
                        <p className='font-semibold'>🔥 {stepsToGo.toLocaleString()} more to goal</p>
                        <p className='text-sm'>⏱️ ~{Math.round(stepsToGo / 88)} min walk needed</p>
                    </div>
                ) : (
                    <div className="mt-4 bg-green-500/10 p-3 rounded-lg text-green-400">
                        <p className='font-semibold flex items-center justify-center gap-2'><CheckCircle className="w-5 h-5"/> Goal Achieved!</p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Hourly Breakdown Chart */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Hourly Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} interval={1} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip unit="steps"/>} cursor={{ fill: 'hsla(var(--accent), 0.1)' }} />
                  <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.steps > 1000 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} opacity={entry.steps > 0 ? 1 : 0.3} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-4 space-x-4">
                <span>Peak hour: {peakHour.hour.toUpperCase()} ({peakHour.steps.toLocaleString()} steps)</span>
                <span>Least active: {leastActiveHour.hour.toUpperCase()} ({leastActiveHour.steps.toLocaleString()} steps)</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Minutes */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Active Time</CardTitle></CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{activeTime.totalMinutes} <span className="text-lg text-muted-foreground">minutes today</span></p>
                <Progress value={(activeTime.totalMinutes / activeTime.weeklyGoal) * 100} className="my-3 h-2" indicatorClassName="bg-primary" />
                <p className='text-sm text-muted-foreground'>Weekly Goal: {activeTime.weeklyGoal} min ({Math.round((activeTime.totalMinutes / activeTime.weeklyGoal) * 100)}%)</p>
                <div className="mt-4 text-sm text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
                    <p className="text-xs text-foreground font-semibold mb-1">BREAKDOWN:</p>
                    <p>• Very active: {activeTime.breakdown.very} min</p>
                    <p>• Moderately active: {activeTime.breakdown.moderate} min</p>
                    <p>• Lightly active: {activeTime.breakdown.light} min</p>
                </div>
            </CardContent>
        </Card>

        {/* 7-Day Trend */}
         <Card className="bg-card/50">
          <CardHeader><CardTitle>7-Day Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip content={<CustomTooltip unit="steps"/>} />
                  <Line type="monotone" dataKey="steps" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-4 space-x-4">
                <span>Avg: {weeklyAverage.toLocaleString()} steps/day</span>
                <span>Best: {bestDay.day} ({bestDay.steps.toLocaleString()} steps)</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Milestones */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Achievements This Week</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                {milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center gap-3 text-sm bg-muted/30 p-3 rounded-lg">
                        {milestone.icon}
                        <p className="font-medium text-muted-foreground">{milestone.text}</p>
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-card/50">
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <Zap className="w-6 h-6 text-primary mt-1" />
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Patterns from your activity data.</CardDescription>
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

        {/* Bottom Actions */}
        <div className='space-y-3 pt-4'>
             <Button variant="secondary" className="w-full">Set New Goal</Button>
             <Button variant="secondary" className="w-full">View Activity History</Button>
             <Button variant="secondary" className="w-full">Export Activity Data</Button>
        </div>
      </main>
    </div>
  );
}
