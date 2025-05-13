
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Laptop, ShieldAlert, Bell, Clock, Database, Save } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [dataRetention, setDataRetention] = useState("30 days");
  const [autoApproval, setAutoApproval] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState("medium");
  
  const handleSaveSettings = () => {
    toast("Settings saved successfully", {
      description: "Your preferences have been updated."
    });
  };

  return (
    <Layout activePage="settings">
      <div className="flex-1 overflow-auto bg-background p-6">
        <Header title="Settings" />
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="mb-6">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-medium">Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Theme Mode
                  </label>
                  <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value as 'light' | 'dark' | 'system')}
                    className="justify-start bg-muted p-1 rounded-md">
                    <ToggleGroupItem value="light" aria-label="Light mode" className="data-[state=on]:bg-background data-[state=on]:shadow">
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark" aria-label="Dark mode" className="data-[state=on]:bg-background data-[state=on]:shadow">
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </ToggleGroupItem>
                    <ToggleGroupItem value="system" aria-label="System preference" className="data-[state=on]:bg-background data-[state=on]:shadow">
                      <Laptop className="h-4 w-4 mr-2" />
                      System
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
              <CardDescription>Configure security policies and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="auto-approval" className="text-sm font-medium">
                    Auto-approve low-risk policy changes
                  </label>
                  <p className="text-muted-foreground text-xs">Automatically apply policy changes with low risk scores</p>
                </div>
                <Switch 
                  id="auto-approval" 
                  checked={autoApproval} 
                  onCheckedChange={setAutoApproval}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Security Alert Threshold
                </label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                >
                  <option value="low">Low (Show all alerts)</option>
                  <option value="medium">Medium (Default)</option>
                  <option value="high">High (Critical alerts only)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-medium">Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="email-notifications" className="text-sm font-medium">
                      Email notifications for critical events
                    </label>
                    <p className="text-muted-foreground text-xs">Receive emails when critical security events occur</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="sms-notifications" className="text-sm font-medium">
                      SMS notifications for critical events
                    </label>
                    <p className="text-muted-foreground text-xs">Receive text messages for urgent security alerts</p>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={smsNotifications} 
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg font-medium">Data Management</CardTitle>
              <CardDescription>Configure data retention policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Data Retention Period
                </label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={dataRetention}
                  onChange={(e) => setDataRetention(e.target.value)}
                >
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>180 days</option>
                  <option>1 year</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button
                  onClick={handleSaveSettings}
                  className="inline-flex items-center gap-2 w-full sm:w-auto"
                >
                  <Save className="h-4 w-4" />
                  Save All Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
