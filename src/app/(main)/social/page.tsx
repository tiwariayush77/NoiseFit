'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Tab = 'for-you' | 'friends' | 'discover' | 'requests';

export default function SocialPage() {
const router = useRouter();
const [activeTab, setActiveTab] = useState<Tab>('for-you');
const [corporateEnabled, setCorporateEnabled] = useState(false);

useEffect(() => {
const enabled = localStorage.getItem('corporateEnabled') === 'true';
setCorporateEnabled(enabled);
}, []);

const toggleCorporate = () => {
const newState = !corporateEnabled;
localStorage.setItem('corporateEnabled', String(newState));
setCorporateEnabled(newState);
};

// Sample data
const activities = [
{
id: 1,
user: { name: 'Rahul Sharma', avatar: '👤' },
time: '2 hours ago',
type: 'workout',
title: 'Completed morning run 🏃',
stats: { distance: '5.2 km', duration: '28:15', avgHR: 142 },
likes: 12,
comments: 3
},
{
id: 2,
user: { name: 'Priya Mehta', avatar: '👤' },
time: '5 hours ago',
type: 'achievement',
title: 'Achieved 7-day streak! 🔥',
likes: 24,
comments: 8
}
];

const friendRequests = [
{ id: 1, name: 'Arjun Patel', mutual: 3 },
{ id: 2, name: 'Sneha Kumar', mutual: 7 }
];

return (
<div className="min-h-screen bg-background text-white pb-28">

  {/* Header */}
  <div className="bg-card/50 border-b border-border/20 p-6 pb-0">
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Social</h1>
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-2xl">🔍</span>
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors relative">
          <span className="text-2xl">🔔</span>
          {friendRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {friendRequests.length}
            </span>
          )}
        </button>
        <button
          onClick={() => router.push('/settings')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-2xl">⚙️</span>
        </button>
      </div>
    </div>

    {/* Tabs */}
    <div className="flex gap-1 overflow-x-auto px-4 border-b border-border/20">
      {[
        { id: 'for-you', label: 'For You' },
        { id: 'friends', label: 'Friends' },
        { id: 'discover', label: 'Discover' },
        { id: 'requests', label: 'Requests', badge: friendRequests.length }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as Tab)}
          className={`
            px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative
            ${activeTab === tab.id
              ? 'text-foreground border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {tab.label}
          {tab.badge && tab.badge > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-red-500 rounded-full text-xs">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>

  {/* Content */}
  <div className="px-6">
    
    {/* Corporate Toggle Card */}
    {corporateEnabled && activeTab === 'for-you' && (
      <div className="mt-6 mb-6 bg-gradient-to-r from-teal-500/20 to-blue-500/20 border-2 border-teal-500/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center flex-1">
            <span className="text-3xl mr-3">💼</span>
            <div>
              <p className="font-bold text-white">TCS Bangalore Fitness Squad</p>
              <p className="text-sm text-gray-300">15 members -  3 active challenges</p>
            </div>
          </div>
          <button
            onClick={toggleCorporate}
            className={`
              px-3 py-1 rounded-full text-xs font-semibold transition-colors
              ${corporateEnabled
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
              }
            `}
          >
            {corporateEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
        <button
          onClick={() => router.push('/enterprise/leaderboard')}
          className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
        >
          View Team Leaderboard →
        </button>
      </div>
    )}

    {/* Active Challenges (if corporate) */}
    {corporateEnabled && activeTab === 'for-you' && (
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Active Challenges</h2>
        <div className="bg-card/50 border border-border/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-white mb-1">🏃 Step Challenge: Week 2/4</p>
              <p className="text-sm text-muted-foreground">Team Goal: 100,000 steps</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Team Progress</span>
              <span className="font-semibold text-white">68,540 / 100,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <p className="text-xs text-accent mb-3">You're #8 of 15 this week</p>
          <button
            onClick={() => router.push('/challenges/1')}
            className="w-full py-2 bg-primary/20 border border-primary/50 rounded-lg text-sm font-medium text-primary hover:bg-primary/30 transition-colors"
          >
            View Challenge Details →
          </button>
        </div>
      </div>
    )}

    {/* Activity Feed */}
    {activeTab === 'for-you' && (
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-bold">Activity Feed</h2>
        
        {activities.map((activity) => (
          <div key={activity.id} className="bg-card/50 border border-border/20 rounded-xl p-5">
            {/* User Header */}
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">{activity.user.avatar}</span>
              <div className="flex-1">
                <p className="font-semibold text-white">{activity.user.name}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                ...
              </button>
            </div>

            {/* Activity Content */}
            <p className="text-base text-white mb-3">{activity.title}</p>
            
            {activity.stats && (
              <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                <span>{activity.stats.distance}</span>
                <span>-</span>
                <span>{activity.stats.duration}</span>
                <span>-</span>
                <span>{activity.stats.avgHR} avg HR</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-border/20">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <span className="text-xl">💪</span>
                <span className="text-sm font-medium">{activity.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <span className="text-xl">💬</span>
                <span className="text-sm font-medium">{activity.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <span className="text-xl">🔗</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Friends Tab */}
    {activeTab === 'friends' && (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Your Friends</h2>
          <button
            onClick={() => setActiveTab('discover')}
            className="text-sm text-accent hover:text-accent/80"
          >
            Add Friends
          </button>
        </div>
        <p className="text-muted-foreground text-center py-12">
          You haven't added any friends yet.
        </p>
      </div>
    )}

    {/* Discover Tab */}
    {activeTab === 'discover' && (
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Discover Athletes</h2>
        <div className="bg-card/50 border border-border/20 rounded-xl p-5 text-center">
          <span className="text-5xl mb-3 block">🔍</span>
          <p className="text-muted-foreground mb-4">Find friends and connect with athletes near you</p>
          <button className="px-6 py-2 bg-primary hover:bg-primary/90 rounded-lg font-medium text-sm transition-colors">
            Search Users
          </button>
        </div>
      </div>
    )}

    {/* Requests Tab */}
    {activeTab === 'requests' && (
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Friend Requests</h2>
        <div className="space-y-3">
          {friendRequests.map((request) => (
            <div key={request.id} className="bg-card/50 border border-border/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="text-3xl mr-3">👤</span>
                  <div>
                    <p className="font-semibold text-white">{request.name}</p>
                    <p className="text-xs text-muted-foreground">{request.mutual} mutual friends</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
</div>
);
}
