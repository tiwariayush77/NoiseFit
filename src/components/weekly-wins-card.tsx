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
    <div className="bg-card/50 border border-border/20 rounded-xl p-4 mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center">
            <span className="text-xl mr-2">🏆</span>
            <span className="text-base font-semibold">This Week's Wins</span>
        </div>
        <span className="text-gray-400 text-xl">
            {expanded ? '▲' : '▼'}
        </span>
      </button>
      
      {expanded && (
        <div className="mt-4 space-y-3">
          <div className="flex items-start space-x-3 bg-muted/30 rounded-lg p-3">
            <span className="text-2xl flex-shrink-0">😴</span>
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">Sleep improved 18%</p>
              <p className="text-sm text-gray-400">Evening walks are working!</p>
            </div>
            <div className="flex items-center text-green-400">
              <span className="text-xl">↑</span>
              <span className="text-sm font-semibold">18%</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 bg-muted/30 rounded-lg p-3">
            <span className="text-2xl flex-shrink-0">💪</span>
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">Fitness consistency up 25%</p>
              <p className="text-sm text-gray-400">Morning routine is locked in</p>
            </div>
            <div className="flex items-center text-green-400">
              <span className="text-xl">↑</span>
              <span className="text-sm font-semibold">25%</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 bg-muted/30 rounded-lg p-3">
            <span className="text-2xl flex-shrink-0">🧘</span>
            <div className="flex-1">
              <p className="font-semibold text-white mb-1">Stress down 32%</p>
              <p className="text-sm text-gray-400">Breathing sessions are effective</p>
            </div>
            <div className="flex items-center text-green-400">
              <span className="text-xl">↑</span>
              <span className="text-sm font-semibold">32%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
