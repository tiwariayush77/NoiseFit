'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type TimeRange = '7d' | '30d' | '90d' | 'all';

function HealthAppHistoryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const platform = searchParams.get('platform') || 'google-fit';
    const [selectedRange, setSelectedRange] = useState<TimeRange>('30d');

    const rangeOptions = [
    {
        id: '7d' as TimeRange,
        label: 'Last 7 days',
        description: 'Quick setup',
        records: '~500 records',
        time: '~30 seconds',
        size: '3 MB'
    },
    {
        id: '30d' as TimeRange,
        label: 'Last 30 days',
        description: 'Good baseline',
        records: '~2,000 records',
        time: '~1-2 minutes',
        size: '12 MB',
        recommended: true
    },
    {
        id: '90d' as TimeRange,
        label: 'Last 90 days',
        description: 'Best insights',
        records: '~6,000 records',
        time: '~3-4 minutes',
        size: '35 MB'
    },
    {
        id: 'all' as TimeRange,
        label: 'All available data',
        description: 'Maximum accuracy',
        records: '~20,000+ records',
        time: '~5-8 minutes',
        size: '100+ MB'
    }
    ];

    const selectedOption = rangeOptions.find(opt => opt.id === selectedRange);

    const handleStartImport = () => {
        router.push(`/data-sync?platform=${platform}&range=${selectedRange}`);
    };

    const handleSkip = () => {
        router.push(`/data-sync?platform=${platform}&range=none`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
             <header className="sticky top-0 z-10 flex items-center p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <div className='flex-1 text-center'>
                    <h1 className="text-lg font-semibold">Import History</h1>
                    <p className="text-sm text-muted-foreground">Choose how far back to sync</p>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col items-center p-6 text-center">
                <div className="w-full max-w-md">

                    <p className="text-lg mb-6 text-left">How much history should we import?</p>

                    <div className="space-y-3 mb-6 text-left">
                    {rangeOptions.map((option) => (
                        <Card
                        key={option.id}
                        onClick={() => setSelectedRange(option.id)}
                        className={cn(
                            "bg-card/50 cursor-pointer transition-all duration-200 border-2",
                            selectedRange === option.id
                            ? 'border-accent bg-accent/10'
                            : 'border-border/20 hover:border-accent/50'
                        )}
                        >
                        <CardContent className="p-4 flex items-start gap-4">
                             <div className={cn(
                                'w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0',
                                selectedRange === option.id ? 'border-accent bg-accent' : 'border-muted-foreground'
                            )}>
                                {selectedRange === option.id && <Check className="w-3 h-3 text-background" />}
                            </div>
                             <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <p className="font-semibold">{option.label}</p>
                                    {option.recommended && (
                                    <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                                        Recommended
                                    </span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {option.description} · {option.records}
                                </p>
                                <p className="text-xs text-muted-foreground/70 mt-1">
                                    Estimated time: {option.time}
                                </p>
                                </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>

                    <Card className="bg-primary/10 border-primary/20 text-primary mb-6 text-left">
                        <CardHeader className="flex-row items-center gap-3">
                        <Info className="w-5 h-5" />
                        <CardTitle className="text-base">Why Import History?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-2">More history helps our AI:</p>
                             <ul className="space-y-1 text-sm list-disc list-inside">
                                <li>Identify long-term patterns</li>
                                <li>Provide accurate baselines</li>
                                <li>Compare current vs past trends</li>
                                <li>Detect anomalies better</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="bg-muted/30 rounded-lg p-4 mb-6 text-sm text-left">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Est. Import Size:</span>
                            <span className="font-semibold">{selectedOption?.size}</span>
                        </div>
                    </div>


                    <Button
                        onClick={handleStartImport}
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-purple-600 text-white mb-4"
                    >
                        Start Import ({selectedOption?.label})
                    </Button>

                    <Button
                        onClick={handleSkip}
                        variant="link"
                        className="w-full text-center text-sm text-muted-foreground"
                    >
                        Skip - Import only new data going forward
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-2">
                        You can import more history later from Settings
                    </p>
                </div>
            </main>
        </div>
    );
}


export default function HealthAppHistoryPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HealthAppHistoryContent />
        </Suspense>
    )
}
