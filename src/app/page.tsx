import Header from '@/components/header';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative text-center py-20 md:py-32 lg:py-40 px-4 flex flex-col items-center justify-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 animate-fade-in-up">
              Your Health, Intelligently Unified
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
              One app. All your devices. Smarter insights than ever before.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-accent hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-600"
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
