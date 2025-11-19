
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

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
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
        
        {/* AI Insights Card - ENHANCED */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <h2 className="text-xl font-bold text-white">AI Insights & Patterns</h2>
              <p className="text-sm text-gray-400">Key correlations we've found in your data</p>
            </div>
          </div>
          
          {/* Key Pattern Section */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-white mb-4">
              Key Pattern Detected:
            </h3>
            <p className="text-base text-gray-300 mb-3 leading-relaxed">
              Your energy peaks on days when you:
            </p>
            <ul className="space-y-2.5 ml-4">
              <li className="text-base text-gray-300 flex items-start leading-relaxed">
                <span className="text-teal-400 mr-2.5 mt-1">- </span>
                <span>Sleep 7.5h+ (92% correlation)</span>
              </li>
              <li className="text-base text-gray-300 flex items-start leading-relaxed">
                <span className="text-teal-400 mr-2.5 mt-1">- </span>
                <span>Do morning workouts (87% correlation)</span>
              </li>
              <li className="text-base text-gray-300 flex items-start leading-relaxed">
                <span className="text-teal-400 mr-2.5 mt-1">- </span>
                <span>Avoid late-night screen time</span>
              </li>
            </ul>
          </div>
          
          {/* Recommendation Section */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold text-purple-300 mb-2">Recommendation:</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Tonight: Sleep by 10 PM for peak energy tomorrow morning.
                </p>
              </div>
            </div>
            <button className="w-full mt-3 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg font-medium text-sm text-purple-300 transition-colors">
              Set Bedtime Reminder
            </button>
          </div>
        </div>

        {/* Energy Killers - ENHANCED READABILITY */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h2 className="text-xl font-bold text-white">Energy Killers</h2>
              <p className="text-sm text-gray-400">Things to watch out for</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {killers.map((killer, index) => (
               <div key={index} className="flex items-start gap-4 pt-4 first:pt-0 border-t border-gray-700 first:border-none">
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-300 mb-1 leading-relaxed">
                      {killer.issue}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-red-400 whitespace-nowrap">
                    {killer.impact}
                  </p>
                </div>
            ))}
          </div>
        </div>
        
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

    