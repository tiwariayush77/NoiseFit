
'use client';

import { useRouter } from 'next/navigation';

interface EnergyScoreCardProps {
  score: number; // 0-100
}

export default function EnergyScoreCard({ score }: EnergyScoreCardProps) {
  const router = useRouter();

  const getEnergyScoreColor = (score: number) => {
    if (score >= 80) {
      return {
        ring: 'stroke-green-500',
        text: 'text-green-400',
        status: 'EXCELLENT',
        statusColor: 'text-green-400',
        bg: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-500/50',
        message: 'Perfect day for challenges! 💪'
      };
    } else if (score >= 60) {
      return {
        ring: 'stroke-blue-500',
        text: 'text-blue-400',
        status: 'GOOD',
        statusColor: 'text-blue-400',
        bg: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/50',
        message: 'Solid energy for the day 👍'
      };
    } else if (score >= 40) {
      return {
        ring: 'stroke-orange-500',
        text: 'text-orange-400',
        status: 'MODERATE',
        statusColor: 'text-orange-400',
        bg: 'from-orange-500/20 to-amber-500/20',
        border: 'border-orange-500/50',
        message: 'Take it easy today 😌'
      };
    } else {
      return {
        ring: 'stroke-red-500',
        text: 'text-red-400',
        status: 'NEEDS REST',
        statusColor: 'text-red-400',
        bg: 'from-red-500/20 to-rose-500/20',
        border: 'border-red-500/50',
        message: 'Prioritize recovery today 😴'
      };
    }
  };

  const scoreColors = getEnergyScoreColor(score);
  const circumference = 2 * Math.PI * 64;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div 
      className={`bg-gradient-to-br ${scoreColors.bg} border-2 ${scoreColors.border} rounded-2xl p-6 mb-8`}
    >
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Your Energy Score
      </p>
      
      <div className="relative w-36 h-36 mx-auto mb-4">
        <svg className="transform -rotate-90" width="144" height="144" viewBox="0 0 144 144">
          <circle
            cx="72"
            cy="72"
            r="64"
            stroke="#374151"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="72"
            cy="72"
            r="64"
            className={scoreColors.ring}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-5xl font-bold text-white">{score}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className={`text-xl font-bold mb-2 ${scoreColors.statusColor}`}>
          {scoreColors.status}
        </p>
        <p className="text-base text-white">
          {scoreColors.message}
        </p>
      </div>
      
      <button
        onClick={() => router.push('/energy-breakdown')}
        className={`w-full flex items-center justify-center gap-1.5 text-sm ${scoreColors.text} hover:opacity-80 transition-opacity text-center`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        See how this score is calculated
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
