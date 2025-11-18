'use client';

import { Button } from '@/components/ui/button';
import { Briefcase, HeartPulse, Sparkles, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const benefits = [
  { text: 'Earn wellness credits (₹2,400/year)', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { text: 'Join team challenges', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { text: 'Compete on company leaderboard', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { text: 'Your health data stays private', icon: <Sparkles className="w-5 h-5 text-accent" /> },
];

export default function CompanyWellnessPage() {
  const router = useRouter();

  const handleLinkAccount = () => {
    router.push('/corporate-setup');
  };

  const handleSkip = () => {
    router.push('/goal-selection');
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6 text-center animate-fade-in-up bg-background text-foreground">
      <main className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto">
        <div className="relative h-32 w-full flex items-center justify-center mb-8">
            <Briefcase className="w-20 h-20 text-primary" />
            <HeartPulse className="absolute w-12 h-12 text-accent" style={{ transform: 'translate(30px, 20px)'}} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          UNLOCK COMPANY WELLNESS BENEFITS
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          We detected you work at Acme Corp
        </p>

        <div className="space-y-3 text-left mb-8 self-start w-full">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              {benefit.icon}
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-card/50 p-4 rounded-lg text-left space-y-2 mb-8 border border-border/20 w-full">
            <p className="font-semibold flex items-center gap-2"><Lock className='w-4 h-4' /> Your Privacy Matters</p>
            <p className='text-sm text-muted-foreground'>Company sees only aggregated team stats, no individual health details. Your personal data stays with you.</p>
        </div>


        <div className="w-full space-y-4">
          <Button
              onClick={handleLinkAccount}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-purple-600 text-white transition-transform transform hover:scale-102 hover:shadow-lg hover:shadow-accent/20"
          >
              Link Company Account ✨
          </Button>
          <Button onClick={handleSkip} size="lg" variant="outline" className="w-full">
              Skip for Now
          </Button>
        </div>


        <p className="text-sm text-muted-foreground mt-8">
            You can link this anytime from settings
        </p>
      </main>
    </div>
  );
}
