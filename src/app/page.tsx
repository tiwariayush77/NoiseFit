import {
  Apple,
  Circle,
  Mail,
  Sparkles,
  Smartphone,
  Watch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const benefits = [
  { text: 'Know exactly when to workout', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { text: 'Understand why you\'re tired', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { text: 'Get sleep tips that work for you', icon: <Sparkles className="w-5 h-5 text-accent" /> },
  { text: 'Compete with friends (any brand)', icon: <Sparkles className="w-5 h-5 text-accent" /> },
];

const brands = ['Noise', 'Apple Watch', 'Garmin', 'boAt', 'Fire-Boltt', 'Amazfit'];

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 text-center animate-fade-in-up">
      <main className="flex flex-col items-center justify-center flex-1 max-w-md mx-auto">
        <div className="relative h-32 w-full flex items-center justify-center mb-8">
          <div className="relative w-24 h-24">
            <Watch className="absolute inset-0 m-auto w-16 h-16 text-white animate-fade-in-out" />
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full border-2 border-white animate-fade-in-out animation-delay-3000"></div>
          </div>
           <div
            className="absolute inset-0 m-auto w-20 h-20 bg-primary/30 blur-2xl rounded-full animate-pulse"
          ></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          MEET YOUR HEALTH COACH
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          We turn your wearable data into actions that actually work
        </p>

        <div className="space-y-3 text-left mb-8 self-start">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              {benefit.icon}
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="text-left w-full mb-8">
          <p className="text-sm text-muted-foreground mb-3">Works with:</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <div
                key={brand}
                className="text-xs px-3 py-1 bg-white/10 rounded-full"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        <Link href="/dashboard" className="w-full">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white hover:scale-102 transition-transform hover:shadow-lg hover:shadow-accent/20"
          >
            Begin your journey 🚀
          </Button>
        </Link>

        <div className="mt-8 text-center w-full">
          <p className="text-sm text-muted-foreground mb-4">Continue with:</p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.9-4.32 1.9-3.42 0-6.22-2.8-6.22-6.22s2.8-6.22 6.22-6.22c1.93 0 3.25.78 4.22 1.7l2.76-2.76C19.01 1.97 16.25 1 12.48 1 5.83 1 1 5.83 1 12.48s4.83 11.48 11.48 11.48c6.4 0 11.02-4.56 11.02-11.02 0-.74-.06-1.42-.18-2.08h-9.84z"/></svg>
                <span className="sr-only">Google</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <Apple className="h-5 w-5" />
                <span className="sr-only">Apple</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
