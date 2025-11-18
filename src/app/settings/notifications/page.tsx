'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const initialSettings = {
  masterEnabled: true,
  health: {
    dailyGoals: true,
    inactiveAlerts: true,
    workoutReminders: false,
    hydration: true,
    sleep: true,
  },
  insights: {
    dailySummary: true,
    weeklyReports: true,
    aiInsights: true,
  },
  social: {
    friendActivity: true,
    challenges: true,
    messages: true,
  },
  device: {
    lowBattery: true,
    syncFailures: true,
    updates: true,
  },
  quietHours: {
    enabled: true,
    from: '10:00 PM',
    to: '7:00 AM',
    allowUrgent: true,
  },
  channels: {
    push: true,
    email: false,
    sms: false,
  },
};


export default function NotificationsPage() {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (path: string) => {
    const keys = path.split('.');
    setSettings(prev => {
      const newState = { ...prev };
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = !current[keys[keys.length - 1]];
      return newState;
    });
  };

  return (
    <div className="space-y-6">
       <header className="flex items-center gap-4 -mb-2">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Notifications & Alerts</h1>
      </header>

      {/* Master Toggle */}
      <Card className="bg-card/50">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Enable Notifications</h3>
            <p className="text-sm text-muted-foreground">Master control for all alerts</p>
          </div>
          <Switch
            checked={settings.masterEnabled}
            onCheckedChange={() => handleToggle('masterEnabled')}
          />
        </CardContent>
      </Card>

      <div className={!settings.masterEnabled ? 'opacity-50 pointer-events-none' : ''}>
        {/* Health & Activity */}
        <SettingsSection title="Health & Activity">
            <NotificationItem
                label="Daily Goal Reminders"
                description="Remind me to complete daily goals"
                checked={settings.health.dailyGoals}
                onToggle={() => handleToggle('health.dailyGoals')}
            />
            <NotificationItem
                label="Inactive Alerts"
                description="Alert when inactive for 1 hour"
                checked={settings.health.inactiveAlerts}
                onToggle={() => handleToggle('health.inactiveAlerts')}
            />
            <NotificationItem
                label="Workout Reminders"
                description="Remind me to workout at 6:00 PM"
                checked={settings.health.workoutReminders}
                onToggle={() => handleToggle('health.workoutReminders')}
            />
            <NotificationItem
                label="Hydration Reminders"
                description="Drink water alerts (every 2h)"
                checked={settings.health.hydration}
                onToggle={() => handleToggle('health.hydration')}
            />
             <NotificationItem
                label="Sleep Reminders"
                description="Bedtime reminder at 10:00 PM"
                checked={settings.health.sleep}
                onToggle={() => handleToggle('health.sleep')}
            />
        </SettingsSection>

        {/* Wellness Insights */}
        <SettingsSection title="Wellness Insights">
             <NotificationItem
                label="Daily Summary"
                description="Morning health report (8:00 AM)"
                checked={settings.insights.dailySummary}
                onToggle={() => handleToggle('insights.dailySummary')}
            />
             <NotificationItem
                label="Weekly Reports"
                description="Sunday evening recap"
                checked={settings.insights.weeklyReports}
                onToggle={() => handleToggle('insights.weeklyReports')}
            />
            <NotificationItem
                label="AI Insights"
                description="Personalized recommendations"
                checked={settings.insights.aiInsights}
                onToggle={() => handleToggle('insights.aiInsights')}
            />
        </SettingsSection>
        
        {/* Social & Challenges */}
         <SettingsSection title="Social & Challenges">
             <NotificationItem
                label="Friend Activity"
                description="When friends achieve milestones"
                checked={settings.social.friendActivity}
                onToggle={() => handleToggle('social.friendActivity')}
            />
             <NotificationItem
                label="Challenge Updates"
                description="Leaderboard changes & events"
                checked={settings.social.challenges}
                onToggle={() => handleToggle('social.challenges')}
            />
            <NotificationItem
                label="Messages"
                description="Direct messages from friends"
                checked={settings.social.messages}
                onToggle={() => handleToggle('social.messages')}
            />
        </SettingsSection>
        
        {/* Device & Sync */}
        <SettingsSection title="Device & Sync">
             <NotificationItem
                label="Low Battery Alerts"
                description="When device battery < 20%"
                checked={settings.device.lowBattery}
                onToggle={() => handleToggle('device.lowBattery')}
            />
             <NotificationItem
                label="Sync Failures"
                description="Alert when data sync fails"
                checked={settings.device.syncFailures}
                onToggle={() => handleToggle('device.syncFailures')}
            />
            <NotificationItem
                label="Firmware Updates"
                description="New device updates available"
                checked={settings.device.updates}
                onToggle={() => handleToggle('device.updates')}
            />
        </SettingsSection>

        {/* Quiet Hours */}
        <SettingsSection title="Quiet Hours">
            <NotificationItem
                label="Do Not Disturb"
                description={`From ${settings.quietHours.from} to ${settings.quietHours.to}`}
                checked={settings.quietHours.enabled}
                onToggle={() => handleToggle('quietHours.enabled')}
            />
             <NotificationItem
                label="Allow urgent alerts"
                description="Low battery, sync failures"
                checked={settings.quietHours.allowUrgent}
                onToggle={() => handleToggle('quietHours.allowUrgent')}
            />
        </SettingsSection>
        
        {/* Delivery Methods */}
        <SettingsSection title="Delivery Methods">
            <NotificationItem
                label="Push Notifications"
                checked={settings.channels.push}
                onToggle={() => handleToggle('channels.push')}
            />
            <NotificationItem
                label="Email Notifications"
                checked={settings.channels.email}
                onToggle={() => handleToggle('channels.email')}
            />
             <NotificationItem
                label="SMS Alerts"
                checked={settings.channels.sms}
                onToggle={() => handleToggle('channels.sms')}
            />
        </SettingsSection>
      </div>

       {/* Bottom Actions */}
      <div className="flex gap-4 pt-4">
        <Button variant="secondary" className="flex-1">Test Notification</Button>
        <Button variant="destructive" className="flex-1">Reset to Defaults</Button>
      </div>

    </div>
  );
}

function SettingsSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
                <div className="divide-y divide-border/50">
                    {children}
                </div>
            </CardContent>
        </Card>
    )
}

function NotificationItem({ label, description, checked, onToggle }: { label: string; description?: string; checked: boolean; onToggle: () => void; }) {
    return (
        <div className="p-4 flex items-center justify-between">
            <div>
                <label htmlFor={label} className="font-medium cursor-pointer">{label}</label>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <Switch id={label} checked={checked} onCheckedChange={onToggle} />
        </div>
    )
}
