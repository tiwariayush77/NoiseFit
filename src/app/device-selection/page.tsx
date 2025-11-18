'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DeviceSelectionPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified device-search screen
    router.replace('/device-search');
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
