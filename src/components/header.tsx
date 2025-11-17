import { Bell } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { House, Users, ShoppingBag, Watch, User, Settings, HelpCircle } from 'lucide-react';


const navItems = [
    { href: '/dashboard', label: 'Home', icon: House },
    { href: '/social', label: 'Social', icon: Users },
    { href: '/shop', label: 'Shop', icon: ShoppingBag },
    { href: '/devices', label: 'Devices', icon: Watch },
    { href: '/me', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help & Support', icon: HelpCircle },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <User className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-sidebar w-64">
                <SidebarProvider>
                    <Sidebar className="h-full">
                        <div className="flex flex-col h-full p-4">
                            <div className="mb-4">
                                <Link href="/" className="flex items-center gap-2">
                                     <Image
                                      src="https://www.gonoise.com/cdn/shop/files/Artboard_1_wf_1.png?v=1761318524"
                                      alt="Noise Logo"
                                      width={100}
                                      height={32}
                                      className="h-8 w-auto"
                                      priority
                                    />
                                </Link>
                            </div>
                            <SidebarMenu className="flex-1">
                                {navItems.slice(0, 5).map(item => (
                                    <SidebarMenuItem key={item.label}>
                                        <Link href={item.href} className="w-full">
                                            <SidebarMenuButton>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                             <SidebarMenu>
                                {navItems.slice(5).map(item => (
                                    <SidebarMenuItem key={item.label}>
                                        <Link href={item.href} className="w-full">
                                            <SidebarMenuButton>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </div>
                    </Sidebar>
                </SidebarProvider>
            </SheetContent>
        </Sheet>
        
        <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://www.gonoise.com/cdn/shop/files/Artboard_1_wf_1.png?v=1761318524"
              alt="Noise Logo"
              width={100}
              height={32}
              className="h-8 w-auto hidden md:block"
              priority
            />
        </Link>
        
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
