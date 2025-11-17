'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const calculateEnergyScore = () => {
  const sleepScore = 92;
  const activityScore = 78;
  const recoveryScore = 85;
  const stressImpact = 10;
  
  const baseScore = (sleepScore + activityScore + recoveryScore) / 3;
  const finalScore = Math.round(baseScore - stressImpact);
  
  return Math.min(100, Math.max(0, finalScore));
};

const energyScore = calculateEnergyScore();
const scoreColor = 
  energyScore >= 80 ? 'text-teal-400' :
  energyScore >= 60 ? 'text-yellow-400' :
  energyScore >= 40 ? 'text-orange-400' : 'text-red-500';

const ringColor = 
  energyScore >= 80 ? 'stroke-teal-400' :
  energyScore >= 60 ? 'stroke-yellow-400' :
  energyScore >= 40 ? 'stroke-orange-400' : 'stroke-red-500';


const status = 
  energyScore >= 90 ? { text: "Peak performance! 🚀", trend: { dir: 'up', val: 5 } } :
  energyScore >= 80 ? { text: "Ready to move! 💪", trend: { dir: 'up', val: 2 } } :
  energyScore >= 70 ? { text: "Solid energy level 👍", trend: { dir: 'stable', val: 0 } } :
  energyScore >= 60 ? { text: "Could use a boost ☕", trend: { dir: 'down', val: 3 } } :
  energyScore >= 50 ? { text: "Take it easy today 🌿", trend: { dir: 'down', val: 7 } } :
  { text: "Rest recommended 😴", trend: { dir: 'down', val: 10 } };


const factors = [
    { label: 'Sleep Quality', value: 92 },
    { label: 'Activity Level', value: 78 },
    { label: 'Recovery Score', value: 85 },
    { label: 'Stress Level', value: 'Good' },
];

export default function EnergyScoreCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const circumference = 2 * Math.PI * 80;

  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg overflow-hidden">
      <CardContent className="p-6 text-center">
        <h2 className="text-sm uppercase text-muted-foreground tracking-widest mb-4">
          YOUR ENERGY TODAY
        </h2>

        <div className="relative w-[180px] h-[180px] mx-auto mb-4">
          <svg className="w-full h-full" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r="80"
              className="stroke-muted/20"
              strokeWidth="8"
              fill="transparent"
            />
            <motion.circle
              cx="90"
              cy="90"
              r="80"
              className={ringColor}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (energyScore / 100) * circumference }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className={`text-6xl font-bold ${scoreColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {energyScore}
            </motion.span>
            <span className="text-2xl text-muted-foreground">/100</span>
          </div>
        </div>

        <p className="text-lg mb-1">{status.text}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            {status.trend.dir === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
            {status.trend.dir === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
            {status.trend.dir === 'stable' && <Minus className="w-4 h-4" />}
            <span>
                {status.trend.dir === 'up' ? `+${status.trend.val}` : status.trend.dir === 'down' ? `-${status.trend.val}` : 'Steady'} vs last week
            </span>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg text-left text-sm mb-6">
          <p className="font-semibold mb-2">🤖 AI Insight</p>
          <p>Your morning workout boosted energy by 12%. Consider a 10-min walk at 2 PM to maintain momentum.</p>
        </div>

        <div className="text-left">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{isExpanded ? 'Hide factors' : 'View factors'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: '16px' }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  {factors.map(factor => (
                    <div key={factor.label} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span>{factor.label}</span>
                        <span>{typeof factor.value === 'number' ? `${factor.value}%` : factor.value}</span>
                      </div>
                      {typeof factor.value === 'number' && (
                        <Progress value={factor.value} className="h-1.5" indicatorClassName="bg-teal-400" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="border-t border-border/50 my-6"></div>

        <Link href="/energy-detail">
            <Button variant="outline" className="w-full border-teal-400/50 text-teal-400 hover:bg-teal-400/10 hover:text-teal-300">
                See detailed analysis →
            </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
