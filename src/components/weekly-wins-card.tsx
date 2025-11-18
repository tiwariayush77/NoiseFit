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
      subtitle: 'Evening walks are working!',
      percentChange: 18
    },
    {
      icon: '💪',
      title: 'Fitness consistency up 25%',
      subtitle: 'Morning routine is locked in',
      percentChange: 25
    },
    {
      icon: '🧘',
      title: 'Stress down 32%',
      subtitle: 'Breathing sessions are effective',
      percentChange: 32
    }
  ];

  return (
    <div className="bg-card/50 border border-border/20 rounded-xl p-5 mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center">
            <span className="text-xl mr-2">🏆</span>
            <span className="text-base font-bold">This Week's Wins</span>
        </div>
        <svg
          className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {wins.map((win, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-muted/30 rounded-lg p-3">
                  <span className="text-2xl flex-shrink-0">{win.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white mb-1">{win.title}</p>
                    <p className="text-sm text-gray-400">{win.subtitle}</p>
                  </div>
                  <div className="flex items-center text-green-400">
                    <span className="text-xl">↑</span>
                    <span className="text-sm font-semibold">{win.percentChange}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
