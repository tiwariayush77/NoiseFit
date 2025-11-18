
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const [corporateEnabled, setCorporateEnabled] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [groupRole, setGroupRole] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage
    const enabled = localStorage.getItem('corporateEnabled') === 'true';
    const company = localStorage.getItem('companyName');
    const role = localStorage.getItem('groupRole');

    setCorporateEnabled(enabled);
    setCompanyName(company);
    setGroupRole(role);
  }, []);

  const handleEnableCorporate = () => {
    router.push('/corporate-setup');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Personal Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="bg-card/50 border border-border/20 rounded-xl p-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-foreground font-medium">Rahul Sharma</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">rahul@gmail.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="text-foreground font-medium">Nov 18, 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Wellness Section - CONDITIONAL */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Corporate Wellness</h2>
          
          {corporateEnabled && companyName ? (
            // ENABLED STATE - Show real data
            <div className="bg-card/50 border border-border/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💼</span>
                  <div>
                    <p className="text-sm text-green-400 font-medium">✓ Connected</p>
                    <p className="text-foreground font-semibold">{companyName}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="text-foreground">{groupRole || 'Member'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Group Members</span>
                  <span className="text-foreground">{typeof window !== 'undefined' ? localStorage.getItem('groupMemberCount') || '1' : '1'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => router.push('/corporate-manage')}
                  className="flex-1"
                >
                  Manage Group
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                >
                  Leave Group
                </Button>
              </div>
            </div>
          ) : (
            // NULL STATE - Not enabled
            <div className="bg-card/50 border border-border/20 rounded-xl p-6">
              <div className="text-center py-4">
                <div className="text-5xl mb-4">💼</div>
                <p className="text-lg font-semibold text-muted-foreground mb-2">
                  Not Connected
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Connect your company to access team challenges, leaderboards, and corporate wellness programs.
                </p>

                <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
                  <p className="text-xs font-semibold text-foreground mb-2">Benefits:</p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-accent mr-2">✓</span>
                      Join team fitness challenges
                    </li>
                    <li className="flex items-center">
                      <span className="text-accent mr-2">✓</span>
                      Compete on group leaderboards
                    </li>
                    <li className="flex items-center">
                      <span className="text-accent mr-2">✓</span>
                      Share achievements with colleagues
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handleEnableCorporate}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"
                >
                  Enable Corporate Features
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* Health Goals Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Health Goals</h2>
          <div className="bg-card/50 border border-border/20 rounded-xl p-6">
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">😴</span>
                <span className="text-foreground">Sleep Better</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-400 mr-2">💪</span>
                <span className="text-foreground">Build Strength</span>
              </div>
            </div>
            <Button
              onClick={() => router.push('/goal-selection')}
              variant="secondary"
              className="w-full"
            >
              Edit Goals
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
