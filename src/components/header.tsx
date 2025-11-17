import { Bell } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-background/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://www.gonoise.com/cdn/shop/files/Artboard_1_wf_1.png?v=1761318524"
            alt="Noise Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </div>
        <div className="hidden md:flex items-center">
          <span className="text-lg font-semibold">NoiseFit Intelligence</span>
        </div>
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
