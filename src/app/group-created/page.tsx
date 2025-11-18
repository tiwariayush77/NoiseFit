'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GroupCreatedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const referralCode = searchParams.get('code') || '';

    const [groupName, setGroupName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [copied, setCopied] = useState<'link' | 'code' | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        // Load group details from storage
        setGroupName(localStorage.getItem('groupName') || 'Your Group');
        setCompanyName(localStorage.getItem('companyName') || 'Your Company');
        setReferralLink(localStorage.getItem('referralLink') || `https://noise.app/join?ref=${referralCode}`);

        // Trigger success animation
        setShowAnimation(true);
    }, [referralCode]);

    const copyToClipboard = (text: string, type: 'link' | 'code') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const shareViaEmail = () => {
        const subject = encodeURIComponent(`Join our ${companyName} wellness group!`);
        const body = encodeURIComponent(
        `Hey! 👋\n\nI've created a wellness group for ${companyName} on Noise Intelligence.\n\n` +
        `Join us to track health, compete in challenges, and stay fit together!\n\n` +
        `Click here to join: ${referralLink}\n\n` +
        `Or use code: ${referralCode}\n\n` +
        `See you there! 💪`
        );
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    };

    const shareViaWhatsApp = () => {
        const text = encodeURIComponent(
        `Hey! 👋 Join our ${companyName} wellness group on Noise Intelligence!\n\n` +
        `${referralLink}\n\n` +
        `Let's stay fit together! 💪`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareViaSMS = () => {
        const text = encodeURIComponent(
        `Join our ${companyName} wellness group! ${referralLink}`
        );
        window.open(`sms:?body=${text}`, '_blank');
    };

    const shareViaOther = () => {
        if (navigator.share) {
            navigator.share({
                title: `Join ${groupName}`,
                text: `Join our ${companyName} wellness group on Noise Intelligence!`,
                url: referralLink
            });
        } else {
            copyToClipboard(referralLink, 'link');
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8 mt-12">
                    <div
                        className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 mb-4 transition-all duration-500 transform ${showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    >
                        <span className="text-5xl text-white">✓</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Group Created!</h1>
                    <p className="text-muted-foreground">Your workplace wellness squad is ready</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8 text-left">
                    <h2 className="text-xl font-bold mb-2">{groupName}</h2>
                    <p className="text-muted-foreground mb-3">{companyName}</p>
                    <div className="flex items-center text-sm">
                        <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
                        <span className="text-muted-foreground">Active · 1 member (You)</span>
                    </div>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Invite Your Colleagues</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm text-muted-foreground mb-2">Referral Link</label>
                        <div className="flex items-center bg-input border border-border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="flex-1 bg-transparent px-4 py-3 text-foreground text-sm"
                        />
                        <button
                            onClick={() => copyToClipboard(referralLink, 'link')}
                            className="px-4 py-3 bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
                        >
                            {copied === 'link' ? '✓' : '📋'}
                        </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-muted-foreground mb-2">Referral Code</label>
                        <div className="flex items-center bg-input border border-border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            value={referralCode}
                            readOnly
                            className="flex-1 bg-transparent px-4 py-3 text-foreground text-xl font-mono font-semibold tracking-wider"
                        />
                        <button
                            onClick={() => copyToClipboard(referralCode, 'code')}
                            className="px-4 py-3 bg-primary hover:bg-primary/90 transition-colors text-primary-foreground"
                        >
                            {copied === 'code' ? '✓' : '📋'}
                        </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        <button
                        onClick={shareViaEmail}
                        className="bg-card/50 hover:bg-muted border border-border rounded-lg p-4 flex flex-col items-center justify-center transition-colors"
                        >
                        <span className="text-2xl mb-1">📧</span>
                        <span className="text-xs text-muted-foreground">Email</span>
                        </button>
                        <button
                        onClick={shareViaWhatsApp}
                        className="bg-card/50 hover:bg-muted border border-border rounded-lg p-4 flex flex-col items-center justify-center transition-colors"
                        >
                        <span className="text-2xl mb-1">💬</span>
                        <span className="text-xs text-muted-foreground">WhatsApp</span>
                        </button>
                        <button
                        onClick={shareViaSMS}
                        className="bg-card/50 hover:bg-muted border border-border rounded-lg p-4 flex flex-col items-center justify-center transition-colors"
                        >
                        <span className="text-2xl mb-1">📱</span>
                        <span className="text-xs text-muted-foreground">SMS</span>
                        </button>
                        <button
                        onClick={shareViaOther}
                        className="bg-card/50 hover:bg-muted border border-border rounded-lg p-4 flex flex-col items-center justify-center transition-colors"
                        >
                        <span className="text-2xl mb-1">🔗</span>
                        <span className="text-xs text-muted-foreground">More</span>
                        </button>
                    </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">📌</span>
                        What's Next?
                    </h3>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start">
                        <span className="font-bold text-accent mr-3">1.</span>
                        <span>Share the invite link with your colleagues</span>
                        </li>
                        <li className="flex items-start">
                        <span className="font-bold text-accent mr-3">2.</span>
                        <span>Wait for 3+ members to join your group</span>
                        </li>
                        <li className="flex items-start">
                        <span className="font-bold text-accent mr-3">3.</span>
                        <span>Team features will automatically activate</span>
                        </li>
                    </ol>
                </div>

                <Button
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-4 rounded-xl transition-all mb-4"
                >
                    Go to Dashboard
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                    💡 You can find this invite link anytime in Settings → Corporate Wellness
                </p>
            </div>
        </div>
    );
}
