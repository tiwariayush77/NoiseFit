'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Mail,
  Phone,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

const helpContent = {
  categories: [
    {
      id: 'getting-started',
      title: 'Getting Started',
      articles: [
        { id: 1, title: 'How to pair my device' },
        { id: 2, title: 'Setting up your profile' },
        { id: 3, title: 'Understanding your health score' },
      ],
    },
    {
      id: 'device-sync',
      title: 'Device & Sync Issues',
      articles: [
        { id: 4, title: 'My device isn\'t syncing' },
        { id: 5, title: 'Bluetooth connection problems' },
        { id: 6, title: 'Battery draining too quickly' },
      ],
    },
     {
      id: 'health-tracking',
      title: 'Health Tracking',
      articles: [
        { id: 7, title: 'Heart rate seems inaccurate' },
        { id: 8, title: 'Steps not counting correctly' },
        { id: 9, title: 'Understanding sleep stages' },
      ],
    },
    {
      id: 'account-privacy',
      title: 'Account & Privacy',
      articles: [
        { id: 10, title: 'How to change your password' },
        { id: 11, title: 'Managing your data' },
      ],
    },
  ],
  contactOptions: [
    { type: 'chat', label: 'Live Chat', icon: <MessageSquare />, available: true, responseTime: 'Avg. 5 min wait' },
    { type: 'email', label: 'Email Us', icon: <Mail />, available: true, responseTime: 'Avg. 2-4h response' },
    { type: 'call', label: 'Request Call', icon: <Phone />, available: false, responseTime: '9 AM - 6 PM IST' },
  ],
  systemStatus: {
    isOperational: true,
    message: 'All systems operational'
  }
};


export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCategories = helpContent.categories.map(category => ({
      ...category,
      articles: category.articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(category => category.articles.length > 0);

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4 -mb-2">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Help Center</h1>
      </header>

      {/* Search */}
      <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for help..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-3 gap-3">
        {helpContent.contactOptions.map(option => (
            <Card key={option.type} className="bg-card/50 text-center p-3">
                <div className="mx-auto w-10 h-10 flex items-center justify-center bg-muted/50 rounded-full mb-2">{option.icon}</div>
                <p className="text-sm font-semibold">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.responseTime}</p>
            </Card>
        ))}
      </div>

      {/* FAQ Accordion */}
       <Accordion type="multiple" className="w-full bg-card/50 rounded-lg px-4 border border-border/20">
         {filteredCategories.map(category => (
            <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-base font-semibold">{category.title}</AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-2 pl-2">
                        {category.articles.map(article => (
                            <li key={article.id}>
                                <Link href={`/help/${article.id}`} className="text-muted-foreground hover:text-foreground hover:underline">
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
         ))}
      </Accordion>
      
      {searchTerm && filteredCategories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
              <p>No articles found for "{searchTerm}"</p>
              <p className="text-sm">Try another search or contact support.</p>
          </div>
      )}

      {/* Troubleshooting */}
      <Card className="bg-card/50">
        <CardHeader>
            <CardTitle>🔧 Troubleshooter</CardTitle>
            <CardDescription>Having a specific problem? Let's diagnose it.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="secondary">Device not syncing</Button>
            <Button variant="secondary">Battery draining fast</Button>
            <Button variant="secondary">Heart rate inaccurate</Button>
            <Button variant="secondary">App crashing</Button>
        </CardContent>
      </Card>
      
       {/* System Status */}
      <Card className="bg-card/50">
        <CardContent className="p-4 flex items-center justify-between">
            <div className='flex items-center gap-2'>
                 <div className={`w-3 h-3 rounded-full ${helpContent.systemStatus.isOperational ? 'bg-green-500' : 'bg-red-500'}`}></div>
                 <p className='text-sm'>{helpContent.systemStatus.message}</p>
            </div>
             <Button variant="link" size="sm" className='p-0 h-auto'>View Status Page</Button>
        </CardContent>
      </Card>

    </div>
  );
}
