'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  Watch,
  ToyBrick,
  Smartphone,
  Plus,
  Minus,
  Check,
  Bluetooth,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


export default function DeviceSearchPage() {
  const router = useRouter();
  
  const handleSmartScan = () => {
    // For demo, we'll use query params to simulate different scan results
    const scenarios = ['noise', 'other', 'both', 'none'];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    router.push(`/device-connect?scenario=${randomScenario}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center p-4 border-b border-border/20 bg-background">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div className="text-center flex-1">
            <h1 className="text-lg font-semibold">Find Your Devices</h1>
            <p className="text-sm text-muted-foreground">Detect any wearable automatically</p>
        </div>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
            <Card 
                className="bg-gradient-to-br from-primary/20 to-purple-500/20 border-primary/30 text-center"
                onClick={handleSmartScan}
            >
                <CardHeader>
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <Bluetooth className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Smart Detection</CardTitle>
                    <CardDescription>Find any device automatically</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-left text-sm text-muted-foreground space-y-2 mb-6">
                        <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Noise watches & rings</p>
                        <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Other brand wearables</p>
                        <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Fitness apps on your phone</p>
                    </div>
                    <Button size="lg" className="w-full">Scan for Devices</Button>
                </CardContent>
            </Card>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">OR</span></div>
            </div>

            <div className="space-y-4">
                 <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/device-search-manual')}>
                    <Search className="mr-2"/>
                    Search by device name
                </Button>
                 <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/fitness-platform-select')}>
                    <Smartphone className="mr-2"/>
                    Connect a fitness app
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
