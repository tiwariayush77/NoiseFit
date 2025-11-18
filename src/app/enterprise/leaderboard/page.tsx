'use client';

import {
  ArrowLeft,
  Filter,
  TrendingUp,
  TrendingDown,
  Dot,
  Share2,
  Trophy,
  Award,
  BarChart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
import { Separator } from '@/components/ui/separator';

const leaderboardData = {
  challenge: {
    name: 'Office Olympics 2024',
    endsIn: '12 days 8 hours',
    totalParticipants: 230,
    bannerImage: 'https://picsum.photos/seed/olympics/1200/400',
    bannerHint: 'stadium lights'
  },
  userRank: {
    name: 'Rahul Kumar',
    rank: 47,
    score: 8720,
    trend: 'up' as const,
    changeThisWeek: 3,
    pointsBehindNext: 280,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMzODMwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
   scoringRules: [
    { rule: '1 point per 100 steps', icon: '👟' },
    { rule: '20 points for 7h+ sleep', icon: '😴' },
    { rule: '100 points per workout', icon: '💪' },
    { rule: '50 bonus for daily goal', icon: '🎯' },
  ],
  prizes: [
      { rank: '🥇 1st', prize: '₹10,000 gift card + Trophy' },
      { rank: '🥈 2nd', prize: '₹5,000 gift card' },
      { rank: '🥉 3rd', prize: '₹2,500 gift card' },
      { rank: '🎁 Top 10', prize: 'Exclusive Noise merch' },
  ],
  leaderboard: [
    { rank: 1, name: 'Sarah Kumar', score: 12450, trend: 'up' as const, department: 'Product', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { rank: 2, name: 'Raj Patel', score: 11890, trend: 'up' as const, department: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=raj' },
    { rank: 3, name: 'Mike Johnson', score: 11230, trend: 'down' as const, department: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=mike' },
    { rank: 4, name: 'John Smith', score: 10890, trend: 'up' as const, department: 'Engineering', avatar: 'https://i.pravatar.cc/150?u=john' },
    { rank: 5, name: 'Emily Chen', score: 10560, trend: 'up' as const, department: 'Product', avatar: 'https://i.pravatar.cc/150?u=emily' },
    { rank: 6, name: 'David Lee', score: 10340, trend: 'stable' as const, department: 'Marketing', avatar: 'https://i.pravatar.cc/150?u=david' },
    { rank: 46, name: 'Priya Sharma', score: 9000, trend: 'up' as const, department: 'HR', avatar: 'https://i.pravatar.cc/150?u=priya' },
    { rank: 48, name: 'Alex Martinez', score: 8690, trend: 'down' as const, department: 'Sales', avatar: 'https://i.pravatar.cc/150?u=alex' },
  ],
  userStats: {
    totalPoints: 8720,
    breakdown: [
      { category: 'Steps', points: 4200, percentage: 48, detail: '87,240 total steps' },
      { category: 'Workouts', points: 2400, percentage: 28, detail: '12 sessions' },
      { category: 'Sleep', points: 1680, percentage: 19, detail: '84 nights tracked' },
      { category: 'Challenges', points: 440, percentage: 5, detail: '2 completed' },
    ],
    weeklyProgress: [
      { week: 'W1', points: 1800 },
      { week: 'W2', points: 2200 },
      { week: 'W3', points: 2500 },
      { week: 'W4', points: 2220 },
    ],
  },
  opportunities: {
    toNextRank: { points: 280, suggestions: ['Complete 3 workouts (300 pts)', 'Hit 10K steps for 2 days'] },
  },
};

const TrendArrow = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Dot className="w-4 h-4 text-muted-foreground" />;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
        <p className="text-sm font-bold">{`Week ${label.slice(1)}`}</p>
        <p className="text-accent">{`Points: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const user = { ...leaderboardData.userRank, department: 'Engineering' };
  const fullLeaderboard = [...leaderboardData.leaderboard, user].sort((a,b) => a.rank - b.rank);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/enterprise">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold truncate">{leaderboardData.challenge.name}</h1>
        <Button variant="ghost" size="icon">
          <Share2 />
          <span className="sr-only">Share</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="bg-card/50 overflow-hidden relative">
            <Image src={leaderboardData.challenge.bannerImage} alt={leaderboardData.challenge.name} fill className="object-cover opacity-20" data-ai-hint={leaderboardData.challenge.bannerHint} />
            <div className="relative p-6 text-center bg-gradient-to-t from-background/80 to-transparent">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <h2 className="text-2xl font-bold">{leaderboardData.challenge.name}</h2>
                <p className="text-muted-foreground">Ends in {leaderboardData.challenge.endsIn} • {leaderboardData.challenge.totalParticipants} participants</p>
            </div>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle>Your Standing</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">#{user.rank} <span className="text-base text-muted-foreground">/ {leaderboardData.challenge.totalParticipants}</span></p>
                <p className="font-semibold text-accent">{user.score.toLocaleString()} points</p>
                <Separator className="my-3" />
                <p className="text-sm text-red-400">🔥 {leaderboardData.userRank.pointsBehindNext} points to #{user.rank - 1}</p>
                <p className="text-sm text-green-400 mt-1">💡 {leaderboardData.opportunities.toNextRank.suggestions[0]}</p>
            </CardContent>
        </Card>

        <Tabs defaultValue="leaderboard" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="mystats">My Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leaderboard" className="space-y-6 mt-6">
            <div className="flex justify-center items-end gap-2 text-center">
                <PodiumCard user={leaderboardData.leaderboard[1]} rank={2} />
                <PodiumCard user={leaderboardData.leaderboard[0]} rank={1} />
                <PodiumCard user={leaderboardData.leaderboard[2]} rank={3} />
            </div>
            
            <div className="space-y-2">
                {fullLeaderboard.filter(u => u.rank > 3).map(u => (
                    <Card key={u.rank} className={cn("p-3 bg-card/50", u.name === user.name && "border-accent bg-accent/10")}>
                        <div className="flex items-center gap-3">
                            <p className="text-lg font-bold w-6 text-center">{u.rank}</p>
                            <Avatar>
                                <AvatarImage src={u.avatar} alt={u.name} />
                                <AvatarFallback>{u.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{u.name}</p>
                                <p className="text-xs text-muted-foreground">{u.department}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="font-bold">{u.score.toLocaleString()}</p>
                                <TrendArrow trend={u.trend} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

          </TabsContent>

          <TabsContent value="rules" className="space-y-6 mt-6">
             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>How to Earn Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {leaderboardData.scoringRules.map(rule => (
                        <div key={rule.rule} className="flex items-center gap-3 bg-muted/30 p-3 rounded-md">
                            <span className="text-xl">{rule.icon}</span>
                            <p className="text-sm font-medium">{rule.rule}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Prizes & Rewards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {leaderboardData.prizes.map(prize => (
                         <div key={prize.rank} className="flex items-start gap-3">
                            <p className="font-bold text-lg w-20">{prize.rank}</p>
                            <p className="text-sm text-muted-foreground">{prize.prize}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mystats" className="space-y-6 mt-6">
                <Card className="bg-card/50">
                    <CardHeader><CardTitle>Your Contribution</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{leaderboardData.userStats.totalPoints.toLocaleString()} <span className="text-base text-muted-foreground">total points</span></p>
                        <p className="text-sm text-muted-foreground">Team Contribution: {leaderboardData.userStats.teamContribution}%</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50">
                    <CardHeader><CardTitle>Points Breakdown</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {leaderboardData.userStats.breakdown.map(item => (
                            <div key={item.category}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{item.category}</span>
                                    <span className="text-muted-foreground">{item.points.toLocaleString()} pts ({item.percentage}%)</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-card/50">
                    <CardHeader><CardTitle>Weekly Progress</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={leaderboardData.userStats.weeklyProgress} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="points" stroke="hsl(var(--accent))" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function PodiumCard({user, rank}: {user: typeof leaderboardData.leaderboard[0], rank: number}) {
    const heights = {1: 'h-40', 2: 'h-32', 3: 'h-28'};
    const colors = {1: 'border-yellow-400 bg-yellow-400/10', 2: 'border-gray-400 bg-gray-400/10', 3: 'border-orange-400 bg-orange-400/10'};
    const emojis = {1: '🥇', 2: '🥈', 3: '🥉'};

    return (
        <div className={cn("w-1/3 pt-4", rank === 1 && "w-[38%]")}>
            <p className="text-4xl text-center">{emojis[rank as keyof typeof emojis]}</p>
            <Card className={cn("text-center p-2", heights[rank as keyof typeof heights], colors[rank as keyof typeof colors])}>
                <Avatar className="mx-auto w-10 h-10 mb-1">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.score.toLocaleString()} pts</p>
            </Card>
        </div>
    )
}
