'use client';

import {
  ArrowLeft,
  Calendar,
  Bed,
  Moon,
  Zap,
  Sunrise,
  Wind,
  Droplets,
  Thermometer,
  Heart,
  Brain,
  CheckCircle,
  AlertTriangle,
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
  Rectangle,
} from 'recharts';
import { motion } from 'framer-motion';

const sleepDetailData = {
  lastNight: {
    date: 'Monday, Nov 18, 2024',
    quality: 85,
    duration: { hours: 7, minutes: 32 },
    bedtime: '10:30 PM',
    wakeTime: '6:02 AM',
    wakeUps: 2,
  },
  stages: [
    { name: 'Deep', durationMins: 122, percentage: 27, status: 'excellent', color: '#3b82f6' },
    { name: 'REM', durationMins: 108, percentage: 24, status: 'good', color: '#8b5cf6' },
    { name: 'Light', durationMins: 222, percentage: 49, status: 'normal', color: '#64748b' },
  ],
  awake: { durationMins: 12, wakeUps: 2 },
  environmental: {
    heartRate: { min: 52, max: 58, status: 'Restful' },
    hrv: { value: 58, unit: 'ms', status: 'Excellent recovery' },
    respiration: { value: 14, unit: 'breaths/min', status: 'Normal' },
    bodyTemp: { change: -0.2, unit: '°C', status: 'Normal dip' },
  },
  weeklyTrend: [
    { day: 'Mon', hours: 7.5, quality: 85 },
    { day: 'Tue', hours: 7.2, quality: 82 },
    { day: 'Wed', hours: 6.8, quality: 75 },
    { day: 'Thu', hours: 7.9, quality: 90 },
    { day: 'Fri', hours: 7.3, quality: 83 },
    { day: 'Sat', hours: 8.2, quality: 92 },
    { day: 'Sun', hours: 7.5, quality: 86 },
  ],
  insights: [
    { type: 'positive', text: 'Deep sleep was 22% higher after yesterday\'s evening walk.' },
    { type: 'positive', text: 'You went to bed at your optimal time (10:30 PM). Consistency = better quality.' },
    { type: 'warning', text: '2 wake-ups detected. Room temperature 24°C might be slightly warm (ideal: 18-21°C)' },
  ],
  improvements: [
    { factor: 'Bedtime consistency', detail: 'Slept within 30 min of usual time' },
    { factor: 'Evening walk', detail: 'Light exercise 3h before bed' },
    { factor: 'No late caffeine', detail: 'Last coffee at 2 PM' },
  ],
  concerns: [
    { factor: 'Room temperature', detail: '24°C (2-3°C too warm)' },
    { factor: '2 wake-ups', detail: 'Possibly due to warmth' },
  ],
  recommendations: [
    'Lower room temp to 20°C',
    'Keep water nearby',
    'Dim lights 1h before bed',
  ],
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
          <p className="text-sm font-bold">{`${label}`}</p>
          <p className="text-accent">{`Hours: ${payload[0].value.toFixed(1)}`}</p>
        </div>
      );
    }
    return null;
};

const qualityColor = (quality: number) => {
    if (quality >= 85) return 'hsl(var(--primary))';
    if (quality >= 70) return 'hsl(var(--accent))';
    return 'hsl(var(--destructive))';
}


