'use client';

import {
  ArrowLeft,
  Users,
  TrendingUp,
  TrendingDown,
  Dot,
  BarChart,
  Bed,
  HeartPulse,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const teamData = {
  department: 'Engineering',
  summary: {
    members: 85,
    active: 72,
    participation: 85,
    avgWellnessScore: 78,
    rank: 2,
    totalTeams: 8,
  },
  keyMetrics: [
    { label: 'Avg Steps', value: '8,540', icon: <Flame className="w-6 h-6 text-orange-400" /> },
    { label: 'Avg Sleep', value: '7.2h', icon: <Bed className="w-6 h-6 text-blue-400" /> },
    { label: 'Workout Rate', value: '82%', icon: <HeartPulse className="w-6 h-6 text-red-400" /> },
  ],
  trends: {
    wellnessScore: [
      { day: 'Day 1', score: 72 }, { day: 'Day 7', score: 75 },
      { day: 'Day 14', score: 76 }, { day: 'Day 21', score: 79 },
      { day: 'Day 30', score: 78 },
    ],
    participation: [
      { week: 'W1', rate: 80 }, { week: 'W2', rate: 82 },
      { week: 'W3', rate: 88 }, { week: 'W4', rate: 85 },
    ],
  },
  topPerformers: [
    { rank: 1, name: 'Sarah Kumar', score: 92, trend: 'up' as const, avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { rank: 2, name: 'Raj Patel', score: 89, trend: 'up' as const, avatar: 'https://i.pravatar.cc/150?u=raj' },
    { rank: 3, name: 'Mike Johnson', score: 87, trend: 'stable' as const, avatar: 'https://i.pravatar.cc/150?u=mike' },
    { rank: 12, name: 'Rahul Kumar', score: 84, trend: 'up' as const, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMzODMwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { rank: 13, name: 'Priya Sharma', score: 82, trend: 'down' as const, avatar: 'https://i.pravatar.cc/150?u=priya' },
  ],
  insights: [
    'Team sleep duration improved by 8% this month!',
    'Step count consistently peaks on Fridays.',
    'Participation tends to drop mid-week. Consider a Wednesday challenge?',
  ],
};

const TrendArrow = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Dot className="w-4 h-4 text-muted-foreground" />;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-2 rounded-lg border border-border/50">
          <p className="text-sm font-bold">{label}</p>
          <p className="text-accent text-sm">{`Score: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

export default function TeamDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/enterprise">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-semibold">Team Wellness</h1>
          <p className="text-sm text-muted-foreground">{teamData.department} Department</p>
        </div>
        <Button variant="ghost" size="icon">
          <BarChart className="transform -scale-x-100" />
          <span className="sr-only">Export</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{teamData.summary.members} members · {teamData.summary.active} active this week</p>
            <div className="my-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-semibold">Participation</span>
                <span>{teamData.summary.participation}%</span>
              </div>
              <Progress value={teamData.summary.participation} className="h-2" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="text-muted-foreground">Avg. Wellness Score</p>
                <p className="text-lg font-bold">{teamData.summary.avgWellnessScore}/100</p>
              </div>
              <div>
                <p className="text-muted-foreground">Department Rank</p>
                <p className="text-lg font-bold text-right">#{teamData.summary.rank}/{teamData.summary.totalTeams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3 text-center">
            {teamData.keyMetrics.map(metric => (
                <Card key={metric.label} className="bg-card/50 p-3">
                    <div className="mx-auto w-10 h-10 flex items-center justify-center bg-muted/50 rounded-full mb-2">
                        {metric.icon}
                    </div>
                    <p className="text-lg font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                </Card>
            ))}
        </div>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Wellness Score Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamData.trends.wellnessScore} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[65, 85]}/>
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--accent))" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Top 5 Performers This Week</CardTitle>
                <CardDescription>Based on Wellness Score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {teamData.topPerformers.map(user => (
                    <div key={user.rank} className={cn("flex items-center gap-3 p-3 rounded-md", user.name === 'Rahul Kumar' ? "bg-accent/10" : "bg-muted/30")}>
                        <p className="font-bold text-lg w-6 text-center">{user.rank}</p>
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold flex-1">{user.name}</p>
                        <div className="flex items-center gap-2">
                            <p className="font-bold">{user.score}/100</p>
                            <TrendArrow trend={user.trend} />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">💡 Team Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                    {teamData.insights.map(insight => <li key={insight}>{insight}</li>)}
                </ul>
            </CardContent>
        </Card>

        <Link href="/enterprise/leaderboard">
            <Button variant="outline" className="w-full">View Full Department Leaderboard</Button>
        </Link>
      </main>
    </div>
  );
}
