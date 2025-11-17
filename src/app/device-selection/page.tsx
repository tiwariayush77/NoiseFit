'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SmartphoneNfc, Watch, ToyBrick, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeviceSelectionPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Let's connect your devices</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-10 text-primary">
            <SmartphoneNfc size={200} strokeWidth={0.5} />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            WHICH DEVICES DO YOU USE?
          </h2>

          <p className="text-muted-foreground mb-8">
            Connect everything you wear or track with. The more you connect, the
            smarter your insights become.
          </p>

          <div className="bg-card/50 p-6 rounded-lg text-left space-y-4 mb-8 border border-border/20">
            <p className="font-semibold">We work with:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Watch className="w-5 h-5 text-accent" />
                <span>Smartwatches (Noise, Apple, etc)</span>
              </li>
              <li className="flex items-center gap-3">
                <ToyBrick className="w-5 h-5 text-accent" />
                <span>Smart rings (Luna, Oura-like)</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-accent" />
                <span>Fitness apps (Google Fit, Apple Health)</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground pt-2">
              Don't worry, you can always add or remove devices later.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/device-search" className="block">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">
                Choose my devices <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>
              I'm just exploring 👀
            </Button>
             <p className="text-xs text-muted-foreground">Browse with sample data</p>
          </div>
        </div>
      </main>
    </div>
  );
}
