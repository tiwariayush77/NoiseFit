'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type Opportunity = {
    id: string;
    icon: string;
    title: string;
    headline: string;
    explanation: string;
    impact: string;
    impactLevel: 'high' | 'medium' | 'low';
    action: string;
    actionLink: string;
    category: 'sleep' | 'activity' | 'recovery';
    priority: number;
};

const initialOpportunities: Opportunity[] = [
    {
        id: 'sleep-timing',
        icon: '😴',
        title: 'Better Sleep Tonight',
        headline: 'Sleep at 10 PM → 88% quality',
        explanation: "You've slept at 10 PM 4 times this month. Average quality: 88% vs your usual 82%",
        impact: '+6% sleep quality',
        impactLevel: 'high',
        action: 'Set Bedtime Reminder',
        actionLink: '/sleep/reminder',
        category: 'sleep',
        priority: 1
    },
    {
        id: 'step-gap',
        icon: '🏃',
        title: 'Close Your Step Gap',
        headline: '1,766 steps to goal',
        explanation: 'A 20-min evening walk could seal the deal.\nYour usual pace is 88 steps/min, so it should take about 20 minutes.',
        impact: 'Hit daily goal',
        impactLevel: 'medium',
        action: 'Start Walk',
        actionLink: '/activities/walk',
        category: 'activity',
        priority: 2
    },
    {
        id: 'recovery-boost',
        icon: '🧘',
        title: 'Boost Recovery',
        headline: '5-min breathing → Better tomorrow',
        explanation: 'Your HRV is 8% below baseline. Breathing exercises raised it 12% on average last week.',
        impact: 'Better recovery',
        impactLevel: 'medium',
        action: 'Start Breathing',
        actionLink: '/activities/breathing',
        category: 'recovery',
        priority: 3
    }
];

const categoryGradients = {
    sleep: 'from-blue-500/30 to-purple-500/30',
    activity: 'from-green-500/30 to-teal-500/30',
    recovery: 'from-purple-500/30 to-pink-500/30',
};

const OpportunityCard = ({ opportunity, onDismiss }: { opportunity: Opportunity, onDismiss: (id: string) => void }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, padding: 0, margin: 0, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className={cn(
                "rounded-xl p-6 shadow-lg border border-white/10 overflow-hidden relative",
                categoryGradients[opportunity.category]
            )}
        >
            <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl mt-1">{opportunity.icon}</span>
                <div>
                    <h3 className="text-lg font-bold text-white">{opportunity.title}</h3>
                    <p className="text-sm text-white/80 -mt-1">{opportunity.headline}</p>
                </div>
            </div>
            
            <p className="text-sm text-white/60 mb-4 whitespace-pre-line">{opportunity.explanation}</p>
            
            <div className="flex items-center gap-4 mb-5">
                <span className="text-xs font-semibold bg-white/10 text-white px-3 py-1 rounded-full">
                    Impact: {opportunity.impact}
                </span>
            </div>

            <Link href={opportunity.actionLink} className="block w-full">
                <Button className="w-full h-12 text-base font-semibold bg-white text-black hover:bg-gray-200 transition-transform transform hover:scale-102">
                    {opportunity.action}
                </Button>
            </Link>

            <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDismiss(opportunity.id)}
                className="w-full mt-2 text-xs text-white/50 hover:text-white hover:bg-white/10"
            >
                Dismiss
            </Button>
        </motion.div>
    );
};


export default function TopOpportunitiesCard() {
    const [opportunities, setOpportunities] = useState(initialOpportunities);

    const handleDismiss = (id: string) => {
        setOpportunities(prev => prev.filter(op => op.id !== id));
    };
    
    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0 pt-0 pb-4">
                 <div className="">
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">💡 TOP OPPORTUNITIES</h2>
                    <p className="text-xs text-muted-foreground">AI-spotted chances to level up</p>
                </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <div className="space-y-4">
                    <AnimatePresence>
                        {opportunities.length > 0 ? (
                            opportunities
                                .sort((a, b) => a.priority - b.priority)
                                .map(op => (
                                    <OpportunityCard key={op.id} opportunity={op} onDismiss={handleDismiss} />
                                ))
                        ) : (
                            <div className="text-center py-10 bg-card/50 rounded-lg">
                                <p className="text-lg">✨ All caught up!</p>
                                <p className="text-sm text-muted-foreground">Check back later for new insights.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}
