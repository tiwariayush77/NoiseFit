'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const goals = [
  { id: 'sleep', icon: '😴', title: 'Sleep Better', description: 'Get consistent, quality rest every night' },
  { id: 'move', icon: '🏃', title: 'Move More', description: 'Hit your daily step goal and stay active' },
  { id: 'strength', icon: '💪', title: 'Build Strength', description: 'Get stronger with regular workouts' },
  { id: 'stress', icon: '🧘', title: 'Reduce Stress', description: 'Find calm and balance in your day' },
  { id: 'heart', icon: '❤️', title: 'Improve Cardio', description: 'Build cardiovascular endurance' },
  { id: 'weight', icon: '⚖️', title: 'Manage Weight', description: 'Stay at your healthy weight range' }
];

type Goal = typeof goals[0];

const GOAL_COLORS: Record<string, { color: string; border: string; bg: string; glow: string; text: string; }> = {
  'Sleep Better': {
    color: 'blue',
    border: 'border-blue-500',
    bg: 'bg-blue-500/20',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    text: 'text-blue-400'
  },
  'Move More': {
    color: 'green',
    border: 'border-green-500',
    bg: 'bg-green-500/20',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    text: 'text-green-400'
  },
  'Build Strength': {
    color: 'orange',
    border: 'border-orange-500',
    bg: 'bg-orange-500/20',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    text: 'text-orange-400'
  },
  'Reduce Stress': {
    color: 'purple',
    border: 'border-purple-500',
    bg: 'bg-purple-500/20',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    text: 'text-purple-400'
  },
  'Manage Weight': {
    color: 'pink',
    border: 'border-pink-500',
    bg: 'bg-pink-500/20',
    glow: 'shadow-[0_0_20px_rgba(236,72,153,0.5)]',
    text: 'text-pink-400'
  },
  'Improve Cardio': {
    color: 'cyan',
    border: 'border-cyan-500',
    bg: 'bg-cyan-500/20',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    text: 'text-cyan-400'
  }
};


export default function GoalSelectionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showLimitToast, setShowLimitToast] = useState(false);

  useEffect(() => {
    if (showLimitToast) {
      toast({
        variant: 'destructive',
        title: "Let's focus!",
        description: "You can select up to 3 goals at a time.",
      });
      setShowLimitToast(false);
    }
  }, [showLimitToast, toast]);

  const toggleGoal = (goalTitle: string) => {
    setSelectedGoals(prev => {
      const isSelected = prev.includes(goalTitle);
      if (isSelected) {
        return prev.filter(title => title !== goalTitle);
      }
      if (prev.length >= 3) {
        setShowLimitToast(true);
        return prev;
      }
      return [...prev, goalTitle];
    });
  };

  const selectedCount = selectedGoals.length;
  const isContinueDisabled = selectedCount === 0;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/instant-value">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div className='flex-1 text-center'>
            <h1 className="text-lg font-semibold">What matters to you?</h1>
            <p className="text-sm text-muted-foreground">Choose 1-3 goals to focus on</p>
        </div>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-48">
        <p className="text-center text-muted-foreground mb-8">
            We'll help you get there, one day at a time 🌱
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              isSelected={selectedGoals.includes(goal.title)}
              onSelect={() => toggleGoal(goal.title)}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-card/90 backdrop-blur-lg border-t border-border/20">
        <div className="max-w-md mx-auto text-center space-y-3">
          <p className={cn(
              "text-sm font-medium",
              selectedCount > 0 ? "text-accent" : "text-muted-foreground"
          )}>
            {selectedCount}/3 goals selected
          </p>

          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white disabled:bg-muted disabled:from-muted disabled:to-muted"
            disabled={isContinueDisabled}
            onClick={() => router.push('/dashboard')}
          >
            Continue with {selectedCount > 0 ? `${selectedCount} goal${selectedCount > 1 ? 's' : ''}` : '...'} →
          </Button>
          
          <Button variant="link" size="sm" className="text-muted-foreground" onClick={() => router.push('/dashboard')}>
            Skip goal setting
          </Button>

          <p className="text-xs text-muted-foreground pt-2">
            💡 Don't worry, you can change these anytime
          </p>
        </div>
      </footer>
    </div>
  );
}

const getColorClasses = (goalName: string, isSelected: boolean) => {
  const colors = GOAL_COLORS[goalName] || {
    border: 'border-border/20',
    bg: 'bg-card/50',
    glow: '',
    text: 'text-foreground'
  };

  if (!isSelected) {
    return {
      border: 'border-border/20',
      bg: 'bg-card/50',
      glow: '',
      text: 'text-muted-foreground',
      scale: ''
    };
  }

  return {
    ...colors,
    scale: 'scale-102' // Slight scale on selection
  };
};

function GoalCard({ goal, isSelected, onSelect }: { goal: Goal, isSelected: boolean, onSelect: () => void }) {
  const colorClasses = getColorClasses(goal.title, isSelected);

  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer transition-all duration-300 border-2",
        colorClasses.bg,
        colorClasses.border,
        isSelected ? colorClasses.glow : '',
        isSelected ? colorClasses.scale : '',
        'hover:border-accent/50'
      )}
    >
      <div className="p-6 text-center">
        <div className="text-5xl mb-4">{goal.icon}</div>
        <h3 className={cn("text-lg font-bold mb-2", isSelected ? colorClasses.text : 'text-foreground')}>{goal.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 h-10">{goal.description}</p>
        <div className="flex items-center justify-center text-sm">
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2",
            isSelected ? colorClasses.border : "border-muted-foreground"
          )}>
            {isSelected && <CheckCircle2 className="w-5 h-5" style={{ color: GOAL_COLORS[goal.title]?.color.replace('text-', '') || 'currentColor' }} strokeWidth={3} />}
          </div>
          <span className={cn(isSelected ? colorClasses.text : "text-muted-foreground", "font-semibold")}>
            {isSelected ? 'Selected' : 'Select'}
          </span>
        </div>
      </div>
    </Card>
  );
}
