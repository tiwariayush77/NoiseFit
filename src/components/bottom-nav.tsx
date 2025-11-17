'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  Users,
  ShoppingBag,
  Watch,
  User,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: House },
  { href: '/social', label: 'Social', icon: Users },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/devices', label: 'Devices', icon: Watch },
  { href: '/me', label: 'Me', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1E1E1E] border-t border-gray-800 z-50">
      <div className="flex h-full">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center text-xs relative transition-colors duration-300"
            >
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 bg-accent rounded-full"></span>
              )}
              <item.icon
                className={cn(
                  'h-6 w-6 mb-1',
                  isActive ? 'text-accent' : 'text-[#B0B0B0]'
                )}
              />
              <span
                className={cn(
                  isActive ? 'text-accent' : 'text-[#B0B0B0]'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
