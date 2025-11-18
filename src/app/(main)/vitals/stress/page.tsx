'use client';

import {
  ArrowLeft,
  Calendar,
  Zap,
  CheckCircle,
  AlertTriangle,
  Brain,
  Wind,
  Heart,
  Bot,
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';

const stressDetailData = {
  current: {
    level: 'Low',
    status: 'Relaxed',
    hrv: 58,
    restingHR: 58,
  },
  timeline: [
    { hour: '12a', stress: 10 }, { hour: '1a', stress: 10 }, { hour: '2a', stress: 10 }, { hour: '3a', stress: 10 },
    { hour: '4a', stress: 10 }, { hour: '5a', stress: 10 }, { hour: '6a', stress: 20 }, { hour: '7a', stress: 25 },
    { hour: '8a', stress: 30 }, { hour: '9a', stress: 40 }, { hour: '10a', stress: 75, event: 'Meeting' }, { hour: '11a', stress: 60 },
    { hour: '12p', stress: 50 }, { hour: '1p', stress: 45 }, { hour: '2p', stress: 65, event: 'Deadline' }, { hour: '3p', stress: 70 },
    { hour: '4p', stress: 55 }, { hour: '5p', stress: 40 }, { hour: '6p', stress: 30 }, { hour: '7p', stress: 25 },
    { hour: '8p', stress: 20 }, { hour: '9p', stress: 15 }, { hour: '10p', stress: 10 }, { hour: '11p', stress: 10 },
  ],
  managementScore: {
    score: 78,
    status: 'Good',
    comment: 'You managed stress well today! Quick recovery after spikes.',
  },
  weeklyPattern: [
    { day: 'Mon', '10am': 80, '3pm': 70, 'avg': 75 },
    { day: 'Tue', '10am': 85, '3pm': 60, 'avg': 72 },
    { day: 'Wed', '10am': 70, '3pm': 75, 'avg': 73 },
    { day: 'Thu', '10am': 90, '3pm': 65, 'avg': 78 },
    { day: 'Fri', '10am': 80, '3pm': 80, 'avg': 80 },
    { day: 'Sat', '10am': 20, '3pm': 25, 'avg': 22 },
    { day: 'Sun', '10am': 15, '3pm': 20, 'avg': 18 },
  ],
  triggers: [
    'Morning meetings (Mon-Fri 10 AM)',
    'Afternoon deadlines (3-5 PM)',
    'Higher stress after poor sleep nights',
  ],
  breathingExercises: [
    { name: '5-min Calm', link: '/breathe/calm' },
    { name: '10-min Deep Breathing', link: '/breathe/deep' },
    { name: 'Box Breathing', link: '/breathe/box' },
    { name: '4-7-8 Technique', link: '/breathe/478' },
  ],
  recommendations: [
    'Try 5-min breathing before meetings',
    'Take walking breaks at 3 PM',
    'Your stress drops after workouts - keep it up!',
  ],
};


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const level = data.stress > 66 ? 'High' : data.stress > 33 ? 'Moderate' : 'Low';
      return (
        <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <p className="text-sm font-bold">{`${label}`}</p>
          <p className="text-accent">{`Stress: ${level}`}</p>
          {data.event && <p className="text-xs text-muted-foreground">Event: {data.event}</p>}
        </div>
      );
    }
    return null;
};

const getStressColor = (stress: number) => {
    if (stress > 66) return 'hsl(var(--destructive))';
    if (stress > 33) return 'hsl(var(--accent))';
    return 'hsl(var(--primary))';
};

export default function StressDetail() {
  const { current, timeline, managementScore, triggers, breathingExercises, recommendations } = stressDetailData;

  const scoreColor = 
    managementScore.score >= 75 ? 'text-green-400' : 
    managementScore.score >= 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Stress Level</h1>
        <Button variant="ghost" size="icon">
          <Calendar />
          <span className="sr-only">Select Date</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Current Stress */}
        <Card className="bg-card/50 text-center">
            <CardHeader>
                <CardTitle className='text-sm uppercase text-muted-foreground tracking-wider'>Right Now</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-4xl font-bold text-green-400'>{current.level}</p>
                <p className='text-lg text-muted-foreground mb-4 flex items-center justify-center gap-2'><Wind className='w-5 h-5'/> {current.status}</p>
                <div className='flex justify-center gap-4 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg'>
                    <span>HRV: {current.hrv}ms (Excellent)</span>
                    <span>Resting HR: {current.restingHR}bpm</span>
                </div>
            </CardContent>
        </Card>

        {/* Today's Stress Timeline */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Today's Stress Timeline</CardTitle>
                <CardDescription>Color-coded stress levels throughout the day.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='h-[150px]'>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={timeline} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} interval={2} />
                            <YAxis hide={true} domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--muted), 0.5)' }} />
                            <Bar dataKey="stress">
                                {timeline.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getStressColor(entry.stress)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="flex justify-around text-xs mt-4">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span>Low</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent"></span>Moderate</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive"></span>High</span>
                </div>
                <div className='mt-4 text-sm text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg'>
                    <p className='text-xs text-foreground font-semibold mb-1'>STRESS SPIKES:</p>
                    <p>• 10:30 AM - High for 45min (Meeting?)</p>
                    <p>• 3:00 PM - Moderate for 1h (Deadline?)</p>
                </div>
            </CardContent>
        </Card>

        {/* Stress Management Score */}
        <Card className="bg-card/50 text-center">
            <CardHeader>
                <CardTitle>Stress Management</CardTitle>
                <CardDescription>How well you recovered from stress</CardDescription>
            </CardHeader>
            <CardContent>
                <p className={`text-5xl font-bold ${scoreColor}`}>{managementScore.score}<span className='text-3xl text-muted-foreground'>/100</span></p>
                <p className={`font-semibold text-lg ${scoreColor}`}>{managementScore.status}</p>
                <p className='text-sm text-muted-foreground mt-2'>{managementScore.comment}</p>
            </CardContent>
        </Card>

        {/* AI-Detected Triggers */}
        <Card className="bg-card/50">
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <Bot className="w-6 h-6 text-primary mt-1" />
            <div>
              <CardTitle>AI-Detected Triggers</CardTitle>
              <CardDescription>Common patterns we've noticed.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
             <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {triggers.map((trigger) => <li key={trigger}>{trigger}</li>)}
             </ul>
             <Button variant="link" className='p-0 mt-2 h-auto'>Manage Triggers →</Button>
          </CardContent>
        </Card>

        {/* Breathing Exercises */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Stress Relief Tools</CardTitle>
                <CardDescription>Guided exercises to find your calm.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 gap-3 mb-4'>
                    {breathingExercises.map(ex => (
                        <Button key={ex.name} variant='secondary' asChild>
                            <Link href={ex.link}>{ex.name}</Link>
                        </Button>
                    ))}
                </div>
                <Button className='w-full' asChild>
                    <Link href="/breathe">Start Guided Session →</Link>
                </Button>
            </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className='text-primary'>💡 Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {recommendations.map(rec => <li key={rec}>{rec}</li>)}
                </ul>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
