'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const placeholderSections = [
    { title: 'Energy Score', description: 'Coming next...' },
    { title: "Today's Vitals", description: 'Coming next...' },
    { title: 'Smart Daily Timeline', description: 'Coming next...' },
    { title: 'Top Opportunities', description: 'Coming next...' },
    { title: 'Quick Actions', description: 'Coming next...' },
];

function PlaceholderCard({ title, description }: { title: string, description: string }) {
    return (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg min-h-[150px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
        {placeholderSections.map(section => (
            <PlaceholderCard key={section.title} title={section.title} description={section.description} />
        ))}
    </div>
  );
}
