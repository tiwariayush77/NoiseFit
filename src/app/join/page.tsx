'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function JoinGroupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';

  const [groupInfo, setGroupInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if user is already registered (mock check)
    const userId = localStorage.getItem('userId'); // In a real app, this would be a session check
    setIsRegistered(!!userId);

    // Fetch group info from referral code
    fetchGroupInfo(referralCode);
  }, [referralCode]);

  const fetchGroupInfo = async (code: string) => {
    if (!code) {
      setError('Invalid referral link');
      setLoading(false);
      return;
    }
    // Simulate API call to fetch group details
    setTimeout(() => {
      // Mock data based on referral code pattern
      // Format: FIRSTNAME-COMPANY-RANDOM (e.g., AYUSH-TCS-XY2Z)
      const parts = code.split('-');
      if (parts.length < 2) {
        setError('Invalid referral code format');
        setLoading(false);
        return;
      }
      const creatorName = parts[0] || 'Someone';
      const companyCode = parts[1] || 'COMPANY';

      // Mock group info
      setGroupInfo({
        referralCode: code,
        creatorName: creatorName.charAt(0) + creatorName.slice(1).toLowerCase(),
        groupName: `${getCompanyName(companyCode)} Fitness Squad`,
        companyName: getCompanyName(companyCode),
        memberCount: Math.floor(Math.random() * 10) + 3,
        avgScore: 85,
        activeChallenges: 2,
      });

      setLoading(false);
    }, 1000);
  };

  const getCompanyName = (code: string): string => {
    const companies: Record<string, string> = {
      TCS: 'Tata Consultancy Services',
      INFO: 'Infosys Limited',
      WIPR: 'Wipro Limited',
      RELI: 'Reliance Industries',
      HDFC: 'HDFC Bank',
      ICICI: 'ICICI Bank',
    };
    return companies[code] || `${code} Company`;
  };

  const handleJoinGroup = () => {
    // Store referral info for later use during/after signup
    sessionStorage.setItem('referralCode', referralCode);
    sessionStorage.setItem('prefilledGroupName', groupInfo.groupName);
    sessionStorage.setItem('prefilledCompanyName', groupInfo.companyName);
    sessionStorage.setItem('corporateEnabled', 'true');
    sessionStorage.setItem('corporateType', 'unofficial');

    if (isRegistered) {
      // User already registered, join group directly
      // Copy to localStorage
      localStorage.setItem('corporateEnabled', 'true');
      localStorage.setItem('corporateType', 'unofficial');
      localStorage.setItem('groupName', groupInfo.groupName);
      localStorage.setItem('companyName', groupInfo.companyName);
      localStorage.setItem('referredBy', groupInfo.creatorName);
      localStorage.setItem('groupRole', 'member');

      router.push('/dashboard');
    } else {
      // New user, go to sign up. Post-signup logic would use sessionStorage
      router.push('/sign-up');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">⏳</div>
          <p className="text-xl">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !groupInfo) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-2">Invalid Invitation</h1>
          <p className="text-muted-foreground mb-6">
            This referral link is invalid or has expired.
          </p>
          <Button onClick={() => router.push('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 border-b border-border/20">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Noise Intelligence</h1>
          {isRegistered && (
            <Button
              onClick={() => router.push('/dashboard')}
              variant="ghost"
              className="text-sm"
            >
              Skip
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8 pt-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
            {groupInfo.creatorName.charAt(0)}
          </div>
          
          <h1 className="text-2xl font-bold mb-2">
            {groupInfo.creatorName} invited you to join
          </h1>
          <p className="text-3xl font-bold text-primary mb-1">{groupInfo.groupName}</p>
          <p className="text-muted-foreground">at {groupInfo.companyName}</p>
        </div>

        <div className="bg-card/50 border border-border/20 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">💪</div>
              <p className="text-2xl font-bold">{groupInfo.memberCount}</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-2xl font-bold">{groupInfo.activeChallenges}</p>
              <p className="text-xs text-muted-foreground">Challenges</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📊</div>
              <p className="text-2xl font-bold">{groupInfo.avgScore}</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">What you'll get:</h3>
          <div className="space-y-3">
            <div className="flex items-start bg-muted/30 border border-border/20 rounded-xl p-4">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <p className="font-medium">Team Challenges & Leaderboards</p>
                <p className="text-sm text-muted-foreground">Compete with your colleagues in fun fitness challenges</p>
              </div>
            </div>
            <div className="flex items-start bg-muted/30 border border-border/20 rounded-xl p-4">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <p className="font-medium">Track Collective Progress</p>
                <p className="text-sm text-muted-foreground">See how your team is performing together</p>
              </div>
            </div>
            <div className="flex items-start bg-muted/30 border border-border/20 rounded-xl p-4">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <p className="font-medium">Motivate Each Other</p>
                <p className="text-sm text-muted-foreground">Stay accountable with workplace friends</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleJoinGroup}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white mb-4"
        >
          {isRegistered ? 'Join Group Now' : 'Join Group & Get Started'}
        </Button>

        <Button
          onClick={() => router.push('/')}
          variant="link"
          className="w-full text-center"
        >
          Learn More About Noise Intelligence
        </Button>

        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-xs text-muted-foreground">Your data stays private</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-xs text-muted-foreground">4.8 rating on stores</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👥</div>
              <p className="text-xs text-muted-foreground">100k+ active users</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-muted/20 border border-border/20 rounded-lg p-4">
          <p className="text-xs text-muted-foreground text-center">
            🔒 Only your activity scores are shared with the group. Personal health data remains private.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function JoinGroupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <JoinGroupContent />
        </Suspense>
    )
}
