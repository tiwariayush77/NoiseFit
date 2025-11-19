'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Win {
  icon: string;
  title: string;
  subtitle: string;
}

export default function WeeklyWinsCard() {
  const [expanded, setExpanded] = useState(false);

    const wins = [
        { icon: '😴', title: 'Sleep improved 18%', subtitle: 'Evening walks are working!' },
        { icon: '💪', title: 'Fitness consistency up 25%', subtitle: 'Morning routine is locked in' },
        { icon: '🧘', title: 'Stress down 32%', subtitle: 'Breathing sessions are effective' },
    ];

  return (
    <div className="bg-card/50 border border-border/20 rounded-xl p-5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center flex-1">
            <span className="text-2xl mr-3">🏆</span>
            <h2 className="text-lg font-bold text-white">This Week's Wins</h2>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-3 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4">
              {wins.map((win, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-muted/30 rounded-lg p-3">
                  <span className="text-2xl flex-shrink-0">{win.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white mb-1">{win.title}</p>
                    <p className="text-sm text-gray-400">{win.subtitle}</p>
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
