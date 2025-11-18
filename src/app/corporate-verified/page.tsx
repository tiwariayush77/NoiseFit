'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building, Users } from 'lucide-react';

function CorporateVerifiedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [companyName, setCompanyName] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        setCompanyName(localStorage.getItem('companyName') || 'your company');
        setShowAnimation(true);
    }, []);

    const handleContinue = () => {
        router.push('/goal-selection');
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
                    <h1 className="text-3xl font-bold mb-2">Successfully Verified!</h1>
                    <p className="text-muted-foreground">
                        Your account is now linked with {companyName}.
                    </p>
                </div>

                 <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                        <Building className="w-5 h-5"/> OFFICIAL PARTNERSHIP BENEFITS UNLOCKED:
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>Company-sponsored wellness credits</li>
                        <li>Exclusive team challenges and leaderboards</li>
                        <li>Access to manager dashboards & analytics</li>
                        <li>Priority support from Noise</li>
                    </ul>
                </div>
                
                <div className="bg-card/50 border border-border/20 rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5"/> WHAT'S NEXT?
                    </h3>
                     <p className="text-sm text-muted-foreground">
                        You'll now be automatically added to the {companyName} team space. You can access team leaderboards, challenges, and more from the "Social" tab in the app.
                    </p>
                </div>

                <div className="space-y-3">
                    <Button onClick={handleContinue} size="lg" className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">
                        Next: Set Your Personal Goals
                    </Button>
                </div>

            </div>
        </div>
    )
}


export default function CorporateVerifiedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CorporateVerifiedContent />
        </Suspense>
    )
}
