'use client';

import { useRouter } from 'next/navigation';

interface EnergyScoreCardProps {
  score: number; // 0-100
}

export default function EnergyScoreCard({ score }: EnergyScoreCardProps) {
  const router = useRouter();

  const getScoreLevel = (score: number) => {
    if (score >= 80) return {
      color: '#00E676', // Green
      label: 'EXCELLENT',
      message: 'Perfect day for challenges',
      gradientFrom: 'rgba(0, 230, 118, 0.2)',
      gradientTo: 'rgba(0, 200, 83, 0.2)',
      borderColor: 'rgba(0, 230, 118, 0.5)'
    };
    if (score >= 60) return {
      color: '#FFD54F', // Yellow
      label: 'GOOD',
      message: 'Solid energy for the day',
      gradientFrom: 'rgba(255, 213, 79, 0.2)',
      gradientTo: 'rgba(255, 193, 7, 0.2)',
      borderColor: 'rgba(255, 213, 79, 0.5)'
    };
    if (score >= 40) return {
      color: '#FF9800', // Orange
      label: 'MODERATE',
      message: 'Take it easy today',
      gradientFrom: 'rgba(255, 152, 0, 0.2)',
      gradientTo: 'rgba(245, 124, 0, 0.2)',
      borderColor: 'rgba(255, 152, 0, 0.5)'
    };
    return {
      color: '#FF5252', // Red
      label: 'NEEDS REST',
      message: 'Prioritize recovery',
      gradientFrom: 'rgba(255, 82, 82, 0.2)',
      gradientTo: 'rgba(213, 0, 0, 0.2)',
      borderColor: 'rgba(255, 82, 82, 0.5)'
    };
  };

  const { color, label, message, gradientFrom, gradientTo, borderColor } = getScoreLevel(score);
  const circumference = 2 * Math.PI * 56; // radius = 56
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div 
      className="border-2 rounded-2xl p-6 mb-6"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
        borderColor: borderColor
      }}
    >
      <p className="text-sm font-semibold text-muted-foreground mb-4">YOUR ENERGY SCORE</p>
      
      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="transform -rotate-90" width="128" height="128" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="hsl(var(--muted) / 0.3)"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        
        {/* Score number */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-4xl font-bold text-foreground">{score}</span>
          <span className="text-sm text-muted-foreground">/100</span>
        </div>
      </div>
      
      {/* Status */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold mb-1" style={{ color }}>{label}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      
      {/* Breakdown button */}
      <button
        onClick={() => router.push('/energy-breakdown')}
        className="w-full text-sm text-accent hover:text-accent/80 transition-colors"
      >
        See breakdown →
      </button>
    </div>
  );
}
