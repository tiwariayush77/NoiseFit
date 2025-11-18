'use client';

import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const quickActions = [
    {
        id: 'log-workout',
        icon: '💪',
        label: 'Log Workout',
        color: '#10B981', // Green
        link: '/workouts/log'
    },
    {
        id: 'track-sleep',
        icon: '😴',
        label: 'Track Sleep',
        color: '#8B5CF6', // Purple
        link: '/vitals/sleep'
    },
    {
        id: 'breathing',
        icon: '🧘',
        label: 'Start Breathing',
        color: '#06B6D4', // Cyan
        link: '/vitals/stress'
    },
    {
        id: 'log-food',
        icon: '🍎',
        label: 'Log Food',
        color: '#F97316', // Orange
        link: '/nutrition'
    },
    {
        id: 'set-goal',
        icon: '🎯',
        label: 'Set Goal',
        color: '#EF4444', // Red
        link: '/goal-selection'
    },
    {
        id: 'insights',
        icon: '📊',
        label: 'View Insights',
        color: '#3B82F6', // Blue
        link: '/energy-detail'
    }
];

export default function QuickActionsCard() {
    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                <div>
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">⚡ QUICK ACTIONS</h2>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {quickActions.map((action) => (
                        <Link key={action.id} href={action.link} className="block group">
                            <div
                                className="bg-card/50 border border-border/20 rounded-xl p-4 flex flex-col items-center justify-center aspect-[4/5] sm:aspect-square text-center transition-all duration-300 group-hover:border-[var(--action-color)] group-hover:bg-muted/50 group-hover:scale-102 group-active:scale-98"
                                style={{ '--action-color': action.color } as React.CSSProperties}
                            >
                                <div className="text-4xl sm:text-5xl mb-3 flex-grow flex items-center justify-center">
                                    {action.icon}
                                </div>
                                <p className="text-sm font-semibold leading-tight">{action.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
