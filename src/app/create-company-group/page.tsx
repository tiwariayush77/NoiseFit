'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function CreateCompanyGroupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyName = searchParams.get('company') || 'Your Company';
    const companyDomain = searchParams.get('domain') || '';

    const [groupName, setGroupName] = useState(`${companyName} Fitness Squad`);
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState<'open' | 'invite'>('open');
    const [isCreating, setIsCreating] = useState(false);

    const generateGroupId = () => {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 7);
        return `${companyDomain.split('.')[0]}-${timestamp}-${random}`;
    };

    const generateReferralCode = (groupId: string) => {
        const userName = localStorage.getItem('userName') || 'USER';
        const firstName = userName.split(' ')[0].toUpperCase();
        const companyShort = companyDomain.split('.')[0].substring(0, 4).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${firstName}-${companyShort}-${random}`;
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            alert('Please enter a group name');
            return;
        }
        setIsCreating(true);

        setTimeout(() => {
            const groupId = generateGroupId();
            const referralCode = generateReferralCode(groupId);
            const referralLink = `https://noise.app/join?ref=${referralCode}`;

            localStorage.setItem('corporateEnabled', 'true');
            localStorage.setItem('corporateType', 'unofficial');
            localStorage.setItem('groupId', groupId);
            localStorage.setItem('groupName', groupName);
            localStorage.setItem('companyName', companyName);
            localStorage.setItem('companyDomain', companyDomain);
            localStorage.setItem('groupDescription', description);
            localStorage.setItem('groupPrivacy', privacy);
            localStorage.setItem('groupRole', 'admin');
            localStorage.setItem('referralCode', referralCode);
            localStorage.setItem('referralLink', referralLink);
            localStorage.setItem('groupMemberCount', '1');

            router.push(`/group-created?code=${referralCode}`);
        }, 1500);
    };

    const exampleNames = [
        `${companyName} Wellness Warriors`,
        `${companyName} Fit Squad`,
        `${companyName} Health Champions`
    ];

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <div className="max-w-md mx-auto">
                <header className="mb-8">
                    <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4">
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold mb-2">Create Company Group</h1>
                    <p className="text-muted-foreground">Start your workplace wellness squad</p>
                </header>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <div className="bg-muted border border-border rounded-lg px-4 py-3 flex items-center justify-between">
                        <span className="text-foreground">{companyName}</span>
                        <span className="text-xs bg-card text-muted-foreground px-2 py-1 rounded">Auto-filled</span>
                    </div>
                    {companyDomain && <p className="text-xs text-muted-foreground mt-1">From your email: *@{companyDomain}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Group Name *</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder={`${companyName} Fitness Squad`}
                        maxLength={50}
                        className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{groupName.length}/50 characters</p>
                    
                    <div className="mt-3 bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-2">💡 Example names:</p>
                        <div className="space-y-1">
                            {exampleNames.map((example, idx) => (
                                <button
                                key={idx}
                                onClick={() => setGroupName(example)}
                                className="block text-xs text-accent hover:underline"
                                >
                                {example}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                        Description <span className="text-muted-foreground">(Optional)</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What's your group about? (e.g., Our team's wellness journey)"
                        maxLength={150}
                        rows={3}
                        className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{description.length}/150 characters</p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Who can join?</label>
                    <div className="space-y-3">
                        <button
                            onClick={() => setPrivacy('open')}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                privacy === 'open'
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-card/50 hover:border-muted-foreground/50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium mb-1">Anyone with company email</p>
                                    <p className="text-xs text-muted-foreground">Anyone from @{companyDomain} can join with invite link</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                privacy === 'open' ? 'border-primary bg-primary' : 'border-muted-foreground'
                                }`}>
                                {privacy === 'open' && <span className="text-white text-xs">✓</span>}
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setPrivacy('invite')}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                privacy === 'invite'
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-card/50 hover:border-muted-foreground/50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium mb-1">Only people I invite</p>
                                    <p className="text-xs text-muted-foreground">You manually approve each member</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                privacy === 'invite' ? 'border-primary bg-primary' : 'border-muted-foreground'
                                }`}>
                                {privacy === 'invite' && <span className="text-white text-xs">✓</span>}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="mb-8 bg-card/50 border border-border rounded-xl p-4">
                    <h3 className="text-sm font-semibold mb-3 flex items-center">
                        <span className="mr-2">📋</span>
                        Group Guidelines
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                        <span className="text-accent mr-2">- </span>
                        <span>Minimum 3 members needed to activate team features</span>
                        </li>
                        <li className="flex items-start">
                        <span className="text-accent mr-2">- </span>
                        <span>You'll be the group admin with management rights</span>
                        </li>
                        <li className="flex items-start">
                        <span className="text-accent mr-2">- </span>
                        <span>Members can leave the group anytime</span>
                        </li>
                        <li className="flex items-start">
                        <span className="text-accent mr-2">- </span>
                        <span>Only aggregated activity data is shared within group</span>
                        </li>
                    </ul>
                </div>

                <Button
                    onClick={handleCreateGroup}
                    disabled={!groupName.trim() || isCreating}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-4 rounded-xl transition-all mb-4 disabled:from-muted disabled:to-muted"
                >
                {isCreating ? (
                    <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⏳</span>
                    Creating Group...
                    </span>
                ) : (
                    'Create Group & Get Invite Link'
                )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                🔒 Your personal health data remains private. Only activity scores are visible to group members.
                </p>
            </div>
        </div>
    );
}
