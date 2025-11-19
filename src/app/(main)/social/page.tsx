'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Tab = 'for-you' | 'friends' | 'discover' | 'requests';

export default function SocialPage() {
const router = useRouter();
const [activeTab, setActiveTab] = useState<Tab>('for-you');
const [corporateEnabled, setCorporateEnabled] = useState(false);

useEffect(() => {
// Load corporate state from localStorage
const enabled = localStorage.getItem('corporateEnabled') === 'true';
setCorporateEnabled(enabled);
}, []);

const toggleCorporate = () => {
const newState = !corporateEnabled;
localStorage.setItem('corporateEnabled', String(newState));
setCorporateEnabled(newState);

// Show confirmation
if (newState) {
  alert('Team view enabled! You can now see team challenges and leaderboards.');
}
};

// Mock activity feed data
const activities = [
{
id: 1,
user: { name: 'Rahul Sharma', avatar: '🏃' },
time: '2 hours ago',
type: 'workout',
title: 'Completed morning run',
description: 'Great start to the day! 💪',
stats: { distance: '5.2 km', duration: '28:15', avgHR: 142, calories: 320 },
likes: 12,
comments: 3,
liked: false
},
{
id: 2,
user: { name: 'Priya Mehta', avatar: '🧘' },
time: '5 hours ago',
type: 'achievement',
title: 'Achieved 7-day streak! 🔥',
description: 'Consistency is key! Feeling stronger every day.',
stats: null,
likes: 24,
comments: 8,
liked: true
},
{
id: 3,
user: { name: 'Arjun Patel', avatar: '💪' },
time: '1 day ago',
type: 'workout',
title: 'Strength training session',
description: 'Leg day done right 🦵',
stats: { duration: '45:00', avgHR: 135, calories: 420 },
likes: 8,
comments: 2,
liked: false
}
];

// Mock friend requests
const friendRequests = [
{ id: 1, name: 'Arjun Patel', avatar: '👤', mutual: 3 },
{ id: 2, name: 'Sneha Kumar', avatar: '👤', mutual: 7 }
];

const [localActivities, setLocalActivities] = useState(activities);
const [localRequests, setLocalRequests] = useState(friendRequests);

const handleLike = (activityId: number) => {
setLocalActivities(prev =>
prev.map(activity =>
activity.id === activityId
? {
...activity,
liked: !activity.liked,
likes: activity.liked ? activity.likes - 1 : activity.likes + 1
}
: activity
)
);
};

const handleAcceptRequest = (requestId: number) => {
setLocalRequests(prev => prev.filter(req => req.id !== requestId));
alert('Friend request accepted!');
};

const handleDeclineRequest = (requestId: number) => {
setLocalRequests(prev => prev.filter(req => req.id !== requestId));
};

return (
<div className="min-h-screen bg-background text-white pb-28">

  {/* Header */}
  <div className="bg-card/50 border-b border-border/20 px-6 py-5 pb-0 sticky top-0 z-10">
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Social</h1>
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className="text-muted-foreground hover:text-foreground transition-colors relative"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {localRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-semibold">
              {localRequests.length}
            </span>
          )}
        </button>
        <button
          onClick={() => router.push('/settings')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>

    {/* Tabs */}
    <div className="flex gap-1 overflow-x-auto -mb-px">
      {[
        { id: 'for-you', label: 'For You' },
        { id: 'friends', label: 'Friends' },
        { id: 'discover', label: 'Discover' },
        { id: 'requests', label: 'Requests', badge: localRequests.length }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as Tab)}
          className={`
            px-5 py-3 font-medium text-sm whitespace-nowrap transition-all relative
            ${activeTab === tab.id
              ? 'text-foreground border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
            }
          `}
        >
          {tab.label}
          {tab.badge && tab.badge > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-red-500 rounded-full text-xs font-semibold">
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
    {activeTab === 'for-you' && (
      <div className="mt-6 mb-6">
        <div className={`
          rounded-xl p-5 border-2 transition-all
          ${corporateEnabled
            ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 border-teal-500/50'
            : 'bg-card/50 border-border/20'
          }
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <span className="text-4xl mr-4">💼</span>
              <div>
                <p className="font-bold text-white mb-1">
                  {corporateEnabled ? 'TCS Bangalore Fitness Squad' : 'Team Features'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {corporateEnabled
                    ? '15 members -  3 active challenges'
                    : 'Enable team challenges and leaderboards'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={toggleCorporate}
              className={`
                px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${corporateEnabled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {corporateEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {corporateEnabled && (
            <button
              onClick={() => router.push('/enterprise/leaderboard')}
              className="mt-4 text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              View Team Leaderboard →
            </button>
          )}
        </div>
      </div>
    )}

    {/* Active Challenges (if corporate enabled) */}
    {corporateEnabled && activeTab === 'for-you' && (
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Active Challenges</h2>
        <div className="bg-card/50 border border-border/20 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <p className="font-semibold text-white mb-1 text-base">🏃 Step Challenge: Week 2/4</p>
              <p className="text-sm text-muted-foreground">Team Goal: 100,000 steps</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Team Progress</span>
              <span className="font-semibold text-white">68,540 / 100,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-accent font-medium">🏆 You're #8 of 15 this week</p>
            <p className="text-xs text-muted-foreground">5 days remaining</p>
          </div>
          <button
            onClick={() => router.push('/enterprise/leaderboard')}
            className="w-full py-2.5 bg-primary/20 border border-primary/50 rounded-lg text-sm font-semibold text-primary hover:bg-primary/30 transition-colors"
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
        
        {localActivities.map((activity) => (
          <div key={activity.id} className="bg-card/50 border border-border/20 rounded-xl p-5 hover:border-border transition-colors">
            {/* User Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center flex-1">
                <span className="text-4xl mr-3">{activity.user.avatar}</span>
                <div>
                  <p className="font-semibold text-white">{activity.user.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Activity Content */}
            <p className="font-semibold text-white mb-1">{activity.title}</p>
            <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
            
            {activity.stats && (
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border/50">
                {activity.stats.distance && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {activity.stats.distance}
                  </span>
                )}
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.stats.duration}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {activity.stats.avgHR} bpm
                </span>
                {activity.stats.calories && (
                  <span className="flex items-center">
                    🔥 {activity.stats.calories} cal
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleLike(activity.id)}
                className={`flex items-center gap-2 transition-colors ${
                  activity.liked ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                }`}
              >
                <svg className={`w-5 h-5 ${activity.liked ? 'fill-current' : ''}`} fill={activity.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="text-sm font-medium">{activity.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium">{activity.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Friends Tab */}
    {activeTab === 'friends' && (
      <div className="mt-6 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your Friends</h2>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors"
          >
            Add Friends
          </button>
        </div>
        <div className="bg-card/50 border border-border/20 rounded-xl p-12 text-center">
          <span className="text-6xl mb-4 block">👥</span>
          <p className="text-muted-foreground mb-2">You haven't added any friends yet</p>
          <p className="text-sm text-muted-foreground/70 mb-6">Connect with friends to see their activities and compete together</p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors"
          >
            Find Friends
          </button>
        </div>
      </div>
    )}

    {/* Discover Tab */}
    {activeTab === 'discover' && (
      <div className="mt-6 pb-6">
        <h2 className="text-xl font-bold mb-6">Discover Athletes</h2>
        <div className="bg-card/50 border border-border/20 rounded-xl p-12 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <p className="text-white font-semibold mb-2">Find friends and athletes near you</p>
          <p className="text-sm text-muted-foreground mb-6">Connect with people who share your fitness journey</p>
          <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition-colors mb-3">
            Search Users
          </button>
          <p className="text-xs text-muted-foreground/70">Coming soon: Nearby athletes and suggested connections</p>
        </div>
      </div>
    )}

    {/* Requests Tab */}
    {activeTab === 'requests' && (
      <div className="mt-6 pb-6">
        <h2 className="text-xl font-bold mb-6">Friend Requests</h2>
        {localRequests.length > 0 ? (
          <div className="space-y-3">
            {localRequests.map((request) => (
              <div key={request.id} className="bg-card/50 border border-border/20 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <span className="text-4xl mr-4">{request.avatar}</span>
                    <div>
                      <p className="font-semibold text-white">{request.name}</p>
                      <p className="text-sm text-muted-foreground">{request.mutual} mutual friends</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="px-5 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(request.id)}
                      className="px-5 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card/50 border border-border/20 rounded-xl p-12 text-center">
            <span className="text-6xl mb-4 block">✓</span>
            <p className="text-muted-foreground">No pending requests</p>
          </div>
        )}
      </div>
    )}

  </div>
</div>
);

    