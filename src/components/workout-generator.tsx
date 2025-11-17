'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getWorkoutPlan, type WorkoutPlanState } from '@/app/actions';
import { Bot, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your fitness level.',
  }),
  goals: z
    .string()
    .min(10, {
      message: 'Please describe your goals in at least 10 characters.',
    }),
  availableEquipment: z.string().min(3, {
    message: 'Please list your available equipment (e.g., "dumbbells").',
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function WorkoutGenerator() {
  const { toast } = useToast();
  const [state, setState] = useState<WorkoutPlanState>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fitnessLevel: undefined,
      goals: '',
      availableEquipment: '',
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const result = await getWorkoutPlan(data);
      setState(result);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to generate plan',
          description: result.error,
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 flex-shrink-0 rounded-full bg-primary/10 border border-primary/20">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl">
                    NoiseFit Intelligence
                  </CardTitle>
                  <CardDescription>
                    Tell us about yourself and get a personalized workout plan.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current fitness level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your fitness goals?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., lose weight, build muscle, improve cardio"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableEquipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What equipment do you have?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., none, dumbbells, resistance bands, treadmill"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send />
                )}
                <span>{isPending ? 'Generating...' : 'Generate Plan'}</span>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isPending && (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg">
          <CardHeader>
            <CardTitle>Generating your plan...</CardTitle>
            <CardDescription>
              Our AI is crafting the perfect workout for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </CardContent>
        </Card>
      )}

      {state.workoutPlan && !isPending && (
        <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-lg animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle>Your Personalized Workout Plan</CardTitle>
            <CardDescription>
              Here is a routine tailored to your goals and equipment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-headings:text-accent"
              dangerouslySetInnerHTML={{
                __html: state.workoutPlan.replace(/\n/g, '<br />'),
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
