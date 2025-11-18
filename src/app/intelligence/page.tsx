'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function IntelligenceHubPage() {
const router = useRouter();

// Sample data - replace with real data later
const energyScore = 87;
const insights = [
{ id: 1, category: 'sleep', title: 'Sleep Quality Trending Up', icon: '😴', change: '+18%' },
{ id: 2, category: 'hrv', title: 'HRV Recovery Excellent', icon: '❤️', change: '+12%' },
{ id: 3, category: 'stress', title: 'Stress Management Improved', icon: '🧘', change: '-32%' },
{ id: 4, category: 'activity', title: 'Consistency On Track', icon: '💪', change: '+25%' }
];

const patterns = [
{ id: 1, title: 'You sleep best on Saturdays', confidence: 95 },
{ id: 2, title: 'Morning workouts boost energy 23%', confidence: 92 },
{ id: 3, title: 'Evening walks improve sleep quality', confidence: 89 }
];

return (
<div className="min-h-screen bg-gray-900 text-white pb-28">
{/* Header */}
<div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 pb-8">
<button
onClick={() => router.back()}
className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
>
<span className="mr-2">←</span> Back
</button>
    <h1 className="text-2xl font-bold mb-2">AI Intelligence Hub</h1>
    <p className="text-gray-400 text-sm">
      Your personalized health insights powered by AI
    </p>
  </div>

  <div className="px-6 -mt-4">
    
    {/* Energy Score Summary Card */}
    <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 border-2 border-teal-500/50 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-300 mb-1">Your Energy Score</p>
          <p className="text-4xl font-bold text-white">{energyScore}<span className="text-xl text-gray-400">/100</span></p>
        </div>
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <span className="text-3xl">⚡</span>
        </div>
      </div>
      <button
        onClick={() => router.push('/energy-breakdown')}
        className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
      >
        See detailed breakdown →
      </button>
    </div>

    {/* Key Insights Grid */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Key Insights This Week</h2>
      <div className="grid grid-cols-2 gap-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            onClick={() => router.push(`/${insight.category}-insights`)}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-teal-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{insight.icon}</span>
              <span className={`text-sm font-semibold ${
                insight.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {insight.change}
              </span>
            </div>
            <p className="text-sm font-medium text-white">{insight.title}</p>
            <p className="text-xs text-gray-400 mt-1">Tap to explore →</p>
          </div>
        ))}
      </div>
    </div>

    {/* Discovered Patterns */}
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Discovered Patterns</h2>
        <button
          onClick={() => router.push('/patterns')}
          className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-2">{pattern.title}</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 mr-3">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${pattern.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-teal-400 font-semibold">
                    {pattern.confidence}% confident
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Access Cards */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Explore More</h2>
      <div className="space-y-3">
        <button
          onClick={() => router.push('/hrv-tips')}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-left hover:border-teal-500/50 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">❤️</span>
              <div>
                <p className="font-medium text-white">HRV Tips</p>
                <p className="text-xs text-gray-400">Improve your recovery</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </button>

        <button
          onClick={() => router.push('/timeline')}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-left hover:border-teal-500/50 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📅</span>
              <div>
                <p className="font-medium text-white">Full Day Timeline</p>
                <p className="text-xs text-gray-400">Optimal windows for activities</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </button>

        <button
          onClick={() => router.push('/coach')}
          className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-4 text-left hover:border-purple-500 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🤖</span>
              <div>
                <p className="font-medium text-white">AI Coach</p>
                <p className="text-xs text-purple-300">Ask anything about your health</p>
              </div>
            </div>
            <span className="text-purple-400">→</span>
          </div>
        </button>
      </div>
    </div>

  </div>
</div>
);
}
