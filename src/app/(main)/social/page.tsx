'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  UserPlus,
  Trophy,
  Plus,
  Flame,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const socialData = {
  feed: [
    {
      id: 1,
      user: { name: 'Sarah Kumar', avatar: 'https://i.pravatar.cc/150?u=sarah' },
      timestamp: '2 hours ago',
      type: 'achievement' as const,
      content: {
        title: 'Completed 5K Run in 28:30!',
        achievement: '5K Personal Best',
        stats: { distance: '5.2 km', pace: '5:29 min/km' },
        icon: '🏆',
      },
      reactions: { likes: 12, comments: 4 },
      comments: [{ user: { name: 'Raj Patel' }, text: 'Great job! 🔥' }],
    },
    {
      id: 2,
      user: { name: 'Raj Patel', avatar: 'https://i.pravatar.cc/150?u=raj' },
      timestamp: '5 hours ago',
      type: 'streak' as const,
      content: {
        title: '7-Day Workout Streak!',
        body: 'Consistency is key 💪',
        icon: '🔥',
      },
      reactions: { likes: 24, comments: 8 },
      comments: [],
    },
    {
      id: 3,
      user: { name: 'Rahul Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMzODMwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      timestamp: '1 day ago',
      type: 'goal' as const,
      content: {
        title: 'Hit my sleep goal 5 nights straight! 😴',
        body: 'Feeling more energized than ever.',
        icon: '🎯'
      },
      reactions: { likes: 18, comments: 5 },
      comments: []
    },
    {
      id: 4,
      user: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=mike' },
      timestamp: '2 days ago',
      type: 'challenge' as const,
      content: {
        title: 'Joined "Office Olympics 2024"',
        body: "Let's go Team Engineering! 🚀",
        icon: '⚔️'
      },
      reactions: { likes: 12, comments: 3 },
      comments: [],
    },
  ],
  friends: [
    {
      id: 1,
      name: 'Sarah Kumar',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      status: 'active' as const,
      activity: '8,940 steps today',
      streak: 5,
    },
    {
      id: 2,
      name: 'Raj Patel',
      avatar: 'https://i.pravatar.cc/150?u=raj',
      status: 'recently_active' as const,
      activity: 'Workout 2h ago',
      streak: 12,
    },
    {
        id: 3,
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?u=mike',
        status: 'offline' as const,
        activity: 'Resting day',
        streak: 2,
    }
  ],
  friendRequests: [
    {
      id: 1,
      name: 'Emily Chen',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      mutualFriends: 3,
    },
    {
      id: 2,
      name: 'David Lee',
      avatar: 'https://i.pravatar.cc/150?u=david',
      mutualFriends: 5,
    },
  ],
  suggestions: [
    {
        id: 1,
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/150?u=priya',
        reason: 'Works at Acme Corp',
        mutualFriends: 5,
    }
  ],
  challenges: [
    {
      id: 1,
      name: 'Office Olympics 2024',
      type: 'company',
      participants: 230,
      endsIn: '12 days',
      userRank: 47,
      progress: 65,
      icon: '🏆',
      link: '/enterprise/leaderboard'
    },
    {
      id: 2,
      name: '30-Day Fitness Challenge',
      type: 'friend',
      participants: 5,
      endsIn: '12 days',
      userRank: 2,
      progress: 60,
      icon: '💪',
      link: '/challenges/friend-challenge'
    },
     {
      id: 3,
      name: 'November Step Challenge',
      type: 'global',
      participants: 1240,
      endsIn: '18 days',
      userRank: null,
      progress: 0,
      icon: '🔥',
      link: '/challenges/join/step-challenge'
    }
  ],
};


// Main Component
export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [corporateEnabled, setCorporateEnabled] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [memberCount, setMemberCount] = useState(1);

  useEffect(() => {
    const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
    setCorporateEnabled(isEnabled);
    if (isEnabled) {
      setGroupName(localStorage.getItem('groupName') || 'Your Team');
      setMemberCount(parseInt(localStorage.getItem('groupMemberCount') || '1', 10));
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Social</h1>
        <Button variant="ghost" size="icon">
          <UserPlus />
        </Button>
      </header>

      <Tabs defaultValue="feed" className="w-full flex-1 flex flex-col" onValueChange={setActiveTab}>
        {corporateEnabled ? (
            <div className="px-4 mt-4">
                 <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="feed">Social Feed</TabsTrigger>
                    <TabsTrigger value="team">My Team</TabsTrigger>
                </TabsList>
            </div>
        ) : (
             <div className="px-4 mt-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="feed">Feed</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                </TabsList>
            </div>
        )}

        <TabsContent value="feed" className="flex-1 overflow-y-auto space-y-4 p-4">
          {socialData.feed.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="team" className="flex-1 overflow-y-auto p-4">
            <TeamTabContent groupName={groupName} memberCount={memberCount} />
        </TabsContent>

        <TabsContent value="friends" className="flex-1 overflow-y-auto space-y-6 p-4">
            <FriendRequests requests={socialData.friendRequests} />
            <FriendsList friends={socialData.friends} />
            <SuggestedFriends suggestions={socialData.suggestions} />
        </TabsContent>
        
        <TabsContent value="challenges" className="flex-1 overflow-y-auto space-y-4 p-4">
            <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Available Challenges</h2>
            {socialData.challenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
            <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create Private Challenge
            </Button>
        </TabsContent>

      </Tabs>
      {activeTab === 'feed' && (
        <Button className="fixed bottom-20 right-4 rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-primary to-purple-600 text-white">
            <Plus className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}

function TeamTabContent({ groupName, memberCount }: { groupName: string; memberCount: number }) {
    const router = useRouter();
    return (
        <div className="space-y-6">
            {/* Group Header */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-2">{groupName} 💪</h2>
                <p className="text-sm text-muted-foreground">Unofficial Group · {memberCount} member{memberCount !== 1 ? 's' : ''}</p>
            </div>

            {/* Team Status */}
            {memberCount < 3 ? (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                    <h3 className="font-semibold mb-2 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Almost There!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        You need {3 - memberCount} more member{3 - memberCount !== 1 ? 's' : ''} to activate team features
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        Invite More Colleagues
                    </button>
                </div>
            ) : (
                <>
                    {/* Team Rank */}
                    <div className="bg-card/50 border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">YOUR TEAM RANK</h3>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-4xl font-bold">#3</p>
                                <p className="text-sm text-muted-foreground">out of {memberCount} members</p>
                            </div>
                            <button onClick={() => router.push('/enterprise/leaderboard')} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                View Leaderboard
                            </button>
                        </div>
                    </div>

                    {/* Active Challenges */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">ACTIVE CHALLENGES (2)</h3>
                        <div className="space-y-3">
                            <div className="bg-card/50 border border-border rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">🏃 10K Steps Daily</h4>
                                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">5/{memberCount} completed today</p>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(5 / memberCount) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-card/50 border border-border rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">💪 Weekly Workout Streak</h4>
                                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Active</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">3/{memberCount} on track</p>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(3 / memberCount) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Leaderboard Preview */}
                    <div className="bg-card/50 border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">TEAM LEADERBOARD</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">🥇</span>
                                    <div>
                                        <p className="font-medium">Sarah Kumar</p>
                                        <p className="text-xs text-muted-foreground">Engineering</p>
                                    </div>
                                </div>
                                <span className="font-bold text-accent">92</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">🥈</span>
                                    <div>
                                        <p className="font-medium">Raj Patel</p>
                                        <p className="text-xs text-muted-foreground">Engineering</p>
                                    </div>
                                </div>
                                <span className="font-bold text-foreground">89</span>
                            </div>
                            <div className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-lg p-2">
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">3️⃣</span>
                                    <div>
                                        <p className="font-medium">YOU</p>
                                        <p className="text-xs text-muted-foreground">Engineering</p>
                                    </div>
                                </div>
                                <span className="font-bold text-accent">84</span>
                            </div>
                        </div>
                        <button onClick={() => router.push('/enterprise/leaderboard')} className="mt-4 text-blue-400 text-sm font-medium hover:underline">
                            View Full Leaderboard →
                        </button>
                    </div>
                </>
            )}

            {/* Invite Section */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="font-semibold mb-2">Grow Your Team</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Invite more colleagues to join {groupName}
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    Share Invite Link
                </button>
            </div>
        </div>
    );
}

// Sub-components for clarity

function PostCard({ post }: { post: (typeof socialData.feed)[0] }) {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4">
          {post.type === 'achievement' && (
            <Card className="bg-muted/30 p-4">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{post.content.icon}</span>
                    <p className="font-bold text-lg">{post.content.title}</p>
                </div>
                <Separator />
                <div className="text-sm text-muted-foreground mt-2 grid grid-cols-2 gap-1">
                    <span>Distance: {post.content.stats.distance}</span>
                    <span>Pace: {post.content.stats.pace}</span>
                </div>
            </Card>
          )}
          {post.type === 'streak' && (
             <div className="text-center bg-muted/30 p-4 rounded-lg">
                <p className="text-5xl mb-2">{post.content.icon}</p>
                <p className="font-bold text-lg">{post.content.title}</p>
                <p className="text-sm text-muted-foreground">{post.content.body}</p>
            </div>
          )}
          {post.type === 'goal' && (
            <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                <span className="text-4xl">{post.content.icon}</span>
                <div>
                    <p className="font-bold">{post.content.title}</p>
                    <p className="text-sm text-muted-foreground">{post.content.body}</p>
                </div>
            </div>
          )}
           {post.type === 'challenge' && (
            <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                <span className="text-4xl">{post.content.icon}</span>
                <div>
                    <p className="font-bold">{post.content.title}</p>
                    <p className="text-sm text-muted-foreground">{post.content.body}</p>
                </div>
            </div>
          )}
        </div>

        <Separator />
      </CardContent>
       <div className="px-6 pb-4 flex justify-around items-center text-muted-foreground">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" /> {post.reactions.likes}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> {post.reactions.comments}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="w-5 h-5" /> Share
            </Button>
        </div>
    </Card>
  );
}

function FriendRequests({ requests }: { requests: (typeof socialData.friendRequests) }) {
    if (requests.length === 0) return null;
    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Friend Requests ({requests.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {requests.map(req => (
                    <div key={req.id} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={req.avatar} alt={req.name} />
                                <AvatarFallback>{req.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{req.name}</p>
                                <p className="text-xs text-muted-foreground">{req.mutualFriends} mutual friends</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="outline">Decline</Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function FriendsList({ friends }: { friends: (typeof socialData.friends) }) {
    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>My Friends ({friends.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {friends.map(friend => (
                     <div key={friend.id} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Avatar className='relative'>
                                <AvatarImage src={friend.avatar} alt={friend.name} />
                                <AvatarFallback>{friend.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                {friend.status === 'active' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />}
                            </Avatar>
                            <div>
                                <p className="font-semibold">{friend.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {friend.activity}
                                    {friend.streak && friend.streak > 0 && <span className='flex items-center'><Flame className='w-3 h-3 text-orange-400 ml-1' /> {friend.streak}</span>}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                           <Button size="sm" variant="ghost">View</Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function SuggestedFriends({ suggestions }: { suggestions: (typeof socialData.suggestions) }) {
     if (suggestions.length === 0) return null;
    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>People You May Know</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {suggestions.map(sugg => (
                    <div key={sugg.id} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={sugg.avatar} alt={sugg.name} />
                                <AvatarFallback>{sugg.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{sugg.name}</p>
                                <p className="text-xs text-muted-foreground">{sugg.reason} · {sugg.mutualFriends} mutual friends</p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline"><Plus className='w-4 h-4 mr-2' /> Add</Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}


function ChallengeCard({ challenge }: { challenge: (typeof socialData.challenges)[0] }) {
    const isJoined = challenge.userRank !== null;
    return (
        <Link href={challenge.link}>
            <Card className="bg-card/50 hover:bg-muted/30 transition-colors">
                <CardHeader>
                    <div className="flex items-start justify-between">
                         <div className='flex items-center gap-3'>
                            <span className='text-3xl'>{challenge.icon}</span>
                            <div>
                                <CardTitle>{challenge.name}</CardTitle>
                                <CardDescription>{challenge.participants.toLocaleString()} participants</CardDescription>
                            </div>
                         </div>
                         <div className='text-right'>
                            <p className='text-xs text-muted-foreground'>{challenge.endsIn} left</p>
                            {isJoined ? 
                                <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Joined</span> :
                                <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">{challenge.type}</span>
                            }
                         </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isJoined && challenge.progress !== undefined && (
                        <div>
                             <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Your rank: #{challenge.userRank}</span>
                                <span>{challenge.progress}% complete</span>
                            </div>
                            <Progress value={challenge.progress} className="h-2" />
                        </div>
                    )}
                    {!isJoined && challenge.type === 'global' && (
                        <p className='text-sm text-yellow-400'>🏆 Prize: ₹500 gift card (Top 100)</p>
                    )}
                    {!isJoined && (
                         <Button className="w-full mt-4">Join Challenge</Button>
                    )}
                     {isJoined && (
                         <Button variant="outline" className="w-full mt-4">View Progress</Button>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
