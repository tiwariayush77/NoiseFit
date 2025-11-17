import { Bell, Menu } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-[#121212]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
        <Image
          src="https://www.gonoise.com/cdn/shop/files/Artboard_1_wf_1.png?v=1761318524"
          alt="Noise Logo"
          width={100}
          height={32}
          className="h-8 w-auto"
          priority
        />
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500"></span>
        </div>
      </div>
    </header>
  );
}
