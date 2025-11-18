
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CorporateManagePage() {
    const router = useRouter();
    const [corporateType, setCorporateType] = useState<'official' | 'unofficial'>('unofficial');
    const [groupName, setGroupName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [memberCount, setMemberCount] = useState(1);
    const [groupRole, setGroupRole] = useState<'admin' | 'member'>('member');
    const [referralCode, setReferralCode] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Load corporate data
        const type = localStorage.getItem('corporateType') as 'official' | 'unofficial' || 'unofficial';
        setCorporateType(type);
        setGroupName(localStorage.getItem('groupName') || 'Your Group');
        setCompanyName(localStorage.getItem('companyName') || 'Your Company');
        setMemberCount(parseInt(localStorage.getItem('groupMemberCount') || '1'));
        setGroupRole(localStorage.getItem('groupRole') as 'admin' | 'member' || 'member');
        setReferralCode(localStorage.getItem('referralCode') || '');
        setReferralLink(localStorage.getItem('referralLink') || '');
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareViaWhatsApp = () => {
        const text = encodeURIComponent(
        `Join our ${companyName} wellness group!\n\n${referralLink}\n\nLet's stay fit together! 💪`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const handleDisableCorporate = () => {
        if (confirm('Are you sure you want to disable corporate features? You can re-enable anytime.')) {
            localStorage.setItem('corporateEnabled', 'false');
            router.push('/dashboard');
        }
    };

    const handleLeaveGroup = () => {
        if (confirm('Are you sure you want to leave this group?')) {
            // Clear corporate data
            localStorage.removeItem('corporateEnabled');
            localStorage.removeItem('corporateType');
            localStorage.removeItem('groupId');
            localStorage.removeItem('groupName');
            localStorage.removeItem('groupRole');
            router.push('/dashboard');
        }
    };

    const handleDeleteGroup = () => {
        if (confirm('⚠️ This will permanently delete the group for all members. Are you sure?')) {
            // Clear all corporate data
            localStorage.removeItem('corporateEnabled');
            localStorage.removeItem('corporateType');
            localStorage.removeItem('groupId');
            localStorage.removeItem('groupName');
            localStorage.removeItem('groupRole');
            router.push('/dashboard');
        }
    };

    const isAdmin = groupRole === 'admin';
    const isUnofficialGroup = corporateType === 'unofficial';

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
                        ← Back
                    </button>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Corporate Wellness</h1>
                        <span className="bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                            Active
                        </span>
                    </div>
                </div>

                {/* Group Info Card */}
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold mb-2">{groupName}</h2>
                    <p className="text-muted-foreground mb-4">{companyName}</p>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="text-foreground font-medium">Active · {memberCount} member{memberCount !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="text-foreground font-medium capitalize">{corporateType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Your Role:</span>
                            <span className="text-foreground font-medium capitalize">{groupRole}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                        <button 
                            onClick={() => router.push('/group-created?code=' + referralCode)}
                            className="w-full bg-card/50 hover:bg-muted border border-border rounded-xl p-4 flex items-center justify-between transition-colors"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">👥</span>
                                <span className="font-medium">Invite Members</span>
                            </div>
                            <span className="text-muted-foreground">→</span>
                        </button>

                        <button 
                            onClick={() => router.push('/enterprise/leaderboard')}
                            className="w-full bg-card/50 hover:bg-muted border border-border rounded-xl p-4 flex items-center justify-between transition-colors"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">📊</span>
                                <span className="font-medium">View Leaderboard</span>
                            </div>
                            <span className="text-muted-foreground">→</span>
                        </button>

                        <button 
                            onClick={() => router.push('/enterprise/challenges')}
                            className="w-full bg-card/50 hover:bg-muted border border-border rounded-xl p-4 flex items-center justify-between transition-colors"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🏆</span>
                                <span className="font-medium">Active Challenges</span>
                            </div>
                            <span className="text-muted-foreground">→</span>
                        </button>

                        {isAdmin && (
                            <button 
                                className="w-full bg-card/50 hover:bg-muted border border-border rounded-xl p-4 flex items-center justify-between transition-colors"
                            >
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">⚙️</span>
                                    <span className="font-medium">Group Settings</span>
                                </div>
                                <span className="text-muted-foreground">→</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Referral Section (Unofficial only) */}
                {isUnofficialGroup && referralCode && (
                    <div className="mb-6 bg-card/50 border border-border rounded-xl p-6">
                        <h3 className="font-semibold mb-4">Your Referral Link</h3>
                        
                        <div className="mb-3">
                            <label className="block text-xs text-muted-foreground mb-2">Link</label>
                            <div className="flex items-center bg-input border border-border rounded-lg overflow-hidden">
                                <input
                                    type="text"
                                    value={referralLink}
                                    readOnly
                                    className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground"
                                />
                                <button
                                    onClick={() => copyToClipboard(referralLink)}
                                    className="px-3 py-2 bg-primary hover:bg-primary/90 text-sm transition-colors"
                                >
                                    {copied ? '✓' : '📋'}
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs text-muted-foreground mb-2">Code</label>
                            <div className="bg-input border border-border rounded-lg px-3 py-2">
                                <p className="text-lg font-mono font-semibold tracking-wider">{referralCode}</p>
                            </div>
                        </div>

                        <button
                            onClick={shareViaWhatsApp}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                            📱 Share via WhatsApp
                        </button>
                    </div>
                )}

                {/* Group Stats */}
                {memberCount >= 3 && (
                    <div className="mb-6 bg-card/50 border border-border rounded-xl p-6">
                        <h3 className="font-semibold mb-4">Group Stats</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Avg Health Score:</span>
                                <span className="text-xl font-bold text-accent">85</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Steps (Today):</span>
                                <span className="text-xl font-bold">68,400</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Active Challenges:</span>
                                <span className="text-xl font-bold text-primary">2</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Danger Zone */}
                <div className="mb-6 bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                    <h3 className="font-semibold mb-4 text-destructive">Danger Zone</h3>
                    <div className="space-y-3">
                        <Button
                            onClick={handleDisableCorporate}
                            variant="outline"
                            className="w-full border-destructive/30 text-destructive hover:bg-destructive/20 hover:text-destructive"
                        >
                            Disable Corporate Features
                        </Button>

                        {!isAdmin && (
                            <Button
                                onClick={handleLeaveGroup}
                                variant="outline"
                                className="w-full border-destructive/30 text-destructive hover:bg-destructive/20 hover:text-destructive"
                            >
                                Leave Group
                            </Button>
                        )}

                        {isAdmin && (
                            <Button
                                onClick={handleDeleteGroup}
                                variant="destructive"
                                className="w-full"
                            >
                                Delete Group (Permanent)
                            </Button>
                        )}
                    </div>
                </div>

                {/* Info Note */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">
                        💡 Your personal health data remains private. Only activity scores and challenge participation are visible to group members.
                    </p>
                </div>
            </div>
        </div>
    );
}

    