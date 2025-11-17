'use server';

import {
  generatePersonalizedWorkoutPlan,
  type GeneratePersonalizedWorkoutPlanInput,
} from '@/ai/flows/generate-personalized-workout-plan';
import { z } from 'zod';

const FormSchema = z.object({
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  goals: z
    .string()
    .min(10, { message: 'Please describe your goals in at least 10 characters.' }),
  availableEquipment: z
    .string()
    .min(3, { message: 'Please list your available equipment.' }),
});

export interface WorkoutPlanState {
  error?: string | null;
  workoutPlan?: string | null;
}

export async function getWorkoutPlan(
  data: GeneratePersonalizedWorkoutPlanInput
): Promise<WorkoutPlanState> {
  const validatedFields = FormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await generatePersonalizedWorkoutPlan(validatedFields.data);
    if (result.workoutPlan) {
      return { workoutPlan: result.workoutPlan };
    } else {
      return { error: 'Failed to generate a workout plan. Please try again.' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
