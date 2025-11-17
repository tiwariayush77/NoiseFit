'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type TimeBlock = {
  id: number;
  time: string;
  startTime: number;
  endTime: number;
  icon: string;
  title: string;
  insight: string;
  reasons?: string[];
  suggestions?: string[];
  action: string;
  actionLink: string;
  priority: 'high' | 'medium';
};

const timeBlocks: TimeBlock[] = [
  {
    id: 1,
    time: '6-8 AM',
    startTime: 6,
    endTime: 8,
    icon: '☀️',
    title: 'Prime Workout Window',
    insight: 'Your body is 91% ready',
    reasons: ['Energy peaks at 7 AM', 'HR baseline optimal'],
    action: 'Explore Workouts',
    actionLink: '/workouts',
    priority: 'high',
  },
  {
    id: 2,
    time: '10-12 PM',
    startTime: 10,
    endTime: 12,
    icon: '🧠',
    title: 'Your Focus Sweet Spot',
    insight: 'HRV peaks during this time',
    suggestions: ['Deep work sessions', 'Important meetings'],
    action: 'Block Calendar',
    actionLink: '/calendar',
    priority: 'medium',
  },
  {
    id: 3,
    time: '2-3 PM',
    startTime: 14,
    endTime: 15,
    icon: '🚶',
    title: 'Beat the Slump',
    insight: '10-min walk helps 8/10 times',
    suggestions: ['Walking break', 'Stretching'],
    action: 'Start Walk Timer',
    actionLink: '/activities/walk',
    priority: 'high',
  },
  {
    id: 4,
    time: '9-10 PM',
    startTime: 21,
    endTime: 22,
    icon: '🌙',
    title: 'Wind-Down Hour',
    insight: 'Screens off = better sleep',
    suggestions: ['Reading', 'Light stretching'],
    action: 'Enable Night Mode',
    actionLink: '/settings/night-mode',
    priority: 'medium',
  },
];

const TimeBlockCard = ({ block, isExpanded }: { block: TimeBlock; isExpanded: boolean }) => {
    return (
        <motion.div
            className={cn(
                "bg-muted/30 p-5 rounded-lg border-l-4",
                block.priority === 'high' ? 'border-accent' : 'border-muted'
            )}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{block.icon}</span>
                    <div>
                        <p className="font-semibold">{block.title}</p>
                        <p className="text-sm bg-accent/10 text-accent px-2 py-0.5 rounded-full inline-block">{block.time}</p>
                    </div>
                </div>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">{block.insight}</p>
            
            <AnimatePresence>
            {isExpanded && (
                 <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                 >
                    <div className="text-xs text-muted-foreground space-y-2 mb-4">
                        {block.reasons && (
                            <div>
                                <p className='font-semibold text-foreground/80'>Why now:</p>
                                <ul className="list-disc list-inside">
                                    {block.reasons.map(r => <li key={r}>{r}</li>)}
                                </ul>
                            </div>
                        )}
                        {block.suggestions && (
                             <div>
                                <p className='font-semibold text-foreground/80'>Suggested:</p>
                                <ul className="list-disc list-inside">
                                    {block.suggestions.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                 </motion.div>
            )}
            </AnimatePresence>

            <Link href={block.actionLink}>
                <Button variant="outline" size="sm" className="w-full text-accent border-accent/50 hover:bg-accent/10 hover:text-accent">
                    {block.action} &rarr;
                </Button>
            </Link>
        </motion.div>
    )
}


export default function SmartTimelineCard() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const relevantBlock = useMemo(() => {
        const currentRelevantBlock = timeBlocks.find(block => currentHour >= block.startTime && currentHour < block.endTime);
        return currentRelevantBlock || timeBlocks.find(b => b.priority === 'high') || timeBlocks[0];
    }, [currentHour]);
    
    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">📅 YOUR OPTIMAL DAY</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-muted-foreground">
                        {isExpanded ? "Show Less" : "Show More"}
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <AnimatePresence initial={false}>
                    <motion.div className="space-y-3" layout>
                        {isExpanded ? (
                            timeBlocks.map(block => (
                                <TimeBlockCard key={block.id} block={block} isExpanded={isExpanded} />
                            ))
                        ) : (
                            <TimeBlockCard block={relevantBlock} isExpanded={isExpanded} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </CardContent>
        </Card>
    )
}
