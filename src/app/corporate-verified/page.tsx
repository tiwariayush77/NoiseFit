'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CorporateVerifiedPage() {
const router = useRouter();

useEffect(() => {
// Auto-redirect after 3 seconds
const timer = setTimeout(() => {
router.push('/goal-selection');
}, 3000);

return () => clearTimeout(timer);
}, [router]);

const companyName = typeof window !== 'undefined'
? localStorage.getItem('companyName') || 'Your Company'
: 'Your Company';

return (
<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
<div className="max-w-md w-full text-center">
{/* Success Icon */}
<div className="mb-6 flex justify-center">
<div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
<svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>
</div>
</div>

    {/* Success Message */}
    <h1 className="text-2xl font-bold mb-3">
      ✓ Corporate Partnership Verified
    </h1>
    
    <p className="text-gray-300 mb-6">
      Successfully connected to <span className="font-semibold text-teal-400">{companyName}</span>
    </p>

    {/* Benefits List */}
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6 text-left">
      <p className="text-sm font-semibold mb-3">You now have access to:</p>
      <ul className="space-y-2 text-sm text-gray-300">
        <li className="flex items-center">
          <span className="text-teal-400 mr-2">✓</span>
          Team challenges and leaderboards
        </li>
        <li className="flex items-center">
          <span className="text-teal-400 mr-2">✓</span>
          Corporate wellness programs
        </li>
        <li className="flex items-center">
          <span className="text-teal-400 mr-2">✓</span>
          Premium health insights
        </li>
      </ul>
    </div>

    {/* Auto-redirect Notice */}
    <p className="text-sm text-gray-400">
      Continuing to goal selection in 3 seconds...
    </p>

    {/* Manual Continue Button */}
    <button
      onClick={() => router.push('/goal-selection')}
      className="mt-4 w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition-colors"
    >
      Continue Now →
    </button>
  </div>
</div>
);
}
