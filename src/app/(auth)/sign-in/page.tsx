'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Eye, EyeOff, Loader2, Mail, Watch } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (values.email === 'test@example.com' && values.password === 'password') {
      toast({
        title: 'Signed in successfully!',
        description: 'Redirecting to your dashboard...',
      });
      router.push('/device-selection');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };
  
  const handleMagicLink = async () => {
      const email = form.getValues('email');
      const emailValidation = z.string().email().safeParse(email);
      if (!emailValidation.success) {
          form.setError('email', { message: 'Please enter a valid email to receive a magic link.' });
          return;
      }
      setIsMagicLinkSent(false);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsMagicLinkSent(true);
      toast({
          title: 'Magic Link Sent!',
          description: `A sign-in link has been sent to ${email}.`,
      });
  }

  return (
    <div className="w-full max-w-sm animate-in fade-in-5 slide-in-from-bottom-5">
      <Link href="/">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4">
          <ArrowLeft />
        </Button>
      </Link>
      
      <div className="text-center mb-8">
        <Watch className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Sign in to continue your health journey</p>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full h-12">
            <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 mr-2"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.9-4.32 1.9-3.42 0-6.22-2.8-6.22-6.22s2.8-6.22 6.22-6.22c1.93 0 3.25.78 4.22 1.7l2.76-2.76C19.01 1.97 16.25 1 12.48 1 5.83 1 1 5.83 1 12.48s4.83 11.48 11.48 11.48c6.4 0 11.02-4.56 11.02-11.02 0-.74-.06-1.42-.18-2.08h-9.84z" fill="currentColor"/></svg>
            Continue with Google
        </Button>
        <Button variant="outline" className="w-full h-12">
             <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor"><path d="M12.152 6.896c-.948 0-1.896.408-2.568 1.224-.672.816-.948 1.896-.948 2.88 0 1.92.948 3.6 2.4 4.584.552.24 1.128.36 1.704.36.948 0 1.896-.408 2.568-1.224.672-.816.948-1.896.948-2.88 0-1.92-.948-3.6-2.4-4.584-.552-.24-1.128-.36-1.704-.36zM12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 21.6c-5.28 0-9.6-4.32-9.6-9.6s4.32-9.6 9.6-9.6 9.6 4.32 9.6 9.6-4.32 9.6-9.6 9.6z"/></svg>
            Continue with Apple
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
          <AlertTitle>Sign-in Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
       {isMagicLinkSent && !form.formState.isDirty && (
        <Alert variant="default" className="mb-4 bg-green-500/10 border-green-500/30 text-green-400">
          <Mail className="h-4 w-4 !text-green-400" />
          <AlertTitle>Magic Link Sent</AlertTitle>
          <AlertDescription>Please check your email to sign in.</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                 <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                     <Link href="/reset-password"
                        className="text-sm text-primary hover:underline underline-offset-4"
                     >
                        Forgot Password?
                    </Link>
                </div>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 text-white">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
      
      <Button variant="outline" className="w-full h-12 mt-3" onClick={handleMagicLink}>
        <Mail className="mr-2 h-4 w-4" />
        Send Magic Link Instead
      </Button>

      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline underline-offset-4">
          Sign Up
        </Link>
      </div>
      
      <p className="mt-8 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
