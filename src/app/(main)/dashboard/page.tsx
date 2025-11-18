'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import EnergyScoreCard from '@/components/energy-score-card';
import TodayVitalsCard from '@/components/today-vitals-card';
import SmartTimelineCard from '@/components/smart-timeline-card';
import TopOpportunitiesCard from '@/components/top-opportunities-card';
import QuickActionsCard from '@/components/quick-actions-card';
import SocialPage from '@/app/(main)/social/page';
import ShopPage from '@/app/(main)/shop/page';

// Team Tab Content Component
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


function PersonalTabContent() {
    return (
        <div className="space-y-6">
            <EnergyScoreCard />
            <TodayVitalsCard />
            <SmartTimelineCard />
            <TopOpportunitiesCard />
            <QuickActionsCard />
        </div>
    );
}

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'personal' | 'team' | 'social' | 'shop'>('personal');
    const [corporateEnabled, setCorporateEnabled] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [memberCount, setMemberCount] = useState(1);
    const [teamNotifications, setTeamNotifications] = useState(0);

    useEffect(() => {
        const isEnabled = localStorage.getItem('corporateEnabled') === 'true';
        setCorporateEnabled(isEnabled);
        if (isEnabled) {
            setGroupName(localStorage.getItem('groupName') || 'Your Team');
            setMemberCount(parseInt(localStorage.getItem('groupMemberCount') || '1', 10));
            setTeamNotifications(2); // Mock notifications
        }
    }, []);

    const TabButton = ({ tab, label, children }: { tab: string; label: string; children?: React.ReactNode }) => (
        <button
            onClick={() => setActiveTab(tab as any)}
            className={cn(
                'flex-1 py-3 text-sm font-medium transition-colors relative',
                activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
        >
            {label}
            {children}
            {activeTab === tab && (
                <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5",
                    tab === 'personal' && 'bg-accent',
                    tab === 'team' && 'bg-blue-500',
                    tab === 'social' && 'bg-purple-500',
                    tab === 'shop' && 'bg-orange-500',
                )}></div>
            )}
        </button>
    );

    return (
        <div className="flex flex-col">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/20">
                 <div className="flex space-x-1 px-2">
                    <TabButton tab="personal" label="Personal" />
                    {corporateEnabled && (
                        <TabButton tab="team" label="Team">
                            {teamNotifications > 0 && (
                                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                    {teamNotifications}
                                </span>
                            )}
                        </TabButton>
                    )}
                    <TabButton tab="social" label="Social" />
                    <TabButton tab="shop" label="Shop" />
                </div>
            </div>

            <div className="py-6">
                {activeTab === 'personal' && <PersonalTabContent />}
                {activeTab === 'team' && corporateEnabled && <TeamTabContent groupName={groupName} memberCount={memberCount} />}
                {activeTab === 'social' && <SocialPage />}
                {activeTab === 'shop' && <ShopPage />}
            </div>

            {activeTab === 'personal' && !corporateEnabled && (
                <div className="fixed bottom-20 left-0 right-0 px-4 pb-4">
                    <div className="max-w-md mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium mb-1">💼 Want team features?</p>
                                <p className="text-xs text-muted-foreground">Connect with colleagues</p>
                            </div>
                            <button
                                onClick={() => router.push('/corporate-setup')}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                Enable
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
