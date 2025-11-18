'use client';

import {
  ArrowLeft,
  Share,
  TrendingUp,
  Star,
  Award,
  Trophy,
  Gift,
  CalendarPlus,
  Lock,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const enterpriseData = {
  user: {
    wellnessScore: 84,
    scoreTrend: '+5',
    companyRank: { current: 47, total: 230, percentile: 20 },
    departmentRank: { current: 12, total: 85, percentile: 15 },
  },
  credits: {
    earned: 800,
    target: 1000,
    breakdown: [
      { activity: 'Daily step goal', rate: 30, count: 18 },
      { activity: 'Sleep 7h+', rate: 20, count: 15 },
      { activity: 'Workouts', rate: 25, count: 8 },
      { activity: 'Challenges', rate: 100, count: 1 },
    ],
  },
  challenges: [
    {
      id: 1,
      name: 'Office Olympics 2024',
      team: 'Engineering',
      teamRank: { current: 2, total: 8 },
      endsIn: '12 days',
      userContribution: [
        { metric: 'Steps', value: '87,240', rank: 'Top 10' },
        { metric: 'Workouts', value: '12', rank: 'Top 5' },
      ],
    },
    {
      id: 2,
      name: 'Team Step Challenge',
      goal: 5000000,
      progress: 3200000,
      endsIn: '5 days',
    },
  ],
  team: {
    department: 'Engineering',
    totalMembers: 85,
    activeThisWeek: 72,
    avgWellnessScore: 78,
  },
  pto: {
    earnedThisQuarter: 1,
    nextMilestone: 'Complete 10 more workouts',
    progress: { current: 8, total: 10 },
  },
  rewards: [
      { name: 'Amazon', value: '₹500', img: 'https://picsum.photos/seed/amazon/200/200', hint: 'gift card' },
      { name: 'Swiggy', value: '₹500', img: 'https://picsum.photos/seed/swiggy/200/200', hint: 'food delivery' },
      { name: 'Gym Pass', value: '1 Month', img: 'https://picsum.photos/seed/gym/200/200', hint: 'fitness membership' },
  ]
};

const scoreColor =
  enterpriseData.user.wellnessScore >= 80
    ? 'text-green-400'
    : enterpriseData.user.wellnessScore >= 60
    ? 'text-yellow-400'
    : 'text-red-400';
const ringColor =
  enterpriseData.user.wellnessScore >= 80
    ? 'stroke-green-400'
    : enterpriseData.user.wellnessScore >= 60
    ? 'stroke-yellow-400'
    : 'stroke-red-400';

export default function EnterpriseDashboardPage() {
    const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/me">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div className="text-center">
            <h1 className="text-lg font-semibold">Company Wellness</h1>
            <p className="text-sm text-muted-foreground">Acme Corp</p>
        </div>
        <Button variant="ghost" size="icon">
            <Share />
            <span className="sr-only">Share</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Wellness Score Card */}
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">
              Your Wellness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-[120px] h-[120px] mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" className="stroke-muted/20" strokeWidth="8" fill="transparent"/>
                    <circle
                        cx="50" cy="50" r="45" className={ringColor}
                        strokeWidth="8" fill="transparent" strokeLinecap="round"
                        transform="rotate(-90 50 50)" strokeDasharray={circumference}
                        strokeDashoffset={circumference - (enterpriseData.user.wellnessScore / 100) * circumference}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${scoreColor}`}>
                        {enterpriseData.user.wellnessScore}
                    </span>
                    <span className="text-lg text-muted-foreground">/100</span>
                </div>
            </div>
            <p className={`font-semibold ${scoreColor}`}>Good</p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-400 mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>{enterpriseData.user.scoreTrend} points vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Rankings Section */}
        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 text-center">
                <CardHeader className='pb-2'>
                    <CardTitle className="text-xs uppercase text-muted-foreground">Company Rank</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{enterpriseData.user.companyRank.current}<span className="text-base text-muted-foreground">/{enterpriseData.user.companyRank.total}</span></p>
                    <p className="text-sm text-green-400">Top {enterpriseData.user.companyRank.percentile}%</p>
                </CardContent>
            </Card>
             <Card className="bg-card/50 text-center">
                <CardHeader className='pb-2'>
                    <CardTitle className="text-xs uppercase text-muted-foreground">Department Rank</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{enterpriseData.user.departmentRank.current}<span className="text-base text-muted-foreground">/{enterpriseData.user.departmentRank.total}</span></p>
                    <p className="text-sm text-green-400">Top {enterpriseData.user.departmentRank.percentile}%</p>
                </CardContent>
            </Card>
        </div>

        {/* Wellness Credits Card */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><Star className='text-yellow-400'/> Wellness Credits</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-3xl font-bold'>₹{enterpriseData.credits.earned.toLocaleString()} <span className='text-base text-muted-foreground'>earned this month</span></p>
                <Progress value={(enterpriseData.credits.earned / enterpriseData.credits.target) * 100} className='my-3 h-2' />
                <p className='text-sm text-muted-foreground'>₹{(enterpriseData.credits.target - enterpriseData.credits.earned).toLocaleString()} more → Next reward (₹{enterpriseData.credits.target.toLocaleString()} milestone)</p>
                <Button className='w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black'>Redeem Credits (₹{enterpriseData.credits.earned})</Button>
                <Separator className='my-4' />
                <p className='text-xs text-muted-foreground mb-2'>How you earned credits:</p>
                <ul className='text-xs text-muted-foreground space-y-1'>
                    {enterpriseData.credits.breakdown.map(item => (
                        <li key={item.activity} className='flex justify-between'>
                            <span>{item.activity}</span>
                            <span>{item.rate > 1 ? `₹${item.rate} × ${item.count}` : `₹${item.rate * item.count}`}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        {/* Active Challenges */}
        <div>
            <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-3">COMPANY CHALLENGES (2 Active)</h2>
            <div className='space-y-4'>
                <Card className="bg-card/50 border-l-4 border-accent">
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'><Trophy className='text-accent'/> {enterpriseData.challenges[0].name}</CardTitle>
                        <CardDescription>Ends in {enterpriseData.challenges[0].endsIn}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='text-sm mb-3'><span className='text-muted-foreground'>Your team:</span> {enterpriseData.challenges[0].team} · <span className='font-semibold text-accent'>Rank {enterpriseData.challenges[0].teamRank.current}/{enterpriseData.challenges[0].teamRank.total}</span></p>
                        <div className='bg-muted/30 p-3 rounded-md text-sm space-y-2'>
                             <p className='text-xs text-muted-foreground'>Your contribution:</p>
                             {enterpriseData.challenges[0].userContribution.map(c => (
                                 <div key={c.metric} className='flex justify-between'>
                                     <span>{c.metric}: <span className='font-bold text-foreground'>{c.value}</span></span>
                                     <span className='font-semibold text-green-400'>{c.rank}</span>
                                 </div>
                             ))}
                        </div>
                        <Link href="/enterprise/leaderboard">
                            <Button variant='outline' className='w-full mt-4'>View Leaderboard →</Button>
                        </Link>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 border-l-4 border-primary">
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'><Award className='text-primary'/> {enterpriseData.challenges[1].name}</CardTitle>
                        <CardDescription>Ends in {enterpriseData.challenges[1].endsIn}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='text-sm mb-1'>Goal: {(enterpriseData.challenges[1].goal / 1000000).toFixed(1)}M steps as team</p>
                         <Progress value={(enterpriseData.challenges[1].progress / enterpriseData.challenges[1].goal) * 100} className='h-2' />
                        <p className='text-xs text-muted-foreground mt-1'>Progress: { (enterpriseData.challenges[1].progress / 1000000).toFixed(1) }M / { (enterpriseData.challenges[1].goal / 1000000).toFixed(1) }M</p>
                         <Link href="/enterprise/leaderboard">
                            <Button variant='outline' className='w-full mt-4'>View Team Progress →</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Team Wellness Overview */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Team Wellness Overview</CardTitle>
                <CardDescription>Your Department: {enterpriseData.team.department}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm'>{enterpriseData.team.totalMembers} members · {enterpriseData.team.activeThisWeek} active this week</p>
                <p className='text-sm mt-2'>Average wellness score: {enterpriseData.team.avgWellnessScore}/100</p>
                <p className='text-sm text-green-400 font-semibold'>(You're {enterpriseData.user.wellnessScore - enterpriseData.team.avgWellnessScore} points above avg!)</p>
                <Link href="/enterprise/team-dashboard">
                    <Button variant='outline' className='w-full mt-4'>View Team Dashboard →</Button>
                </Link>
            </CardContent>
        </Card>

        {/* Rewards Catalog */}
         <div>
            <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-3">REWARDS CATALOG</h2>
             <div className="grid grid-cols-3 gap-3">
                {enterpriseData.rewards.map(reward => (
                <Card key={reward.name} className="bg-card/50 text-center p-2">
                    <Image src={reward.img} alt={reward.name} width={100} height={100} className='aspect-square object-cover rounded-md mx-auto' data-ai-hint={reward.hint} />
                    <p className='text-sm font-semibold mt-2'>{reward.name}</p>
                    <p className='text-xs text-muted-foreground'>{reward.value}</p>
                </Card>
                ))}
             </div>
             <Button variant='link' className='w-full mt-2'>Browse All Rewards (50+) →</Button>
        </div>
        
        {/* Extra PTO Tracker */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className='flex items-center gap-2'><CalendarPlus className='text-accent'/> Extra PTO Tracker</CardTitle>
                <CardDescription>Wellness milestones = Extra days</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-lg font-bold'>{enterpriseData.pto.earnedThisQuarter} day earned this quarter</p>
                <p className='text-sm text-accent mt-2 font-semibold'>🎯 {enterpriseData.pto.nextMilestone}</p>
                <Progress value={(enterpriseData.pto.progress.current / enterpriseData.pto.progress.total) * 100} className='my-2 h-2' />
                <p className='text-xs text-muted-foreground'>Progress: {enterpriseData.pto.progress.current}/{enterpriseData.pto.progress.total}</p>
            </CardContent>
        </Card>

        {/* Privacy Note */}
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle className='flex items-center gap-2 text-sm'><Lock className='w-4 h-4' /> Privacy Note</CardTitle>
            </CardHeader>
            <CardContent className='text-xs text-muted-foreground space-y-1'>
                <p>• Individual health data is private</p>
                <p>• Company sees only aggregated team stats & anonymized trends</p>
                <p>• Leaderboards are opt-in</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