export default function SleepDetail() {
  const { lastNight, stages, awake, environmental, weeklyTrend, insights, improvements, concerns, recommendations } = sleepDetailData;
  const circumference = 2 * Math.PI * 45;
  const qualityRingColor = 
    lastNight.quality >= 85 ? 'stroke-purple-400' :
    lastNight.quality >= 70 ? 'stroke-yellow-400' : 'stroke-red-400';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Sleep Analysis</h1>
        <Button variant="ghost" size="icon">
          <Calendar />
          <span className="sr-only">Select Date</span>
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Last Night Summary */}
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg text-center">
            <CardHeader>
                <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">
                    Last Night
                </CardTitle>
                <CardDescription>{lastNight.date}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-[120px] h-[120px] mx-auto mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="stroke-muted/20" strokeWidth="8" fill="transparent" />
                        <circle
                            cx="50" cy="50" r="45" className={qualityRingColor}
                            strokeWidth="8" fill="transparent" strokeLinecap="round" transform="rotate(-90 50 50)"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - (lastNight.quality / 100) * circumference}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold text-purple-400`}>
                            {lastNight.quality}%
                        </span>
                        <span className="text-sm text-muted-foreground">Quality</span>
                    </div>
                </div>
                <p className="text-2xl font-bold mb-2">{lastNight.duration.hours}h {lastNight.duration.minutes}min</p>
                <p className="text-sm text-muted-foreground">{lastNight.bedtime} - {lastNight.wakeTime}</p>
            </CardContent>
        </Card>
        
        {/* Sleep Timeline */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Sleep Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-10 w-full rounded-lg overflow-hidden flex">
                    {stages.map((stage) => (
                        <motion.div
                            key={stage.name}
                            className="h-full"
                            style={{ backgroundColor: stage.color, width: `${stage.percentage}%` }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${stage.percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        ></motion.div>
                    ))}
                </div>
                 <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{lastNight.bedtime}</span>
                    <span>{lastNight.wakeTime}</span>
                </div>
                <div className="mt-4 text-sm space-y-2">
                    <div className="flex items-center gap-2"><Zap className='w-4 h-4 text-red-500' /> Wake-ups: {awake.wakeUps} times</div>
                    <div className="flex items-center gap-2"><Moon className='w-4 h-4 text-blue-500' /> Longest deep: 52 min ✓</div>
                </div>
            </CardContent>
        </Card>
        
        {/* Sleep Stages Breakdown */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Sleep Stages</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {stages.map(stage => (
                    <div key={stage.name}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold" style={{ color: stage.color }}>{stage.name} Sleep</span>
                            <span className="text-sm text-muted-foreground">{Math.floor(stage.durationMins/60)}h {stage.durationMins%60}min ({stage.percentage}%)</span>
                        </div>
                        <Progress value={stage.percentage} indicatorClassName="bg-[var(--stage-color)]" style={{'--stage-color': stage.color} as React.CSSProperties}/>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">{stage.status}</p>
                    </div>
                ))}
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-red-400">Awake</span>
                        <span className="text-sm text-muted-foreground">{awake.durationMins} min</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{awake.wakeUps} wake-ups (normal)</p>
                </div>
            </CardContent>
        </Card>

        {/* Environmental Factors */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Environmental & Body Factors</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-lg"><Heart className="w-5 h-5 mb-2 text-red-400"/><p className="text-xs text-muted-foreground">Heart Rate</p><p className="font-semibold">{environmental.heartRate.min}-{environmental.heartRate.max} bpm</p><p className="text-xs text-green-400">{environmental.heartRate.status}</p></div>
                <div className="bg-muted/30 p-3 rounded-lg"><Brain className="w-5 h-5 mb-2 text-purple-400"/><p className="text-xs text-muted-foreground">HRV</p><p className="font-semibold">{environmental.hrv.value}{environmental.hrv.unit}</p><p className="text-xs text-green-400">{environmental.hrv.status}</p></div>
                <div className="bg-muted/30 p-3 rounded-lg"><Wind className="w-5 h-5 mb-2 text-blue-400"/><p className="text-xs text-muted-foreground">Respiration</p><p className="font-semibold">{environmental.respiration.value} {environmental.respiration.unit}</p><p className="text-xs text-green-400">{environmental.respiration.status}</p></div>
                <div className="bg-muted/30 p-3 rounded-lg"><Thermometer className="w-5 h-5 mb-2 text-orange-400"/><p className="text-xs text-muted-foreground">Body Temp</p><p className="font-semibold">{environmental.bodyTemp.change > 0 ? '+' : ''}{environmental.bodyTemp.change}{environmental.bodyTemp.unit}</p><p className="text-xs text-green-400">{environmental.bodyTemp.status}</p></div>
            </CardContent>
        </Card>
        
        {/* Weekly Trend */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Weekly Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="h" />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--muted), 0.5)' }} />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                    {weeklyTrend.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={qualityColor(entry.quality)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
             <div className="text-xs text-muted-foreground text-center mt-4">Average: 7h 29min</div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-card/50">
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <Brain className="w-6 h-6 text-primary mt-1" />
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Patterns from your sleep data.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                {insight.type === 'positive' ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                <p className="text-sm text-muted-foreground">{insight.text}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">Optimize Sleep Environment →</Button>
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>💡 Recommendations for Tonight</CardTitle></CardHeader>
            <CardContent className='space-y-4'>
                 <ul className="space-y-2 text-sm text-muted-foreground">
                    {recommendations.map(rec => (
                        <li key={rec} className="flex items-center gap-2">✓ {rec}</li>
                    ))}
                </ul>
                <div className='flex gap-2'>
                    <Button variant="default" className="flex-1">Set Bedtime Routine</Button>
                    <Button variant="secondary" className="flex-1">Enable Sleep Mode</Button>
                </div>
            </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className='space-y-3 pt-4'>
             <Button variant="secondary" className="w-full">Log Manual Sleep</Button>
             <Button variant="secondary" className="w-full">Export Sleep Report</Button>
             <Button variant="secondary" className="w-full">View Sleep History →</Button>
        </div>
      </main>
    </div>
  );
}
