// This file contains mock data for demonstration purposes.

// Helper function to generate a random integer within a range
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- SIMULATED RAW DATA ---

// Simulate 90 days of step data
export const stepData = Array.from({ length: 90 }, (_, i) => {
  const dayOfWeek = i % 7;
  const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Sat or Sun
  const baseSteps = isWeekend ? randomInt(4000, 7000) : randomInt(7000, 12000);
  return { date: `Day ${i + 1}`, steps: baseSteps };
});

// Simulate 90 nights of sleep data
export const sleepData = Array.from({ length: 90 }, () => {
    return {
        hours: randomInt(6, 8) + Math.random(),
        quality: randomInt(70, 95)
    }
});

// Simulate heart rate
export const heartRateData = Array.from({ length: 90 }, () => randomInt(55, 65));


// --- DERIVED INSIGHTS ---

const calculateInsights = () => {
  const totalSteps = stepData.reduce((sum, day) => sum + day.steps, 0);
  const avgSteps = Math.round(totalSteps / stepData.length);

  const totalSleepHours = sleepData.reduce((sum, night) => sum + night.hours, 0);
  const avgSleep = parseFloat((totalSleepHours / sleepData.length).toFixed(1));
  
  const totalSleepQuality = sleepData.reduce((sum, night) => sum + night.quality, 0);
  const sleepQuality = Math.round(totalSleepQuality / sleepData.length);

  const restingHeartRate = Math.round(heartRateData.reduce((a, b) => a + b, 0) / heartRateData.length);

  const activeDays = stepData.filter(day => day.steps > 5000).length;

  let maxStreak = 0;
  let currentStreak = 0;
  stepData.forEach(day => {
    if (day.steps >= 10000) {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 0;
    }
  });
  const streak = Math.max(maxStreak, currentStreak);

  return {
    avgSteps,
    avgSleep,
    sleepQuality,
    bestSleep: { day: 'Saturdays', quality: 88 },
    restingHeartRate,
    activeDays,
    streak,
    energyScore: 87, // Hardcoded for demo
  };
};

export const mockInsights = calculateInsights();
