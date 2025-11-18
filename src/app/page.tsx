'use client';

import {
  Apple,
  Circle,
  Mail,
  Sparkles,
  Smartphone,
  Watch,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const benefits = [
  { text: 'Connect any fitness tracker', icon: <Check className="w-5 h-5 text-green-400" /> },
  { text: 'AI-powered health insights', icon: <Check className="w-5 h-5 text-green-400" /> },
  { text: 'Personalized recommendations', icon: <Check className="w-5 h-5 text-green-400" /> },
  { text: 'Cross-device analytics', icon: <Check className="w-5 h-5 text-green-400" /> },
];

const brands = ['Noise', 'Apple Watch', 'Garmin', 'boAt', 'Fire-Boltt', 'Amazfit'];

export default function WelcomePage() {
  const router = useRouter();
  
  const handleGetStarted = () => {
    // In a real app, you'd have a proper auth check service
    const isAuthenticated = !!localStorage.getItem('userId');
    if (isAuthenticated) {
      router.push('/device-search');
    } else {
      router.push('/sign-up');
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 text-center animate-fade-in-up bg-background text-foreground">
      
       <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="text-xl font-bold">NoiseFit</div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto">
        <div className="relative h-32 w-full flex items-center justify-center mb-8">
          <motion.div
            className="relative w-24 h-24"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Watch className="absolute inset-0 m-auto w-16 h-16 text-white opacity-0 animate-fade-in-out" style={{ animationDelay: '0s' }} />
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full border-2 border-primary opacity-0 animate-fade-in-out" style={{ animationDelay: '1.5s' }}></div>
          </motion.div>
           <div
            className="absolute inset-0 m-auto w-20 h-20 bg-primary/30 blur-2xl rounded-full animate-pulse"
          ></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text">
          AI Health Insights for Any Wearable
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Works with Noise devices, Apple Watch, Fitbit, Garmin, and <b>more</b>
        </p>

        <div className="space-y-3 text-left mb-8 self-start w-full">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              {benefit.icon}
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleGetStarted}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white transition-transform transform hover:scale-102 hover:shadow-lg hover:shadow-accent/20"
        >
          Get Started
        </Button>
        
        <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline underline-offset-4">
                Sign In
            </Link>
        </p>

        <p className="text-xs text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </main>
    </div>
  );
}
