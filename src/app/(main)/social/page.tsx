'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Social</h1>
        <Button variant="ghost" size="icon">
          <UserPlus />
        </Button>
      </header>

      <Tabs defaultValue="feed" className="w-full flex-1 flex flex-col" onValueChange={setActiveTab}>
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="feed" className="flex-1 overflow-y-auto space-y-4 p-4">
          {socialData.feed.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
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
