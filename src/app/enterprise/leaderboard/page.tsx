'use client';

import {
  ArrowLeft,
  Filter,
  TrendingUp,
  TrendingDown,
  Dot,
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
  BarChart,
  Bar,
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
    endsIn: '12 days',
    totalParticipants: 230,
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
  teams: [
    { rank: 1, name: 'Product Team', score: 90440, members: 92, active: 88, trend: 'up' as const },
    { rank: 2, name: 'Engineering', score: 89240, members: 85, active: 72, isUserTeam: true, trend: 'up' as const },
    { rank: 3, name: 'Marketing', score: 86750, members: 78, active: 65, trend: 'stable' as const },
    { rank: 4, name: 'Sales', score: 82340, members: 68, active: 58, trend: 'down' as const },
  ],
  teamMVPs: [
    { name: 'Sarah Kumar', points: 890, reason: 'Most steps this week', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Raj Patel', points: 780, reason: 'Most workouts', avatar: 'https://i.pravatar.cc/150?u=raj' },
    { name: 'Mike Johnson', points: 720, reason: 'Best sleep consistency', avatar: 'https://i.pravatar.cc/150?u=mike' },
  ],
  userStats: {
    totalPoints: 8720,
    breakdown: [
      { category: 'Steps', points: 4200, percentage: 48, detail: '87,240 total steps' },
      { category: 'Workouts', points: 2400, percentage: 28, detail: '12 sessions' },
      { category: 'Sleep', points: 1680, percentage: 19, detail: '84 nights tracked' },
      { category: 'Challenges', points: 440, percentage: 5, detail: '2 completed' },
    ],
    teamContribution: 9.8,
    weeklyProgress: [
      { week: 'W1', points: 1800 },
      { week: 'W2', points: 2200 },
      { week: 'W3', points: 2500 },
      { week: 'W4', points: 2220 },
    ],
  },
  opportunities: {
    toNextRank: { points: 280, suggestions: ['3 more workouts (300 pts)', '10K steps for 2 days'] },
    toTop40: { points: 890, estimatedTime: '~2 weeks at current pace' },
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
  const [activeTab, setActiveTab] = useState('individual');
  const user = { ...leaderboardData.userRank, department: 'Engineering' };
  const fullLeaderboard = [...leaderboardData.leaderboard, user].sort((a,b) => a.rank - b.rank);
  const maxScore = fullLeaderboard[0].score;
  const maxTeamScore = leaderboardData.teams[0].score;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/enterprise">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">{leaderboardData.challenge.name}</h1>
        <Button variant="ghost" size="icon">
          <Filter />
          <span className="sr-only">Filter</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <Tabs defaultValue="individual" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="mystats">My Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-6">
            <Card className="bg-primary/10 border-primary/20 text-center">
              <CardContent className="p-4">
                <p>⏰ Challenge ends in <span className="font-bold">{leaderboardData.challenge.endsIn}</span>. 🏆 Top 10 win prizes!</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-lg border-accent/30 shadow-lg">
                <CardHeader><CardTitle>Your Rank</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">#{user.rank} <span className="text-base text-muted-foreground">/ {leaderboardData.challenge.totalParticipants} employees</span></p>
                    <p className="font-semibold text-accent flex items-center gap-1">Top {Math.ceil(user.rank / leaderboardData.challenge.totalParticipants * 100)}% <TrendArrow trend={user.trend} /> (+{user.changeThisWeek} this week)</p>
                    <Separator className="my-4" />
                    <p className="text-lg font-semibold">{user.score.toLocaleString()} points</p>
                    <p className="text-sm text-red-400">🔥 {leaderboardData.userRank.pointsBehindNext} points behind #{user.rank - 1}</p>
                </CardContent>
            </Card>

            {/* Podium */}
            <div className="flex justify-center items-end gap-2 text-center">
                <PodiumCard user={leaderboardData.leaderboard[1]} rank={2} />
                <PodiumCard user={leaderboardData.leaderboard[0]} rank={1} />
                <PodiumCard user={leaderboardData.leaderboard[2]} rank={3} />
            </div>
            
            {/* Leaderboard list */}
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
          
          <TabsContent value="teams" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-lg border-accent/30 shadow-lg">
                <CardHeader><CardTitle>Your Team: Engineering</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">#2 <span className="text-base text-muted-foreground">/ {leaderboardData.teams.length} departments</span></p>
                    <p className="font-semibold text-accent">Top 25%</p>
                    <Separator className="my-4" />
                    <p className="text-lg font-semibold">{leaderboardData.teams.find(t => t.isUserTeam)!.score.toLocaleString()} points</p>
                    <p className="text-sm text-muted-foreground">{leaderboardData.teams.find(t => t.isUserTeam)!.members} members · {leaderboardData.teams.find(t => t.isUserTeam)!.active} active</p>
                    <p className="text-sm text-red-400 mt-1">🔥 { (leaderboardData.teams[0].score - leaderboardData.teams.find(t => t.isUserTeam)!.score).toLocaleString() } points behind #1</p>
                </CardContent>
            </Card>

            <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider px-2">Department Standings</h3>
                {leaderboardData.teams.map(team => (
                    <Card key={team.rank} className={cn("p-4 bg-card/50", team.isUserTeam && "border-accent bg-accent/10")}>
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-bold w-10 text-center">{team.rank === 1 ? '🥇' : team.rank === 2 ? '🥈' : team.rank === 3 ? '🥉' : team.rank}</p>
                            <div className="flex-1">
                                <p className="font-semibold">{team.name}</p>
                                <p className="text-xs text-muted-foreground">{team.score.toLocaleString()} pts · {team.members} members</p>
                                <Progress value={(team.score / maxTeamScore) * 100} className="h-1 mt-1" />
                            </div>
                            <TrendArrow trend={team.trend} />
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="bg-card/50">
                <CardHeader><CardTitle>🌟 Team MVPs (This Week)</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {leaderboardData.teamMVPs.map(mvp => (
                        <div key={mvp.name} className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={mvp.avatar} alt={mvp.name} />
                                <AvatarFallback>{mvp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                             <div>
                                <p className="font-semibold">{mvp.name} <span className="text-green-400 font-normal">(+{mvp.points} pts)</span></p>
                                <p className="text-xs text-muted-foreground">{mvp.reason}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="mystats" className="space-y-6">
                <Card className="bg-card/50">
                    <CardHeader><CardTitle>Your Contribution</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{leaderboardData.userStats.totalPoints.toLocaleString()} <span className="text-base text-muted-foreground">total points</span></p>
                        <p className="text-sm text-muted-foreground">Rank: #{user.rank} / {leaderboardData.challenge.totalParticipants}</p>
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
                                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
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

                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader><CardTitle className="text-primary">💡 How to Move Up</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div>
                            <p className="font-semibold">To reach #{user.rank - 1} ({leaderboardData.opportunities.toNextRank.points} pts needed):</p>
                            <ul className="list-disc list-inside text-muted-foreground">
                                {leaderboardData.opportunities.toNextRank.suggestions.map(s => <li key={s}>{s}</li>)}
                            </ul>
                        </div>
                         <div>
                            <p className="font-semibold">To reach Top 40 ({leaderboardData.opportunities.toTop40.points} pts needed):</p>
                            <p className="text-muted-foreground">{leaderboardData.opportunities.toTop40.estimatedTime}</p>
                        </div>
                        <Button variant="default" className="w-full">Set Goal to Reach Top 40</Button>
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
