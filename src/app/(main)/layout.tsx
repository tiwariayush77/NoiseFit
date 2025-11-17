import BottomNav from '@/components/bottom-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 overflow-y-auto p-4 pb-24 bg-gradient-to-b from-background to-[#1a1a1a]">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
