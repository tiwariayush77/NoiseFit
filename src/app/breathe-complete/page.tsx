'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BreatheCompleteContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const hrDrop = searchParams.get('hr') || 0;
    const stressDrop = searchParams.get('stress') || 0;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-3">Session Complete</h1>
                <p className="text-muted-foreground mb-8">You're one step closer to a calmer mind.</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-card/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Heart Rate</p>
                        <p className="text-2xl font-bold text-green-400">↓ {hrDrop} bpm</p>
                    </div>
                    <div className="bg-card/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Stress Level</p>
                        <p className="text-2xl font-bold text-green-400">↓ {stressDrop} pts</p>
                    </div>
                </div>

                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default function BreatheCompletePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BreatheCompleteContent />
        </Suspense>
    )
}
