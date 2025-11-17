'use client';

import {
  ShoppingCart,
  ChevronRight,
  Star,
  Tag,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

const shopData = {
  banner: {
    title: 'EXCLUSIVE APP DISCOUNT',
    subtitle: 'Get 15% off your next device',
    code: 'HEALTH15',
    link: '/shop/devices',
  },
  recommended: [
    {
      id: 1,
      name: 'Premium Leather Band',
      price: 1299,
      rating: 4.5,
      reviews: 234,
      image: 'https://picsum.photos/seed/leather-band/400/400',
      imageHint: 'watch strap',
      compatibleWith: ['ColorFit Pro 6 Max'],
    },
     {
      id: 2,
      name: 'Silicone Sport Loop',
      price: 999,
      rating: 4.8,
      reviews: 512,
      image: 'https://picsum.photos/seed/sport-loop/400/400',
      imageHint: 'watch strap',
      compatibleWith: ['ColorFit Pro 6 Max'],
    },
  ],
  featured: [
    {
      id: 3,
      name: 'Luna Ring 2.0',
      price: 8999,
      rating: 4.7,
      reviews: 892,
      image: 'https://picsum.photos/seed/luna-ring/400/400',
      imageHint: 'smart ring',
      badge: 'NEW',
    },
    {
      id: 4,
      name: 'ColorFit Ultra 3',
      price: 4999,
      rating: 4.6,
      reviews: 1240,
      image: 'https://picsum.photos/seed/colorfit-ultra/400/400',
      imageHint: 'smartwatch',
      badge: 'BESTSELLER',
    },
     {
      id: 5,
      name: 'Buds Pro X',
      price: 2499,
      rating: 4.5,
      reviews: 980,
      image: 'https://picsum.photos/seed/earbuds/400/400',
      imageHint: 'wireless earbuds',
      badge: '',
    },
    {
      id: 6,
      name: 'Aura Smart Scale',
      price: 3499,
      rating: 4.9,
      reviews: 450,
      image: 'https://picsum.photos/seed/scale/400/400',
      imageHint: 'smart scale',
      badge: 'SALE',
    },
  ],
  bundles: [
    {
      id: 1,
      name: 'Fitness Starter Pack',
      products: ['ColorFit Pro', 'Premium Band', 'Wireless Earbuds'],
      price: 8999,
      originalPrice: 10999,
      savings: 2000,
      images: [
        'https://picsum.photos/seed/bundle-watch/100/100',
        'https://picsum.photos/seed/bundle-band/100/100',
        'https://picsum.photos/seed/bundle-buds/100/100',
      ],
      hints: ['smartwatch', 'watch strap', 'earbuds'],
    },
  ],
  userDevice: {
    name: 'ColorFit Pro 6 Max',
  },
  credits: {
    available: 800,
    eligibleProducts: 45,
  },
};

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background">
        <h1 className="text-2xl font-bold">Shop</h1>
        <div className="relative">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
           <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">3</Badge>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        
        {/* Promotional Banner */}
        <Card className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground border-none">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-80">{shopData.banner.title}</p>
              <h2 className="text-xl font-bold">{shopData.banner.subtitle}</h2>
              <p className="mt-2 text-sm">Use code: <strong className="bg-primary-foreground/20 px-2 py-1 rounded-md">{shopData.banner.code}</strong></p>
            </div>
            <ChevronRight className="w-8 h-8 flex-shrink-0" />
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
            <div className='flex items-center gap-2'>
                <div className='relative flex-1'>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search shop..." className="pl-10 bg-card/50" />
                </div>
                 <TabsList className=''>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="watches">Watches</TabsTrigger>
                    <TabsTrigger value="rings">Rings</TabsTrigger>
                    <TabsTrigger value="accessories">Accessories</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="all">
                 <div className="space-y-8 mt-6">
                    {/* Personalized Section */}
                    <ShopSection title="Recommended for You" subtitle={`Based on your ${shopData.userDevice.name}`}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {shopData.recommended.map(product => <ProductCard key={product.id} product={product} />)}
                      </div>
                    </ShopSection>

                    {/* Featured Products */}
                    <ShopSection title="Featured Products">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {shopData.featured.map(product => <ProductCard key={product.id} product={product} />)}
                        </div>
                    </ShopSection>

                    {/* Accessory Bundles */}
                    <ShopSection title="Complete Your Setup">
                      {shopData.bundles.map(bundle => (
                        <Card key={bundle.id} className="bg-card/50">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                              <div className="flex -space-x-4">
                                {bundle.images.map((img, i) => (
                                  <Image key={i} src={img} alt={bundle.products[i]} width={80} height={80} className="rounded-full border-2 border-background aspect-square object-cover" data-ai-hint={bundle.hints[i]} />
                                ))}
                              </div>
                              <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold">{bundle.name}</h3>
                                <p className="text-sm text-muted-foreground">{bundle.products.join(' + ')}</p>
                                <p className="text-xl font-bold mt-2">₹{bundle.price.toLocaleString()} <span className="text-sm text-muted-foreground line-through">₹{bundle.originalPrice.toLocaleString()}</span></p>
                                <Badge variant="destructive" className="mt-1">Save ₹{bundle.savings.toLocaleString()}</Badge>
                              </div>
                              <Button className='mt-4 md:mt-0 w-full md:w-auto'>View Bundle</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </ShopSection>
                    
                    {/* Special Offers */}
                     <ShopSection title="Special Offers">
                         <Card className="bg-primary/10 border-primary/20">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold flex items-center gap-2"><Tag className="w-5 h-5 text-primary" /> Wellness Credit Redemption</h3>
                                    <p className="text-muted-foreground text-sm mt-1">You have <span className="font-bold text-primary">₹{shopData.credits.available} credits</span> to spend!</p>
                                </div>
                                <Button variant="outline">Shop Now</Button>
                            </CardContent>
                        </Card>
                    </ShopSection>

                 </div>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function ShopSection({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground mb-3">{subtitle}</p>}
            <div className="mt-4">{children}</div>
        </section>
    )
}

function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/shop/product/${product.id}`} className="block group">
            <Card className="bg-card/50 overflow-hidden h-full flex flex-col group-hover:border-accent transition-colors">
                <div className="relative aspect-square">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint={product.imageHint} />
                    {product.badge && <Badge className="absolute top-2 left-2">{product.badge}</Badge>}
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm flex-1">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 
                        <span>{product.rating} ({product.reviews.toLocaleString()})</span>
                    </div>
                    <p className="font-bold text-lg mt-2">₹{product.price.toLocaleString()}</p>
                    <Button variant="outline" className="w-full mt-4 text-xs h-9">Add to Cart</Button>
                </div>
            </Card>
        </Link>
    )
}
