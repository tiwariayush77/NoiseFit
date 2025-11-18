'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const platforms = [
  {
    id: 'google-fit',
    name: 'Google Fit / Android',
    description: 'Sync from Google Fit app',
    icon: 'https://www.gstatic.com/images/branding/product/1x/gfit_512dp.png'
  },
  {
    id: 'apple-health',
    name: 'Apple Health / iPhone',
    description: 'Sync from Apple Health app',
    icon: 'https://developer.apple.com/assets/elements/icons/health-app/health-app-96x96_2x.png'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Sync from Fitbit account',
    icon: 'https://www.fitbit.com/global/content/dam/fitbit/global/pdp/charge6/hero-static/porcelain/charge6-porcelain-device-1.png'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    description: 'Sync from Garmin Connect',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Garmin_logo_2020.svg/1024px-Garmin_logo_2020.svg.png'
  },
  {
    id: 'other',
    name: 'Other fitness app',
    description: "We'll guide you through setup",
    icon: null
  }
];


function FitnessPlatformSelectContent() {
    const router = useRouter();
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedPlatform) {
            router.push(`/health-app-connect?platform=${selectedPlatform}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 flex items-center p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
                <Link href="/device-selection">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
                <div className='flex-1 text-center'>
                    <h1 className="text-lg font-semibold">No problem!</h1>
                    <p className="text-sm text-muted-foreground">Let's connect your existing tracker</p>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col items-center p-6 text-center">
                <div className="w-full max-w-md">
                     <div className="mb-8 text-center">
                        <p className="text-lg text-muted-foreground mb-2">Noise Intelligence works with most fitness trackers.</p>
                        <p className="font-semibold">What do you currently use?</p>
                    </div>

                    <div className="space-y-3 mb-8">
                        {platforms.map((platform) => (
                            <Card
                                key={platform.id}
                                onClick={() => setSelectedPlatform(platform.id)}
                                className={cn(
                                    "bg-card/50 cursor-pointer transition-all duration-200 border-2",
                                    selectedPlatform === platform.id
                                    ? 'border-accent bg-accent/10'
                                    : 'border-border/20 hover:border-accent/50'
                                )}
                            >
                                <CardContent className="p-4 flex items-center gap-4">
                                    {platform.icon ? (
                                        <Image src={platform.icon} alt={platform.name} width={40} height={40} className="p-1 bg-white rounded-md"/>
                                    ) : (
                                        <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
                                            <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="flex-1 text-left">
                                        <p className="font-medium">{platform.name}</p>
                                        <p className="text-sm text-muted-foreground">{platform.description}</p>
                                    </div>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                        selectedPlatform === platform.id ? "bg-accent border-accent" : "border-muted-foreground"
                                    )}>
                                        {selectedPlatform === platform.id && <CheckCircle2 className="w-6 h-6 text-background" strokeWidth={3} />}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Button
                        size="lg"
                        className="w-full"
                        onClick={handleContinue}
                        disabled={!selectedPlatform}
                    >
                        Continue
                    </Button>
                    
                    <div className="relative my-8">
                        <Separator />
                        <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">OR</span>
                    </div>

                     <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                            Want to get the full experience?
                        </p>
                        <Link href="/shop" passHref>
                            <Button variant="link" className="text-accent">
                                Browse Noise Shop →
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    )
}


export default function FitnessPlatformSelectPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FitnessPlatformSelectContent />
        </Suspense>
    )
}
