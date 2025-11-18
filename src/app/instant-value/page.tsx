'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Footprints, Heart, BedDouble, Dumbbell, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function ImportCompletionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const platform = searchParams.get('platform') || 'google-fit';
    const range = searchParams.get('range') || '30d';
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        // Trigger success animation
        setShowAnimation(true);
    }, []);

    const platformName = platform === 'apple-health' ? 'Apple Health' : 'Google Fit';

    // Mock data summary based on range
    const getDataSummary = () => {
        if (range === 'none') {
             return { steps: 0, heartRate: 0, sleep: 0, workouts: 0 };
        }
        const multiplier = range === '7d' ? 0.25 : range === '30d' ? 1 : range === '90d' ? 3 : 10;
        return {
            steps: Math.round(2847 * multiplier),
            heartRate: Math.round(1923 * multiplier),
            sleep: Math.round(892 * multiplier),
            workouts: Math.round(145 * multiplier)
        };
    };

    const summary = getDataSummary();
    const totalDataPoints = summary.steps + summary.heartRate + summary.sleep + summary.workouts;

    const rangeLabel = range === 'none' ? 'future' : range === '7d' ? '7 days of' : range === '30d' ? '30 days of' : range === '90d' ? '90 days of' : 'all available';

    const handleContinue = () => {
        router.push('/company-wellness');
    };

    const handleImportMore = () => {
        router.push(`/health-app-history?platform=${platform}`);
    };

    const handleManagePermissions = () => {
        router.push(`/health-app-data-scope?platform=${platform}`);
    };
    
    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 text-center animate-fade-in-up bg-background text-foreground">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div
                        className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 mb-4 transition-all duration-500 transform ${showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    >
                        <CheckCircle2 className="w-16 h-16 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Import Complete!</h1>
                    <p className="text-muted-foreground">
                        Successfully imported {rangeLabel} health data
                    </p>
                </div>
                
                 {range !== 'none' && (
                    <div className="bg-card/50 border border-border/20 rounded-xl p-6 mb-6">
                        <h2 className="font-semibold mb-4 text-left">IMPORTED DATA SUMMARY:</h2>
                        <div className="space-y-3 mb-4 text-sm">
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Footprints/> Step records</span><span className="font-semibold">{summary.steps.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Heart/> Heart rate readings</span><span className="font-semibold">{summary.heartRate.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><BedDouble/> Sleep sessions</span><span className="font-semibold">{summary.sleep.toLocaleString()}</span></div>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Dumbbell/> Workout sessions</span><span className="font-semibold">{summary.workouts.toLocaleString()}</span></div>
                        </div>
                        <div className="border-t border-border/50 pt-3">
                            <div className="flex items-center justify-between font-semibold text-sm">
                            <span>Total data points:</span>
                            <span className="text-green-400">{totalDataPoints.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                 )}

                 <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6 text-left">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                        🤖 AI ANALYSIS READY!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        We've already found some interesting patterns in your data:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>Your best sleep day appears to be <strong>Saturday</strong>.</li>
                        <li>You're most active between <strong>10-11 AM</strong>.</li>
                        <li>Your average daily step count is <strong>~8,540</strong>.</li>
                    </ul>
                </div>
                
                <div className="bg-card/50 border border-border/20 rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5"/> AUTOMATIC SYNC ENABLED
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Going forward, we'll sync new data automatically every hour from {platformName}. You can change this in Settings.
                    </p>
                </div>


                <div className="space-y-3">
                    <Button onClick={handleContinue} size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">
                        Next: Set Your Goals
                    </Button>
                    <div className="flex space-x-3">
                        <Button onClick={handleImportMore} variant="secondary" className="flex-1">Import More</Button>
                        <Button onClick={handleManagePermissions} variant="secondary" className="flex-1">Permissions</Button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        💡 Fun fact: You've tracked enough data to generate <strong>{Math.round(totalDataPoints / 100)}</strong> AI insights!
                    </p>
                </div>

            </div>
        </div>
    )
}


export default function HealthAppCompletePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ImportCompletionContent />
        </Suspense>
    )
}
