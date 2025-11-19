'use client';

import {
  ArrowLeft,
  Calendar,
  Plus,
  Flame,
  Droplets,
  Zap,
  CheckCircle,
  AlertTriangle,
  Bot,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const nutritionData = {
  today: {
    calories: 1840,
    goal: 2200,
  },
  macros: {
    protein: { current: 95, goal: 110 },
    carbs: { current: 210, goal: 250 },
    fats: { current: 58, goal: 70 },
  },
  meals: [
    {
      id: 1,
      name: 'Breakfast',
      time: '7:30 AM',
      items: [
        { name: 'Oatmeal with berries', calories: 350 },
        { name: 'Coffee', calories: 5 },
      ],
      totalCalories: 355,
    },
    {
      id: 2,
      name: 'Lunch',
      time: '1:00 PM',
      items: [
        { name: 'Grilled chicken salad', calories: 520 },
        { name: 'Brown rice', calories: 180 },
      ],
      totalCalories: 700,
    },
    {
      id: 3,
      name: 'Snack',
      time: '4:00 PM',
      items: [
        { name: 'Apple', calories: 95 },
        { name: 'Almonds', calories: 160 },
      ],
      totalCalories: 255,
    },
  ],
  weeklyScore: {
    score: 82,
    status: 'Good balance',
    notes: [
      { text: 'Hit protein goal: 5/7 days', type: 'positive' },
      { text: 'Tracked meals: 6/7 days', type: 'positive' },
      { text: 'Low water intake 2 days', type: 'warning' },
    ],
  },
  insights: [
    { type: 'positive', text: 'Higher protein intake is linked to better next-day energy levels.' },
    { type: 'positive', text: 'You have more energy on days you log breakfast.' },
    { type: 'warning', text: 'Consider adding more vegetables for micronutrients.' },
  ],
  water: {
    current: 5,
    goal: 8,
  },
};

export default function NutritionPage() {
    const { today, macros, meals, weeklyScore, insights, water } = nutritionData;
    const progress = (today.calories / today.goal) * 100;
    const remaining = today.goal - today.calories;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border/20 bg-background/80 backdrop-blur-lg">
        <Link href="/energy-detail">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Energy Detail</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Nutrition</h1>
        <Button variant="ghost">
          <Plus className="w-4 h-4 mr-2" /> Log Meal
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Today's Summary */}
        <Card className="bg-card/50 text-center">
            <CardHeader>
                <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Today</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold text-orange-400">{today.calories.toLocaleString()}</p>
                <p className="text-lg text-muted-foreground mb-4">calories consumed</p>
                <Progress value={progress} className="h-2" indicatorClassName="bg-orange-400" />
                <p className="text-sm text-muted-foreground mt-2">Goal: {today.goal.toLocaleString()} kcal ({Math.round(progress)}%)</p>
                {remaining > 0 ? (
                    <div className="mt-4 bg-orange-500/10 p-3 rounded-lg text-orange-400">
                        <p className='font-semibold'>🔥 {remaining.toLocaleString()} cal remaining</p>
                        <p className='text-sm'>On track! 👍</p>
                    </div>
                ) : (
                    <div className="mt-4 bg-red-500/10 p-3 rounded-lg text-red-400">
                        <p className='font-semibold flex items-center justify-center gap-2'><AlertTriangle className="w-5 h-5"/> Goal Exceeded</p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Macros Breakdown */}
        <Card className="bg-card/50">
          <CardHeader><CardTitle>Macronutrients</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-semibold text-red-400">🍖 Protein</span>
                <span>{macros.protein.current}g / {macros.protein.goal}g</span>
              </div>
              <Progress value={(macros.protein.current / macros.protein.goal) * 100} indicatorClassName="bg-red-400" className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-semibold text-yellow-400">🍞 Carbs</span>
                <span>{macros.carbs.current}g / {macros.carbs.goal}g</span>
              </div>
              <Progress value={(macros.carbs.current / macros.carbs.goal) * 100} indicatorClassName="bg-yellow-400" className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-semibold text-green-400">🥑 Fats</span>
                <span>{macros.fats.current}g / {macros.fats.goal}g</span>
              </div>
              <Progress value={(macros.fats.current / macros.fats.goal) * 100} indicatorClassName="bg-green-400" className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Meals Logged */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Meals Logged Today</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {meals.map(meal => (
                    <div key={meal.id} className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold">{meal.name} <span className="text-xs text-muted-foreground font-normal">- {meal.time}</span></p>
                            <p className="font-bold">{meal.totalCalories} cal</p>
                        </div>
                        <Separator />
                        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            {meal.items.map(item => <li key={item.name}>• {item.name} ({item.calories} cal)</li>)}
                        </ul>
                         <div className="flex justify-end gap-2 mt-3">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </div>
                    </div>
                ))}
                <Button variant="outline" className="w-full mt-4"><Plus className="w-4 h-4 mr-2" /> Log Dinner</Button>
            </CardContent>
        </Card>

        {/* Weekly Score */}
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>This Week's Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{weeklyScore.score}<span className="text-lg text-muted-foreground">/100 Quality</span></p>
                <p className="text-sm text-green-400 font-semibold mb-3">{weeklyScore.status}</p>
                <Progress value={weeklyScore.score} className="h-2" indicatorClassName="bg-green-400" />
                <div className="mt-4 space-y-2 text-sm">
                    {weeklyScore.notes.map(note => (
                        <div key={note.text} className="flex items-center gap-2">
                            {note.type === 'positive' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                            <span className="text-muted-foreground">{note.text}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-card/50">
          <CardHeader className="flex-row items-start gap-3 space-y-0">
            <Bot className="w-6 h-6 text-primary mt-1" />
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Patterns from your nutrition data.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3">
                {insight.type === 'positive' ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                <p className="text-sm text-muted-foreground">{insight.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Water Tracking */}
        <Card className="bg-card/50">
            <CardHeader><CardTitle>Water Intake</CardTitle></CardHeader>
            <CardContent className="text-center">
                <div className="flex justify-center gap-2 mb-4">
                    {Array.from({ length: water.goal }).map((_, i) => (
                        <Droplets key={i} className={`w-8 h-8 transition-colors ${i < water.current ? 'text-blue-400 fill-blue-400/50' : 'text-muted/30'}`} />
                    ))}
                </div>
                <p className="text-xl font-bold">{water.current} / {water.goal} glasses</p>
                <p className="text-sm text-muted-foreground">~{(water.current * 0.25).toFixed(2)}L of 2L goal</p>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1"><Plus className="w-4 h-4 mr-2" /> Add Glass</Button>
                    <Button variant="outline" className="flex-1"><Plus className="w-4 h-4 mr-2" /> Add Bottle</Button>
                </div>
            </CardContent>
        </Card>

        <div className='space-y-3 pt-4'>
             <Button variant="secondary" className="w-full">Set Nutrition Goals</Button>
             <Button variant="secondary" className="w-full">Export Nutrition Data</Button>
        </div>
      </main>
    </div>
  );
}
