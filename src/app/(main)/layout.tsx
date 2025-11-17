import BottomNav from '@/components/bottom-nav';
import DashboardHeader from '@/components/dashboard-header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The enterprise page has its own header, so we exclude the main one
  const isEnterprisePage = false; // This logic would be based on path in a real app

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* The dashboard header is part of this layout now */}
      <main className="flex-1 overflow-y-auto pb-24 bg-gradient-to-b from-background to-[#1a1a1a]">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
