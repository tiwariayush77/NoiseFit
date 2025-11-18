'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Eye, EyeOff, Loader2, Watch, CheckCircle, Award, Bot, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter.' })
      .regex(/[0-9]/, { message: 'Must contain at least one number.' }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

const benefits = [
    { text: 'Free forever', icon: <Award className='w-4 h-4' /> },
    { text: 'Track 20+ health metrics', icon: <Bot className='w-4 h-4' /> },
    { text: 'AI-powered insights', icon: <Trophy className='w-4 h-4' /> },
];

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
    mode: 'onChange',
  });

  const { isSubmitting, watch, formState: { errors } } = form;
  const passwordValue = watch('password');

  const passwordChecks = [
      { check: (p: string) => p.length >= 8, label: 'At least 8 characters' },
      { check: (p: string) => /[A-Z]/.test(p), label: 'One uppercase letter' },
      { check: (p: string) => /[0-9]/.test(p), label: 'One number' },
  ]

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate email already exists error
    if (values.email === 'exists@example.com') {
        setError('Email already exists. Please sign in or use a different email.');
        return;
    }
    toast({
      title: 'Account Created!',
      description: 'Redirecting to your dashboard setup...',
    });
    router.push('/device-selection');
  };

  return (
    <div className="w-full max-w-sm animate-in fade-in-5 slide-in-from-bottom-5">
      <Link href="/sign-in">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4">
          <ArrowLeft />
        </Button>
      </Link>
      
      <div className="text-center mb-8">
        <Watch className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Start your health journey 🚀</h1>
        <p className="text-muted-foreground">Join thousands improving their wellness</p>
      </div>

       <div className="space-y-3">
        <Button variant="outline" className="w-full h-12">
            <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 mr-2"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.9-4.32 1.9-3.42 0-6.22-2.8-6.22-6.22s2.8-6.22 6.22-6.22c1.93 0 3.25.78 4.22 1.7l2.76-2.76C19.01 1.97 16.25 1 12.48 1 5.83 1 1 5.83 1 12.48s4.83 11.48 11.48 11.48c6.4 0 11.02-4.56 11.02-11.02 0-.74-.06-1.42-.18-2.08h-9.84z" fill="currentColor"/></svg>
            Sign up with Google
        </Button>
        <Button variant="outline" className="w-full h-12">
             <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor"><path d="M12.152 6.896c-.948 0-1.896.408-2.568 1.224-.672.816-.948 1.896-.948 2.88 0 1.92.948 3.6 2.4 4.584.552.24 1.128.36 1.704.36.948 0 1.896-.408 2.568-1.224.672-.816.948-1.896.948-2.88 0-1.92-.948-3.6-2.4-4.584-.552-.24-1.128-.36-1.704-.36zM12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 21.6c-5.28 0-9.6-4.32-9.6-9.6s4.32-9.6 9.6-9.6 9.6 4.32 9.6 9.6-4.32 9.6-9.6 9.6z"/></svg>
            Sign up with Apple
        </Button>
      </div>
      
       <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>

       {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Sign-up Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
           <div className="mt-2 flex gap-2">
               <Button variant="secondary" size="sm" onClick={() => router.push('/sign-in')}>Sign In Instead</Button>
               <Button variant="outline" size="sm" onClick={() => setError(null)}>Use different email</Button>
           </div>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                </FormControl>
                <div className="text-xs text-muted-foreground space-y-1 mt-2">
                    {passwordChecks.map(check => (
                        <div key={check.label} className={cn("flex items-center", check.check(passwordValue) ? "text-green-500" : "text-muted-foreground")}>
                            <CheckCircle className="w-3 h-3 mr-2" /> {check.label}
                        </div>
                    ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            I agree to the <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                        </FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting || !form.formState.isValid} className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 text-white">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline underline-offset-4">
          Sign In
        </Link>
      </div>

       <div className="mt-8 space-y-2">
           {benefits.map(benefit => (
               <div key={benefit.text} className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-md bg-card/50">
                   <div className="text-accent">{benefit.icon}</div>
                   <span>{benefit.text}</span>
               </div>
           ))}
        </div>
      
    </div>
  );
}
