'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import {
  ArrowLeft,
  ArrowRight,
  BarChart,
  BedDouble,
  HeartPulse,
  Flame,
  Dumbbell,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { mockInsights } from '@/lib/mock-data';
import Link from 'next/link';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const insightCards = [
  {
    id: 1,
    title: 'Your Health in Numbers',
    gradient: 'from-blue-500/30 to-cyan-500/30',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <BarChart className="w-6 h-6 text-cyan-300" />
          <p>{mockInsights.avgSteps.toLocaleString()} steps/day</p>
        </div>
        <div className="flex items-center gap-4">
          <BedDouble className="w-6 h-6 text-cyan-300" />
          <p>{mockInsights.avgSleep}h sleep</p>
        </div>
        <div className="flex items-center gap-4">
          <HeartPulse className="w-6 h-6 text-cyan-300" />
          <p>{mockInsights.restingHeartRate} bpm resting HR</p>
        </div>
        <p className="pt-4 text-center text-lg font-semibold">
          You're in the <span className="text-cyan-300">top 30%</span> of users
          your age
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Your Sleep Story',
    gradient: 'from-purple-500/30 to-pink-500/30',
    content: (
      <div className="space-y-3">
        <p className="text-4xl font-bold text-pink-300">
          {mockInsights.sleepQuality}%
          <span className="text-xl font-normal text-foreground"> quality</span>
        </p>
        <p className="text-lg">{mockInsights.avgSleep}h average</p>
        <div className="pt-3">
          <p className="font-semibold">Best nights:</p>
          <p>Saturdays ({mockInsights.bestSleep.quality}% quality)</p>
        </div>
        <div>
          <p className="font-semibold">Room to improve:</p>
          <p>Monday mornings feel rough</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Your Movement Rhythm',
    gradient: 'from-green-500/30 to-teal-500/30',
    content: (
      <div className="space-y-3 text-center">
        <p className="text-5xl font-bold text-green-300">
          {mockInsights.activeDays}
          <span className="text-3xl">/90</span>
        </p>
        <p className="text-lg">active days (81%)</p>
        <div className="pt-4">
          <p className="text-lg">Your streak record:</p>
          <p className="text-2xl font-bold">
            {mockInsights.streak} days straight! <Flame className="inline-block text-orange-400" />
          </p>
        </div>
        <p className="pt-2">You're building great momentum</p>
      </div>
    ),
  },
  {
    id: 4,
    title: 'What We Learned About You',
    gradient: 'from-orange-500/30 to-red-500/30',
    content: (
      <div className="space-y-2 text-sm">
        <p className="text-lg font-semibold pb-2">🤖 You're a morning person</p>
        <div className="flex justify-between">
          <span>Morning workouts:</span>
          <span className="font-bold text-orange-300">94% completion</span>
        </div>
        <div className="flex justify-between">
          <span>Evening workouts:</span>
          <span className="font-bold text-red-400">54% completion</span>
        </div>
        <div className="pt-3">
          <p>When you sleep 7.5h+ and workout in AM:</p>
          <ul className="list-disc list-inside pl-2">
            <li>10K steps: 87% likely</li>
            <li>Energy peaks at 9 AM</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function InstantValuePage() {
  const [[page, direction], setPage] = useState([0, 0]);

  const cardIndex = wrap(0, insightCards.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="flex-1 flex flex-col items-center p-4 pt-12 text-center">
        <h1 className="text-2xl font-bold mb-6 animate-fade-in-up">
          ✨ WELCOME, RAHUL
        </h1>

        <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className={cn(
                'absolute w-full h-full rounded-2xl border border-white/10 bg-card/50 backdrop-blur-lg p-6 flex flex-col shadow-2xl',
                insightCards[cardIndex].gradient
              )}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h2 className="text-xl font-bold mb-4">
                {insightCards[cardIndex].title}
              </h2>
              <div className="flex-1 flex items-center justify-center">
                {insightCards[cardIndex].content}
              </div>
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 rounded-full cursor-pointer"
            onClick={() => paginate(1)}
          >
            <ArrowRight className="w-6 h-6" />
          </div>
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 rounded-full cursor-pointer"
            onClick={() => paginate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </div>
        </div>

        <div className="flex justify-center gap-2 py-4">
          {insightCards.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                i === cardIndex ? 'bg-accent w-4' : 'bg-muted'
              )}
              onClick={() => setPage([i, i > cardIndex ? 1 : -1])}
            />
          ))}
        </div>

        <Card className="w-full max-w-sm mt-6 bg-card/50 backdrop-blur-sm border-border/20">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground text-center">
              YOUR ENERGY TODAY
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-accent">
              {mockInsights.energyScore}
              <span className="text-3xl text-muted-foreground">/100</span>
            </p>
            <Progress value={mockInsights.energyScore} className="mt-4 h-2" indicatorClassName="bg-accent" />
            <p className="mt-2 text-sm text-muted-foreground">
              Ready to move! 🚀
            </p>
          </CardContent>
        </Card>

        <div className="w-full max-w-sm space-y-3 mt-8">
          <Link href="/dashboard" className='w-full block'>
            <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">
              Start Exploring ✨
            </Button>
          </Link>
          <Link href="/goal-selection" className='w-full block'>
            <Button size="lg" variant="outline" className="w-full">
              Set a Goal First
            </Button>
          </Link>
        </div>

        <div className="mt-16 animate-pulse">
            <p className='text-muted-foreground text-sm'>Discover more insights</p>
            <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
        </div>

        <div className="w-full max-w-sm mt-8 space-y-4">
            <h2 className="text-xl font-bold">More About Your Health</h2>
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 text-left">
                <CardHeader>
                    <CardTitle className="text-lg">💡 Weekend Dip Detected</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your weekend step count is 48% lower than on weekdays. A short walk on Saturday could help maintain your momentum.</p>
                    <Button variant='link' className='px-0'>Learn More →</Button>
                </CardContent>
            </Card>
        </div>


      </main>
    </div>
  );
}
