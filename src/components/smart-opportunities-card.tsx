'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function SmartOpportunitiesCard() {
  const router = useRouter();

  const topOpportunity = {
    icon: '🧘',
    title: '5-minute breathing at 2 PM',
    subtitle: 'Works 9 out of 10 times for you 🔥',
    ctaPrimary: 'Remind Me at 2 PM',
    ctaSecondary: 'Start Now',
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white mb-3">Today's Top Action</h2>
      
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 rounded-xl">
        <div className="bg-card rounded-xl p-5">
          <div className="flex items-start mb-4">
            <span className="text-4xl mr-3">{topOpportunity.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-white text-base mb-2">
                {topOpportunity.title}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {topOpportunity.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button className="flex-1 py-3 h-auto bg-primary hover:bg-primary/90 font-semibold text-sm">
              {topOpportunity.ctaPrimary}
            </Button>
            <Button variant="secondary" className="flex-1 py-3 h-auto bg-primary/70 hover:bg-primary/80 font-semibold text-sm">
              {topOpportunity.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => router.push('/intelligence')}
        className="mt-3 text-sm text-accent hover:text-accent/80 w-full text-center transition-colors"
      >
        View all opportunities →
      </button>
    </div>
  );
}
