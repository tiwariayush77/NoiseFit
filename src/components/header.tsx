import { Dumbbell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  return (
    <header className="flex items-center justify-between p-4 border-b border-border/20 sticky top-0 bg-background/80 backdrop-blur-lg z-10">
      <div className="flex items-center gap-3">
        <Dumbbell className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">NoiseFit</h1>
      </div>
      <Avatar>
        {userAvatar && (
          <AvatarImage
            src={userAvatar.imageUrl}
            data-ai-hint={userAvatar.imageHint}
          />
        )}
        <AvatarFallback>NF</AvatarFallback>
      </Avatar>
    </header>
  );
}
