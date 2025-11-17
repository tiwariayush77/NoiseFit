'use client';

import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Bot,
  AlertTriangle,
  Clock,
  Heart,
  Footprints,
  BedDouble,
  Brain,
  Apple,
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
  Dot,
} from 'recharts';
import { motion } from 'framer-motion';

const energyDetailData = {
  current: {
    score: 87,
    status: 'Ready to move! 💪',
    trends: {
      vsYesterday: '+5',
      vsLastWeek: '+12',
    },
  },
  weeklyData: [
    { day: 'Mon', score: 75 },
    { day: 'Tue', score: 80 },
    { day: 'Wed', score: 74 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 82 },
    { day: 'Sat', score: 92 },
    { day: 'Sun', score: 87 },
  ],
  factors: [
    {
      id: 'sleep',
      icon: <BedDouble className="w-6 h-6 text-blue-400" />,
      label: 'Sleep Quality',
      score: 92,
      detail: '7.5h last night',
      impact: '+15%',
      link: '/vitals/sleep',
    },
    {
      id: 'activity',
      icon: <Footprints className="w-6 h-6 text-green-400" />,
      label: 'Activity Level',
      score: 78,
      detail: '8,234 steps today',
      impact: '+10%',
      link: '/vitals/activity',
    },
    {
      id: 'recovery',
      icon: <Heart className="w-6 h-6 text-red-400" />,
      label: 'Recovery Status',
      score: 85,
      detail: 'HRV: 58ms (Good)',
      impact: '+8%',
      link: '/vitals/recovery',
    },
    {
      id: 'stress',
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      label: 'Stress Level',
      value: 'Low',
      detail: 'Relaxed state today',
      impact: '+5%',
      link: '/vitals/stress',
    },
    {
      id: 'nutrition',
      icon: <Apple className="w-6 h-6 text-orange-400" />,
      label: 'Nutrition',
      value: 'Good',
      detail: 'Balanced meals logged',
      impact: 'Neutral',
      link: '/nutrition',
    },
  ],
  insights: {
    pattern:
      'Your energy peaks on days when you:\n• Sleep 7.5h+ (92% correlation)\n• Do morning workouts (87% correlation)\n• Avoid late-night screen time',
    recommendation:
      'Tonight: Sleep by 10 PM for peak energy tomorrow morning.',
  },
  killers: [
    {
      issue: 'Late bedtime (after 11 PM)',
      impact: 'Reduces next-day energy by 18%',
    },
    {
      issue: 'Skipped breakfast',
      impact: 'Reduces morning energy by 12%',
    },
    {
      issue: 'Sedentary days (<5K steps)',
      impact: 'Reduces overall energy by 15%',
    },
  ],
  peakHours: [
    {
      period: 'Morning: 7-9 AM',
      icon: '🌅',
      energy: '94%',
      bestFor: 'Workouts, Deep work',
    },
    {
      period: 'Midday: 11 AM - 1 PM',
      icon: '🌤️',
      energy: '87%',
      bestFor: 'Meetings, Socializing',
    },
    {
      period: 'Evening: 6-7 PM',
      icon: '🌆',
      energy: '78%',
      bestFor: 'Light exercise, Hobbies',
    },
    {
      period: 'Night: After 9 PM',
      icon: '🌙',
      energy: '62%',
      bestFor: 'Winding down, Reading',
    },
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <p className="text-sm font-bold">{`${label}`}</p>
          <p className="text-accent">{`Score: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export default function EnergyDetail() {
  const { current, weeklyData, factors, insights, killers, peakHours } =
    energyDetailData;
  const circumference = 2 * Math.PI * 45;
  const scoreColor =
    current.score >= 80
      ? 'text-teal-400'
      : current.score >= 60
      ? 'text-yellow-400'
      : 'text-red-400';
  const ringColor =
    current.score >= 80
      ? 'stroke-teal-400'
      : current.score >= 60
      ? 'stroke-yellow-400'
      : 'stroke-red-400';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Energy Analysis</h1>
        <Button variant="ghost" size="icon">
          <Calendar />
          <span className="sr-only">Select Date</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Current Score */}
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">
              Today's Energy
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
                    circumference - (current.score / 100) * circumference
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${scoreColor}`}>
                  {current.score}
                </span>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
            </div>
            <p className="text-lg mb-2">{current.status}</p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" /> {current.trends.vsYesterday}{' '}
                vs yesterday
              </span>
              <span className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" /> {current.trends.vsLastWeek}{' '}
                vs last week
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Trend Chart */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[60, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ r: 4, fill: 'hsl(var(--accent))' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
             <div className="text-xs text-muted-foreground text-center mt-4 space-x-4">
                <span>Avg: 82/100</span>
                <span>Best: Saturday (92)</span>
                <span>Lowest: Wednesday (74)</span>
            </div>
          </CardContent>
        </Card>

        {/* Contributing Factors */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>What's Driving Your Energy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {factors.map((factor) => (
              <Link href={factor.link} key={factor.id} className="block group">
                <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {factor.icon}
                      <div>
                        <p className="font-semibold">{factor.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {factor.detail}
                        </p>
                      </div>
                    </div>
                     <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    {factor.score && <Progress value={factor.score} className='h-1.5 flex-1'/>}
                    <span className="text-sm font-bold text-green-400">{factor.impact}</span>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
        
        {/* AI Insights */}
         <Card className="bg-card/50 border-l-4 border-primary">
            <CardHeader className="flex-row items-start gap-3 space-y-0">
                <Bot className="w-6 h-6 text-primary mt-1" />
                <div>
                    <CardTitle>AI Insights & Patterns</CardTitle>
                    <CardDescription>Key correlations we've found in your data.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm font-semibold mb-2">Key Pattern Detected:</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line mb-4">{insights.pattern}</p>
                <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm font-semibold mb-1 text-primary">💡 Recommendation:</p>
                    <p className="text-sm text-primary/80 mb-3">{insights.recommendation}</p>
                    <Button variant="outline" className="w-full h-9">Set Bedtime Reminder</Button>
                </div>
            </CardContent>
        </Card>

        {/* Energy Killers */}
         <Card className="bg-card/50 border-l-4 border-destructive">
            <CardHeader className="flex-row items-start gap-3 space-y-0">
                <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
                <div>
                    <CardTitle>Energy Killers</CardTitle>
                    <CardDescription>Things to watch out for.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    {killers.map(killer => (
                        <li key={killer.issue} className="flex justify-between items-center">
                            <span className="text-muted-foreground">{killer.issue}</span>
                            <span className="font-semibold text-destructive">{killer.impact}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        
        {/* Peak Hours */}
        <Card className="bg-card/50">
            <CardHeader className="flex-row items-start gap-3 space-y-0">
                <Clock className="w-6 h-6 text-accent mt-1" />
                <div>
                    <CardTitle>Your Peak Hours</CardTitle>
                    <CardDescription>When you're at your best.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {peakHours.map(ph => (
                        <div key={ph.period} className="bg-muted/30 p-3 rounded-lg text-center">
                            <p className="text-lg">{ph.icon}</p>
                            <p className="font-semibold text-sm">{ph.period}</p>
                            <p className="text-xs text-muted-foreground mb-1">Avg Energy: <span className='font-bold text-accent'>{ph.energy}</span></p>
                            <p className="text-xs text-muted-foreground">Best for: {ph.bestFor}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className='space-y-3 pt-4'>
             <Button variant="secondary" className="w-full">Export Energy Report</Button>
             <Button variant="secondary" className="w-full">Share with Coach</Button>
             <Button variant="secondary" className="w-full">Set Energy Goals</Button>
        </div>

      </main>
    </div>
  );
}
