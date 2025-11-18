'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Win {
  icon: string;
  title: string;
  subtitle: string;
  percentChange: number;
}

export default function WeeklyWinsCard() {
  const [expanded, setExpanded] = useState(false);

  const wins: Win[] = [
    {
      icon: '😴',
      title: 'Sleep improved 18%',
      subtitle: 'Evening walks working!',
      percentChange: 18
    },
    {
      icon: '💪',
      title: 'Fitness consistency ↑25%',
      subtitle: 'Morning routine locked in',
      percentChange: 25
    },
    {
      icon: '🧘',
      title: 'Stress management ↑32%',
      subtitle: 'Breathing sessions effective',
      percentChange: 32
    }
  ];

  return (
    <div className="bg-card/50 border border-border/20 rounded-xl p-4 mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-lg font-semibold flex items-center">
          This Week's Wins 🏆
        </h3>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
      {expanded && (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
        >
          <div className="space-y-3 mt-3">
            {wins.map((win, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-muted/30 rounded-lg p-3">
                <span className="text-2xl flex-shrink-0">{win.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">{win.title}</p>
                  <p className="text-sm text-muted-foreground">{win.subtitle}</p>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="text-xl">↑</span>
                  <span className="text-sm font-semibold">{win.percentChange}%</span>
                </div>
              </div>
            ))}
            
            {wins.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Keep going! Wins will appear as we discover patterns.
              </p>
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
