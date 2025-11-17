import BottomNav from '@/components/bottom-nav';
import Header from '@/components/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto pb-16 px-4 pt-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
