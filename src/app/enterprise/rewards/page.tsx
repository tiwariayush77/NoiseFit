'use client';

import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Star,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const rewardsData = {
  credits: 800,
  categories: {
    'gift-cards': [
      { id: 'gc1', name: 'Amazon Gift Card', value: '₹500', cost: 500, img: 'https://picsum.photos/seed/amazon-card/400/400', hint: 'gift card' },
      { id: 'gc2', name: 'Flipkart Voucher', value: '₹500', cost: 500, img: 'https://picsum.photos/seed/flipkart-card/400/400', hint: 'gift card' },
      { id: 'gc3', name: 'Swiggy Voucher', value: '₹250', cost: 250, img: 'https://picsum.photos/seed/swiggy-card/400/400', hint: 'food delivery' },
      { id: 'gc4', name: 'Myntra Gift Card', value: '₹1000', cost: 1000, img: 'https://picsum.photos/seed/myntra-card/400/400', hint: 'fashion brand' },
    ],
    experiences: [
      { id: 'exp1', name: 'Full Body Spa Day', value: 'Worth ₹3000', cost: 2500, img: 'https://picsum.photos/seed/spa-day/400/400', hint: 'spa massage' },
      { id: 'exp2', name: 'Cult.fit Gym Pass', value: '1 Month Access', cost: 1500, img: 'https://picsum.photos/seed/gym-pass/400/400', hint: 'gym workout' },
      { id: 'exp3', name: 'Online Yoga Class', value: '5 Sessions', cost: 750, img: 'https://picsum.photos/seed/yoga-class/400/400', hint: 'yoga meditation' },
    ],
    charity: [
      { id: 'char1', name: 'Plant a Tree', value: 'via SankalpTaru', cost: 100, img: 'https://picsum.photos/seed/plant-tree/400/400', hint: 'sapling' },
      { id: 'char2', name: 'Donate a Meal', value: 'via Akshaya Patra', cost: 50, img: 'https://picsum.photos/seed/donate-meal/400/400', hint: 'charity meal' },
    ],
    merch: [
        { id: 'merch1', name: 'Noise T-Shirt', value: 'Exclusive', cost: 800, img: 'https://picsum.photos/seed/noise-shirt/400/400', hint: 'branded t-shirt' },
        { id: 'merch2', name: 'Noise Water Bottle', value: 'Exclusive', cost: 600, img: 'https://picsum.photos/seed/noise-bottle/400/400', hint: 'water bottle' },
    ]
  },
};

export default function RewardsCatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <Link href="/enterprise">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Rewards Catalog</h1>
        <Button variant="ghost" size="icon">
          <ShoppingCart />
          <span className="sr-only">Cart</span>
        </Button>
      </header>

      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-lg p-4 border-b border-border/20">
         <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <p className="text-2xl font-bold text-primary flex items-center gap-2"><Star className="w-5 h-5" /> {rewardsData.credits.toLocaleString()}</p>
                </div>
                <Button variant="link">History →</Button>
            </CardContent>
        </Card>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search rewards..." className="pl-10 bg-card/50" />
            </div>
            <TabsList className="grid grid-cols-5 h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
              <TabsTrigger value="merch">Merch</TabsTrigger>
              <TabsTrigger value="charity">Charity</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              <RewardSection title="Gift Cards" rewards={rewardsData.categories['gift-cards']} />
              <RewardSection title="Experiences" rewards={rewardsData.categories.experiences} />
              <RewardSection title="Exclusive Merch" rewards={rewardsData.categories.merch} />
              <RewardSection title="Charity Donations" rewards={rewardsData.categories.charity} />
            </div>
          </TabsContent>
          
          <TabsContent value="gift-cards" className="mt-6">
             <RewardSection rewards={rewardsData.categories['gift-cards']} />
          </TabsContent>
          <TabsContent value="experiences" className="mt-6">
             <RewardSection rewards={rewardsData.categories.experiences} />
          </TabsContent>
           <TabsContent value="merch" className="mt-6">
             <RewardSection rewards={rewardsData.categories.merch} />
          </TabsContent>
           <TabsContent value="charity" className="mt-6">
             <RewardSection rewards={rewardsData.categories.charity} />
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}

function RewardSection({ title, rewards }: { title?: string; rewards: any[] }) {
  return (
    <section>
      {title && <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">{title}</h2>}
      <div className="grid grid-cols-2 gap-4">
        {rewards.map(reward => <RewardCard key={reward.id} reward={reward} />)}
      </div>
    </section>
  );
}

function RewardCard({ reward }: { reward: any }) {
  const canAfford = rewardsData.credits >= reward.cost;
  return (
    <Card className="bg-card/50 overflow-hidden group">
      <div className="relative aspect-video">
        <Image src={reward.img} alt={reward.name} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={reward.hint} />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm truncate">{reward.name}</h3>
        <p className="text-xs text-muted-foreground">{reward.value}</p>
        <p className="font-bold text-lg text-primary mt-2 flex items-center gap-1"><Star className="w-4 h-4" /> {reward.cost.toLocaleString()}</p>
        <Button disabled={!canAfford} className="w-full mt-3 h-9 text-xs" >
          {canAfford ? 'Redeem' : 'Not Enough Credits'}
        </Button>
      </CardContent>
    </Card>
  );
}
